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
    this.headerRef = null
    this.bottomRef = null
  }
  postAnswerClick = (e) => {
    let formStyle = 'block'
    if (this.state.form_style && this.state.form_style === 'block') {
      formStyle = 'none'
    }
    this.setState({
      form_style: formStyle
    })
    this.headerRef.scrollIntoView({ behavior: 'smooth' })
  }
  hideForm = () => {
    this.setState({
      form_style: 'none'
    })
  }
  setBottomRef = (ref) => {
    this.bottomRef = ref
  }

  componentDidMount() {
    //when refresh /answers send requests
    if (this.props.all_answers.length < 1 && this.props.answers.length < 1) {
      this.props.getAnswer(this.question_id)
    }
    if (this.props.questions.length < 1) {
      this.props.getQuestions()
    }
    //when redirect from other pages
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
      if (diff.length > 0) {
        diff.map(dif =>
          this.props.getProfiles(dif)
        )
      }
      this.setState({
        answers: local_answers
      })
    }
  }
  componentDidUpdate() {
    //when get responses from getAnswer()
    if (this.state.answers.length < 1
      && !this.props.profiles_loading
      && (this.props.answers.length > 0
        || this.props.all_answers.length > 0)) {
      const local_answers = this.props.answers
      const user_ids = new Set()
      //return null if no answers 
      if (!local_answers.length) return null
      for (let ans of local_answers) {
        if (!user_ids.has(ans.user_id)) this.props.getProfiles(ans.user_id)
        user_ids.add(ans.user_id)
      }
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
        <div ref={ref => this.headerRef = ref}>
          <Header img={this.props.user && this.props.user.avatar_url} />
        </div>
        <div className={styles.outbox}>
          <div>
            {this.props.questions &&
              <Question questions={this.props.questions} question_id={this.question_id} />}
            <div style={{ display: this.state.form_style }} className={styles.post_outbox}>
              <Form
                question_id={this.question_id}
                answers_this={this}
                hideForm={this.hideForm}
                bottomRef={this.bottomRef} />
            </div>
            {this.state.answers.length > 0
              && !this.props.answers_loading
              && !this.props.profiles_loading
              && this.props.users.length > 0
              &&
              <Answer
                answers={this.state.answers}
                users={this.props.users.concat(this.props.user)}
                question_id={this.question_id}
                setBottomRef={this.setBottomRef} />
            }
          </div>
        </div>
        <div className={styles.button}>
          <button className={styles.btn} onClick={this.postAnswerClick}>
            <img src={btn} alt="button" />
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

const mapDispatchToProps = {
  getAnswer,
  postAnswer,
  getProfile,
  getProfiles,
  getQuestions
}

export default connect(mapStateToProps, mapDispatchToProps)(Answers)
