import { GET_ANSWERS, GET_QUES_ANSWERS } from './types'
import { serverCall } from '../../modules/ServerCall'

export const getAnswers = () => (dispatch, getState) => {
  if (!getState().token.token || !getState().questions.questions) return
  const questions = getState().questions.questions
  questions.map((ques, index) => {
    if (index > 10) return
    return serverCall({
      method: 'get',
      url: `/questions/${ques.id}/answers`,
    }).request
      .then(res => {
        dispatch({
          type: GET_ANSWERS,
          payload: res,
          question_id: ques.id
        })
      })
      .catch(err => {
        console.log(err)
      })
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