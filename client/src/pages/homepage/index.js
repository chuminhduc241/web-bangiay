import Slide from "modules/slide";
import React from "react";
import giay4 from "assets/images/giay4.jpg";
import "./style.scss";
import banner1 from "assets/images/banner1.jpg";
import banner2 from "assets/images/banner2.jpg";
import Products from "modules/products";
const Homepage = () => {
  return (
    <>
      <Slide />
      <div className="grid wide banner-container">
        <div className="row">
          <div className="col l-4">
            <div className="adv_bottom_inner">
              <div className="img_effect">
                <img src={banner1} alt="" />
              </div>
            </div>
          </div>
          <div className="col l-4">
            <div className="adv_bottom_inner">
              <div className="img_effect">
                <img src={giay4} alt="" />
              </div>
            </div>
          </div>
          <div className="col l-4">
            <div className="adv_bottom_inner">
              <div className="img_effect">
                <img src={banner2} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Products />
    </>
  );
};

export default Homepage;
