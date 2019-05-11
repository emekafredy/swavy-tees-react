import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import CheckoutAPI from '../../APIServices/checkoutAPI';
import {
  getCheckoutSuccess,
  getCheckoutFailure,
  makePaymentSuccess,
  makePaymentFailure,
} from '../actions/checkoutActions';
import { getOrdersSuccess, getOrdersFailure } from '../actions/ordersAction';

import { GET_CHECKOUT, MAKE_PAYMENT, GET_ORDERS } from '../constants/index';

export function* getCheckoutSaga() {
  try {
    const response = yield call(CheckoutAPI.getCheckout);
    const { data } = response;
    yield put(getCheckoutSuccess(data));
  }
  catch (error) {
    yield put(getCheckoutFailure(error));
  }
}

export function* watchGetCheckoutSaga() {
  yield takeLatest(GET_CHECKOUT, getCheckoutSaga);
}

export function* makePaymentSaga(action) {
  try {
    const { paymentData, history } = action;
    const response = yield call(CheckoutAPI.makePayment, paymentData);
    const { data } = response;
    yield put(makePaymentSuccess(data));
    toast.success(`Congratulations! Your payment was successful. 
      View your orders to get details of your orders`);
    history.push('/orders');
  }
  catch (error) {
    yield put(makePaymentFailure(error));
    toast.error(error);
  }
}

export function* watchMakePaymentSaga() {
  yield takeLatest(MAKE_PAYMENT, makePaymentSaga);
}

export function* getOrdersSaga() {
  try {
    const response = yield call(CheckoutAPI.getOrders);
    const { data } = response;
    yield put(getOrdersSuccess(data));
    toast.success(data.message);
  }
  catch (error) {
    yield put(getOrdersFailure(error));
    toast.error(error);
  }
}

export function* watchGetOrdersSaga() {
  yield takeLatest(GET_ORDERS, getOrdersSaga);
}
