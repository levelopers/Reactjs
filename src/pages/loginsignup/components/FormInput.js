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
    let type = 'text'
    let display_message=message
    if (message === "Required") {
      inputCssClass = styles.error
      document.getElementById(`input_${name}`).placeholder = 'Required'
      display_message = ''
    } else if (message) {
      inputCssClass = styles.error
    } else {
      inputCssClass = styles.form_input
    }
    if(name==='password') type='password'

    return (
      <div id={`form_${name}`} className={styles.outbox} >
        <input className={inputCssClass}
          id={`input_${name}`} 
          type={type} 
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
