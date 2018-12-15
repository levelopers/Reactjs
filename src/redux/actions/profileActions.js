import { GET_PROFILE } from './types'
import { serverCall } from '../../modules/ServerCall'


export const getProfile = () => (dispatch, getState) => {
  const token = getState().token.token
    return serverCall({
      method:'get',
      url:`/users/${token.user_id}`
    }).request
    .then( res => {
      dispatch({
        type: GET_PROFILE,
        payload: res
      })
    })
    .catch(err=>{
      console.log(err);
    })
}