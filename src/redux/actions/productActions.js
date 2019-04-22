import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE
} from '../constants';

export const getProducts = () => ({
  type: GET_PRODUCTS,
});

export const getProductsSuccess = products => ({
  type: GET_PRODUCTS_SUCCESS,
  products,
});

export const getProductsFailure = error => ({
  type: GET_PRODUCTS_FAILURE,
  error
});

export const getProduct = productId => ({
  type: GET_PRODUCT,
  productId
});

export const getProductSuccess = product => ({
  type: GET_PRODUCT_SUCCESS,
  product,
});

export const getProductFailure = error => ({
  type: GET_PRODUCT_FAILURE,
  error
});