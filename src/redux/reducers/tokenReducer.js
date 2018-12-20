import {POST_TOKEN} from '../actions/types'
import Auth from '../../modules/Auth'

const initialState = {
    token:Auth.get_token()
}

export default function(state=initialState, action){
    switch(action.type){
        case POST_TOKEN:
        return {
            ...state,
            token:action.payload
        }
        default: 
        return state
    }
}