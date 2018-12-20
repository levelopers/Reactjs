import axios from 'axios'
import Auth from '../Auth'

const URL = 'https://bigfish100.herokuapp.com/'

export const serverCall = (config) => {
  if (Auth.get_token()) {
    const token = Auth.get_token()
    const header = {
      "user_token": {
        "user_id": token.user_id,
        "key": token.key
      }
    }
    config.headers = {
      "Authorization": JSON.stringify(header)
    }
  }
  config.baseURL = URL
  let cancel
  config.cancelToken = new axios.CancelToken(function (c) {
    cancel = c
  })
  return {
    request: axios(config),
    cancel: cancel,
  }
}

export const firstCall = (email, password) => {
  const body = {
    "credential": {
      "email": email,
      "password": password
    }
  }
  return serverCall(
    {
      method: 'POST',
      url: '/user_tokens',
      data: body
    }
  ).request
    .then(res => {
      Auth.set_token(res.data.user_token)
    })
}
