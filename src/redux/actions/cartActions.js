import {
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  UPDATE_CART,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILURE,
  DELETE_PRODUCT_IN_CART,
  DELETE_PRODUCT_IN_CART_SUCCESS,
  DELETE_PRODUCT_IN_CART_FAILURE,
  CLEAR_CART,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE
} from '../constants';

export const addToCart = (productId, productData) => ({
  type: ADD_TO_CART,
  productId,
  productData
});

export const addToCartSuccess = cart => ({
  type: ADD_TO_CART_SUCCESS,
  cart
});

export const addToCartFailure = error => ({
  type: ADD_TO_CART_FAILURE,
  error,
});

export const getCart = () => ({
  type: GET_CART,
});

export const getCartSuccess = cart => ({
  type: GET_CART_SUCCESS,
  cart
});

export const getCartFailure = error => ({
  type: GET_CART_FAILURE,
  error,
});

export const updateCart = (cartId, quantity) => ({
  type: UPDATE_CART,
  cartId,
  quantity
});

export const updateCartSuccess = cart => ({
  type: UPDATE_CART_SUCCESS,
  cart
});

export const updateCartFailure = error => ({
  type: UPDATE_CART_FAILURE,
  error,
});

export const deleteCart = cartId => ({
  type: DELETE_PRODUCT_IN_CART,
  cartId
});

export const deleteCartSuccess = cart => ({
  type: DELETE_PRODUCT_IN_CART_SUCCESS,
  cart
});

export const deleteCartFailure = error => ({
  type: DELETE_PRODUCT_IN_CART_FAILURE,
  error,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const clearCartSuccess = () => ({
  type: CLEAR_CART_SUCCESS,
});

export const clearCartFailure = error => ({
  type: CLEAR_CART_FAILURE,
  error,
});
