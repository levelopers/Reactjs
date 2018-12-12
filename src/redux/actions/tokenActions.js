import {POST_TOKEN} from './types'
import axios from 'axios'
import Auth from '../../modules/Auth'

const URL = 'https://bigfish100.herokuapp.com'

export const postToken= (email,password) =>dispatch=>{
    const body={
        "credential": {
          "email": email,
          "password": password
        }
      }
    axios.post(`${URL}/user_tokens`,body)
    .then(res=>{
        console.log(`post user_token:`);
        console.log(res);
        dispatch({
            type:POST_TOKEN,
            payload:res.data.user_token
        })
        Auth.set_token(res.data.user_token)
        localStorage.setItem('auth',JSON.stringify(Auth))
        localStorage.setItem('user_key',Auth.key)
    })
}