import { GET_ANSWER, GET_ANSWERS } from '../actions/types'

const initialState = {
  answers: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ANSWER:
      return {
        ...state,
        answer: action.payload.data
      }
    case GET_ANSWERS:
      return {
        answers: [...state.answers, {
          question_id:action.question_id,
          answers:action.payload.data.answers,
        }]
      }
    default:
      return state
  }
}