import { ServiceBase } from "config/service-base";

export class UserServices extends ServiceBase {
  // Implement method call API
  updateUser = async (params) => {
    const { name, avatar } = params;
    return await this.post("/auth/update", { name, avatar });
  };
  uploadAvatar = async (params) => {
    const { avatar } = params;

    return await this.post("/upload_avatar", { avatar });
  };
  getInfo = async () => {
    return await this.get("/auth/infor");
  };
}
