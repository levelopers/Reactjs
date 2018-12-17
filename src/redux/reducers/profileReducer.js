import {GET_PROFILE,GET_PROFILES} from '../actions/types'

const initialState = {
    user:{},
    users:[]
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_PROFILE:
        return {
            ...state,
            user:action.payload.data.user
        }
        case GET_PROFILES:
        return {
            users: [...state.users, 
              action.payload.data.user,
            ]
          }
        default: 
        return state
    }
}