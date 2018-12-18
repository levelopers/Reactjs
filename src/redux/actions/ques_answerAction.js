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
const fetchAnswersBegin = () => ({
  type: FETCH_ANSWERS_BEGIN
});

 const fetchAnswersSuccess = res => ({
  type: FETCH_ANSWERS_SUCCESS,
  payload: res
});

 const fetchAnswersFail = error => ({
  type: FETCH_ANSWERS_FAILURE,
  payload:  {error}
});

export const FETCH_ANSWERS_BEGIN   = 'FETCH_ANSWERS_BEGIN';
export const FETCH_ANSWERS_SUCCESS = 'FETCH_ANSWERS_SUCCESS';
export const FETCH_ANSWERS_FAILURE = 'FETCH_ANSWERS_FAILURE';