import { useState } from "react";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popover, Button, Tooltip, Rate } from "antd";
import moment from "moment";
import "./ItemComment.scss";
import "moment/locale/vi";
// component
//
moment.locale("vi");
export default function ItemComment({
  item,
  token,
  socket,

  user,
  idProduct,
  actionCheckDeleteCmt,
  replyComment,
  setReplyComment,
  idComment,
  setIdComment,
  isForm,
  setIsForm,
  children,
}) {
  console.log(item);
  const avatarLogo =
    "https://res.cloudinary.com/phuockaito/image/upload/v1618158354/tich-xanh-fanpage-va-quang-cao-livestream-fanpage-tich-xanh_ttn2e7.png";
  return (
    <div className="item-comment">
      <div className="avatar-author">
        <img src={item?.id_user.avatar} alt="" />
      </div>
      <div className="content-author">
        <div className="ground-content-name-start">
          <div className="main-item-comment">
            <div className="group-avatar-logo-name">
              <h3 className={item?.role === 1 && "admin"}>
                {item?.id_user?.name}
                {item?.id_user?.role === 1 && (
                  <img src={avatarLogo} alt={item?.name} />
                )}
              </h3>
              {item?.id_user?.role === 1 && <p>Quản trị viên</p>}
            </div>
            <div className="time-content">
              <Tooltip
                placement="topLeft"
                title={moment(item?.timeComment).format("LLLL")}
              >
                <span>{moment(item?.timeComment).fromNow()}</span>
              </Tooltip>
              {item?.editComment && (
                <span className="edit">(đã chỉnh sửa)</span>
              )}
            </div>

            <div className="group-start">
              {item?.rating > 0 && <Rate value={item?.rating} />}
            </div>
            <div className="ground-content">
              <p> {item?.content}</p>
            </div>
            <div className="ground-reply">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
