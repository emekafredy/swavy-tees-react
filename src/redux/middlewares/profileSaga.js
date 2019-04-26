import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import ProfileAPI from '../../APIServices/profileAPI';
import {
  getUserProfileSuccess,
  getUserProfileFailure,
  updateUserProfileSuccess,
  updateUserProfileFailure,
  getRegionsSuccess,
  getRegionsFailure
} from '../actions/profileActions';

import { GET_USER_PROFILE, UPDATE_USER_PROFILE, GET_REGIONS } from '../constants';

export function* getUserProfileSaga() {
  try {
    const response = yield call(ProfileAPI.getUserProfile);
    const { data } = response;
    yield put(getUserProfileSuccess(data.user));
  }
  catch (error) {
    yield put(getUserProfileFailure(error));
    toast.error(error.response.data);
  }
}

export function* watchGetUserProfileSaga() {
  yield takeLatest(GET_USER_PROFILE, getUserProfileSaga);
}

export function* updateUserProfileSaga(action) {
  try {
    const { userData } = action;
    const response = yield call(ProfileAPI.updateUserProfile, userData);
    const { data } = response;
    yield put(updateUserProfileSuccess(data));
    toast.success(data.message);
  }
  catch (error) {
    yield put(updateUserProfileFailure(error));
    const {
      firstName, lastName, address1, address2, city, postalCode, country, dayPhone, eveningPhone, mobilePhone
    } = error.response.data.errors;
    firstName && toast.error(firstName);
    lastName && toast.error(lastName);
    address1 && toast.error(address1);
    address2 && toast.error(address2);
    city && toast.error(city);
    postalCode && toast.error(postalCode);
    country && toast.error(country);
    dayPhone && toast.error(dayPhone);
    eveningPhone && toast.error(eveningPhone);
    mobilePhone && toast.error(mobilePhone);
  }
}

export function* watchUpdateUserProfileSaga() {
  yield takeLatest(UPDATE_USER_PROFILE, updateUserProfileSaga);
}

export function* getRegionsSaga() {
  try {
    const response = yield call(ProfileAPI.getRegions);
    const { data } = response;
    yield put(getRegionsSuccess(data.regions));
  }
  catch (error) {
    yield put(getRegionsFailure(error));
    toast.error(error.response.data);
  }
}

export function* watchGetRegionsSaga() {
  yield takeLatest(GET_REGIONS, getRegionsSaga);
}