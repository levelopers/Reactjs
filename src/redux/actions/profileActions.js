import { GET_PROFILE } from './types'
import axios from 'axios'

const URL = 'https://bigfish100.herokuapp.com'


export const getProfile = () => (dispatch, getState) => {
  const token = getState().token.token
  const header = {
    "user_token": {
      "user_id": token.id,
      "key": token.key
    }
  }
  console.log(token);
  
  axios.get(`${URL}/users/${token.id}`, {
    headers: {
      "Authorization": JSON.stringify(header)
    }
  })
    .then(res => {
      const user = res.data.user
      dispatch({
        type: GET_PROFILE,
        payload: user
      })
      console.log(`/users/:id => ${res}`);

    })
}