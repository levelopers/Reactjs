import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Base from './components/Base';

import {
  validateEmail,
  validateExistence,
  validateLowercase,
  validateUppercase,
  makeValidateLength
} from './utils/validations';


const INPUT_CONFIG = [{
  name: 'email',
  validations: [validateExistence, validateEmail]
}, {
  name: 'password',
  validations: [validateExistence, makeValidateLength(6, 15), validateLowercase, validateUppercase]
}, {
  name: 'name'
}]

export default class SignUp extends Component {
  // state is the data related to view
  state = {
    emailErrorMsg: '',
    nameErrorMsg: '',
    passwordErrorMsg: ''
  }
  // local instance variable to save the data about logic
  // e.g. isValid, input value
  input = {}


  // fire when any input in the <Base/> focus
  handleFocus = e => {
    const name = e.target.name
    // when focus, clear error message
    this.setState({ [name + 'ErrorMsg']: '' })
  }

  // fire when input in the <Base/> blur
  handleBlur = (e, validInfo) => {
    const name = e.target.name
    this.input[name] = {
      value: e.target.value,
      isValid: validInfo.isValid
    }

    if (!validInfo.isValid) {
      this.setState({
        [name + 'ErrorMsg']: validInfo.validation.errMsg
      })
    }
  }

  // fire when click submission button
  handleClick = () => {
    console.log(this.input)
  }

  render() {
    const {
      emailErrorMsg,
      nameErrorMsg,
      passwordErrorMsg
    } = this.state;
    return (
      <Base
        inputs={INPUT_CONFIG}
        onInputBlur={this.handleBlur}
        onInputFocus={this.handleFocus}
        onSubmit={this.handleClick}
        errMsg={{
          email: emailErrorMsg,
          name: nameErrorMsg,
          password: passwordErrorMsg
        }}
        buttonTitle={'SignUp'}
        footer={<Fragment>Already have an account?<Link to="/login">Login</Link></Fragment>}
      />
    )
  }
}
