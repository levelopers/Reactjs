import { serverCall } from '../../modules/ServerCall'

export const getAnswers = (ques_id) => (dispatch, getState) => {
  if (ques_id) {
    if (!getState().token.token) return
    dispatch(fetchAnswerBegin())
    return serverCall({
      method: 'get',
      url: `/questions/${ques_id}/answers`,
    }).request
      .then(res => {
        dispatch(fetchAnswerSuccess(res))
      })
      .catch(err => {
        dispatch(fetchAnswerFail(err))
      })
  }

  if (!getState().token.token || !getState().questions.questions) return
  const questions = getState().questions.questions
  dispatch(fetchAnswersBegin())
  questions.map((ques, index) => {
    if (index > 10) return
    return serverCall({
      method: 'get',
      url: `/questions/${ques.id}/answers`,
    }).request
      .then(res => {
        dispatch(fetchAnswersSuccess(res,ques.id))
      })
      .catch(err => {
        dispatch(fetchAnswersFail(err))
      })
  })
}


const fetchAnswersBegin = () => ({
  type: FETCH_ANSWERS_BEGIN
});

const fetchAnswersSuccess = (res,ques_id) => ({
  type: FETCH_ANSWERS_SUCCESS,
  payload: res,
  question_id:ques_id
});

const fetchAnswersFail = error => ({
  type: FETCH_ANSWERS_FAILURE,
  payload: error
});

export const FETCH_ANSWERS_BEGIN = 'FETCH_ANSWERS_BEGIN';
export const FETCH_ANSWERS_SUCCESS = 'FETCH_ANSWERS_SUCCESS';
export const FETCH_ANSWERS_FAILURE = 'FETCH_ANSWERS_FAILURE';

const fetchAnswerBegin = () => ({
  type: FETCH_ANSWER_BEGIN
});

const fetchAnswerSuccess = res => ({
  type: FETCH_ANSWER_SUCCESS,
  payload: res
});

const fetchAnswerFail = error => ({
  type: FETCH_ANSWER_FAILURE,
  payload: { error }
});

export const FETCH_ANSWER_BEGIN = 'FETCH_ANSWER_BEGIN';
export const FETCH_ANSWER_SUCCESS = 'FETCH_ANSWER_SUCCESS';
export const FETCH_ANSWER_FAILURE = 'FETCH_ANSWER_FAILURE';