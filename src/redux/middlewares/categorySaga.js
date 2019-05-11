import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import CategoriesAPI from '../../APIServices/categoryAPI';
import {
  getCategoriesSuccess,
  getCategoriesFailure,
  getCategorySuccess,
  getCategoryFailure,
  searchByKeywordSuccess,
  searchByKeywordFailure,
  getDepartmentsSuccess,
  getDepartmentsFailure,
  getProductsByDepartmentSuccess,
  getProductsByDepartmentFailure
} from '../actions/categoryActions';

import {
  GET_CATEGORIES,
  GET_CATEGORY,
  SEARCH_BY_KEYWORD,
  GET_DEPARTMENTS,
  GET_PRODUCTS_BY_DEPARTMENT
} from '../constants';

export function* getCategoriesSaga() {
  try {
    const response = yield call(CategoriesAPI.getCategories);
    const { data } = response;
    yield put(getCategoriesSuccess(data.categories));
  }
  catch (error) {
    yield put(getCategoriesFailure(error));
    toast.error(error);
  }
}

export function* watchGetCategoriesSaga() {
  yield takeLatest(GET_CATEGORIES, getCategoriesSaga);
}

export function* getCategorySaga(action) {
  try {
    const { categoryName, currentPage } = action;
    const response = yield call(CategoriesAPI.getCategory, categoryName, currentPage);
    const { data } = response;
    yield put(getCategorySuccess(data));
  }
  catch (error) {
    yield put(getCategoryFailure(error));
    toast.error(error);
  }
}

export function* watchGetCategorySaga() {
  yield takeLatest(GET_CATEGORY, getCategorySaga);
}

export function* searchByKeywordSaga(action) {
  try {
    const { keyword, currentPage } = action;
    const response = yield call(CategoriesAPI.searchByKeyword, keyword, currentPage);
    const { data } = response;
    yield put(searchByKeywordSuccess(data));
  }
  catch (error) {
    yield put(searchByKeywordFailure(error.response.data.error));
  }
}

export function* watchSearchByKeywordSaga() {
  yield takeLatest(SEARCH_BY_KEYWORD, searchByKeywordSaga);
}


export function* getDepartmentsSaga() {
  try {
    const response = yield call(CategoriesAPI.getDepartments);
    const { data } = response;
    yield put(getDepartmentsSuccess(data.departments));
  }
  catch (error) {
    yield put(getDepartmentsFailure(error));
    toast.error(error.response.data);
  }
}

export function* watchGetDepartmentsSaga() {
  yield takeLatest(GET_DEPARTMENTS, getDepartmentsSaga);
}

export function* getProductsByDepartmentSaga(action) {
  const { departmentId } = action;
  try {
    const response = yield call(CategoriesAPI.getProductsByDepartment, departmentId);
    const { data } = response;
    yield put(getProductsByDepartmentSuccess(data));
  }
  catch (error) {
    yield put(getProductsByDepartmentFailure(error));
    toast.error(error.response.data);
  }
}

export function* watchGetProductsByDepartmentSaga() {
  yield takeLatest(GET_PRODUCTS_BY_DEPARTMENT, getProductsByDepartmentSaga);
}
