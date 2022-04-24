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

  return (
    <>
      <div className="products grid wide">
        <div className="row">
          {data.map((product) => (
            <div
              className="col l-3 "
              style={{ marginBottom: 16 }}
              key={product._id}
            >
              <ProductItem key={product._id} product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default React.memo(Products);
