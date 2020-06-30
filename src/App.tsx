import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Spin} from 'antd';
//components
const Home = lazy(() => import('./page/Home'));
const Shop = lazy(() => import('./page/Shop'));
const RouteWithLayout = lazy(() => import('./layouts/public/RouteWithLayout'));
const App:React.SFC = () => {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><Spin size="large"/></div>}>
      <Router>
          <RouteWithLayout path="/" component={Home}/>
          <RouteWithLayout path="/shop" component={Shop}/>
      </Router>
    </Suspense>
  );
}

export default App;
