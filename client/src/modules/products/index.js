import React, { useEffect, useState } from "react";
import { ProductService } from "services/product-service";
import ProductItem from "./ProductItem";
function Products() {
  const products = new ProductService();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      const res = await products.getProducts();
      setData(res.products);
      console.log(res);
    };
    getProduct();
  }, []);
  //   const showReview = (rating, numReviews) => {
  //     const rate = rating / numReviews;
  //     if (numReviews > 0) {
  //       return (
  //         <>
  //           <StarRatings
  //             starDimension="16px"
  //             starRatedColor="#fed330"
  //             starHoverColor="#fed330"
  //             rating={rate}
  //             starEmptyColor="white"
  //           />
  //           <p>{numReviews} Đánh giá</p>
  //         </>
  //       );
  //     } else {
  //       return (
  //         <>
  //           <StarRatings
  //             starDimension="16px"
  //             starRatedColor="#fed330"
  //             starHoverColor="#fed330"
  //             starEmptyColor="none"
  //             numberOfStars={5}
  //           />
  //           <p> Chưa có đánh giá</p>
  //         </>
  //       );
  //     }
  //   };
  return (
    <>
      <div className="products grid wide">
        <div className="row">
          {data.map((product) => (
            <div className="col l-3 " key={product._id}>
              <ProductItem key={product._id} product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default React.memo(Products);
