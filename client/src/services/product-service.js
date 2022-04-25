import { ServiceBase } from "config/service-base";

export class ProductService extends ServiceBase {
  // Implement method call API
  getProducts = async (params) => {
    return await this.get("/getProducts");
  };
  getComments = async (params) => {
    const { product_id, page, limit } = params;
    const total = page * limit;
    return await this.get(`/getComments/${product_id}?limit=${total}`);
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
  addProduct = async (params) => {
    const image = params.images;
    console.log(image);

    return await this.post("/createProduct", { ...params, images: image });
  };
}
