import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Spin} from 'antd';
import {AuthProvider} from './auth/AuthProvider'
//components
const Home = lazy(() => import('./page/Home'));
const Shop = lazy(() => import('./page/Shop'));
const Dashboard = lazy(() => import('./page/Dashboard'));
const RouteWithLayout = lazy(() => import('./layouts/public/RouteWithLayout'));
const PrivateRoute = lazy(() => import('./components/private/PrivateRoute'));
const App:React.SFC = () => {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><Spin size="large"/></div>}>
      <AuthProvider>
        <Router>
          <div>
            <RouteWithLayout exact={true} path="/" component={Home}/>
            <RouteWithLayout exact={true} path="/shop" component={Shop}/>
            <PrivateRoute exact={true}  path="/dashboard" component={Dashboard}/>
          </div>
        </Router>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
