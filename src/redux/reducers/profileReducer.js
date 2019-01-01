import {
  FETCH_PROFILE_BEGIN,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILES_BEGIN,
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_FAILURE,
  FETCH_ALLPROFILES_DONE,
  POST_SIGNUP_BEGIN,
  POST_SIGNUP_SUCCESS,
  POST_SIGNUP_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL
} from '../actions/profileActions'
const initialState = {
  user: {},
  users: [],
  user_ids: [],
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
      if (new Set(state.user_ids).has(action.payload.data.user.id)) {
        return {
          ...state,
          profiles_loading: false,
        }
      }
      return {
        ...state,
        profiles_loading: false,
        users: [...state.users,
        action.payload.data.user,
        ],
        user_ids: [...state.user_ids, action.payload.data.user.id]
      };
    case FETCH_PROFILES_FAILURE:
      return {
        ...state,
        profiles_loading: false,
        error: action.payload.error,
      };
    case FETCH_ALLPROFILES_DONE:
      return {
        ...state,
        profiles_loading: false
      }
    case UPDATE_PROFILE_SUCCESS:
      //update redux store
      let updated_user
      let users = []
      if (state.users.length > 0) {
        users = state.users
        if (Object.keys(state.user).length > 0) {
          users = [...state.users, state.user]
        }
      }
      else if (Object.keys(state.user).length > 0) users = [state.user]
      for (let user in users) {
        if (users[user].id === action.payload.data.user.id) {
          updated_user = action.payload.data.user
          users[user] = updated_user
        }
      }
      return {
        ...state,
        users: users,
        user: updated_user
      }
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload.error
      }
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