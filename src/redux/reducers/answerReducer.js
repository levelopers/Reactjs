import {GET_ANSWER, GET_ANSWERS} from '../actions/types'

const initialState = {
    answers:[],
    answer:{}
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_ANSWER:
        return {
            ...state,
            answer:action.payload.data
        }
        case GET_ANSWERS:
        return {
            ...state,
            answers:action.payload.data
        }
        default: 
        return state
    }
}