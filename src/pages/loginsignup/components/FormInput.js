import React, { Component } from 'react'
import '../stylesheets/LoginSignUp.sass'
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
      inputCssClass = 'error-required'
      document.getElementById(`input-${name}`).placeholder = 'Required'
      display_message = ''
    } else if (message) {
      errorCssClass = 'error-message'
    } else {
      inputCssClass = 'form'
    }

    return (
      <span id={`form-${name}`} className="form-input" >
        <input className="signup-forminput"
          id={`input-${name}`} 
          className={errorCssClass || inputCssClass} 
          type="text" 
          name={name} 
          placeholder={name[0].toUpperCase() + name.slice(1)}
          onChange={handleChange}
          onBlur={handleBlur} 
          value={value} 
        />

        <span className={errorCssClass}>
          {display_message}
        </span>

      </span>
    )

  }
}
