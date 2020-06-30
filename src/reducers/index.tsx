import {combineReducers} from 'redux';
import ShopReducer from './ShopReducer';
const allReducer = combineReducers({
    ShopItems : ShopReducer
});

export default allReducer;