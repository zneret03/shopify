import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {Spin} from 'antd';
//components
const Home = lazy(() => import('./page/Home'));
const HomeLayout = lazy(() => import('./layouts/public/HomeLayout'))
// const pageNotFound = lazy(() => import('./components/404'))
const App:React.FC = () => {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><Spin size="large"/></div>}>
      <Router>
        <Switch>
          <HomeLayout path="/" component={Home}/>
          {/* <Route exact component={pageNotFound}/> */}
          </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
