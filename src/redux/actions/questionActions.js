import { serverCall } from '../../modules/ServerCall'
import { getAnswers } from './answersActions'
import { POST_QUESTION } from './types'

export const getQuestions = () => (dispatch, getState) => {
  if (!getState().token.token) return
  //begin
  dispatch(fetchQuestionBegin())
  serverCall({
    method: 'GET',
    url: `/questions`
  }).request
    .then(res => {
      //success
      dispatch(fetchQuestionSuccess(res))
      //send get answers request
      dispatch(getAnswers())
    })
    .catch(err => {
      dispatch(fetchQuestionFail(err))
    })
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
  payload: { error }
});

export const postQuestion = (title, content) => (dispatch, getState) => {
  if (!getState().token.token) return
  const body = {
    "question": {
      "title": title,
      content: content
    }
  }
  return serverCall({
    method: 'post',
    url: `/questions`,
    data: body
  }).request
    .then(res => {
      dispatch({
        type: POST_QUESTION,
        payload: res
      })
    })
    .catch(err => {
      console.log(err);
    })
}

export const FETCH_QUESTIONS_BEGIN = 'FETCH_QUESTIONS_BEGIN';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';
