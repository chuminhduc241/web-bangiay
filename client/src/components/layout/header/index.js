import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../../../assets/images/logo-light.png";
import InforUser from "./inforUser";
import { Link } from "react-router-dom";
import "./style.scss";
import { useSelector } from "react-redux";
import { Space } from "antd";
import { CategoryService } from "services/category-service";
const Header = () => {
  const ref = useRef();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const categoryService = new CategoryService();
  useEffect(() => {
    if (location.pathname === "/") {
      ref.current.style.position = "absolute";
    } else {
      ref.current.style.position = "relative";
      ref.current.style.background = "black";
    }

    const getCategoy = async () => {
      const ListCategory = await categoryService.getCategory();
      setCategories(ListCategory);
    };
    getCategoy();
  }, [location]);

  // useEffect(() => {
  //   if (window.scrollY > 1000) {
  //     ref.current.style.position = "fixed";
  //     ref.current.style.background = "black";
  //   }
  // }, []);
  const user = useSelector((state) => state.auth);
  const { isLogged } = user;
  return (
    <header className="header" ref={ref}>
      <div className="grid wide">
        <div className="row">
          <div className="header-left col l-6 m-12 c-12">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="tab_menu">
              <ul className="nav">
                <li className="nav-item">
                  <Link to="/">Trang Chủ</Link>
                </li>
                <li className="nav-item">
                  <a href="/">Sản Phẩm </a>
                  <div className="submenu-wapper">
                    <ul className="submenu">
                      {categories.map((category) => (
                        <li className="submenu-item" key={category._id}>
                          <Link
                            className="submenu-link"
                            to={`product-type?${category.name}`}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <Link to="/tintuc">Tin tức</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col l-6 m-0 c-0">
            <div className="header-right">
              <i className="fa-solid fa-magnifying-glass"></i>
              {!isLogged && (
                <Link to="/login">
                  <div className="icon">
                    <i className="fa-solid fa-user"></i>
                  </div>
                </Link>
              )}
              {isLogged && <InforUser />}

              <Link to="/cart">
                <i className="fa-solid fa-basket-shopping"></i>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
