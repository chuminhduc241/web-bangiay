import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "./style.scss";
import { Image, Rate, Tabs } from "antd";
import { useParams } from "react-router-dom";
import { ProductService } from "services/product-service";
import { useDispatch } from "react-redux";
import { addCart } from "redux/cartSlice";
import popup from "components/common/Popup/index";
import Reviews from "./Reviews";
import { DataContext } from "DataProvider";

const Detail = () => {
  const { TabPane } = Tabs;
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState();
  const [comments, setComments] = useState([]);
  const { socket } = useContext(DataContext);
  const productService = new ProductService();
  const dispatch = useDispatch();
  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", id);
    }
  }, [socket, id]);
  useEffect(() => {
    const getProduct = async () => {
      const res = await productService.getProductById({ id: id });
      setProduct(res.product);
    };
    getProduct();
  }, [id]);
  useEffect(() => {
    const getcomment = async () => {
      const res = await productService.getComments();
      setComments(res.comments);
    };
    getcomment();
  }, [id]);
  console.log(comments);
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      <i className="fa fa-angle-left left"></i>
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      <i className="fa fa-angle-right right"></i>
    </button>
  );

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={product.images[i].url} alt={product.images[i].public_id} />
        </a>
      );
    },
    dots: true,
    dotsClass: "group-array-image",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    autoplaySpeed: 3000,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };
  const showReview = (rating, numReviews) => {
    const rate = rating / numReviews;
    if (numReviews > 0) {
      return (
        <>
          <Rate value={rate} readOnly />
          <span className="total-review">có {numReviews} Đánh giá</span>
        </>
      );
    } else {
      return (
        <>
          <Rate value={5} readOnly />
          <span className="total-review">chưa có đánh giá</span>
        </>
      );
    }
  };
  const loadPrice = (product) => {
    const formatter = new Intl.NumberFormat("vn");
    if (product && product.isdiscount) {
      const price = product.price - (product.price * product.discount) / 100;
      return (
        <div className="price-box">
          <span className="special-price">
            <span>
              {formatter.format(price)} <u>đ</u>
            </span>
          </span>
          <span className="old-price">
            <del>{product.price}</del>
          </span>
        </div>
      );
    } else {
      return (
        <div className="price-box">
          <span className="special-price">
            <span>
              {formatter.format(product?.price)} <u>đ</u>
            </span>
          </span>
        </div>
      );
    }
  };
  const [size, setSize] = useState();
  const [soLuong, setSoLuong] = useState(1);
  const preNumber = () => {
    const number = Math.max(1, soLuong - 1);
    setSoLuong(number);
  };
  const nextNumber = () => {
    const number = Math.min(5, soLuong + 1);
    setSoLuong(number);
  };
  const handleAddCart = () => {
    if (!size) {
      popup(
        "Không thể thêm vào giỏ hàng",
        "Vui lòng chọn kích cỡ sản phẩm",
        "error"
      );
    } else {
      dispatch(addCart({ product: { ...product, size }, quantity: soLuong }));
      popup("Giỏ hàng", "Thêm vào giỏ hàng thành công", "success");
    }
  };
  return (
    <>
      <section className="detail-products grid wide">
        <div className="row">
          <div className="product-images col l-5">
            <div className="product-images-detaitl">
              <Slider {...settings}>
                {product?.images.map((image, index) => (
                  <div className="product-image" key={index}>
                    <Image src={image.url} alt={image._id} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="detail-prod col l-6 l-o-1">
            <h1 className="title-product">{product?.name}</h1>
            <div className="review-result">
              {showReview(product?.ratings, product?.numOfReviews)}
            </div>
            <div className="group-status">
              <span className="first_status">
                Nhà sản xuất:
                <span className="status_name">{product?.category}</span>
              </span>
              <span className="first_status">
                &nbsp;|&nbsp; Tình trạng:
                <span className="status_name">
                  <span>Còn hàng</span>
                </span>
              </span>
            </div>
            {loadPrice(product)}
            <div className="product-summary">
              <div className="description">
                <ul>
                  <li>Dạng ổ cứng: Thiết bị lưu trữ mạng NAS</li>
                  <li>Dung lượng: 0 TB (Chưa bao gồm ổ cứng)</li>
                  <li>Bảo hành: 2 năm</li>
                </ul>
              </div>
            </div>
            <div className="product_content ">
              <div className="size">
                <span className="size-title">Kích cỡ</span>
                {product?.size.map((s, i) => {
                  return (
                    <div className="size-item" key={i}>
                      <span
                        onClick={() => setSize(s)}
                        className={s === size ? "size-item-active" : ""}
                      >
                        {s}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="soluong">
                <div className="label_sl">Số lượng:</div>
                <div className="custom">
                  <button type="button" onClick={preNumber}>
                    -
                  </button>
                  <span>{soLuong}</span>

                  <button type="button" onClick={nextNumber}>
                    +
                  </button>
                </div>
              </div>
              <div className="button_actions">
                <button className="add_to_cart">
                  <span className="text_1" onClick={handleAddCart}>
                    Thêm vào giỏ hàng
                  </span>
                </button>
                <a className="btn_call" href="/">
                  <span className="text_1">Mua Ngay</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col c-12">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Miêu tả" key="1">
                {product?.description}
              </TabPane>
              <TabPane tab="Đánh giá" key="2">
                <Reviews
                  id={id}
                  comments={comments}
                  socket={socket}
                  setComments={setComments}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;
