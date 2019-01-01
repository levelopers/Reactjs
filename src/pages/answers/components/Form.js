import React, { Component } from 'react'
import { connect } from 'react-redux';
import styles from '../stylesheets/form.module.sass'
import { postAnswer } from '../../../redux/actions/answersActions'
class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      button_disabled: true
    }
  }

  postAnswerSubmit = (e) => {
    if (!this.state.value) return
    this.props.postAnswer(this.state.value, this.props.question_id)
      .then(res => {
        //update answers state 
        // this.props.answers_this.setState({
        //   answers: [...this.props.answers_this.state.answers, res.data.answer]
        // })
        //clear input filed and disable button
        this.setState({
          value: '',
          button_disabled: true
        })
        this.props.hideForm()
        if(this.props.bottomRef)this.props.bottomRef.scrollIntoView({ behavior: 'smooth' })
      })
  }

  handleContentChange = (e) => {
    let button_disabled = true
    if (e.target.value) button_disabled = false
    this.setState({
      value: e.target.value,
      button_disabled: button_disabled
    })
  }
  render() {
    return (
      <div className={styles.form_outbox}>
        <form className={styles.form_form}>
          <textarea
            className={styles.form_textArea}
            placeholder='Write your answer'
            cols={20}
            onChange={this.handleContentChange}
            value={this.state.value} />
        </form>
        <button
          className={styles.form_button}
          onClick={this.postAnswerSubmit}
          disabled={this.state.button_disabled}>
          Answer
        </button>
      </div>
    )
  }
}

export default connect(null, { postAnswer })(Form)
