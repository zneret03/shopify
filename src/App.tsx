import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {Spin} from 'antd';
import {AuthProvider} from './auth/AuthProvider';
import {ProductProvider} from './Context/ProductProvider';
import NetworkDetection from './utils/NetworkDetection';

//components
const Home = lazy(() => import('./page/Home'));
const Shop = lazy(() => import('./page/Shop'));
const Cart = lazy(() => import('./page/Cart'));
const CheckOut = lazy(() => import('./page/CheckOut'));
const Dashboard = lazy(() => import('./page/Dashboard'));
const PublicRoute = lazy(() => import('./layouts/public/PublicRoute'));
const Collection = lazy(() => import('./page/Collection'));
const PrivateRoute = lazy(() => import('./layouts/private/PrivateRoute'));
const Products = lazy(() => import('./page/Products'));
const addProducts = lazy(() => import('./components/private/AddProduct'))
const EditProduct = lazy(() => import('./components/private/EditProduct'))
const App:React.SFC = () => {

  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><Spin size="large"/></div>}>
      <AuthProvider>
        <ProductProvider>
        <Router>
          <Switch>
            <PublicRoute exact={true} path="/" component={Home}/>
            <PublicRoute exact={true} path="/shop" component={Shop}/>
            <PublicRoute exact={true} path="/cart" component={Cart}/>
            <PublicRoute exact={true} path="/cart/checkOut" component={CheckOut}/>
            <PublicRoute exact={true} path="/shop/collection/the_merch/item" component={Collection}/>
            <PrivateRoute exact={true}  path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact={true} path="/dashboard/products/viewProducts" component={Products} />
            <PrivateRoute exact={true} path="/dashboard/products/addProducts" component={addProducts} />
            <PrivateRoute exact={true} path="/dashboard/products/EditProducts" component={EditProduct} />
          </Switch>
        </Router>
        </ProductProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default NetworkDetection(App);
