import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Spin } from "antd";
import { AuthProvider } from "./auth/AuthProvider";
import { ProductProvider } from "./Context/ProductProvider";
import { CategoryProvider } from "./Context/CategoryProvider";
import { CartProvider } from "./Context/CartProvider";
import NetworkDetection from "./utils/NetworkDetection";

//**components
const Home = lazy(() => import("./page/Home"));
const Policy = lazy(() => import("./page/Policy"));
const Shop = lazy(() => import("./page/Shop"));
const Cart = lazy(() => import("./page/Cart"));
const CustomerOrders = lazy(() => import("./page/CustomerOrders"));
const CheckOut = lazy(() => import("./page/CheckOut"));
const Dashboard = lazy(() => import("./page/Dashboard"));
const Inventory = lazy(() => import("./page/Inventory"));
const StockManagement = lazy(() => import("./page/StockManagement"));
const StockAdjustment = lazy(
  () => import("./components/private/StockAdjustment")
);
const MyAccount = lazy(() => import("./page/MyAccount"));
const ManageCategory = lazy(() => import("./page/ManageCategory"));
const OrderInformation = lazy(() => import("./page/OrderInforation"));
const Order = lazy(() => import("./page/Orders"));
const PublicRoute = lazy(() => import("./layouts/public/PublicRoute"));
const Collection = lazy(() => import("./page/Collection"));
const PrivateRoute = lazy(() => import("./layouts/private/PrivateRoute"));
const Products = lazy(() => import("./page/Products"));
const addProducts = lazy(() => import("./components/private/AddProduct"));
const Analytics = lazy(() => import("./components/private/BarChart"));
const EditProduct = lazy(() => import("./components/private/EditProduct"));

const App: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          <Spin size="large" />
        </div>
      }
    >
      <AuthProvider>
        <CartProvider>
          <CategoryProvider>
            <ProductProvider>
              <Router>
                <Switch>
                  <PublicRoute exact={true} path="/" component={Home} />
                  <PublicRoute
                    exact={true}
                    path="/policies/refund-policy"
                    component={Policy}
                  />
                  <PublicRoute exact={true} path="/shop" component={Shop} />
                  <PublicRoute exact={true} path="/cart" component={Cart} />
                  <PublicRoute
                    exact={true}
                    path="/cart/checkOut"
                    component={CheckOut}
                  />
                  <PublicRoute
                    exact={true}
                    path="/shop/collection/the_merch/item"
                    component={Collection}
                  />
                  <PrivateRoute
                    exact={true}
                    path="/dashboard"
                    component={Dashboard}
                  />
                  <PrivateRoute
                    exact={true}
                    path="/dashboard/order"
                    component={Order}
                  />
                  <PrivateRoute
                    exact={true}
                    path="/dashboard/order/customerOrder/OrderInformation"
                    component={OrderInformation}
                  />
                  <PrivateRoute
                    exact={true}
                    path="/dashboard/order/customerOrders"
                    component={CustomerOrders}
                  />
                  <PrivateRoute
                    exact={true}
                    path="/dashboard/inventory"
                    component={Inventory}
                  />
                  <PrivateRoute
                    exact={true}
                    path="/dashboard/stockManagement"
                    component={StockManagement}
                  />
                  <PrivateRoute
                    exact={true}
                    path="/dashboard/stockManagement/stockAdjustment"
                    component={StockAdjustment}
                  />
                  <PrivateRoute
                    exact={true}
                    path="/dashboard/inventory/analytics"
                    component={Analytics}
                  />
                  <PrivateRoute
                    exact={true}
                    path="/dashboard/manage-category"
                    component={ManageCategory}
                  />
                  <PrivateRoute
                    exact={true}
                    path="/dashboard/products/viewProducts"
                    component={Products}
                  />
                  <PrivateRoute
                    exact={true}
                    path="/dashboard/products/addProducts"
                    component={addProducts}
                  />
                  <PrivateRoute
                    exact={true}
                    path="/dashboard/products/EditProducts"
                    component={EditProduct}
                  />
                  <PrivateRoute
                    exact={true}
                    path="/dashboard/myAccount"
                    component={MyAccount}
                  />
                </Switch>
              </Router>
            </ProductProvider>
          </CategoryProvider>
        </CartProvider>
      </AuthProvider>
    </Suspense>
  );
};

export default NetworkDetection(App);
