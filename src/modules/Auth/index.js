class Auth {
  constructor() {
    this.token = null
    this.id = null
    this.key = null
    this.isValid = null
  }
  set_token(token) {
    this.token = token
    this.id = token.user_id
    this.key = token.key
  }
}
export default new Auth()