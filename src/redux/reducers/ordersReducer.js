import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
} from '../constants';

export const initialState = {
  fetchingOrders: true,
  orders: {},
  error: {}
}

const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ORDERS:
      return {
        ...state,
        fetchingOrders: true,
      }
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        fetchingOrders: false,
        orders: action.orders,
      }
    case GET_ORDERS_FAILURE:
      return {
        ...state,
        fetchingOrders: false,
        error: action.error,
      }
    default:
      return state;
  }
}

export default orderReducer;
