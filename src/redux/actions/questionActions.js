import {GET_QUESTIONS, POST_QUESTIONS} from './types'
import axios from 'axios'

const URL = 'https://bigfish100.herokuapp.com'

export const getQuestions =()=>{
    axios.get(`${URL}/questions`)
}