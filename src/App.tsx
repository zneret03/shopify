import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//components
const Home = lazy(() => import('./page/Home'));
const App:React.FC = () => {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading...</div>}>
          <Route exact to="/" component={Home} />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
