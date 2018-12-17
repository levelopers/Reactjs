import { GET_PROFILE,GET_PROFILES } from './types'

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

export const getProfiles = (id_array) => (dispatch, getState) => {
  id_array.map(id=>{
    const url=`/users/${id}`
    return serverCall({
      method:'get',
      url:url
    }).request
    .then( res => {
      dispatch({
        type: GET_PROFILES,
        payload: res
      })
    })
    .catch(err=>{
      console.log(err);
    })
  })
    
}
