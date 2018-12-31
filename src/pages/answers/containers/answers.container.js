import React, { Component } from 'react'
import { connect } from 'react-redux'
import Answers from '../answers'
import { getAnswer, postAnswer } from '../../../redux/actions/answersActions'
import { getProfile, getProfiles, getAllProfiles } from '../../../redux/actions/profileActions'
import { getQuestions } from '../../../redux/actions/questionActions'

class AnswersContainer extends Component {
  constructor(props) {
    super(props)
    this.question_id = parseInt(this.props.match.params.ques_id)
  }
  componentDidMount() {
    //when redux dont have answers, request answers
    if (this.props.all_answers.length < 1) {
      this.props.getAnswer(this.question_id)
    } else {
      //when redux have answers, process answers
      const local_answers = this.findAnswers()
      if (!local_answers || local_answers.length < 1) return null
      this.requestUsersProfiles(local_answers)
    }
    if (this.props.questions.length < 1) {
      this.props.getQuestions()
    }
  }
  componentDidUpdate() {
    //when get responses from getAnswer()
    if (!this.props.profiles_loading
      && this.props.all_answers.length > 0) {
      const local_answers = this.findAnswers()
      if (local_answers.length < 1) return null
      this.requestUsersProfiles(local_answers)
    }
    if (Object.keys(this.props.user).length < 1
      && !this.props.profile_loading) {
      this.props.getProfile(this.props.token.user_id)
    }
  }
  findAnswers = () => {
    let local_answers
    local_answers = this.props.all_answers.find(
      ans => {
        return ans.question_id === this.question_id
      }
    )
    if (!local_answers) return null
    local_answers = local_answers.all_answers
    return local_answers
  }
  requestUsersProfiles = (local_answers) => {
    let user_ids = new Set()
    for (let ans of local_answers) {
      user_ids.add(ans.user_id)
    }
    user_ids = Array.from(user_ids)
    let reduxUsersSet = new Set(this.props.users.map(user => user.id))
    let diff = user_ids.filter(id => {
      return !reduxUsersSet.has(id)
    })
    if (diff.length > 0) {
      diff.map(dif =>
        this.props.getProfiles(dif)
      )
    }
  }
  render() {
    return (
      <div>
        <Answers
          {...this.props}
          answers={this.findAnswers() || []}
          question_id={this.question_id}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
  all_answers: state.answers.all_answers,
  user: state.profile.user,
  users: state.profile.users,
  profile_loading: state.profile.profile_loading,
  profiles_loading: state.profile.profiles_loading,
  questions: state.questions.questions,
})

const mapDispatchToProps = {
  getAnswer,
  postAnswer,
  getProfile,
  getProfiles,
  getAllProfiles,
  getQuestions
}
export default connect(mapStateToProps, mapDispatchToProps)(AnswersContainer)