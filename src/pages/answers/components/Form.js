import React, { Component } from 'react'
import styles from '../stylesheets/form.module.sass'

export default class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }
  
  PostAnswerSubmit = (e) => {
    // this.props.postAnswer()
  }
  handleContentChange=(e)=>{
    this.setState({
      value:e.target.value
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
            onChange={e => this.handleContentChange(e)}
            value={this.state.value} />
        </form>
        <button className={styles.form_button} onClick={this.PostAnswerSubmit()}>
        button
        </button>
      </div>
    )

  }
}
