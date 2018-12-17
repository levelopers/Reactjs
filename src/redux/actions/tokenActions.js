import { POST_TOKEN } from './types'
import { firstCall } from '../../modules/ServerCall'

export const postToken = (email, password) => dispatch => {
  return firstCall(
    email,
    password
  ).then(res=>{
    console.log(res);
    dispatch({
    type: POST_TOKEN,
    payload:res
  })
})
}

export const insertToken = () => dispatch => {
  // localStorage.clear()
  if (localStorage.getItem('auth')) {
    dispatch({
      type: POST_TOKEN,
      payload: JSON.parse(localStorage.getItem('auth')).token
    })
  }
}