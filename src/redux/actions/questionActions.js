import { GET_QUESTIONS, POST_QUESTIONS } from './types'
import axios from 'axios'
import { serverCall } from '../../modules/ServerCall'

const URL = 'https://bigfish100.herokuapp.com/questions'

export const getQuestions = () => (dispatch, getState) => {
  if(!getState().token.token) return  
  const token = getState().token.token
  serverCall(token,'serverGet')
  ('questions',
    res => dispatch({
      type: GET_QUESTIONS,
      payload: res,
      status: res.status
    }),
    e=>{console.log(e)}
  )
}