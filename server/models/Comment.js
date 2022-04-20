const mongoose = require("mongoose");
const newComment = mongoose.Schema(
  {
    id_product: { type: String, required: true },
    id_user: { type: String, required: true },
    content: { type: String, required: true },
    rating: {
      type: Number,
      default: 0,
    },
    reply: { type: Array },
    editComment: { type: Boolean, required: false },
  },
  { timeStamps: true }
);
module.exports = mongoose.model("Comment", newComment);
