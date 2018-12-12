import { CHECK_EXPIRED } from './types'
import axios from 'axios'

const URL = 'https://bigfish100.herokuapp.com'


export const checkExpired = () => (dispatch) => {

    const auth = JSON.parse(localStorage.getItem('auth'))
  const header = {
    "user_token": {
      "user_id": auth.id,
      "key": auth.key
    }
  }
  
  axios.get(`${URL}/users/${auth.id}`, {
    headers: {
      "Authorization": JSON.stringify(header)
    }
  })
    .then(res => {
      dispatch({
        type: CHECK_EXPIRED,
        payload: res.status
      })
    })
}