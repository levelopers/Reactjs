import React, { Component } from 'react'
import Header from '../../components/header'
import Form from './components/Form'
import Conversation from './components/Conversation'
import styles from './stylesheets/question.module.sass'
import post_button from '../../assets/question_post_button.svg'
import loading_animation from '../../assets/loading_animation.svg'
import { connect } from 'react-redux';
import { getQuestions } from '../../redux/actions/questionActions'
import { getAnswers } from '../../redux/actions/answersActions'
import { getProfile, getProfiles } from '../../redux/actions/profileActions'
import { postQuestion } from '../../redux/actions/questionActions'
class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: {
        value: ''
      },
      content: {
        value: ''
      },
      modalDisplay: 'none'
    }
    this.bottomRef = null
  }
  componentDidMount() {
    if (this.props.questions.length < 1) {
      this.props.getQuestions().then(res => {
        this.props.getAnswers()
      })
    } else if (this.props.all_answers.length < 2) this.props.getAnswers()
    if (!!!Object.keys(this.props.user).length) this.props.getProfile()
  }
  showPostClick = () => {
    this.setState({
      modalDisplay: 'flex'
    })
  }
  fillFormClick = (e) => {
    e.stopPropagation()
  }
  submitPostClick = (e) => {
    this.cancelModal()
    this.props.postQuestion(this.state.title.value, this.state.content.value)
      .then(res => {
        //auto scroll to bottom
        if (this.bottomRef) this.bottomRef.scrollIntoView({ behavior: 'smooth' })
      })
  }
  handleParagraphClick = (e, ques_id) => {
    this.props.history.push(`/answers/${ques_id}`)
  }
  cancelModal = () => {
    this.setState({
      modalDisplay: 'none',
      title: {
        value: ''
      },
      content: {
        value: ''
      }
    })
  }
  handleContentChange = (e) => {
    this.setState({
      content: {
        value: e.target.value
      }
    })
  }
  handleTitleChange = (e) => {
    this.setState({
      title: {
        value: e.target.value
      }
    })
  }
  render() {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <Header img={this.props.user.avatar_url} />
        </div>
        <div className={styles.btn}>
          <button onClick={this.showPostClick}>
            <img src={post_button} alt="" />
          </button>
        </div>
        {
          this.props.questions.length < 1 &&
          <div className={styles.loading}>
            <img src={loading_animation} alt="loading animation" />
          </div>
        }
        {
          !!this.props.questions
          && this.props.questions.length > 0
          &&
          <div className={styles.outbox}>
            {
              this.props.questions.map(ques =>
                <div
                  key={ques.id}
                  id={ques.id}
                  className={styles.paragraph}
                  ref={ref => this.bottomRef = ref}
                  onClick={e => this.handleParagraphClick(e, ques.id)}
                >
                  <div className={styles.title}>
                    {ques.title}
                  </div>
                  <Conversation
                    question={ques}
                    answers={this.props.all_answers}
                    users={this.props.users}
                  />
                </div>
              )
            }
          </div>
        }
        <div className={styles.popup_box}
          onClick={this.cancelModal}
          style={{ display: this.state.modalDisplay }}>
          <div className={styles.popup_content} onClick={this.fillFormClick}>
            <div className={styles.modal_outbox}>
              <Form
                inputValue={this.state.title.value}
                textareaValue={this.state.content.value}
                handleTitleChange={this.handleTitleChange}
                handleContentChange={this.handleContentChange}
                handleButton={this.submitPostClick}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  all_answers: state.answers.all_answers,
  answers_loading: state.answers.answers_loading,
  questions: state.questions.questions,
  user: state.profile.user,
  users: state.profile.users,
  postQuestionStatus: state.questions.postStatus
})
const mapDispatchtoProps = {
  getProfile, getProfiles, getQuestions, postQuestion, getAnswers
}
export default connect(mapStateToProps, mapDispatchtoProps)(Question)
