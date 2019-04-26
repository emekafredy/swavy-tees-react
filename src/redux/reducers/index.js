import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productsReducer from './productsReducer';
import categoryReducer from './categoryReducer';
import cartReducer from './cartReducer';
import profileReducer from './profileReducer';
import checkoutReducer from './checkoutReducer';
import orderReducer from './ordersReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  categories: categoryReducer,
  cart: cartReducer,
  profile: profileReducer,
  checkout: checkoutReducer,
  orders: orderReducer
});

export default rootReducer;
