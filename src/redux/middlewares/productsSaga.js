import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import ProductsAPI from '../../APIServices/productsAPI';
import {
  getProductsSuccess,
  getProductsFailure,
  getProductSuccess,
  getProductFailure
} from '../actions/productActions';

import { GET_PRODUCTS, GET_PRODUCT } from '../constants';

export function* getProductsSaga(action) {
  const { currentPage } = action;
  try {
    const response = yield call(ProductsAPI.getProducts, currentPage);
    const { data } = response;
    yield put(getProductsSuccess(data));
  }
  catch (error) {
    yield put(getProductsFailure(error));
    toast.error(error);
  }
}

export function* watchGetProductsSaga() {
  yield takeLatest(GET_PRODUCTS, getProductsSaga);
}

export function* getProductSaga(action) {
  try {
    const { productId } = action;
    const response = yield call(ProductsAPI.getProduct, productId);
    const { data } = response;
    yield put(getProductSuccess(data));
  }
  catch (error) {
    yield put(getProductFailure(error));
    toast.error(error);
  }
}

export function* watchGetProductSaga() {
  yield takeLatest(GET_PRODUCT, getProductSaga);
}
