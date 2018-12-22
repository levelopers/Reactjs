import { POST_TOKEN } from './types'
import { firstCall } from '../../modules/ServerCall'
import Auth from '../../modules/Auth'
export const postToken = (email, password) => dispatch => {
  dispatch({
    type: POST_TOKEN_BEGIN
  })
  return firstCall(
    email,
    password
  ).then(res => {
    dispatch({
      type: POST_TOKEN_SUCCESS,
      payload: res
    })
    return res
  }).catch(error => {
    dispatch({
      type: POST_TOKEN_FAILURE,
      payload: { error }
    })
    throw error
  })
}
export const POST_TOKEN_BEGIN = 'POST_TOKEN_BEGIN'
export const POST_TOKEN_SUCCESS = 'POST_TOKEN_SUCCESS'
export const POST_TOKEN_FAILURE = 'POST_TOKEN_FAILURE'

export const insertToken = () => dispatch => {
  if (!!Auth.getToken()) {
    dispatch({
      type: POST_TOKEN,
      payload: Auth.getToken()
    })
  }
}