import {GET_ANSWERS} from './types'
import axios from 'axios'

const URL = 'https://bigfish100.herokuapp.com/questions'

export const getQuestions =(id,key)=>(dispatch,getState)=>{
    let header
    const token = getState().token.token
    const questions = getState().questions.questions

     header = {
        "user_token": {
          "user_id":token.id,
          "key": token.key 
        }
      }
      questions.map(ques=>{
        axios.get(`${URL}/${ques.id}/answers`,{
            headers:{
                'Authorization':JSON.stringify(header)
            }
        })
        .then(res=>{
            console.log('getQuestions res :');
            console.log(res);
            dispatch({
                type:GET_QUESTIONS,
                payload:res,
                status:res.status
            })
            
        })
        .catch(e=>{
            console.log('getQuestions error code :');
            console.log(e.response.status);
            dispatch({
                type:GET_QUESTIONS,
                payload:e,
                status:e.response.status
            })
        })
      })
    
}