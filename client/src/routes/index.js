import { ROUTES } from "constants/routes";
import Homepage from "pages/homepage";
import Login from "../pages/login";
import Register from "../pages/register";
import React from "react";
import { Switch, withRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ActivationEmail from "pages/activationEmail";
import NewProduct from "components/admin/NewProduct";
import DetailProductPage from "pages/detail-product";
import DetailProduct from "pages/detail-product";
import CartProduct from "pages/cartProduct";
import ProductsType from "pages/ProductsType";
import Search from "pages/search";
import AddCategory from "components/admin/AddCategory";
import ResetPassword from "pages/resetPassword";
const AppRoutesComponent = () => {
  return (
    <div>
      <Switch>
        <PublicRoute path="/add" component={NewProduct} />
        <PublicRoute path="/addCate" component={AddCategory} />
        <PublicRoute path="/search" component={Search} />
        <PublicRoute path="/user/reset/:token" component={ResetPassword} />
        <PublicRoute path={ROUTES.HOMEPAGE} exact component={Homepage} />
        <PublicRoute path={ROUTES.DETAIL} exact component={DetailProduct} />
        <PublicRoute path={ROUTES.PRODUCTTYPE} exact component={ProductsType} />
        <PublicRoute path={ROUTES.CART} exact component={CartProduct} />
        <PublicRoute path={ROUTES.LOGIN} component={Login} />
        <PublicRoute path={ROUTES.ACTIVATION} component={ActivationEmail} />
        <PublicRoute path={ROUTES.REGISTER} component={Register} />
        <PublicRoute path={ROUTES.REGISTER} component={Register} />
        <PublicRoute
          path={ROUTES.DETAILPRODUCT}
          component={DetailProductPage}
        />
      </Switch>
    </div>
  );
};

export default withRouter(AppRoutesComponent);
