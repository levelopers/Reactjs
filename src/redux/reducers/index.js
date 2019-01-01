import {combineReducers} from 'redux'
import token from './tokenReducer'
import profile from './profileReducer'
import questions from './questionReducer'
import answers from './answerReducer'

export default combineReducers({
    token,
    profile,
    questions,
    answers,
})