import {GET_PROFILE} from '../actions/types'

const initialState = {
    user:{}
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_PROFILE:
        return {
            ...state,
            user:JSON.parse(action.payload.data).user
        }
        default: 
        return state
    }
}