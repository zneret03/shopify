import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

//components
const Front = lazy(() => import('./layouts/public/Front'));
const HomeLayout = lazy(() => import('./layouts/public/HomeLayout'))
const App:React.FC = () => {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading...</div>}>
          <HomeLayout path="/" component={Front}/>
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
