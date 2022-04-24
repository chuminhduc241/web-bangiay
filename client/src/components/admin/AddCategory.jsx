import { Button, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { CategoryService } from "services/category-service";

const AddCategory = () => {
  function getBase64(file) {
    console.log("file :", file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const categoryService = new CategoryService();
  const [image, setImage] = useState("");
  const [form] = Form.useForm();
  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    const ImgUrl = await getBase64(file);
    setImage(ImgUrl);
    console.log(ImgUrl);
  };
  const handleAddCategory = async (values) => {
    const res = await categoryService.newCategory({ ...values, image });
    console.log(res);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        onFinish={handleAddCategory}
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
          label="Miêu tả"
          name="descreiption"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="addProduct" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>
        <input type="file" name="hinhanh" onChange={handleChangeImage} />
      </div>
    </div>
  );
};

export default AddCategory;
