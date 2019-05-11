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

export const initialState = {
  fetchingProfile: true,
  fetchingRegions: true,
  updatingProfile: false,
  profile: {},
  regions: [],
  errors: {}
}

const profileReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        fetchingProfile: true,
      }
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        fetchingProfile: false,
        profile: action.user,
      }
    case GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        fetchingProfile: false,
        error: action.error,
      }
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        updatingProfile: true,
      }
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        updatingProfile: false,
        profile: action.updatedUser.updatedUser,
      }
    case UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        updatingProfile: false,
        error: action.error,
      }
    case GET_REGIONS:
      return {
        ...state,
        fetchingRegions: true,
      }
    case GET_REGIONS_SUCCESS:
      return {
        ...state,
        fetchingRegions: false,
        regions: action.regions,
      }
    case GET_REGIONS_FAILURE:
      return {
        ...state,
        fetchingRegions: false,
        error: action.error,
      }
    default:
      return state;
  }
}

export default profileReducer;
