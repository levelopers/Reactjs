import { GET_PROFILE } from './types'
import { serverCall } from '../../modules/ServerCall'


export const getProfile = (id) => (dispatch, getState) => {
  const token = getState().token.token

  let url=`/users/${token.user_id}`
  if(id){
    url=`/users/${id}`
  }
    return serverCall({
      method:'get',
      url:url
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