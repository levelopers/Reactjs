class Auth {
  constructor() {
    this.token = JSON.parse(localStorage.getItem('auth'))
  }
  getToken = () => this.token
  setToken(new_token) {
    this.token = new_token
    localStorage.setItem('auth', JSON.stringify(new_token))
  }
  loggout = () => {
    localStorage.removeItem('auth')
  }
}
export default new Auth()