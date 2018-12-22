import {
  FETCH_PROFILE_BEGIN,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILES_BEGIN,
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_FAILURE,
  POST_SIGNUP_BEGIN,
  POST_SIGNUP_SUCCESS,
  POST_SIGNUP_FAIL
} from '../actions/profileActions'
const initialState = {
  user: {},
  users: [],
  profile_loading: false,
  profiles_loading: false,
  signup_loading: false,
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE_BEGIN:
      return {
        ...state,
        profile_loading: true,
        error: null
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile_loading: false,
        user: action.payload.data.user
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        profile_loading: false,
        error: action.payload.error,
        user: {}
      };
    case FETCH_PROFILES_BEGIN:
      return {
        ...state,
        profiles_loading: true,
        error: null
      };
    case FETCH_PROFILES_SUCCESS:
      return {
        ...state,
        profiles_loading: false,
        users: [...state.users,
        action.payload.data.user,
        ]
      };
    case FETCH_PROFILES_FAILURE:
      return {
        ...state,
        profiles_loading: false,
        error: action.payload.error,
      };
    case POST_SIGNUP_BEGIN:
      return {
        ...state,
        signup_loading: true,
        error: null
      };
    case POST_SIGNUP_SUCCESS:
      return {
        ...state,
        signup_loading: false,
        user: action.payload.data.user
      };
    case POST_SIGNUP_FAIL:
      return {
        ...state,
        signup_loading: false,
        error: action.payload.error,
      };
    default:
      return state
  }
}