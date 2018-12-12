import axios from 'axios'
class Auth {
  constructor() {
    this.token = null
    this.email = null
    this.id = null
    this.key = null
    this.isValid = null
  }
  set_token(token) {
    this.token = token
    this.email = token.user_email
    this.id = token.user_id
    this.key = token.key
  }
  validateToken() {
    const header = {
      "user_token": {
        "user_id": this.id,
        "key": this.key
      },
    }
    
    axios.post('https://bigfish100.herokuapp.com/',{
      headers: {
        "Authorization": JSON.stringify(header)
      }
    })
    .then(res=>{
      console.log(res);
      
    })
  }

}
export default new Auth()