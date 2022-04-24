import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductService } from "services/product-service";
import FormWrite from "./FormWrite";
import ListComment from "./ListComment";
import StarRatingUser from "./StarRatingUser";
import "./style.css";
const Comment = ({ socket, product_id }) => {
  const { user } = useSelector((state) => state.auth);
  const productService = new ProductService();
  const [dataComment, setDataComment] = useState([]);
  useEffect(() => {
    const getcomment = async () => {
      const res = await productService.getComments({ product_id });
      setDataComment(res.comments);
      console.log(res);
      console.log(res.comments);
    };
    getcomment();
  }, [product_id]);
  return (
    <div>
      <FormWrite user={user} socket={socket} product_id={product_id} />
      <StarRatingUser />
      <ListComment
        user={user}
        dataComment={dataComment}
        setDataComment={setDataComment}
        product_id={product_id}
      />
    </div>
  );
};

export default Comment;
