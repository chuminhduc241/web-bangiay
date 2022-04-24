import { useState, useEffect } from "react";
import { Comment, Avatar, Form, Button, Input, Rate } from "antd";
import ImageDefault from "assets/images/avatar.png";
import { useHistory } from "react-router-dom";
// --CSS
import "./style.css";
import { useSelector } from "react-redux";

export default function FormWrite({ product_id, socket, user }) {
  // create State
  const history = useHistory();
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(true);
  const [start, setStart] = useState(0);
  const [content, setContent] = useState("");

  //function
  const createdAt = new Date().toISOString();
  const onFinish = (values) => {
    console.log(values);
    if (user) {
      socket.emit("createComment", {
        id_user: user._id,
        content: values.content,
        id_product: product_id,
        rating: start,
      });
      form.resetFields(["content"]);
      setStart(0);
      console.log("da tao comment");
    }
  };
  // useEffect(() => {
  //   if (socket) {
  //     document.getElementById("message").addEventListener("focus", () => {
  //       if (token) {
  //         socket.emit("waitWriteComment", {
  //           idProduct,
  //           message: "Ai đó đang viết bình luận...",
  //         });
  //       } else {
  //         history.push("/login");
  //       }
  //     });
  //     document.getElementById("message").addEventListener("blur", () => {
  //       socket.emit("waitWriteComment", { idProduct, message: "" });
  //     });
  //     socket.on("waitWriteComment", (msg) => {
  //       document.getElementById("waitWriteComment").innerHTML = msg;
  //     });
  //   }
  //   return () => socket.off("waitWriteComment");
  // }, [contentCmt, token]);

  const onChangeTextArea = (e) => {
    if (!user) {
      history.push("/login");
    }
    setContent(e.target.value);
  };
  const handleChange = (newRating) => {
    setStart(newRating);
  };
  // state
  const showIconImage = (image, data) => {
    let avatar = null;
    if (data) {
      avatar = data.avatar;
    } else {
      avatar = image;
    }
    return avatar;
  };

  return (
    <div className="group-form-comment">
      <Form form={form} onFinish={onFinish}>
        <Comment
          avatar={
            <Avatar src={showIconImage(ImageDefault, user)} alt="Han Solo" />
          }
        >
          <Rate onChange={handleChange} />
          <div className="group-length-content">
            <p>{content.length}/700</p>
          </div>
          <Form.Item name="content">
            <TextArea
              placeholder="Mời bạn để lại bình luận"
              rows={8}
              max={20}
              value={content}
              onChange={onChangeTextArea}
              maxLength={700}
              id="message"
              className="from-write"
            />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            <Button
              htmlType="submit"
              type="primary"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Thêm Bình Luận
            </Button>
          </Form.Item>
        </Comment>
      </Form>
    </div>
  );
}
