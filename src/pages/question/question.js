import React, { Component } from 'react'
import axios from 'axios'
import Header from '../../components/header'
import styles from './stylesheets/question.module.sass'
import { connect } from 'react-redux';

class question extends Component {
  constructor(props) {
    super(props)
    console.log(this.props);
    
    this.state = {
      user_id: this.props.token.user_id||localStorage.getItem('id'),
      user_key: this.props.token.key||localStorage.getItem('key'),
      questions: [],
      answers: []
    }
    this.header = {
      "user_token": {
        "user_id": this.state.user_id,
        "key": this.state.user_key
      }
    }
    this.URL = 'https://bigfish100.herokuapp.com/questions'
  }
  componentDidMount() {
    axios.get(this.URL, {
      headers: {
        "Authorization": JSON.stringify(this.header)
      }
    })
      .then(res => {
        console.log(res);
        this.setState({
          questions: res.data.questions
        })
      })
  }
  // componentDidUpdate(){
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
  // }
  render() {
    console.log(this.state);

    return (
      <div>
        <div>
          {/* <Header img={} /> */}
        </div>
        <div className={styles.outbox}>
          {this.state.questions.map(ques =>
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
  token:state.token.token
})
export default connect(mapStatetoProps)(question)
