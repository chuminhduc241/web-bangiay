import { message } from "antd";
import popup from "components/common/Popup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateCart, deleteCart } from "redux/cartSlice";
import "./style.scss";

const Cart = () => {
  const dataCart = useSelector((state) => state.cart).cart;
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const formatter = new Intl.NumberFormat("vn");
  useEffect(() => {
    const sumPrice = dataCart.reduce((pre, item) => {
      return pre + item.product.price * item.quantity;
    }, 0);
    setTotal(sumPrice);
  }, [dataCart]);

  const increment = (quantity, index) => {
    dispatch(updateCart({ index, quantity: quantity + 1 }));
    message.success("Cập nhập giỏ hàng thành công");
  };
  const decrement = (quantity, index) => {
    const soluong = Math.max(1, quantity - 1);
    dispatch(updateCart({ index, quantity: soluong }));
    message.success("Cập nhập giỏ hàng thành công");
  };
  const handleDeleteCart = (index) => {
    dispatch(deleteCart(index));
    message.success("Xóa sản phẩm thành công");
  };
  return (
    <>
      {/* <div className="grid wide pt-2 pb-2 mb-4 border-bottom">
        <Breadcrumb />
      </div> */}
      <section className="main-cart-page main-container">
        <div className="grid wide">
          <div className="row">
            <div className="col c-12 m-12 l-12">
              <div className="header-cart">
                <h1 className="title">Giỏ hàng</h1>
                {dataCart.length !== 0 ? (
                  <div className="cart-page">
                    <form>
                      <div className="b-scroll">
                        <div className="cart-thead">
                          <div style={{ width: "17%" }}>Ảnh sản phẩm</div>
                          <div style={{ width: "33%" }}>
                            <span className="nobr">Tên sản phẩm</span>
                          </div>
                          <div style={{ width: "15%" }} className="a-center">
                            <span className="nobr">Đơn giá</span>
                          </div>
                          <div style={{ width: "14%" }} className="a-center">
                            Số lượng
                          </div>
                          <div style={{ width: "15%" }} className="a-center">
                            Thành tiền
                          </div>
                          <div style={{ width: "6%" }}>Xoá</div>
                        </div>
                        {dataCart?.map((item, index) => (
                          <div className="cart-tbody" key={index}>
                            <div className="item-cart">
                              <div style={{ width: "17%" }}>
                                <a className="product-image" href="/">
                                  <img
                                    src={item.product?.images[0].url}
                                    alt=""
                                  />
                                </a>
                              </div>
                              <div
                                className="a-center"
                                style={{ width: "33%" }}
                              >
                                <h2 className="product-name">
                                  <Link
                                    to={`/detail/${item.product._id}`}
                                    className="text2line"
                                  >
                                    {item.product.name} <br />
                                    <span>Size: {item.product.size}</span>
                                  </Link>
                                </h2>
                              </div>
                              <div
                                style={{ width: "15%" }}
                                className="a-center"
                              >
                                <span className="item-price">
                                  <span className="price">
                                    {" "}
                                    {formatter.format(item.product.price)} đ
                                  </span>
                                </span>
                              </div>
                              <div style={{ width: "14%" }}>
                                <span className="input_qty_pr">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      decrement(item.quantity, index)
                                    }
                                  >
                                    -
                                  </button>
                                  <span>{item.quantity}</span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      increment(item.quantity, index)
                                    }
                                  >
                                    +
                                  </button>
                                </span>
                              </div>
                              <div
                                style={{ width: "15%" }}
                                className="a-center"
                              >
                                <span className="item-price">
                                  <span className="price">
                                    {formatter.format(
                                      item.product.price * item.quantity
                                    )}{" "}
                                    đ
                                  </span>
                                </span>
                              </div>
                              <div style={{ width: "6%" }}>
                                <span onClick={() => handleDeleteCart(index)}>
                                  <i className="fa-solid fa-trash-can"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}

                        <table className="shopping-cart-table-total mb-0">
                          <tfoot>
                            <tr>
                              <td colSpan="20" className="a-right">
                                <span>Tổng tiền:</span>
                              </td>
                              <td className="a-right">
                                <strong>
                                  <span className="totals_price price">
                                    {formatter.format(total)} đ
                                  </span>
                                </strong>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                        <ul className="checkout">
                          <li>
                            <button
                              className="btn-proceed-checkout"
                              title="Thực hiện thanh toán"
                              type="button"
                            >
                              <span>Thực hiện thanh toán</span>
                            </button>
                            <button title="Tiếp tục mua hàng" type="button">
                              <span>Tiếp tục mua hàng</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                ) : (
                  <h1>Không có sản phẩm</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
