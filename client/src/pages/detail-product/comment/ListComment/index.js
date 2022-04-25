import { useEffect, useRef, useState } from "react";
import { MessageOutlined } from "@ant-design/icons";
import ItemComment from "./ItemComment";
import { useHistory } from "react-router-dom";
import { ProductService } from "services/product-service";
import Loading from "pages/LoadingPage";
import TextArea from "antd/lib/input/TextArea";
import { Button } from "antd";
import { ref } from "yup";
export default function ListComment({ socket, user, product_id }) {
  const history = useHistory();
  const [idComment, setIdComment] = useState("");
  const [replyComment, setReplyComment] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [page, setPage] = useState(1);
  const [dataComment, setDataComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const productService = new ProductService();
  const pageEnd = useRef();
  const createdAt = new Date().toISOString();
  const [contentReply, setContenReply] = useState("");

  useEffect(() => {
    setLoading(true);
    const getcomment = async () => {
      const res = await productService.getComments({
        product_id,
        page, 
        limit: 3,
      });
      setDataComment(res.comments);
      console.log(res);
      console.log(res.comments);
      setLoading(false);
    };
    getcomment();
  }, [product_id, page]);
  useEffect(() => {
    if (socket) {
      console.log("nghe");
      socket.on("sendCommentToClient", (msg) => {
        setDataComment([msg, ...dataComment]);
      });
      console.log("vao");
      return () => socket.off("sendCommentToClient");
    }
  }, [socket, dataComment, setDataComment]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((pre) => pre + 1);
        }
      },
      {
        threshold: 1,
      }
    );
    observer.observe(pageEnd.current);
  }, []);
  const Ref = useRef();
  const handleReply = (userName) => {
    console.log(userName);
    setReplyComment(true);
    Ref.current.innerHTML = `<a style="color: red">${userName}</a>`;
  };
  const onChangeReyly = (e) => {
    setContenReply(e.target.value);
  };
  const handleRepcommet = (okm) => {
    console.log(okm);
    if (user) {
      socket.emit("createComment", {
        _id: okm,
        id_user: user._id,
        content: contentReply,
        id_product: product_id,
        send: "replyComment",
      });
    }
  };
  return (
    <div className="list-item-comment">
      {dataComment?.map((item) => (
        <>
          <ItemComment
            comment={item}
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
            {console.log(item)}
            <p onClick={() => handleReply(item.id_user.name)}>
              <MessageOutlined /> Trả Lời
            </p>
            {replyComment && (
              <div className="reply">
                <TextArea
                  rows={4}
                  onChange={onChangeReyly}
                  value={contentReply}
                  ref={Ref}
                />
                <div className="reply-action">
                  <Button onClick={() => handleRepcommet(item._id)}>Gui</Button>
                  <Button onClick={() => setReplyComment(false)}>Huy</Button>
                </div>
              </div>
            )}
            {item.reply.map((rl) => (
              <div className="ground-reply-item">
                <ItemComment
                  item={rl}
                  socket={socket}
                  user={rl.id_user}
                  idProduct={product_id}
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

      {loading && <Loading />}
      <button style={{ opacity: 0 }} ref={pageEnd}>
        load more
      </button>
    </div>
  );
}
