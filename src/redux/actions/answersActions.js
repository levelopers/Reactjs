import { GET_ANSWERS, GET_ANSWER } from './types'
import axios from 'axios'
import { serverCall } from '../../modules/ServerCall'

const URL = 'https://bigfish100.herokuapp.com/questions'



export const getAnswers = () => (dispatch, getState) => {
  if (!getState().token.token && getState().questions.questions) return
  const token = getState().token.token
  const questions = getState().questions.questions
  questions.map(ques => {
    serverCall(token, 'serverGet')
      (
      `questions/${ques.id}/answers`,
      res => {
        dispatch({
          type: GET_ANSWERS,
          payload: res,
          status: res.status
        })
      },
      e => { console.log(e) }
      )
  })

}