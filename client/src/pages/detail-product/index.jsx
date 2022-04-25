import { DataContext } from "DataProvider";
import Detail from "modules/detail-product";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductService } from "services/product-service";

import Comment from "./comment";
import InForProduct from "./InforProduct";

const DetailProduct = () => {
  const [product, setProduct] = useState();

  const { socket } = useContext(DataContext);
  const { id } = useParams();
  const productService = new ProductService();
  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", id);
    }
  }, [socket, id]);
  console.log(id);
  useEffect(() => {
    const getProduct = async () => {
      const res = await productService.getProductById({ id: id });
      setProduct(res.product);
    };
    getProduct();
  }, [id]);

  return (
    <div>
      <InForProduct product={product} />
      <Comment socket={socket} product_id={id} />
    </div>
  );
};

export default DetailProduct;
