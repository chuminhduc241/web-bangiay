import { Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
const ProductItem = ({ product }) => {
  const formatter = new Intl.NumberFormat("vn");
  const showReview = (rating, numReviews) => {
    const rate = rating / numReviews;
    if (numReviews > 0) {
      return (
        <>
          <Rating name="read-only" value={rate} readOnly />
          <p>{numReviews} Đánh giá</p>
        </>
      );
    } else {
      return (
        <>
          <Rating name="read-only" value={5} readOnly />
          <p> Chưa có đánh giá</p>
        </>
      );
    }
  };

  return (
    <div className="card">
      <Link to={`detail/${product._id}`}>
        <img
          className="card-img"
          src={product.images[0].url}
          alt={product._id}
        />
        <div className="card-name">{product.name}</div>
      </Link>
      <div className="card-price">
        {formatter.format(product.price)} <u>đ</u>{" "}
      </div>
      {showReview(product.rating, product.numOfReviews)}
    </div>
  );
};

export default ProductItem;
