import React, { Component } from 'react'
import Form from './Form'
import './SignUp.css'
import { Link } from 'react-router-dom'


import { Route, Switch } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: {
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

  validate = (targetName, targetValue) => {
    let isValid = false
    let errorMessage = ''


    switch (targetName) {
      case 'email':
        isValid = !!targetValue.match(/[\w-]+@([\w-]+\.)+[\w-]+/i)
        // // isValid = isValid ? true : false
        // if( undefined || null || false || '' || 0 )
        errorMessage = isValid ? '' : 'invalid email'
        break;

      case 'password':
        isValid = targetValue.match(/(?=.*[a-z])(?=.*[A-Z])(?=.{6,15})/g)
        isValid = isValid ? true : false
        errorMessage = isValid ? '' : 'Longer than 6 '
      // errorMessage = isValid ? '' : 'password has to be 6-15 letter or number with At least one upper case character and At least one lower case character '
    }

    if (!targetValue) {
      errorMessage = "Required"
    }
    //1. setState 
    /**
     *  @param {function|object} haha first param
     *  @param {function} fn callback when setstate complete
     */
    // this.setState((prevState) => ({
    //   [targetName]: {
    //     ...prevState[targetName],
    //     isValid: isValid,
    //     errorMessage: errorMessage
    //   }
    // }))

    // this.state.a = 0


    // this.setState({a: this.state.a + 1})

    // this.setState({a: this.state.a })

    // this.setState(prevState => ({
    //   a: prevState.a + 1
    // }))

    // this.setState(prevState => ({
    //   a: prevState.a + 2
    // }))

    // a = 3


    this.setState({
      [targetName]: {
        ...this.state[targetName],
        isValid: isValid,
        errorMessage: errorMessage
      }
    })
  }



  handleBlur = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.validate(name, value)
  }

  handleClick = () => {
    Object.entries(this.state).forEach(([key, val]) => {
      this.validate(key, val.value)
    })
  }


  render() {
    // console.log(this.state);
    return (

      <div className="login" style={{ backgroundImage: "url('/background.jpg')" }}>
        <div className="out-box">
          <div id="form-title">
            BIGFISH
          </div>

          <div>
            <Form name="email" message={this.state.email.errorMessage}
              handleChange={(e) => this.handleChange(e)} handleBlur={(e) => this.handleBlur(e)} value={this.state.email.value} />
            <Form
              name="password"
              message={this.state.password.errorMessage}
              handleChange={(e) => this.handleChange(e)}
              handleBlur={(e) => this.handleBlur(e)}
              value={this.state.password.value}
            />
            
            <Switch>
              <Route path="/signup" component={()=><div>1231231312312</div>} />
            </Switch>

            <button id="form-button" type="button" onClick={this.handleClick} >
              Login
            </button>
          </div>
          <div className="footer">
            <span >
              Don't have an account?
              <Link to="/signup">SignUp</Link>
            </span>
          </div>
        </div>


      </div>