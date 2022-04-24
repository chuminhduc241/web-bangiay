import { Avatar, Button, Rate } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import avt from "assets/images/avatar.png";
import TextArea from "antd/lib/input/TextArea";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { DataContext } from "DataProvider";
import CommentCard from "./CommentCard";
const Reviews = ({ comments, id, setComments, socket }) => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const url = user.url;
  const [rate, setRate] = useState();
  const [review, setReview] = useState("");
  const [error, setError] = useState(false);

  const onChangeRate = (star) => {
    setRate(star);
    console.log(rate);
  };
  const history = useHistory();
  const handleClick = () => {
    if (!user) {
      history.push("/login");
    }
  };
  const handelChangeInput = (e) => {
    setError(false);
    setReview(e.target.value);
  };
  const handlecomment = () => {
    if (review.length === 0) setError(true);
    else {
      const createdAt = new Date().toISOString();

      socket.emit("createComment", {
        id_user: user._id,
        content: review,
        id_product: id,
        createdAt,
        rating: rate,
      });
    }
  };
  useEffect(() => {
    if (socket) {
      socket.on("sendCommentToClient", (msg) => {
        setComments([msg, ...comments]);
      });
      console.log("vao");

      return () => socket.off("sendCommentToClient");
    }
  }, [socket, comments]);
  return (
    <>
      <div className="Reviews">
        <Avatar size={64} src={url !== undefined ? url : avt} />
        <br />
        <Rate onChange={onChangeRate} />
        <TextArea
          rows={6}
          value={review}
          onClick={handleClick}
          onChange={(e) => handelChangeInput(e)}
        />
        <span>{error && "Bạn chưa nhập đánh giá"}</span>
        <Button type="primary" onClick={handlecomment}>
          Thêm bình luận
        </Button>
      </div>
      <div className="ListComment">
        {comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment}>
            <div className="nav_comment">
              <p>Reply</p>
            </div>
          </CommentCard>
        ))}
      </div>
    </>
  );
};

export default Reviews;
