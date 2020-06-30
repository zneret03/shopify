import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/main.css';
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import allReducer from './reducers'
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(
  allReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

