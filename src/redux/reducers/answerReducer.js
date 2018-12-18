import {
  FETCH_ANSWERS_BEGIN,
  FETCH_ANSWERS_SUCCESS,
  FETCH_ANSWERS_FAILURE,
  FETCH_ANSWER_BEGIN,
  FETCH_ANSWER_SUCCESS,
  FETCH_ANSWER_FAILURE,
} from '../actions/answersActions'

const initialState = {
  answers: [],
  answers_loading: false,
  answer_loading:false
}

export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_QUES_ANSWERS:
    //   return {
    //     ...state,
    //     answers: [
    //       action.payload.data.answers
    //     ]
    //   }
      case FETCH_ANSWER_BEGIN:
      return {
        ...state,
        answer_loading: true,
        error: null
      };
    case FETCH_ANSWER_SUCCESS:
      return {
        ...state,
        answer_loading: false,
        answers: [
          action.payload.data.answers
        ]
      };
    case FETCH_ANSWER_FAILURE:
      return {
        ...state,
        answers_loading: false,
        error: action.payload.error,
        answers: []
      };
    // case GET_ANSWERS:
    //   return {
    //     answers: [...state.answers, {
    //       question_id: action.question_id,
    //       answers: action.payload.data.answers,
    //     }]
    //   }
    case FETCH_ANSWERS_BEGIN:
      return {
        ...state,
        answers_loading: true,
        error: null
      };
    case FETCH_ANSWERS_SUCCESS:
      return {
        ...state,
        answers_loading: false,
        answers: [...state.answers, {
          question_id: action.question_id,
          answers: action.payload.data.answers,
        }]
      };
    case FETCH_ANSWERS_FAILURE:
      return {
        //404 remain answers state
        ...state,
        answers_loading: false,
        error: action.payload,
      };
    default:
      return state
  }
}