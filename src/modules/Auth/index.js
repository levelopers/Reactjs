class Auth{
    constructor(){
        this.token=null
        this.email=null
        this.id=null
    }
     set_token(token){
        this.token=token
        this.email=token.user_email
        this.id=token.user_id
    }
}
export default new Auth()