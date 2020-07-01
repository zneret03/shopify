import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Spin} from 'antd';
import {AuthProvider} from './auth/AuthProvider'
//components
const Home = lazy(() => import('./page/Home'));
const Shop = lazy(() => import('./page/Shop'));
const RouteWithLayout = lazy(() => import('./layouts/public/RouteWithLayout'));
const PrivateRoute = lazy(() => import('./components/private/PrivateRoute'));
const Dashboard = lazy(() => import('./components/private/Dashboard'));
const App:React.SFC = () => {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><Spin size="large"/></div>}>
      <AuthProvider>
        <Router>
          <div>
            <RouteWithLayout path="/" component={Home}/>
            <RouteWithLayout path="/shop" component={Shop}/>
            <PrivateRoute path="/dashboard" component={Dashboard}/>
          </div>
        </Router>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
