import { ServiceBase } from "config/service-base";

export class CategoryService extends ServiceBase {
  // Implement method call API

  getCategory = async () => {
    return await this.get("/category");
  };
}
