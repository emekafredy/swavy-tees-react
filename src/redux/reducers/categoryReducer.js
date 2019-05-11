import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
  SEARCH_BY_KEYWORD,
  SEARCH_BY_KEYWORD_SUCCESS,
  SEARCH_BY_KEYWORD_FAILURE,
  GET_DEPARTMENTS,
  GET_DEPARTMENTS_SUCCESS,
  GET_DEPARTMENTS_FAILURE,
  GET_PRODUCTS_BY_DEPARTMENT,
  GET_PRODUCTS_BY_DEPARTMENT_SUCCESS,
  GET_PRODUCTS_BY_DEPARTMENT_FAILURE
} from '../constants';

export const initialState = {
  fetchingCategories: false,
  fetchingCategory: false,
  fetchingDepartments: false,
  categories: [],
  products: [],
  departments: [],
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
    case SEARCH_BY_KEYWORD:
      return {
        ...state,
        fetchingCategories: true,
      }
    case SEARCH_BY_KEYWORD_SUCCESS:
      return {
        ...state,
        fetchingCategories: false,
        products: action.products,
      }
    case SEARCH_BY_KEYWORD_FAILURE:
      return {
        ...state,
        fetchingCategories: false,
        error: action.error,
        products: [],
      }
    case GET_DEPARTMENTS:
      return {
        ...state,
        fetchingDepartments: true,
      }
    case GET_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        fetchingDepartments: false,
        departments: action.departments,
      }
    case GET_DEPARTMENTS_FAILURE:
      return {
        ...state,
        fetchingDepartments: false,
        error: action.error,
      }
    case GET_PRODUCTS_BY_DEPARTMENT:
      return {
        ...state,
        fetchingCategories: true,
      }
    case GET_PRODUCTS_BY_DEPARTMENT_SUCCESS:
      return {
        ...state,
        fetchingCategories: false,
        products: action.products,
      }
    case GET_PRODUCTS_BY_DEPARTMENT_FAILURE:
      return {
        ...state,
        fetchingCategories: false,
        error: action.error,
        products: [],
      }
    default:
      return state;
  }
}

export default categoryReducer;
