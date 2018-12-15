import axios from 'axios'
import Auth from '../Auth'
// import { Navigation } from './history'

const URL = 'https://bigfish100.herokuapp.com'

export const serverCall = (token, name) => {
  //
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
          .catch(e => {
            // if(e 满足 某个调价){
            //   navigation.push('./asdas')
            // }
            fail(e)
          
          })
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