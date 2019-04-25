import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import CheckoutAPI from '../../APIServices/checkoutAPI';
import {
  getCheckoutSuccess,
  getCheckoutFailure,
  makePaymentSuccess,
  makePaymentFailure
} from '../actions/checkoutActions';

import { GET_CHECKOUT, MAKE_PAYMENT } from '../constants/index';

export function* getCheckoutSaga() {
  try {
    const response = yield call(CheckoutAPI.getCheckout);
    const { data } = response;
    yield put(getCheckoutSuccess(data));
  }
  catch (error) {
    yield put(getCheckoutFailure(error));
    toast.error(error);
  }
}

export function* watchGetCheckoutSaga() {
  yield takeLatest(GET_CHECKOUT, getCheckoutSaga);
}

export function* makePaymentSaga(action) {
  try {
    const { paymentData } = action;
    const response = yield call(CheckoutAPI.makePayment, paymentData);
    console.log('RES', response);
    const { data } = response;
    yield put(makePaymentSuccess(data));
    toast.success(`Congratulations! Your payment was successful. 
      View your orders to get details of your orders`);
  }
  catch (error) {
    yield put(makePaymentFailure(error));
    toast.error(error);
  }
}

export function* watchMakePaymentSaga() {
  yield takeLatest(MAKE_PAYMENT, makePaymentSaga);
}
