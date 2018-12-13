import { serverCall } from '../../modules/ServerCall'
import {getAnswers} from './answersActions'


export const getQuestions = () => (dispatch, getState) => {
  if (!getState().token.token) return
  const token = getState().token.token
  //begin
  dispatch(fetchQuestionBegin())
  serverCall(token, 'serverGet')
    ('questions',
    res => {
      //success
      dispatch(fetchQuestionSuccess(res))
      dispatch(getAnswers())
    },
    //error
    e => { console.log(e);dispatch(fetchQuestionFail(e)) }
    )
}
 const fetchQuestionBegin = () => ({
  type: FETCH_QUESTIONS_BEGIN
});

 const fetchQuestionSuccess = res => ({
  type: FETCH_QUESTIONS_SUCCESS,
  payload: res
});

 const fetchQuestionFail = error => ({
  type: FETCH_QUESTIONS_FAILURE,
  payload:  {error}
});

export const FETCH_QUESTIONS_BEGIN   = 'FETCH_QUESTIONS_BEGIN';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';
