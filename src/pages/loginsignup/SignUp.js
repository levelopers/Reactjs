import React, { Component } from 'react'
import styles from './stylesheets/loginsignup.module.sass'
import { Link } from 'react-router-dom'
import validation from './utils/validation'
import Forminput from './components/FormInput'
import Button from './components/Button'
import { connect } from 'react-redux';
import { signUp } from '../../redux/actions/profileActions';
import { postToken } from '../../redux/actions/tokenActions';

class SignUp extends Component {
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
    let errorMessage
    if (this.state[targetName].errorMessage === 'Required') {
      errorMessage = ''
    } else {
      errorMessage = this.state[targetName].errorMessage
    }
    this.setState({
      [targetName]: {
        ...this.state[targetName],
        errorMessage: errorMessage,
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
    let canSubmit = true
    Object.entries(this.state).forEach(([key, val]) => {
      let { targetName, isValid, errorMessage } = validation(key, val.value)
      this.setState({
        [targetName]: {
          ...this.state[targetName],
          isValid: isValid,
          errorMessage: errorMessage
        }
      })
      canSubmit = isValid && canSubmit
    })
    if (canSubmit && !this.props.signup_loading) {
      const { email, password, name } = this.state
      this.props.signUp(email.value, password.value, name.value)
        .then(signup_res => {
          this.props.postToken(email.value, password.value)
            .then(token_res => {
              this.props.history.push('/question')
            })
            .catch(err => alert(err))
        })
        .catch(err => {
          alert(err)
          this.setState({
            email: {
              ...this.state.email,
              isValid: false,
            },
            password: {
              ...this.state.password,
              isValid: false,
            },
            name: {
              ...this.state.name,
              isValid: false
            }
          })
        })
    }
  }

  render() {
    return (
      <div className={styles.login} style={{ backgroundImage: "url('/background.jpg')", backgroundSize: "cover" }}>
        <div className={styles.outbox}>
          <div className={styles.form_title}>
            BIGFISH
          </div>
          <div className={styles.form}>
            {Object.keys(this.state).map(attrName =>
              <Forminput
                key={attrName}
                name={attrName}
                message={this.state[attrName].errorMessage}
                value={this.state[attrName].value}
                handleChange={this.handleChange}
                handleBlur={this.handleBlur}
                handleClick={this.handleClick}
              />
            )}
            <button className={styles.form_button} type="button" onClick={this.handleClick} >
              SignUp
            </button>
          </div>
          <div className={styles.footer}>
            <span >
              Already have an account?&nbsp;
            </span>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token.token,
  signup_loading: state.profile.signup_loading,
  signup_err: state.profile.error
})
export default connect(mapStateToProps, { signUp, postToken })(SignUp)
