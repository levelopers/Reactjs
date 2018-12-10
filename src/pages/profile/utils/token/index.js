class Auth {
user_token=null

get token(){
    return this.user_token
}
get id(){
    return this.user_token.user_id
}
get key(){
    return this.user_token.key
}
get email(){
    return this.user_token.email
}

set token(token){
    this.user_token=token
}

}
export default new Auth()