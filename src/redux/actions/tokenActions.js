import { POST_TOKEN } from './types'
import { firstCall } from '../../modules/ServerCall'
import Auth from '../../modules/Auth'
export const postToken = (email, password) => dispatch => {
  return firstCall(
    email,
    password
  ).then(res => {
    dispatch({
      type: POST_TOKEN,
      payload: res
    })
    return res
  })
}

export const insertToken = () => dispatch => {
  if (!!Auth.get_token()) {
    dispatch({
      type: POST_TOKEN,
      payload: Auth.get_token()
    })
  }
}