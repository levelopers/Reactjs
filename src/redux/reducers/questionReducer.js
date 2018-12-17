
import {
  FETCH_QUESTIONS_BEGIN,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE
} from '../actions/questionActions';
import {POST_QUESTION} from '../actions/types'

const initialState = {
  questions: [],
  loading: false,
  error: null,
  postStatus:null
};

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_QUESTIONS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_QUESTIONS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        questions:action.payload.data.questions
      };

    case FETCH_QUESTIONS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        questions: []
      };
    case POST_QUESTION:
      return {
        ...state,
        postStatus:action.payload.data
      }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}