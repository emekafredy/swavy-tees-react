import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE
} from '../constants';

export const initialState = {
  fetchingCategories: false,
  fetchingCategory: false,
  categories: [],
  category: {},
  error: {}
}

const categoryReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        fetchingCategories: true,
      }
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        fetchingCategories: false,
        categories: action.categories,
      }
    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        fetchingCategories: false,
        error: action.error,
      }
    case GET_CATEGORY:
      return {
        ...state,
        fetchingCategory: true,
      }
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchingCategory: false,
        category: action.category,
      }
    case GET_CATEGORY_FAILURE:
      return {
        ...state,
        fetchingCategory: false,
        error: action.error,
      }
    default:
      return state;
  }
}

export default categoryReducer;
