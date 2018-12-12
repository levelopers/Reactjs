import axios from 'axios'
import Auth from '../Auth'

const URL = 'https://bigfish100.herokuapp.com'

export const serverCall = (token) => {
  const header = {
    "user_token": {
      "user_id": token.id,
      "key": token.key
    }
  }

  const serverGet = (url, success, fail) => {
    axios.get(`${URL}/${url}`, {
      headers: {
        "Authorization": JSON.stringify(header)
      }
    }).then(res => success(res)).catch(e => fail(e))
  }

  const serverPost = (url, success, fail) => {
    axios.post(`${URL}/${url}`, {
      headers: {
        "Authorization": JSON.stringify(header)
      }
    }).then(res => success(res)).catch(e => fail(e))
  }

}

export const firstCall = (email, password,success,fail,loading) => {
  const body = {
    "credential": {
      "email": email,
      "password": password
    }
  }
  let isLoading=true
  loading(isLoading)
  axios.post(`${URL}/user_tokens`, body)
    .then(res => {
      console.log(`post user_token:`);
      console.log(res);
      isLoading=false
      success(res)
      Auth.set_token(res.data.user_token)
      localStorage.setItem('auth', JSON.stringify(Auth))
      localStorage.setItem('user_key', Auth.key)
    })
    .catch(e=>{isLoading=false;fail(e)})
}