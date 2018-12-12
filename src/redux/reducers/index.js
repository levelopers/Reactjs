import {combineReducers} from 'redux'
import token from './tokenReducer'
import profile from './profileReducer'

export default combineReducers({
    token,
    profile
})