import React, { Fragment } from 'react';
import Base from './components/Base';
import { Link } from 'react-router-dom';

import {
  validateEmail,
  validateExistence,
  validateLowercase,
  validateUppercase,
  makeValidateLength
} from './utils/validations';
import SignUp from './SignUp';

const INPUT_CONFIG = [{
  name: 'email',
  validations: [validateExistence, validateEmail]
}, {
  name: 'password',
  validations: [validateExistence, makeValidateLength(6, 15), validateLowercase, validateUppercase]
}]


export default class Login extends SignUp {
  // state is the data related to view
  state = {
    emailErrorMsg: '',
    passwordErrorMsg: ''
  }

  handleClick = () => { }

  render() {
    const {
      emailErrorMsg: email,
      passwordErrorMsg: password
    } = this.state;
    return (
      <Base
        inputs={INPUT_CONFIG}
        onInputBlur={this.handleBlur}
        onInputFocus={this.handleFocus}
        onSubmit={this.handleClick}
        errMsg={{ email, password }}
        buttonTitle={'Login'}
        footer={<Fragment>Don't have an account?<Link to="/signup">SignUp</Link></Fragment>}
      />
    )

  }
}