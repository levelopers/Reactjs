import { serverCall } from '../../modules/ServerCall'

export const getAnswers = (ques_id) => (dispatch, getState) => {
  if (ques_id) {
    if (!getState().token.token) return
    dispatch({
      type: FETCH_ANSWER_BEGIN
    })
    return serverCall({
      method: 'get',
      url: `/questions/${ques_id}/answers`,
    }).request
      .then(res => {
        dispatch({
          type: FETCH_ANSWER_SUCCESS,
          payload: res
        })
      })
      .catch(err => {
        dispatch({
          type: FETCH_ANSWER_FAILURE,
          payload: { err }
        })
      })
  }

  if (!getState().token.token || !getState().questions.questions) return
  const questions = getState().questions.questions
  dispatch({
    type: FETCH_ANSWERS_BEGIN
  })
  questions.map((ques, index) => {
    const call = serverCall({
      method: 'get',
      url: `/questions/${ques.id}/answers`,
    })
    return call.request
      .then(res => {
        dispatch({
          type: FETCH_ANSWERS_SUCCESS,
          payload: res,
          question_id: ques.id
        })
      })
      .catch(err => {
        dispatch({
          type: FETCH_ANSWERS_FAILURE,
          payload: err
        })
        call.cancel()
      })
  })
}

export const postAnswer = (content, id) => (dispatch, getState) => {
  if (!getState().token.token) return
  const body = {
    "answer": {
      "content": content
    }
  }
  return serverCall({
    method: 'post',
    url: `questions/${id}/answers`,
    data: body
  }).request
    .then(res => {
      dispatch({
        type: POST_ANSWER,
        payload: res
      })
      return res
    })
    .catch(err => {
      console.log(err);
    })
}

export const POST_ANSWER = 'POST_ANSWER'
export const FETCH_ANSWERS_BEGIN = 'FETCH_ANSWERS_BEGIN';
export const FETCH_ANSWERS_SUCCESS = 'FETCH_ANSWERS_SUCCESS';
export const FETCH_ANSWERS_FAILURE = 'FETCH_ANSWERS_FAILURE';

export const FETCH_ANSWER_BEGIN = 'FETCH_ANSWER_BEGIN';
export const FETCH_ANSWER_SUCCESS = 'FETCH_ANSWER_SUCCESS';
export const FETCH_ANSWER_FAILURE = 'FETCH_ANSWER_FAILURE';