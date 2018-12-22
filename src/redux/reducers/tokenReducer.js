import Auth from '../../modules/Auth'
import {
  POST_TOKEN_BEGIN,
  POST_TOKEN_SUCCESS,
  POST_TOKEN_FAILURE
} from '../actions/tokenActions';

const initialState = {
  token: Auth.getToken(),
  token_loading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_TOKEN_BEGIN:
      return {
        ...state,
        token_loading: true,
        error: null
      }
    case POST_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload.data.user_token,
        token_loading: false
      }
    case POST_TOKEN_FAILURE:
      return {
        ...state,
        token_loading: false,
        error: action.payload
      }
    default:
      return state
  }
}