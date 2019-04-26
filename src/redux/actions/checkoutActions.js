import {
  GET_CHECKOUT,
  GET_CHECKOUT_SUCCESS,
  GET_CHECKOUT_FAILURE,
  MAKE_PAYMENT,
  MAKE_PAYMENT_SUCCESS,
  MAKE_PAYMENT_FAILURE
} from '../constants';

export const getCheckout = () => ({
  type: GET_CHECKOUT,
});

export const getCheckoutSuccess = () => ({
  type: GET_CHECKOUT_SUCCESS,
});

export const getCheckoutFailure = error => ({
  type: GET_CHECKOUT_FAILURE,
  error
});

export const makePayment = (paymentData, history) => ({
  type: MAKE_PAYMENT,
  paymentData,
  history
});

export const makePaymentSuccess = () => ({
  type: MAKE_PAYMENT_SUCCESS,
});

export const makePaymentFailure = error => ({
  type: MAKE_PAYMENT_FAILURE,
  error
});
