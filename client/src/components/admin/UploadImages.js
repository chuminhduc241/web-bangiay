import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Modal, Upload } from "antd";
import React, { useState } from "react";

const UploadImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPrviewTitle] = useState("");
  function getBase64(file) {
    console.log("file :", file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange = async (info) => {
    console.log(info);
    info.fileList.forEach((item) => {
      if (info.file.status === "uploading") {
        setLoading({ loading: true });
        return;
      }
      if (info.file.status === "done") {
        console.log(item);
        getBase64(item.originFileObj).then((urlImage) =>
          setImages([...images, urlImage])
        );
      }
      setLoading(false);
      console.log(images);
    });
  };
  console.log(images);
  return (
    <div>
      <Upload
        multiple
        listType="picture-card"
        onChange={handleChange}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      >
        {uploadButton}
      </Upload>
    </div>
  );
};

export default UploadImages;
