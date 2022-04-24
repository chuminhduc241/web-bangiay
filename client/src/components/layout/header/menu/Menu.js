import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// API
// component
import "./style.scss";
export default function Menu({ openMenu, setOpenMenu }) {
  const onClickCloseMenu = () => {
    setOpenMenu(false);
  };
  {
    openMenu
      ? document.querySelector("body").classList.add("active")
      : document.querySelector("body").classList.remove("active");
  }

  return (
    <>
      <div className={`ground-menu ${openMenu && "open"}`}>
        <nav>
          <ul className="menu">
            <li style={{ "--i": "1" }}>
              <Link to="/" className="active" onClick={onClickCloseMenu}>
                trang chủ
              </Link>
            </li>
            <li className="active-menu" style={{ "--i": "2" }}>
              <Link to={`/product-type/?Adidas`}>
                <div className="icon-menu">
                  {/* <img src="" alt="logoAdidas" /> */}
                </div>
                Adidas
                <i className="fa fa-caret-down" />
              </Link>
            </li>
          </ul>
        </nav>
        );
      </div>
      {openMenu && <div className="active-before" onClick={onClickCloseMenu} />}
    </>
  );
}
