import React, { Component } from 'react'
import styles from './stylesheets/answers.module.sass'
import Header from '../../components/header'
import Question from './components/question'
import Answer from './components/answer'
import Form from './components/Form'
import btn from '../../assets/question_post_button.svg'
import { connect } from 'react-redux';
import { getAnswer, postAnswer } from '../../redux/actions/answersActions'
import { getProfile, getProfiles } from '../../redux/actions/profileActions'
import { getQuestions } from '../../redux/actions/questionActions'
class Answers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form_style: null,
      answers: []
    }
    this.question_id = parseInt(this.props.match.params.ques_id)
  }
  postAnswerClick = (e) => {
    this.setState({
      form_style: 'block'
    })
  }

  componentDidMount() {
    //when refresh /answers send requests
    if (this.props.all_answers.length < 1 && this.props.answers.length < 1) {
      this.props.getAnswer(this.question_id)
    } else if (this.props.questions.length < 1) {
      this.props.getQuestions()
    }
    //when redirect from question dont send request
    else {
      let local_answers
      let user_ids = []
      if (this.props.answers.length > 0 && this.props.answers[0].question_id === this.question_id) {
        local_answers = this.props.answers
      } else {
        local_answers = this.props.all_answers.find(
          ans => {
            return ans.question_id === this.question_id
          }
        )
        if (!local_answers) return null
        local_answers = local_answers.all_answers
      }
      for (let ans of local_answers) {
        user_ids.push(ans.user_id)
      }
      //search for user profiles which are not in store and send requests
      let mySet = new Set(this.props.users.map(user => user.id))
      let diff = user_ids.filter(id => {
        return !mySet.has(id)
      })
      if (diff.length > 0) this.props.getProfiles(diff)
      this.setState({
        answers: local_answers
      })
    }
  }
  componentDidUpdate() {
    //when get responses
    if (this.state.answers.length < 1
      && !this.props.profiles_loading
      && (this.props.answers.length > 0
        || this.props.all_answers.length > 0)) {
      const local_answers = this.props.answers
      const user_ids = []
      //return null if no answers 
      if (!local_answers.length) return null
      for (let ans of local_answers) {
        user_ids.push(ans.user_id)
      }
      if (this.props.users.length < 1) this.props.getProfiles(user_ids)
      this.setState({
        answers: local_answers
      })
    }
    if (Object.keys(this.props.user).length < 1
      && !this.props.profile_loading) {
      this.props.getProfile(this.props.token.user_id)
    }
    if (this.props.questions.length < 1
      && !this.props.questions_loading) {
      this.props.getQuestions()
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
            <div style={{ display: this.state.form_style }} className={styles.post_outbox}>
              <Form question_id={this.question_id} answers_props={this.props} />
            </div>
            {this.state.answers.length > 0
              && !this.props.answers_loading
              && !this.props.profiles_loading
              && this.props.users.length > 0
              &&
              <Answer
                answers={this.state.answers}
                users={this.props.users} />
            }
          </div>
        </div>
        <div className={styles.button}>
          <button className={styles.btn} onClick={this.postAnswerClick}>
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
  all_answers: state.answers.all_answers,
  answers_loading: state.answers.answers_loading,
  user: state.profile.user,
  users: state.profile.users,
  profile_loading: state.profile.profile_loading,
  profiles_loading: state.profile.profiles_loading,
  questions: state.questions.questions,
  questions_loading: state.questions.loading
})

export default connect(mapStateToProps, { getAnswer, postAnswer, getProfile, getProfiles, getQuestions })(Answers)
