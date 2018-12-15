import axios from 'axios'
import Auth from '../Auth'
// import { Navigation } from './history'

const URL = 'https://bigfish100.herokuapp.com/'

export const serverCall = (config, history) => {
  // if(localStorage.getItem('auth')){
  const token = JSON.parse(localStorage.getItem('auth')).token
  const header = {
    "user_token": {
      "user_id": token.user_id,
      "key": token.key
    }
  }
  config.baseURL = URL
  config.headers = {
    "Authorization": JSON.stringify(header)
  }
// }
  config.transformResponse = [function (data) {
    if (data && data.code === 'invalid_user_token') {
      history.push('/login')
      data.is_pre_handled = true
    }
    return data;
  }]
  let cancel
  config.cancelToken = new axios.CancelToken(function (c) {
    cancel = c
  })

  return {
    request: axios(config),
    cancel: cancel
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
      method: 'post',
      url: 'user_tokens',
      data: body
    }
  ).request.then(res=>{
    console.log('token posted')
    Auth.set_token(res.data.user_token)
  }).catch(err=>{
    handleError(err)    
  })
}
 

  function handleError(response) {
    if (!response.statusText === 'OK') {
      throw Error(response.statusText);
    }
    return response;
  }


// // module history.js
// export let navigation = null;

// export default class History extends Component {
//   push = (path) => {
//     this.props.history.push(path)
//   }

//   render(){
//     return null
//   }
// }

// export default withRouter(History);


// // app.js
// import History, { navigation } from '/modles.history'
// render(){
//   return(
//     <div>
//       {/* blabka */}

//       <History ref={ref => navigation = ref}/>
//     </div>
//   )
// }