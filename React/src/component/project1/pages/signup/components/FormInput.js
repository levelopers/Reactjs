import React, { Component } from 'react'

export default class Form extends Component {
  render() {
    const {
      name,
      // message,
      handleBlur,
      handleChange,
      value
    } = this.props;
    let message = this.props.message;
    let inputCssClass = ''
    let errorCssClass = ''
    if (message === "Required") {
      inputCssClass = 'error-required'
      document.getElementById(`input-${name}`).placeholder = 'Required'
      message = ''
    } else if (message) {
      errorCssClass = 'error-message'
    } else {
      inputCssClass = 'form'
    }

    return (
      <span id={`form-${name}`} className="form-input" >
        <input 
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
          {message}
        </span>

      </span>
    )

  }
}
