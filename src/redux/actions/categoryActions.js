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

export const getCategory = (categoryName, currentPage) => ({
  type: GET_CATEGORY,
  categoryName,
  currentPage
});

export const getCategorySuccess = category => ({
  type: GET_CATEGORY_SUCCESS,
  category,
});

export const getCategoryFailure = error => ({
  type: GET_CATEGORY_FAILURE,
  error
});

export const searchByKeyword = (keyword, currentPage) => ({
  type: SEARCH_BY_KEYWORD,
  keyword,
  currentPage
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

export const getProductsByDepartment = departmentId => ({
  type: GET_PRODUCTS_BY_DEPARTMENT,
  departmentId
});

export const getProductsByDepartmentSuccess = products => ({
  type: GET_PRODUCTS_BY_DEPARTMENT_SUCCESS,
  products,
});

export const getProductsByDepartmentFailure = error => ({
  type: GET_PRODUCTS_BY_DEPARTMENT_FAILURE,
  error
});
