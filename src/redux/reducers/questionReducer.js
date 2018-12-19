
import {
  FETCH_QUESTIONS_BEGIN,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE
} from '../actions/questionActions';
import { POST_QUESTION } from '../actions/types'

const initialState = {
  questions: [],
  loading: false,
  error: null,
  postStatus: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_QUESTIONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: action.payload.data.questions
      };
    case FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case POST_QUESTION:
      return {
        ...state,
        postStatus: action.payload.data
      }
    default:
      return state;
  }
}