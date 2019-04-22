import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import CategoriesAPI from '../../APIServices/categoryAPI';
import {
  getCategoriesSuccess,
  getCategoriesFailure,
  getCategorySuccess,
  getCategoryFailure
} from '../actions/categoryActions';

import { GET_CATEGORIES, GET_CATEGORY } from '../constants';

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
    const { categoryName } = action;
    const response = yield call(CategoriesAPI.getCategory, categoryName);
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
