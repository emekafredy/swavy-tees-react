import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAILURE,
  SET_CURRENT_USER,
  AUTHENTICATE_USER_LOGIN,
  LOG_OUT_SUCCESS
} from '../constants/index';

export const initialState = {
  isAuthenticated: false,
  authenticating: false,
  user:{},
  errors: {}
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        authenticating: true,
        isAuthenticated: false,
      }
    case AUTHENTICATE_USER_LOGIN:
      return {
        ...state,
        authenticating: true,
        isAuthenticated: false,
      }
    case AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        authenticating: false,
        user: action.user,
      }
    case AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        authenticating: false,
        errors: action.error.errors,
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
      }
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      }
    default:
      return state;
  }
}

export default authReducer;
