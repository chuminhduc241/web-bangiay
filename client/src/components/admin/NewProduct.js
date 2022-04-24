import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Tag,
  Checkbox,
  Row,
  Col,
  Radio,
  message,
} from "antd";
import Tags from "./Tag";
import "./style.scss";
import UploadImages from "./UploadImages";
import TextArea from "antd/lib/input/TextArea";
import { CategoryService } from "services/category-service";
import { ProductService } from "services/product-service";
const { Option } = Select;
function getBase64(file) {
  console.log("file :", file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const renderBase64 = (fileList) => {
  let Listimages = [];
  fileList.forEach((img) => {
    getBase64(img).then((resultImg) => {
      console.log(resultImg, "duc dep trai");
      Listimages = [...Listimages, resultImg];
    });
  });
  console.log("truoc");
  return Listimages;
};

const NewProduct = () => {
  const [category, setCategory] = useState([]);
  const categoryServier = new CategoryService();
  const productService = new ProductService();
  const Ref = useRef();
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [messError, setMessError] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const res = await categoryServier.getCategory();
      setCategory(res);
    };
    getCategory();
  }, []);
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    // setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleAdd = async (value) => {
    console.log(value);
    // let Listimg = await renderBase64(fileList);
    console.log(fileList + "kk");
    const newProduct = {
      ...value,
      price: Number(value.price),
      images: imagesPreview,
    };
    console.log(newProduct);
    await productService.addProduct(newProduct);
    message.success("them thanh cong");
  };
  const sizeOptions = [
    { label: "36", value: 36 },
    { label: "37", value: 37 },
    { label: "38", value: 38 },
    { label: "39", value: 39 },
    { label: "40", value: 40 },
    { label: "41", value: 41 },
    { label: "42", value: 42 },
    { label: "43", value: 43 },
  ];
  const [form] = Form.useForm();
  console.log(fileList);
  const onChangeCategory = () => {};
  return (
    <div className="new-product">
      <Modal
        width={1200}
        title="Thêm sản phẩm"
        visible={visible}
        onOk={() => {
          Ref.current.click();
        }}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={handleAdd}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá sản phẩm"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Thương hiệu"
            name="category"
            rules={[{ required: true, message: "Vui lòng nhập thương hiệu" }]}
          >
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChangeCategory}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {category?.map((cate) => (
                <Option key={cate._id} value={cate.name}>
                  {cate.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Miêu tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Kích cỡ"
            name="size"
            rules={[
              { required: true, message: "Vui lòng nhập kích cỡ Sản Phẩm" },
            ]}
          >
            <Checkbox.Group options={sizeOptions} />
          </Form.Item>
          <Form.Item
            label="Giới tính"
            name="sex"
            rules={[{ required: true, message: "Vui lòng nhập giới tính" }]}
          >
            <Radio.Group>
              <Radio value="Nam" checked>
                Nam
              </Radio>
              <Radio value="Nữ">Nữ</Radio>
              <Radio value="unisex">Nam, Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Màu sắc"
            name="color"
            rules={[
              { required: true, message: "Vui lòng nhập màu sắc Sản Phẩm" },
            ]}
          >
            <Tags form={form} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              ref={Ref}
              style={{ display: "none" }}
              className="addProduct"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="div">
          <Row>
            <Col span={8}>Hinh anh</Col>
            <Col span={16}>
              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                />
              </div>

              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default NewProduct;
