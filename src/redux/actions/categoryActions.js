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
  GET_DEPARTMENTS_FAILURE
} from '../constants';

export const getCategories = () => ({
  type: GET_CATEGORIES,
});

export const getCategoriesSuccess = categories => ({
  type: GET_CATEGORIES_SUCCESS,
  categories,
});

export const getCategoriesFailure = error => ({
  type: GET_CATEGORIES_FAILURE,
  error
});

export const getCategory = categoryName => ({
  type: GET_CATEGORY,
  categoryName
});

export const getCategorySuccess = category => ({
  type: GET_CATEGORY_SUCCESS,
  category,
});

export const getCategoryFailure = error => ({
  type: GET_CATEGORY_FAILURE,
  error
});

export const searchByKeyword = (keyword) => ({
  type: SEARCH_BY_KEYWORD,
  keyword
});

export const searchByKeywordSuccess = products => ({
  type: SEARCH_BY_KEYWORD_SUCCESS,
  products,
});

export const searchByKeywordFailure = error => ({
  type: SEARCH_BY_KEYWORD_FAILURE,
  error
});

export const getDepartments = () => ({
  type: GET_DEPARTMENTS,
});

export const getDepartmentsSuccess = departments => ({
  type: GET_DEPARTMENTS_SUCCESS,
  departments,
});

export const getDepartmentsFailure = error => ({
  type: GET_DEPARTMENTS_FAILURE,
  error
});
