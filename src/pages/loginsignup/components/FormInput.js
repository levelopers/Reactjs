import React, { Component } from 'react'
import styles from '../stylesheets/forminput.module.sass'
export default class Form extends Component {
  render() {
    const {
      name,
      message,
      handleBlur,
      handleChange,
      value
    } = this.props;
    let inputCssClass = ''
    let errorCssClass = ''
    let display_message=''
    display_message=message
    if (message === "Required") {
      inputCssClass = styles.error_required
      document.getElementById(`input_${name}`).placeholder = 'Required'
      display_message = ''
    } else if (message) {
      errorCssClass = styles.error_message
    } else {
      inputCssClass = 'form'
    }

    return (
      <div id={`form_${name}`} className={styles.outbox} >
        <input className={styles.form_input}
          id={`input_${name}`} 
          // className={errorCssClass || inputCssClass} 
          type="text" 
          name={name} 
          placeholder={name[0].toUpperCase() + name.slice(1)}
          onChange={handleChange}
          onBlur={handleBlur} 
          value={value} 
        />

        <span className={styles.error_span}>
          {display_message}
        </span>

      </div>
    )

  }
}
