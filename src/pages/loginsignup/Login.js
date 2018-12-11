import React, { Component } from 'react'
import styles from './stylesheets/signup.module.sass'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import validation from './utils/validation'
import axios from 'axios'
import Base from './Base'
import Auth from '../../modules/Auth'

export default class Login extends Component {
  constructor(props) {
    super(props)
    console.log(this.props);
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

  //   if (!targetValue) {
  //     errorMessage = "Required"
  //   }
  //   //1. setState 
  //   /**
  //    *  @param {function|object} haha first param
  //    *  @param {function} fn callback when setstate complete
  //    */
  //   // this.setState((prevState) => ({
  //   //   [targetName]: {
  //   //     ...prevState[targetName],
  //   //     isValid: isValid,
  //   //     errorMessage: errorMessage
  //   //   }
  //   // }))

  //   // this.state.a = 0


  //   // this.setState({a: this.state.a + 1})

  //   // this.setState({a: this.state.a })

  //   // this.setState(prevState => ({
  //   //   a: prevState.a + 1
  //   // }))

  //   // this.setState(prevState => ({
  //   //   a: prevState.a + 2
  //   // }))

  //   // a = 3


  //   this.setState({
  //     [targetName]: {
  //       ...this.state[targetName],
  //       isValid: isValid,
  //       errorMessage: errorMessage
  //     }
  //   })
  // }
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

  handleClick = () => {
    let canSubmit = null;
    Object.entries(this.state).forEach(([key, val]) => {
      let { targetName, isValid, errorMessage } = validation(key, val.value)
      canSubmit = isValid && !!canSubmit
      this.setState({
        [targetName]: {
          ...this.state[targetName],
          isValid: isValid,
          errorMessage: errorMessage
        }
      })
    })
    if (canSubmit) {
      axios.post(`https://bigfish100.herokuapp.com/user_tokens`, {
        credential: {
          email: this.state.email.value,
          password: this.state.password.value
        }
      })
        .then(res => {
          console.log(res);
          Auth.set_token(res.data.user_token)
          localStorage.setItem('id',Auth.id)
          localStorage.setItem('email',Auth.email)
          this.props.history.push("/profile");
        })
        .catch(e=>console.log(e))
    }
  }
  render() {
    // console.log(this.state);
    return (
      <div className={styles.login} style={{ "backgroundImage": "url('/background.jpg')",backgroundSize:"cover" }}>
        <div className={styles.outbox}>
          <div className={styles.form_title}>
            BIGFISH
          </div>
          <div className={styles.form_input}>
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

            <button className={styles.form_button} type="button" onClick={this.handleClick} >
              Login
            </button>
          </div>
          <div className={styles.footer}>
            <span >
              Don't have an account?
              <Link to="/signup">SignUp</Link>
            </span>
          </div>
        </div>
      </div>
    )
  }
}
