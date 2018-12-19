import React, { Component } from 'react'
import styles from './stylesheets/answers.module.sass'
import Header from '../../components/header'
import Question from './components/question'
import Answer from './components/answer'
import Form from './components/Form'
import btn from '../../assets/question_post_button.svg'
import { connect } from 'react-redux';
import { getAnswers, postAnswer, POST_ANSWER } from '../../redux/actions/answersActions'
import { getProfile, getProfiles } from '../../redux/actions/profileActions'
import { getQuestions } from '../../redux/actions/questionActions'
class Answers extends Component {
  constructor(props) {
    super(props)
    this.local_answers = []
    this.question_id = parseInt(this.props.match.params.ques_id)
    this.form_ref = null
  }
  PostAnswerClick = (e) => {
    this.form_ref.style.display = "block"
  }

  componentDidMount() {
    if (this.props.answers.length < 1 || this.props.questions.length < 1) {
      this.props.getAnswers(this.question_id)
      this.props.getQuestions()
    }
    else {
      const local_answers = this.props.answers.find(
        ans => {
          return ans.question_id === this.question_id
        }
      )
      if (!local_answers) return null
      const user_ids = []
      for (let ans of local_answers.answers) {
        user_ids.push(ans.user_id)
      }
      this.props.getProfiles(user_ids)
      this.local_answers = local_answers.answers
    }
  }
  componentDidUpdate() {
    if (this.local_answers.length < 1
      && this.props.users.length < 1
      && this.props.answers.length > 0) {
      const local_answers = this.props.answers[0]
      const user_ids = []
      if (typeof local_answers !== 'array') return null
      for (let ans of local_answers) {
        user_ids.push(ans.user_id)
      }
      this.props.getProfiles(user_ids)
      this.local_answers = local_answers
    }
    if (Object.keys(this.props.user).length < 1
      && !this.props.profile_loading) {
      this.props.getProfile(this.props.token.user_id)
    }
  }

  render() {
    return (
      <div className={styles.page}>
        <Header img={this.props.user && this.props.user.avatar_url} />
        <div className={styles.outbox}>
          <div>
            {this.props.questions &&
              <Question questions={this.props.questions} question_id={this.question_id} />}
            <div ref={ref => this.form_ref = ref} className={styles.post_outbox}>
              <Form question_id={this.question_id} answers_props={this.props} />
            </div>
            {this.local_answers
              && !this.props.answers_loading
              && !this.props.profiles_loading
              && this.props.users.length > 1
              &&
              <Answer
                answers={this.local_answers}
                users={this.props.users} />
            }
          </div>
        </div>
        <div className={styles.button}>
          <button className={styles.btn} onClick={e => this.PostAnswerClick(e)}>
            <img src={btn} alt="" />
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
  answers: state.answers.answers,
  answers_loading: state.answers.answers_loading,
  user: state.profile.user,
  users: state.profile.users,
  profile_loading: state.profile.profile_loading,
  profiles_loading: state.profile.profiles_loading,
  questions: state.questions.questions
})

export default connect(mapStateToProps, { getAnswers, postAnswer, getProfile, getProfiles, getQuestions })(Answers)
