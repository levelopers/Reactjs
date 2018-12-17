import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAnswerWithQuestionId } from '../../redux/actions/ques_answerAction'
import {getProfile} from '../../redux/actions/profileActions'
class Answers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      local_answers: null,
      users:[],
      question_id: parseInt(this.props.match.params.ques_id)
    }
  }
  componentDidMount() {
    if (!!this.props.answers) {
      return this.props.getAnswerWithQuestionId(this.state.question_id)
    }
    const local_answers = this.props.answers.filter(
      ans => {
        return ans.question_id === this.state.question_id
      }
    )
    this.setState({
      local_answers: local_answers[0].answers
    })
  }
  componentDidUpdate() {
    //state null wait for redux updating props
    if (!this.state.local_answers) {
      //request user name & avatar_url
      this.props.answers[0].map(ans=>{
        this.props.getProfile(ans.user_id)
      })
      //request get ansers once
      this.setState({
        local_answers: this.props.answers[0]
      })
    }
      // this.setState({
      //   ...this.state,
      //   users:[...this.state.users,this.props.user]
      // })
  }
  // shouldComponentUpdate(nextProps,nextState){
  //   return this.state.local_answers!==nextState.local_answers
  // }
  
  render() {
    console.log(this.state.local_answers);
    
    return (
      <div>
        {this.state.local_answers && this.state.local_answers.map(ans =>
          <div key={ans.id}>
          =========================
          <br/>
            {ans.content}
            <br/>
            =======================
          </div>
        )}
      </div>
    )
  }
}

const mapStatetoProps = (state) => ({
  answers: state.answers.answers,
  user:state.profile.user
})

export default connect(mapStatetoProps, { getAnswerWithQuestionId,getProfile })(Answers)
