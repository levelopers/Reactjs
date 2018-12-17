import {  GET_QUES_ANSWERS } from './types'
import { serverCall } from '../../modules/ServerCall'


 export const getAnswerWithQuestionId = (ques_id) =>(dispatch, getState)=> {
    if (!getState().token.token) return
      return serverCall({
        method:'get',
        url:`/questions/${ques_id}/answers`,
      }).request
      .then( res => {
        dispatch({
          type: GET_QUES_ANSWERS,
          payload: res,
        })
      })
      .catch(err=>{
          console.log(err);
      })
}