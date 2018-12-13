import { GET_PROFILE } from './types'
import { serverCall } from '../../modules/ServerCall'


export const getProfile = () => (dispatch, getState) => {
  const token = getState().token.token
  serverCall(token, 'serverGet')
    (
    `users/${token.user_id}`,
    res => {
      dispatch({
        type: GET_PROFILE,
        payload: res
      })
    },
    e=>{console.log(e)}
    )
}