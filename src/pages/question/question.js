import React, { Component } from 'react'
import axios from 'axios'
import Header from '../../components/header'
import styles from './stylesheets/question.module.sass'
import { connect } from 'react-redux';
import { getQuestions } from '../../redux/actions/questionActions'

class Question extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   user_id: this.props.token.user_id||localStorage.getItem('id'),
    //   user_key: this.props.token.key||localStorage.getItem('key'),
    //   questions: [],
    //   answers: []
    // }
    // this.header = {
    //   "user_token": {
    //     "user_id": this.state.user_id,
    //     "key": this.state.user_key
    //   }
    // }
    // this.URL = 'https://bigfish100.herokuapp.com/questions'
  }
  componentDidMount() {
    this.props.getQuestions()
    // axios.get(this.URL, {
    //   headers: {
    //     "Authorization": JSON.stringify(this.header)
    //   }
    // })
    //   .then(res => {
    //     console.log(res);
    //     this.setState({
    //       questions: res.data.questions
    //     })
    //   })
  }
  componentDidUpdate(){
    // if(typeof this.props.status === 'number' && this.props.status!==200){
    //   console.log('questions header authentications failed, redirect to login page');
    //   this.props.history.push('/login')
    // }
    console.log(this.props.questions);

  //   const questions=this.state.questions
  //   questions.map(ques=>{
  //     axios.get(`${this.URL}/${ques.id}/answers`,{
  //       headers:{
  //         "Authorization":JSON.stringify(this.header)
  //       }
  //     })
  //       .then(res=>{
  //         console.log(res);
  //         this.setState((state)=>{
  //           state.answers.push(res.data.answers)
  //         })
  //       })
  //   })
  }
  componentWillReceiveProps(){
    console.log(this.props.questions);

  }
  render() {
    return (
      <div>
        <div>
          {/* <Header img={} /> */}
          <button onClick={e=>{localStorage.clear();this.props.history.push('/login')}}>logout</button>
        </div>
        <div className={styles.outbox}>
          {this.props.questions.map(ques =>
            <div key={ques.id} className={styles.title}>
              {ques.title}
            </div>
          )}
        </div>
      </div>

    )
  }
}

const mapStatetoProps = state =>({
  questions:state.questions.questions,
  status:state.questions.status
})
export default connect(mapStatetoProps,{ getQuestions })(Question)
