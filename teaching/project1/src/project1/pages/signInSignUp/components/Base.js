import React from 'react'
import './styles/base.css'
import FormInput from './FormInput'

export default function Base({ 
  /** submission button text */
  buttonTitle, 
  /** form footer */
  footer, 
  /** callback when clicking submission button */
  onSubmit, 
  children, 
  /** form input settings with 1. name 2. validations */
  inputs, 
  /** a key-value map to indicate the error message of a certain input */
  errMsg, 
  /** callback when any input changes */
  onInputChange, 
  /** 
   * callback when any input blurs: (e, validation) => { ... } 
   * where 
   *  e          :  react dom event
   *  validation :  validation result
   */
  onInputBlur,
  /** callback when any input focuses */
  onInputFocus 
}) {
  return (
    <div className="login" style={{ "backgroundImage": "url('/background.jpg')" }}>
      <div className="out-box">
        <div id="form-title">
          BIGFISH
        </div>

        <div>
          {children}
          {
            inputs.map(({ name, validations }) =>
              <FormInput
                key={name}
                name={name}
                message={errMsg[name]}
                onChange={onInputChange}
                onBlur={onInputBlur}
                onFocus={onInputFocus}
                validations={validations}
              />
            )
          }

          <button id="form-button" type="button" onClick={onSubmit} >
            {buttonTitle}
          </button>
        </div>
        <div className="footer">
          <span >
            {footer}
          </span>
        </div>
      </div>
    </div>
  )
}