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
    yield put(addToCartSuccess(data.cart));
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
    const response = yield call(CartAPI.getCart);
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
    const { cartId, productQuantity } = action;
    const response = yield call(CartAPI.updateProductInCart, cartId, productQuantity);
    const { data } = response;
    yield put(updateCartSuccess(data));
  }
  catch (error) {
    yield put(updateCartFailure(error.response.data));
    toast.error(error.response.data);
  }
}

export function* watchUpdateCartSaga() {
  yield takeLatest(UPDATE_CART, updateCartSaga);
}

export function* deleteCartSaga(action) {
  try {
    const { cartId } = action;
    const response = yield call(CartAPI.removeProductFromCart, cartId);
    const { data } = response;
    yield put(deleteCartSuccess(data.deletedProduct));
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
    const response = yield call(CartAPI.clearCart);
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
