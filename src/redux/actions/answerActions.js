import {  GET_ANSWER } from './types'
import { serverCall } from '../../modules/ServerCall'

export const getAnswer = () => (dispatch, getState) => {
    if (!getState().token.token && getState().questions.questions) return
    const token = getState().token.token
    const questions = getState().questions.questions
  
    //  header = {
    //     "user_token": {
    //       "user_id":token.id,
    //       "key": token.key 
    //     }
    //   }
    //   questions.map(ques=>{
    //     axios.get(`${URL}/${ques.id}/answers`,{
    //         headers:{
    //             'Authorization':JSON.stringify(header)
    //         }
    //     })
    //     .then(res=>{
    //         console.log('getQuestions res :');
    //         console.log(res);
    //         dispatch({
    //             type:GET_QUESTIONS,
    //             payload:res,
    //             status:res.status
    //         })
  
    //     })
    //     .catch(e=>{
    //         console.log('getQuestions error code :');
    //         console.log(e.response.status);
    //         dispatch({
    //             type:GET_QUESTIONS,
    //             payload:e,
    //             status:e.response.status
    //         })
    //     })
    //   })
    questions.map(ques => {
      serverCall(token, 'serverGet')
        (
        `questions/${ques.id}/answers/1`,
        res => {
          dispatch({
            type: GET_ANSWER,
            payload: res,
            status: res.status
          })
        },
        e => { console.log(e) }
        )
    })
  
  }