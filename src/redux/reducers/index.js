import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productsReducer from './productsReducer';
import categoryReducer from './categoryReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  categories: categoryReducer,
  cart: cartReducer
});

export default rootReducer;
