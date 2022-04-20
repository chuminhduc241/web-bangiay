import {
  CameraOutlined,
  EditOutlined,
  LoginOutlined,
  MailOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Form, Input, Tooltip } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { LOCAL_STORAGE } from "constants/localstorage";
import moment from "moment";
import "moment/locale/vi";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser, logOut } from "redux/authSlice";
import { UserServices } from "services/user-service";
import "./style.scss";
import UploadImage from "./UploadImage";
moment.locale("vi");
const InforUser = () => {
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isNameUpdate, setIsNameUpdate] = useState(false);
  const [isInformation, setIsInformation] = useState(false);
  const userServices = new UserServices();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logOut());
    localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
  };
  useEffect(() => {
    const getInfor = async () => {
      const res = await userServices.getInfo();
      dispatch(getUser({ user: res, isAdmin: res.role === 1 ? true : false }));
    };
    getInfor();
  }, []);
  const handleUpdateName = async (value) => {
    setName(value.name);
    setIsNameUpdate(false);
    await userServices.updateUser({ name: value.name, avatar: user.avatar });
    const getInforUser = async () => {
      const dataUser = await userServices.getInfo();
      dispatch(
        getUser({ user: dataUser, isAdmin: dataUser.role === 1 ? true : false })
      );
    };
    getInforUser();
  };
  return (
    <div className="profile">
      <div className="avatar-user">
        <img src={user.avatar} alt="" onClick={() => setVisible(true)} />
      </div>
      <div className="group-information1">
        <Drawer
          title="Thông tin"
          width={400}
          onClose={() => setVisible(false)}
          visible={visible}
          className="container-information"
        >
          <div className="information">
            <UploadImage avatar={user?.avatar} />
            <div className="create-account">
              <Tooltip
                placement="top"
                title={moment(user?.createdAt).format("LLLL")}
              >
                <span>{moment(user?.createdAt).fromNow()}</span>
              </Tooltip>
            </div>
            <div className="ground-information">
              <div className="group-information">
                <UserOutlined className="icon-user-information" />
                <div className="group-information-content">
                  {!isNameUpdate && (
                    <>
                      <span className="information-name">
                        {name ? name : user?.name}
                      </span>
                      <EditOutlined
                        className="i-edit"
                        onClick={() => {
                          setIsNameUpdate(true);
                        }}
                      />
                    </>
                  )}
                  {isNameUpdate && (
                    <Form onFinish={handleUpdateName}>
                      <FormItem
                        name="name"
                        pattern={[/^[a-z0-9]/]}
                        rules={[
                          {
                            required: true,
                            message: "Nhập đầy đủ tên bạn !",
                            whitespace: true,
                            type: "string",
                          },
                          {
                            min: 1,
                            max: 25,
                            message: "Vui lòng nhập đúng tên của bạn !",
                          },
                        ]}
                      >
                        <Input defaultValue={user?.name} />
                      </FormItem>
                      <div className="group-edit-user">
                        <Button
                          key="back"
                          onClick={() => setIsNameUpdate(false)}
                        >
                          Hủy
                        </Button>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button btn-login"
                          disabled={
                            !form.isFieldsTouched(true) ||
                            form
                              .getFieldsError()
                              .filter(({ errors }) => errors.length).length
                          }
                        >
                          Cập nhật
                        </Button>
                      </div>
                    </Form>
                  )}
                </div>
              </div>

              <div className="group-information">
                <MailOutlined className="icon-user-information" />
                <div className="group-information-content">
                  <span>{user?.email}</span>
                </div>
              </div>
              <div className="group-information">
                <ShoppingCartOutlined className="icon-user-information" />
                <div className="group-information-content">
                  <Link
                    onClick={() => {
                      setVisible(false);
                    }}
                    className="inForUser"
                    to="/history-cart"
                  >
                    Lịch sử mua hàng
                  </Link>
                </div>
              </div>
              <div className="group-information">
                <LoginOutlined className="icon-user-information btn-logout" />
                <div className="group-information-content">
                  <button className="logout" onClick={onLogout}>
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
            <div className="change-information">
              <Button
                block
                type="primary"
                onClick={() => setIsInformation(true)}
              >
                Đổi mật khẩu
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default InforUser;
