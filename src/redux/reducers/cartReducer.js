import {
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  UPDATE_CART,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILURE,
  DELETE_PRODUCT_IN_CART,
  DELETE_PRODUCT_IN_CART_SUCCESS,
  DELETE_PRODUCT_IN_CART_FAILURE,
  CLEAR_CART,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE
} from '../constants/index';
 
export const initialState = {
  addingToCart: false,
  fetchingCart: true,
  updatingCart: false,
  deletingProduct: false,
  products: {},
  product: {},
  errors: {}
}

const cartReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        addingToCart: true,
      }
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        addingToCart: false,
        products: action.cart,
      }
    case ADD_TO_CART_FAILURE:
      return {
        ...state,
        addingToCart: false,
        errors: action.errors,
      }
    case GET_CART:
      return {
        ...state,
        fetchingCart: true,
      }
    case GET_CART_SUCCESS:
      return {
        ...state,
        fetchingCart: false,
        products: action.cart,
      }
    case GET_CART_FAILURE:
      return {
        ...state,
        fetchingCart: false,
        errors: action.errors,
      }
    case UPDATE_CART:
      return {
        ...state,
        updatingCart: true,
      }
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        updatingCart: false,
        products: action.cart,
      }
    case UPDATE_CART_FAILURE:
      return {
        ...state,
        updatingCart: false,
        errors: action.errors,
      }
    case DELETE_PRODUCT_IN_CART:
      return {
        ...state,
        deletingProduct: true,
      }
    case DELETE_PRODUCT_IN_CART_SUCCESS:
      return {
        ...state,
        deletingProduct: false,
        products: action.cart,
      }
    case DELETE_PRODUCT_IN_CART_FAILURE:
      return {
        ...state,
        deletingProduct: false,
        errors: action.errors,
      }
    case CLEAR_CART:
      return {
        ...state,
        deletingProduct: true,
      }
    case CLEAR_CART_SUCCESS:
      return {
        ...state,
        deletingProduct: false,
        products: {},
      }
    case CLEAR_CART_FAILURE:
      return {
        ...state,
        deletingProduct: false,
        errors: action.errors,
      }
    default:
      return state;
  }
}

export default cartReducer;
