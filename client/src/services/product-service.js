import { ServiceBase } from "config/service-base";

export class ProductService extends ServiceBase {
  // Implement method call API
  getProducts = async (params) => {
    return await this.get("/getProducts");
  };
  getProductById = async (params) => {
    const { id } = params;
    console.log(id);
    return await this.get(`getProduct/${id}`);
  };
  getProductByCategory = async (params) => {
    const { limit, sort, page, category } = params;
    return await this.get(
      `/getProducts?category=${category}&limit=${limit}&page=${page}&sort=${sort}`
    );
  };
}
