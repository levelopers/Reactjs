import React, { Component } from 'react'
import './stylesheets/LoginSignUp.css'
import { Link } from 'react-router-dom'
import Base from './Base'

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: {
        value: '',
        isValid: false,
        errorMessage: ''
      },
      name: {
        value: '',
        isValid: false,
        errorMessage: ''
      },
      password: {
        value: '',
        isValid: false,
        errorMessage: ''
      }
    }
  }

  //set input value to state
  // handleChange = (e) => {
  //   const targetName = e.target.name
  //   const targetValue = e.target.value

  //   this.setState({
  //     [targetName]: {
  //       ...this.state[targetName],
  //       value: targetValue
  //     }
  //   })
  // }

  // //validate input text on blur
  // handleBlur = (e) => {
  //   const name = e.target.name
  //   const value = e.target.value

  //   let { targetName, isValid, errorMessage } = validation(name, value)
  //   this.setState({
  //     [targetName]: {
  //       ...this.state[targetName],
  //       isValid: isValid,
  //       errorMessage: errorMessage
  //     }
  //   })
  // }

  // //validate input text on submit
  // handleClick = () => {
  //   Object.entries(this.state).forEach(([key, val]) => {
  //     let { targetName, isValid, errorMessage } = validation(key, val.value)

  //     this.setState({
  //       [targetName]: {
  //         ...this.state[targetName],
  //         isValid: isValid,
  //         errorMessage: errorMessage
  //       }
  //     })
  //   })
  // }

  updateState=(state)=>{
    this.setState(
      state
    )
  }

  render() {
    console.log(this.state);
    return (
      <div className="login" style={{ "backgroundImage": "url('/background.jpg')" }}>
        <div className="out-box">
          <div id="form-title">
            BIGFISH
          </div>
          <div>
            {Object.keys(this.state).map(attrName =>
              <Base
                name={attrName}
                message={this.state[attrName].errorMessage}
                value={this.state[attrName].value}
                eventState={this.updateState}
              />
            )}

            {/* <Form name="email" message={this.state.email.errorMessage}
              handleChange={(e) => this.handleChange(e)} handleBlur={(e) => this.handleBlur(e)} value={this.state.email.value} />
            <Form name="password" message={this.state.password.errorMessage}
              handleChange={(e) => this.handleChange(e)} handleBlur={(e) => this.handleBlur(e)} value={this.state.password.value} />
            <Form name="name" message={this.state.name.errorMessage}
              handleChange={(e) => this.handleChange(e)} handleBlur={(e) => this.handleBlur(e)} value={this.state.name.value} /> */}
            <button id="form-button" type="button" onClick={this.handleClick} >
              SignUp
            </button>
          </div>
          <div className="footer">
            <span >
              Already have an account?
              <Link to="/login">Login</Link>
            </span>
          </div>
        </div>
      </div>
    )
  }
}
