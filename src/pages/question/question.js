import React, { Component } from 'react'
import Header from '../../components/header'
import Form from './components/Form'
import styles from './stylesheets/question.module.sass'
import post_button from '../../assets/question_post_button.svg'
import { connect } from 'react-redux';
import { getQuestions } from '../../redux/actions/questionActions'
import { getAnswers } from '../../redux/actions/answersActions'
import { getProfile } from '../../redux/actions/profileActions'
import { postQuestion } from '../../redux/actions/questionActions'
import {navigation} from '../../modules/navigation'
class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: {
        value: ''
      },
      content: {
        value: ''
      }
    }
    this.popupRef = null
  }
  componentDidMount() {
    this.props.getQuestions()
    this.props.getProfile()
  }
  componentWillUpdate() {
  }
  showPostClick = () => {
    this.popupRef.style.display = "flex"
  }
  fillFormClick = (e) => {
    e.stopPropagation()
  }
  submitPostClick = (e) => {
    //quit modal
    this.cancelModal()
    //post questions
    this.props.postQuestion(this.state.title.value, this.state.content.value)

  }
  handleParagraphClick = (e, ques_id) => {
    console.log(ques_id);
    this.props.history.push(`/answers/${ques_id}`)
  }
  cancelModal = () => {
    this.popupRef.style.display = "none"
  }
  handleContentChange = (e) => {
    this.setState({
      ...this.state,
      content: {
        value: e.target.value
      }
    })
  }
  handleTitleChange = (e) => {
    this.setState({
      ...this.state,
      title: {
        value: e.target.value
      }
    })
  }
  render() {
    console.log(navigation);
    
    // navigation.push('/login')    
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <Header img={this.props.user.avatar_url} />
          {/* <button onClick={e => { localStorage.clear(); this.props.history.push('/login') }}>logout</button> */}
        </div>
        <div className={styles.btn}>
          <button onClick={this.showPostClick}>
            <img src={post_button} alt="" />
          </button>
        </div>
        <div className={styles.outbox}>
          {this.props.questions && this.props.questions.map(ques =>
            <div key={ques.id} className={styles.paragraph} onClick={e => this.handleParagraphClick(e, ques.id)}>
              <div className={styles.title}>
                {ques.title}
              </div>
              {this.props.answers && this.props.answers.map(ans =>
                ans.question_id === ques.id ?
                  <div key={ans.answers[0].id} className={styles.answer}>
                    {ans.answers[0].content}
                  </div>
                  :
                  <div
                    key={ans.question_id}
                    className={styles.blank}>
                  </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.popup_box} onClick={this.cancelModal} ref={ref => this.popupRef = ref}>
          <div className={styles.popup_content} onClick={this.fillFormClick}>
            <div className={styles.modal_outbox}>
              <Form
                {
                ...{
                  inputValue: this.state.title.value,
                  textareaValue: this.state.content.value,
                  handleTitleChange: this.handleTitleChange,
                  handleContentChange: this.handleContentChange,
                  handleButton: this.handleButton
                }
                }
              />
            </div>
          </div>
        </div>
      </div>

    )
  }
}

const mapStatetoProps = state => ({
  answers: state.answers.answers,
  questions: state.questions.questions,
  user: state.profile.user,
  postQuestionStatus: state.questions.postStatus
})
export default connect(mapStatetoProps, { getProfile, getQuestions, postQuestion, getAnswers })(Question)
