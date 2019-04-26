import {
  GET_CHECKOUT,
  GET_CHECKOUT_SUCCESS,
  GET_CHECKOUT_FAILURE,
  MAKE_PAYMENT,
  MAKE_PAYMENT_SUCCESS,
  MAKE_PAYMENT_FAILURE
} from  '../constants';

export const initialState = {
  makingPayment: false,
  checkingOut: false,
  error: {}
}

const checkoutReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CHECKOUT:
      return {
        ...state,
        checkingOut: true,
      }
    case GET_CHECKOUT_SUCCESS:
      return {
        ...state,
        checkingOut: false,
      }
    case GET_CHECKOUT_FAILURE:
      return {
        ...state,
        checkingOut: false,
        error: action.error,
      }
    case MAKE_PAYMENT:
      return {
        ...state,
        makingPayment: true,
      }
    case MAKE_PAYMENT_SUCCESS:
      return {
        ...state,
        makingPayment: false,
      }
    case MAKE_PAYMENT_FAILURE:
      return {
        ...state,
        makingPayment: false,
        error: action.error,
      }
    default:
      return state;
  }
}

export default checkoutReducer;
