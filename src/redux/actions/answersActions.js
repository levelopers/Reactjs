import { GET_ANSWERS, GET_ANSWER } from './types'
import { serverCall } from '../../modules/ServerCall'

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
          question_id: ques.id
        })
      },
      e => { console.log(e) }
      )
  })
}

// const fetchQuestionBegin = () => ({
//   type: FETCH_QUESTIONS_BEGIN
// });

//  const fetchQuestionSuccess = res => ({
//   type: FETCH_QUESTIONS_SUCCESS,
//   payload: res
// });

//  const fetchQuestionFail = error => ({
//   type: FETCH_QUESTIONS_FAILURE,
//   payload:  {error}
// });

// export const FETCH_QUESTIONS_BEGIN   = 'FETCH_QUESTIONS_BEGIN';
// export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
// export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';