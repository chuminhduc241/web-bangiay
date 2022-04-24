import React from "react";
import moment from "moment";

function CommentCard({ children, comment }) {
  console.log(comment);
  return (
    <div className="comment_card">
      <div className="comment_card_row">
        <h3>{comment.id_user.name}</h3>
      </div>

      <span>{moment(comment.createdAt).fromNow()}</span>

      <span>{new Date(comment.createdAt).toLocaleString()}</span>

      <p dangerouslySetInnerHTML={{ __html: comment.content }} />

      {children}
    </div>
  );
}

export default CommentCard;
