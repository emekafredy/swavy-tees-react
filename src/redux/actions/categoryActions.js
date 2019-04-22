import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE
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
