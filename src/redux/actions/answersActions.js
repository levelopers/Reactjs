import { serverCall } from '../../modules/ServerCall'
import { getProfiles } from '../actions/profileActions'
export const getAnswers = () => (dispatch, getState) => {
  if (!getState().token.token || !getState().questions.questions) return
  const questions = getState().questions.questions
  dispatch({
    type: FETCH_ANSWERS_BEGIN
  })
  Promise.all(questions.map((ques, index) => {
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
        dispatch(getProfiles(res.data.answers[0].user_id))
        return res
      })
      .catch(err => {
        dispatch({
          type: FETCH_ANSWERS_FAILURE,
          payload: err
        })
        call.cancel()
        return err
      })
  })).then(res =>
    dispatch({
      type: FETCH_ANSWERS_DONE
    }))

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
      //redirect from /question
      if (getState().answers.all_answers.length > 0) {
        dispatch({
          type: UPDATE_REDUX_ANSWERS,
          payload: res,
          question_id: id
        })
        return res
      }else{
        dispatch({
          type: UPDATE_REDUX_ANSWER,
          payload: res,
          question_id: id
        })
      }
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
export const FETCH_ANSWERS_DONE = 'FETCH_ANSWERS_DONE';
export const UPDATE_REDUX_ANSWERS = 'UPDATE_REDUX_ANSWERS'
export const UPDATE_REDUX_ANSWER = 'UPDATE_REDUX_ANSWER'

export const FETCH_ANSWER_BEGIN = 'FETCH_ANSWER_BEGIN';
export const FETCH_ANSWER_SUCCESS = 'FETCH_ANSWER_SUCCESS';
export const FETCH_ANSWER_FAILURE = 'FETCH_ANSWER_FAILURE';