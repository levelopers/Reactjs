import {  GET_ANSWER } from './types'
import { serverCall } from '../../modules/ServerCall'

export const getAnswer = () => (dispatch, getState) => {
    if (!getState().token.token && getState().questions.questions) return
    const token = getState().token.token
    const questions = getState().questions.questions
    questions.map(ques => {
        return serverCall({
          method:'get',
          url:`questions/${ques.id}/answers/1`
        }).request
        .then( res => {
          dispatch({
            type: GET_ANSWER,
            payload: res,
            status: res.status
          })
        })
        .catch(err=>{
          console.log(err);
        })
    })
  
  }