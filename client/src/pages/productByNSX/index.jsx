import useCustomRouter from "hooks/useCustomRouter";
import ProductItem from "modules/products/ProductItem";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { ProductService } from "services/product-service";
import Pagination from "./pagination";
import Sorting from "./sorting";
import "./style.scss";
const ProductByCategory = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [sort, setSort] = useState("createdAt");
  const [category, setCategory] = useState("Puma");
  const { search } = useLocation();
  const [data, setData] = useState();
  const { pushQuery } = useCustomRouter();
  const totalPages = useMemo(() => {
    if (!data) return 0;
    return Math.ceil(data.count / limit);
  }, [data, limit]);
  const productService = new ProductService();
  useEffect(() => {
    const getProductByID = async () => {
      const res = await productService.getProductByCategory({
        page,
        limit,
        sort,
        category,
      });
      console.log(res);
      setData(res);
    };
    getProductByID();
  }, [page, sort, limit, category]);
  useEffect(() => {
    const page = new URLSearchParams(search).get("page") || 1;
    setPage(page);
    const sort = new URLSearchParams(search).get("sort") || "-createdAt";
    setSort(sort);
    const category = new URLSearchParams(search).get("category") || "Puma";
    setCategory(category);
  }, [search]);
  console.log("render");
  return (
    <div className="product__NSX grid wide">
      <div className="product__NSX-title row">
        <span className="col l-6">ADIDAS</span>
        <div className="filter-price col l-6">
          <Sorting
            sort={sort}
            category={category}
            calback={(sort, category) =>
              pushQuery({ page, sort, limit, category })
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="col l-3">
          {data?.products.map((item) => (
            <ProductItem key={item._id} product={item} />
          ))}
        </div>
      </div>

      <Pagination
        sort={sort}
        limit={limit}
        totalPages={totalPages}
        category={category}
        page={page}
      />
    </div>
  );
};

export default ProductByCategory;
