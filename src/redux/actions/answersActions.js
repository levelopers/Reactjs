import { serverCall } from '../../modules/ServerCall'

export const getAnswers = () => (dispatch, getState) => {
  if (!getState().token.token || !getState().questions.questions) return
  const questions = getState().questions.questions
  dispatch({
    type: FETCH_ANSWERS_BEGIN
  })
  let answers_responses = []
  let answers_errors = []
  // questions.map((ques, index) => {
  for (let ques of questions) {
    const call = serverCall({
      method: 'get',
      url: `/questions/${ques.id}/answers`,
    })
    call.request
      .then(res => {
        // dispatch({
        //   type: FETCH_ANSWERS_SUCCESS,
        //   payload: res,
        //   question_id: ques.id
        // })
        answers_responses.push({
          answers_response: res,
          question_id: ques.id
        })
      })
      .catch(error => {
        // dispatch({
        //   type: FETCH_ANSWERS_FAILURE,
        //   payload: err
        // })
        answers_errors.push({
          error:error,
          question_id: ques.id
        })
        call.cancel()
      })
  }
  console.log(answers_responses);
  dispatch({
    type: FETCH_ANSWERS_SUCCESS,
    payload: answers_responses,
  })
  dispatch({
    type: FETCH_ANSWERS_FAILURE,
    payload: answers_errors
  })
  // })
}

export const getAnswer = (ques_id) => (dispatch, getState) => {
  if (!!!ques_id) return null
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