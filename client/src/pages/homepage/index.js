import React from "react";
import "./style.scss";
import Products from "modules/products";
import Banner from "./Banner";
import Trademark from "./Trademark";
import ProductsType from "./ProductsType";
const Homepage = () => {
  return (
    <>
      <Banner />
      <Trademark />
      <ProductsType />
    </>
  );
};

export default Homepage;
