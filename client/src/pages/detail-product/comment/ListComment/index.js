import { useEffect, useState } from "react";
import { MessageOutlined } from "@ant-design/icons";
import ItemComment from "./ItemComment";
import { useHistory } from "react-router-dom";
import { ProductService } from "services/product-service";
export default function ListComment({
  socket,
  user,
  product_id,
  actionCheckDeleteCmt,
  dataComment,
  setDataComment,
}) {
  const history = useHistory();
  const [idComment, setIdComment] = useState("");
  const [replyComment, setReplyComment] = useState(false);
  const [isForm, setIsForm] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("sendCommentToClient", (msg) => {
        setDataComment([msg, ...dataComment]);
      });
      console.log("vao");
      return () => socket.off("sendCommentToClient");
    }
  }, [socket, dataComment, setDataComment]);
  return (
    <div className="list-item-comment">
      {dataComment?.map((item) => (
        <>
          <ItemComment
            item={item}
            socket={socket}
            user={user}
            idProduct={product_id}
            replyComment={replyComment}
            setReplyComment={setReplyComment}
            idComment={idComment}
            setIdComment={setIdComment}
            isForm={isForm}
            setIsForm={setIsForm}
          >
            <p>
              <MessageOutlined /> Trả Lời
            </p>
            {item.reply.map((rl) => (
              <div className="ground-reply-item">
                <ItemComment
                  item={rl}
                  socket={socket}
                  user={user}
                  idProduct={product_id}
                  actionCheckDeleteCmt={actionCheckDeleteCmt}
                  replyComment={replyComment}
                  setReplyComment={setReplyComment}
                  idComment={idComment}
                  setIdComment={setIdComment}
                  isForm={isForm}
                  setIsForm={setIsForm}
                >
                  <p>
                    <MessageOutlined /> Trả Lời
                  </p>
                </ItemComment>
              </div>
            ))}
          </ItemComment>
        </>
      ))}
    </div>
  );
}
