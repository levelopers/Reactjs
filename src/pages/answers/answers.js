import React, { Component } from 'react'
import styles from './stylesheets/answers.module.sass'
import Header from '../../components/header'
import Question from './components/question'
import Answer from './components/answer'
import Form from './components/Form'
import btn from '../../assets/question_post_button.svg'

class Answers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form_style: null
    }
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
  render() {
    return (
      <div className={styles.page}>
        <div ref={ref => this.headerRef = ref}>
          <Header img={this.props.user && this.props.user.avatar_url} />
        </div>
        <div className={styles.outbox}>
          <div>
            {this.props.questions &&
              <Question questions={this.props.questions} question_id={this.props.question_id} />}
            <div style={{ display: this.state.form_style }} className={styles.post_outbox}>
              <Form
                question_id={this.props.question_id}
                answers_this={this}
                hideForm={this.hideForm}
                bottomRef={this.bottomRef} />
            </div>
            {this.props.answers.length > 0
              && !this.props.answers_loading
              && !this.props.profiles_loading
              &&
              <Answer
                answers={this.props.answers}
                users={this.props.users.concat(this.props.user)}
                question_id={this.props.question_id}
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

export default Answers
