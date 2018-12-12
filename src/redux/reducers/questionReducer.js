import { GET_QUESTIONS, POST_QUESTIONS } from '../actions/types'

const initialState = {
  questions: [],
  status: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      switch (action.status) {
        case 200:
          return {
            ...state,
            questions: action.payload.data.questions,
            status: action.status,
          }
        case 500:
          return {
            ...state,
            status: action.status
          }
        default: return { ...state, status: action.status }
      }
    default:
      return state
  }
}