import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import 'toastr/toastr.scss';
import CartAPI from '../../APIServices/cartAPI';
import {
  addToCartSuccess,
  addToCartFailure,
  getCartSuccess,
  getCartFailure,
  updateCartSuccess,
  updateCartFailure,
  deleteCartSuccess,
  deleteCartFailure,
  clearCartSuccess,
  clearCartFailure,
} from '../actions/cartActions';

import {
  ADD_TO_CART,
  GET_CART,
  UPDATE_CART,
  DELETE_PRODUCT_IN_CART,
  CLEAR_CART
} from '../constants';

export function* addProductToCartSaga(action) {
  const { productId, productData } = action;
  try {
    const response = yield call(CartAPI.addProductToCart, productId, productData);
    const { data } = response;
    yield put(addToCartSuccess(data));
    toast.success(data.message);
  }
  catch (error) {
    yield put(addToCartFailure(error.response.data));
    const { colorId, sizeId, product } = error.response.data.errors;
    colorId && toast.error(colorId);
    sizeId && toast.error(sizeId);
    product && toast.error(product);
  }
}

export function* watchAddProductToCart() {
  yield takeLatest(ADD_TO_CART, addProductToCartSaga);
}

export function* getCartSaga() {
  try {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const cartIdResponse = yield call(CartAPI.generateCartId);
      localStorage.setItem('cartId', cartIdResponse.data.cartId);
    }
    const response = yield call(CartAPI.getCart, cartId);
    const { data } = response;
    yield put(getCartSuccess(data));
  }
  catch (error) {
    yield put(getCartFailure(error.response.data));
    toast.error(error.response.data);
  }
}

export function* watchGetCart() {
  yield takeLatest(GET_CART, getCartSaga);
}

export function* updateCartSaga(action) {
  try {
    const cartId = localStorage.getItem('cartId');
    const { id, quantity } = action;
    const response = yield call(CartAPI.updateProductInCart, cartId, id, quantity);
    const { data } = response;
    yield put(updateCartSuccess(data));
  }
  catch (error) {
    yield put(updateCartFailure(error));
    toast.error(error);
  }
}

export function* watchUpdateCartSaga() {
  yield takeLatest(UPDATE_CART, updateCartSaga);
}

export function* deleteCartSaga(action) {
  try {
    const cartId = localStorage.getItem('cartId');
    const { id } = action;
    const response = yield call(CartAPI.removeProductFromCart, cartId, id);
    const { data } = response;
    yield put(deleteCartSuccess(data));
    toast.success(data.message);
  }
  catch (error) {
    yield put(deleteCartFailure(error.response.data));
    toast.error(error.response.data);
  }
}

export function* watchDeleteCartSaga() {
  yield takeLatest(DELETE_PRODUCT_IN_CART, deleteCartSaga);
}

export function* clearCartSaga() {
  try {
    const cartId = localStorage.getItem('cartId');
    const response = yield call(CartAPI.clearCart, cartId);
    const { data } = response;
    yield put(clearCartSuccess(data));
    toast.success(data.message);
  }
  catch (error) {
    yield put(clearCartFailure(error.response.data));
    toast.error(error.response.data);
  }
}

export function* watchClearCartSaga() {
  yield takeLatest(CLEAR_CART, clearCartSaga);
}
