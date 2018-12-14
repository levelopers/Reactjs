import axios from 'axios'
import Auth from '../Auth'

const URL = 'https://bigfish100.herokuapp.com'

export const serverCall = (token, name) => {
  const header = {
    "user_token": {
      "user_id": token.user_id,
      "key": token.key
    }
  }
  switch (name) {
    case 'serverGet':
      return (url, success, fail) => {
        axios.get(`${URL}/${url}`, {
          headers: {
            "Authorization": JSON.stringify(header)
          }
        })
          .then(handleError)
          .then(res => success(res))
          .catch(e => fail(e))
      }
    case 'serverPost':
      return (url, body, success, fail) => {
        axios.post(`${URL}/${url}`,
        body,
         {
          headers: {
            "Authorization": JSON.stringify(header)
          }
        })
          .then(handleError)
          .then(res => success(res))
          .catch(e => fail(e))
      }
    default: return null
  }



}

export const firstCall = (email, password, success, fail) => {
  const body = {
    "credential": {
      "email": email,
      "password": password
    }
  }
  axios.post(`${URL}/user_tokens`, body)
    .then(handleError)
    .then(res => {
      console.log(`post user_token:`);
      console.log(res);
      success(res)
      Auth.set_token(res.data.user_token)
      localStorage.setItem('auth', JSON.stringify(Auth))
    })
    .catch(e => { fail(e) })
}

function handleError(response) {
  if (!response.statusText==='OK') {
    throw Error(response.statusText);
  }
  return response;
}