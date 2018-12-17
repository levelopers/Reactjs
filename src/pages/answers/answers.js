import React, { Component } from 'react'
import styles from './stylesheets/answers.module.sass'
import Header from '../../components/header'
import { connect } from 'react-redux';
import { getAnswerWithQuestionId } from '../../redux/actions/ques_answerAction'
import { getProfile, getProfiles } from '../../redux/actions/profileActions'
class Answers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      local_answers: null,
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
      const user_ids = []
      for (let ans of this.props.answers[0]) {
        user_ids.push(ans.user_id)
      }
      this.props.getProfiles(user_ids)

      //request get ansers once
      this.setState({
        local_answers: this.props.answers[0]
      })
    }
    
  }


  render() {
    console.log(this.props.users);

    return (
      <div className={styles.page}>
      
        {this.state.local_answers && this.state.local_answers.map(ans =>
          this.props.users.map(user =>
            ans.user_id === user.id &&
            <div key={`${ans.id}-${user.id}`}>
              {user.name}
              {new Date(user.updated_at).toString().split(' ').slice(1,4).join('-')}
              {ans.content}
            </div>
          )
        )}
      </div>

    )
  }
}

const mapStatetoProps = (state) => ({

  answers: state.answers.answers,
  
  user: state.profile.user,
  users: state.profile.users,
  token:state.token.token,

})

export default connect(mapStatetoProps, { getAnswerWithQuestionId, getProfile, getProfiles })(Answers)
