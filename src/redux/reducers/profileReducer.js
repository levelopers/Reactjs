import { FETCH_PROFILE_BEGIN,
   FETCH_PROFILE_SUCCESS,
   FETCH_PROFILE_FAILURE,
   FETCH_PROFILES_BEGIN,
   FETCH_PROFILES_SUCCESS,
   FETCH_PROFILES_FAILURE,
 } from '../actions/profileActions'
const initialState = {
  user: {},
  users: [],
  profile_loading:false,
  profiles_loading:false
}

export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_PROFILE:
    //   return {
    //     ...state,
    //     user: action.payload.data.user
    //   }
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
    // case GET_PROFILES:
    //   return {
    //     ...state,
    //     users: [...state.users,
    //     action.payload.data.user,
    //     ]
    //   }
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
        users: []
      };
    default:
      return state
  }
}