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
    console.log(this.props.answers);
    //if refresh
    if (this.props.answers.length<1) {
      this.props.getAnswerWithQuestionId(this.state.question_id)
    }
     
      //from question page
      else{
      const local_answers = this.props.answers.filter(
        ans => {
          return ans.question_id === this.state.question_id
        }
      )
      this.setState({
        local_answers: local_answers[0].answers
      })
    }


  }
  componentDidUpdate() {
    //state null wait for redux updating props
    console.log(this.props.user);

    if (!this.state.local_answers && this.props.answers[0]) {
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
    

    if (Object.keys(this.props.user).length<1) {
      this.props.getProfile(this.props.token.user_id)
    }
  }



  render() {

    return (
      <div className={styles.page}>
        <div>
          <Header img={this.props.user && this.props.user.avatar_url} />
        </div>
        {this.state.local_answers && this.state.local_answers.map(ans =>
          this.props.users.map(user =>
            ans.user_id === user.id &&
            <div key={`${ans.id}-${user.id}`}>
              {user.name}
              {new Date(user.updated_at).toString().split(' ').slice(1, 4).join('-')}
              {ans.content}
            </div>
          )
        )}
      </div>

    )
  }
}

const mapStatetoProps = (state) => ({
  token: state.token.token,
  answers: state.answers.answers,
  user: state.profile.user,
  users: state.profile.users,
})

export default connect(mapStatetoProps, { getAnswerWithQuestionId, getProfile, getProfiles })(Answers)
