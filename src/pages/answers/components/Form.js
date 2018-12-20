import React, { Component } from 'react'
import { connect } from 'react-redux';
import styles from '../stylesheets/form.module.sass'
import { postAnswer } from '../../../redux/actions/answersActions'
class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  postAnswerSubmit = (e) => {
    this.props.postAnswer(this.state.value, this.props.question_id)
      .then(res => {
        window.location.reload()
      })
  }
  handleContentChange = (e) => {
    this.setState({
      value: e.target.value
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
        <button className={styles.form_button} onClick={this.postAnswerSubmit}>
          button
        </button>
      </div>
    )
  }
}

export default connect(null, { postAnswer })(Form)
