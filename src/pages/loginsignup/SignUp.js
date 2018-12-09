import React, { Component } from 'react'
import styles from './stylesheets/LoginSignUp.sass'
import { Link } from 'react-router-dom'
import validation from './utils/validation'
import axios from 'axios'
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

  // set input value to state
  handleChange = (e) => {
    const targetName = e.target.name
    const targetValue = e.target.value

    this.setState({
      [targetName]: {
        ...this.state[targetName],
        value: targetValue
      }
    })
  }

  //validate input text on blur
  handleBlur = (e) => {
    const name = e.target.name
    const value = e.target.value

    let { targetName, isValid, errorMessage } = validation(name, value)
    this.setState({
      [targetName]: {
        ...this.state[targetName],
        isValid: isValid,
        errorMessage: errorMessage
      }
    })
  }

  //validate input text on submit
  handleClick = () => {
    let canSubmit=Boolean
    Object.entries(this.state).forEach(([key, val]) => {
      let { targetName, isValid, errorMessage } = validation(key, val.value)
      canSubmit=isValid && !!canSubmit
      this.setState({
        [targetName]: {
          ...this.state[targetName],
          isValid: isValid,
          errorMessage: errorMessage
        }
      })
    })
    if(canSubmit){
      axios.post('https://bigfish100.herokuapp.com/users',{
        user:{
            "email": this.state.email.value,
            "password": this.state.password.value,
            "name": this.state.name.value,
        }
      })
      .then(res=>console.log(res))
    }
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
                handleChange={this.handleChange}
                handleBlur={this.handleBlur}
                handleClick={this.handleClick}
              />
            )}
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
