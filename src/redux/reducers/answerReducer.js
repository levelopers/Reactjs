import {
  FETCH_ANSWERS_BEGIN,
  FETCH_ANSWERS_SUCCESS,
  FETCH_ANSWERS_FAILURE,
  FETCH_ANSWER_BEGIN,
  FETCH_ANSWER_SUCCESS,
  FETCH_ANSWER_FAILURE,
  POST_ANSWER
} from '../actions/answersActions'

const initialState = {
  answers: [],
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
        answers:
          action.payload.data.answers
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
      let all_answers=[]
      let user_ids=[]
      console.log(action.payload);
      
      // for (let res of action.payload) {
      //   console.log(res);
        
      //   all_answers.push({
      //     all_answers:res.answers_response.data.answers,
      //     question_id:res.question_id
      //   })
      //   for (let ans of ans.answers_response.data.answers) {
      //     console.log();
          
      //     user_ids.push({
      //       question_id:ans.question_id,
      //       user_id:ans.user_id,
      //       answer_id:ans.id
      //     })
      //   }
      // }
      action.payload.map(res=>
        // all_answers.push({
        //   all_answers:res.answers_response.data.answers,
        //   question_id:res.question_id
        // })
        console.log(res)
        
      )
      
      return {
        ...state,
        answers_loading: false,
        // all_answers: [...state.all_answers, {
        //   question_id: action.question_id,
        //   all_answers: action.payload.data.answers,
        // }]
        // all_answers:all_answers
      };
    case FETCH_ANSWERS_FAILURE:
      return {
        //404 remain answers state
        ...state,
        answers_loading: false,
        error: action.payload,
      };
    case POST_ANSWER:
      return {
        ...state,
        postAnswer: action.payload
      }
    default:
      return state
  }
}