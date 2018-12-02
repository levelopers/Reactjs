import './styles/formInput.css'
import React from 'react'

export default function FormInput({ message, validations, name, onBlur, onValidationFail, ...rest }) {
  let placeholder = ''
  let class_name = ''

  if (!Array.isArray(validations)) validations = [validations]

  switch (true) {
    case message === 'Required': // a special error case with different style
      placeholder = 'Required'
      class_name = 'error-required'
      message = ''
      break;

    case !!message:
      class_name = 'error-message'
      break;

    default:
      class_name = 'form'
      placeholder = name[0].toUpperCase() + name.slice(1)
  }

  return (
    <span id={`form-${name}`} className="form-input" >
      <input
        id={`input-${name}`}
        className={class_name}
        name={name}
        onBlur={_onBlur}
        placeholder={placeholder}
        {...rest}
      />
      {message && <span className={class_name}>
        {message}
      </span>}
    </span>
  )

  function _onBlur(e) {
    const text = e.target.value
    // onblur will pass
    // 1. dom event
    // 2. validation result
    onBlur(e, validate(validations, text))
  }
}

const validate = (validations, text) => {
  const len = validations.length
  for (let i = 0; i < len; i++) {
    if (!validations[i].check(text)) {
      return {
        isValid: false,
        validation: validations[i]
      }
    }
  }
  return { isValid: true }
}

FormInput.defaultProps = {
  validations: [],
  type: 'text',
  onBlur: () => { },
  onValidationFail: () => { }
}

