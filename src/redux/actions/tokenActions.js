import { POST_TOKEN } from './types'
import { firstCall } from '../../modules/ServerCall'

export const postToken = (email, password) => dispatch => {
  firstCall(
    email,
    password,
   
  )
}

export const insertToken = () => dispatch => {
  if (localStorage.getItem('auth')) {
    dispatch({
      type: POST_TOKEN,
      payload: JSON.parse(localStorage.getItem('auth')).token
    })
  }
}