import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Select, Form, Button, Image, Rate } from "antd";
import Slider from "react-slick";
import { addCart } from "redux/cartSlice";
import imgFreeShip from "assets/images/freeship.png";
import popup from "components/common/Popup";
import { useDispatch } from "react-redux";
import "./style.scss";
const { Option } = Select;
const formatter = new Intl.NumberFormat("vn");

export default function InForProduct({ product }) {
  //state
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
  const dispatch = useDispatch();
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
  return (
    <>
      <section className="inforProduct ">
        <div className="product-images ">
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
        <div className="product-infor">
          <h1 className="product-name">{product?.name}</h1>
          <div className="product-content">
            <div className="product-reivew">
              {showReview(product?.ratings, product?.numOfReviews)}
            </div>
            <div className="product-status">
              <span className="first_status">
                Nhà sản xuất:
                <span className="status_name"> {product?.category}</span>
              </span>
              <span className="first_status">
                &nbsp;|&nbsp; Tình trạng:
                <span className="status_name">
                  <span> Còn hàng</span>
                </span>
              </span>
            </div>

            {loadPrice(product)}
            <div className="product-content-item">
              <div className="group-product-infor">
                Giới tính:
                <span className="group-product-text"> {product?.sex}</span>
              </div>
              <div className="group-product-infor">
                Màu sắc:
                {product?.color?.map((color) => (
                  <span className="group-product-text">{color}</span>
                ))}
              </div>
              <div className="group-product-infor">
                Kích cỡ:
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
              <div className="group-product-infor">
                Số lượng:
                <div className="custom">
                  <div className="click-left" onClick={preNumber}>
                    -
                  </div>
                  <p>{soLuong}</p>

                  <div className="click-right" onClick={nextNumber}>
                    +
                  </div>
                </div>
              </div>
              <div className="button_actions">
                <Button
                  icon={<ShoppingCartOutlined />}
                  className="add_to_cart"
                  onClick={handleAddCart}
                  size="large"
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="group-description" data-aos="fade-down">
        <h2>Mô tả Sản phẩm</h2>
        <div className="group-description-text">{product?.description}</div>
      </div>
    </>
  );
}
