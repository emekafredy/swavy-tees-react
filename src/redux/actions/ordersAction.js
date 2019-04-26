import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE
} from '../constants';

export const getOrders = () => ({
  type: GET_ORDERS,
});

export const getOrdersSuccess = orders => ({
  type: GET_ORDERS_SUCCESS,
  orders,
});

export const getOrdersFailure = error => ({
  type: GET_ORDERS_FAILURE,
  error
});
