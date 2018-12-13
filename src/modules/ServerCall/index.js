import axios from 'axios'
import Auth from '../Auth'

const URL = 'https://bigfish100.herokuapp.com'

export const serverCall = (token,name) => {
  const header = {
    "user_token": {
      "user_id": token.user_id,
      "key": token.key
    }
  }
  switch(name){
    case 'serverGet':
    return (url, success, fail) => {
      axios.get(`${URL}/${url}`, {
        headers: {
          "Authorization": JSON.stringify(header)
        }
      }).then(res => success(res)).catch(e => fail(e))
    }
    case 'serverPost':
    return (url, success, fail) => {
      axios.post(`${URL}/${url}`, {
        headers: {
          "Authorization": JSON.stringify(header)
        }
      }).then(res => success(res)).catch(e => fail(e))
    }
    default:return null
  }
  


}

export const firstCall = (email, password,success,fail,loading) => {
  const body = {
    "credential": {
      "email": email,
      "password": password
    }
  }
  let isLoading=false
  loading(isLoading=true)
  axios.post(`${URL}/user_tokens`, body)
    .then(res => {
      console.log(`post user_token:`);
      console.log(res);
      isLoading=false
      success(res)
      Auth.set_token(res.data.user_token)
      localStorage.setItem('auth', JSON.stringify(Auth))
    })
    .catch(e=>{isLoading=false;fail(e)})
}