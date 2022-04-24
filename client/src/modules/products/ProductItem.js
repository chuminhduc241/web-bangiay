// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Rate } from "antd";
// import "./style.scss";
// import { ProductService } from "services/product-service";
// const ProductItem = () => {
//   const products = new ProductService();
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const getProduct = async () => {
//       const res = await products.getProducts();
//       setData(res.products);
//       console.log(res);
//     };
//     getProduct();
//   }, []);
//   const formatter = new Intl.NumberFormat("vn");
//   const showReview = (rating, numReviews) => {
//     const rate = rating / numReviews;
//     if (numReviews > 0) {
//       return (
//         <>
//           <Rate value={rate} readOnly />
//           <p>{numReviews} Đánh giá</p>
//         </>
//       );
//     } else {
//       return (
//         <>
//           <Rate value={5} readOnly />
//           <p> Chưa có đánh giá</p>
//         </>
//       );
//     }
//   };

//   return (
//     <div className="card">
//       <Link to={`detail/${product._id}`}>
//         <img
//           className="card-img"
//           src={product?.images[0]?.url}
//           alt={product._id}
//         />
//         <div className="card-name">{product.name}</div>
//       </Link>
//       <div className="card-price">
//         {formatter.format(product.price)} <u>đ</u>{" "}
//       </div>
//       {showReview(product.rating, product.numOfReviews)}
//     </div>
//   );
// };

// export default ProductItem;
import React from "react";

const ProductItem = () => {
  return <div>ProductItem</div>;
};

export default ProductItem;
