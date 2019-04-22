import { put, takeLatest, call } from 'redux-saga/effects';
import jwt_decode from 'jwt-decode';
import toastr from 'toastr';
import { AUTHENTICATE_USER, LOG_USER_OUT, AUTHENTICATE_USER_LOGIN } from '../constants/index';
import {
  authenticateUserSuccess,
  authenticateUserFailure,
  setCurrentUser,
  logOutSuccess
} from '../actions/authActions';
import AuthenticationAPI from '../../APIServices/authAPI';
import { setAuthToken } from '../../utils/setAuthToken';

export function* userSignUpSaga(action) {
  try {
    const { userData } = action;
    const response = yield call(AuthenticationAPI.registerUser, userData);
    const { data } = response;
    yield put(authenticateUserSuccess(data));
    localStorage.setItem('jwtToken', data.token);
    setAuthToken(data.token);
    const decoded = jwt_decode(data.token);
    const { iat, exp, ...rest } = decoded;
    yield put(setCurrentUser(rest));
    toastr.success(data.message);
  }
  catch (error) {
    yield put(authenticateUserFailure(error.response.data));
  }
}

export function* watchUserSignUpSaga() {
  yield takeLatest(AUTHENTICATE_USER, userSignUpSaga);
}

export function* userLoginSaga(action) {
  try {
    const { userData } = action;
    const response = yield call(AuthenticationAPI.loginUser, userData);
    const { data } = response;
    yield put(authenticateUserSuccess(data));
    localStorage.setItem('jwtToken', data.token);
    setAuthToken(data.token);
    const decoded = jwt_decode(data.token);
    const { iat, exp, ...rest } = decoded;
    yield put(setCurrentUser(rest));
    toastr.success(data.message);
  }
  catch (error) {
    yield put(authenticateUserFailure(error.response.data));
  }
}

export function* watchUserLoginSaga() {
  yield takeLatest(AUTHENTICATE_USER_LOGIN, userLoginSaga);
}

// Log user out
export function* logUserOutSaga() {
  localStorage.removeItem('jwtToken');
  yield put(logOutSuccess());
  setAuthToken(false);
}

export function* watchlogUserOutSaga() {
  yield takeLatest(LOG_USER_OUT, logUserOutSaga);
}
