
import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  GET_REGIONS,
  GET_REGIONS_SUCCESS,
  GET_REGIONS_FAILURE
} from '../constants';

export const getUserProfile = () => ({
  type: GET_USER_PROFILE,
});

export const getUserProfileSuccess = user => ({
  type: GET_USER_PROFILE_SUCCESS,
  user,
});

export const getUserProfileFailure = error => ({
  type: GET_USER_PROFILE_FAILURE,
  error
});

export const updateUserProfile = (userData) => ({
  type: UPDATE_USER_PROFILE,
  userData
});

export const updateUserProfileSuccess = updatedUser => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  updatedUser,
});

export const updateUserProfileFailure = error => ({
  type: UPDATE_USER_PROFILE_FAILURE,
  error
});

export const getRegions = () => ({
  type: GET_REGIONS,
});

export const getRegionsSuccess = regions => ({
  type: GET_REGIONS_SUCCESS,
  regions,
});

export const getRegionsFailure = error => ({
  type: GET_REGIONS_FAILURE,
  error
});
