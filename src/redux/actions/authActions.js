import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAILURE,
  SET_CURRENT_USER,
  LOG_USER_OUT,
  AUTHENTICATE_USER_LOGIN,
  LOG_OUT_SUCCESS
} from '../constants/index';

export const authenticateUser = userData => ({
  type: AUTHENTICATE_USER,
  userData
});

export const loginUserAction = userData => ({
  type: AUTHENTICATE_USER_LOGIN,
  userData
});

export const authenticateUserSuccess = user => ({
  type: AUTHENTICATE_USER_SUCCESS,
  user,
});

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

export const authenticateUserFailure = error => ({
  type: AUTHENTICATE_USER_FAILURE,
  error
});

export const logUserOut = () => ({
  type: LOG_USER_OUT,
});

export const logOutSuccess = () => ({
  type: LOG_OUT_SUCCESS,
});
