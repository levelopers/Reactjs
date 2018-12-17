import { GET_QUES_ANSWERS, GET_ANSWERS } from '../actions/types'

const initialState = {
  answers: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUES_ANSWERS:
      return {
        ...state,
        answers:[
          action.payload.data.answers
        ]
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