import {GET_QUESTIONS, POST_QUESTIONS} from './types'
import axios from 'axios'

const URL = 'https://bigfish100.herokuapp.com/questions'

export const getQuestions =(id,key)=>(dispatch,getState)=>{
    const state = getState().token.token
    const header = {
        "user_token": {
          "user_id":id || state.id,
          "key": key || state.key
        }
      }
    axios.get(URL,{
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
}