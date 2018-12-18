import React, { Component } from 'react'
import styles from './stylesheets/answers.module.sass'
import Header from '../../components/header'
import { connect } from 'react-redux';
import { getAnswers } from '../../redux/actions/answersActions'
import { getProfile, getProfiles } from '../../redux/actions/profileActions'
class Answers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      local_answers: [],
      question_id: parseInt(this.props.match.params.ques_id)
    }
  }
  componentDidMount() {
    //if refresh
    if (this.props.answers.length < 1) {
      this.props.getAnswers(this.state.question_id)
    }
    //from question page
    else {
      const local_answers = this.props.answers.find(
        ans => {
          return ans.question_id === this.state.question_id
        }
      )
      const user_ids = []
      for (let ans of local_answers.answers) {
        user_ids.push(ans.user_id)
      }
      //send request
      this.props.getProfiles(user_ids)
      this.setState({
        local_answers: local_answers.answers
      })
    }


  }
  componentDidUpdate() {
    //state null wait for redux updating props
    if (this.state.local_answers.length < 1
      && this.props.answers.length > 0) {
      //request user name & avatar_url
      const local_answers = this.props.answers[0]
      const user_ids = []
      for (let ans of local_answers) {
        user_ids.push(ans.user_id)
      }
      //send request
      this.props.getProfiles(user_ids)
      //request get ansers once
      this.setState({
        local_answers: local_answers
      })
    }
    if (Object.keys(this.props.user).length < 1
      && !this.props.profile_loading) {
      this.props.getProfile(this.props.token.user_id)
    }
  }



  render() {
    console.log(this.state.local_answers);

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
  answers_loading: state.answers.answers_loading,
  user: state.profile.user,
  users: state.profile.users,
  profile_loading: state.profile.profile_loading,
  profiles_loading: state.profile.profiles_loading
})

export default connect(mapStatetoProps, { getAnswers, getProfile, getProfiles })(Answers)
