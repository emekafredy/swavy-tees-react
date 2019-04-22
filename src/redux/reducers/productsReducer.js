import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE
} from '../constants';

export const initialState = {
  fetchingProducts: false,
  fetchingProduct: true,
  products: [],
  product: {},
  error: {}
}

const productsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        fetchingProducts: true,
      }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        fetchingProducts: false,
        products: action.products,
      }
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        fetchingProducts: false,
        error: action.error,
      }
    case GET_PRODUCT:
      return {
        ...state,
        fetchingProduct: true,
      }
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        fetchingProduct: false,
        product: action.product,
      }
    case GET_PRODUCT_FAILURE:
      return {
        ...state,
        fetchingProduct: false,
        error: action.error,
      }
    default:
      return state;
  }
}

export default productsReducer;
