require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const Comments = require("./models/Comment");
var bodyParser = require("body-parser");
const { Socket } = require("dgram");
const { use } = require("./routes/userRouter");

const app = express();
require("./helpers/init_mongoose");
app.use(express.json({ limit: "16mb" }));
app.use(
  express.urlencoded({ limit: "16mb", extended: true, parameterLimit: 50000 })
);
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
let users = [];
const http = require("http").createServer(app);
const io = require("socket.io")(http);
io.on("connection", (socket) => {
  console.log(socket.id, "connected");
  socket.on("joinRoom", (id) => {
    const user = { userId: socket.id, room: id };

    const check = users.every((user) => user.userId !== socket.id);

    if (check) {
      users.push(user);
      socket.join(user.room);
    } else {
      users.map((user) => {
        if (user.userId === socket.id) {
          if (user.room !== id) {
            socket.leave(user.room);
            socket.join(id);
            user.room = id;
          }
        }
      });
    }

    // console.log(users)
    // console.log(socket.adapter.rooms)
  });
  socket.on("createComment", async (msg) => {
    const { id_user, content, id_product, createdAt, rating, send, _id } = msg;
    const newComment = new Comments({
      id_user,
      content,
      id_product,
      createdAt,
      rating,
    });
    if (send === "replyComment") {
      const { _id, id_user, content, id_product, createdAt, rating } = msg;
      const comment = await Comments.findById(_id);
      console.log(comment);
      if (comment) {
        comment.reply.push({ id_user, content, createdAt });
        console.log(comment);
        await comment.save();
        const newcmt = await Comments.findById(comment._id)
          .populate("id_user")
          .populate("reply.id_user");
        io.to(newcmt.id_product).emit("sendReplyCommentToClient", newcmt);
      }
    } else {
      await newComment.save();
      const newcmt = await Comments.findById(newComment._id)
        .populate("id_user")
        .populate("reply.id_user");
      console.log(newcmt);
      io.to(newcmt.id_product).emit("sendCommentToClient", newcmt);
    }
  });

  socket.on("disconnect", () => {
    console.log(socket.id + "disconnected");
  });
});
app.use("/api/auth", require("./routes/userRouter"));
app.use("/api/", require("./routes/uploadRouter"));
app.use("/api/", require("./routes/productRouter"));
app.use("/api/", require("./routes/categoryRouter"));
app.use("/api/", require("./routes/commentRouter"));

app.use("/api", (req, res) => {
  res.json({ msg: "Hello everyone" });
});
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log("server runing on port", PORT);
});
