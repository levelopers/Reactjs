import {
  FETCH_ANSWERS_BEGIN,
  FETCH_ANSWERS_SUCCESS,
  FETCH_ANSWERS_FAILURE,
  FETCH_ANSWERS_DONE,
  FETCH_ANSWER_BEGIN,
  FETCH_ANSWER_SUCCESS,
  FETCH_ANSWER_FAILURE,
  POST_ANSWER,
  UPDATE_REDUX_ANSWERS
} from '../actions/answersActions'

const initialState = {
  // answers: [],
  all_answers: [],
  answers_loading: false,
  answer_loading: false,
  postAnswer: null
}

export default function (state = initialState, action) {
  switch (action.type) {
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
        all_answers:
          [...state.all_answers,{
            question_id:action.question_id,
            all_answers:action.payload.data.answers
          }]
      };
    case FETCH_ANSWER_FAILURE:
      return {
        ...state,
        answers_loading: false,
        error: action.payload.error,
      };
    case FETCH_ANSWERS_BEGIN:
      return {
        ...state,
        answers_loading: true,
        error: null
      };
    case FETCH_ANSWERS_SUCCESS:
      return {
        ...state,
        all_answers: [...state.all_answers, {
          question_id: action.question_id,
          all_answers: action.payload.data.answers,
        }]
      };
    case FETCH_ANSWERS_FAILURE:
      return {
        //404 remain answers state
        ...state,
        error: action.payload,
      };
    case FETCH_ANSWERS_DONE:
      return {
        ...state,
        answers_loading: false
      }
    case POST_ANSWER:
      return {
        ...state,
        postAnswer: action.payload
      }
    case UPDATE_REDUX_ANSWERS:
      //copy state to variable
      let allAnswers = [...state.all_answers]
      let addingAnswers
      for (let i = allAnswers.length - 1; i >= 0; i--) {
        if (allAnswers[i].question_id === action.question_id) {
          addingAnswers = action.payload.data.answer
          allAnswers[i].all_answers.push(addingAnswers)
          break;
        }
      }
      //new post question
      if (!addingAnswers) {
        allAnswers = [...allAnswers,
        {
          question_id: action.question_id,
          all_answers: [action.payload.data.answer]
        }]
      }
      return {
        ...state,
        all_answers: allAnswers
      }
    default:
      return state
  }
}