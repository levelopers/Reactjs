import React, { Component } from 'react'
import styles from './stylesheets/loginsignup.module.sass'
import { Link } from 'react-router-dom'
import validation from './utils/validation'
import Forminput from './components/FormInput'
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
    let canSubmit = true
    Object.entries(this.state).forEach(([key, val]) => {
      let { isValid } = validation(key, val.value)
      canSubmit = isValid && !!canSubmit
    })
    if (canSubmit && !this.props.signup_loading) {
      const { email, password, name } = this.state
      this.props.signUp(email.value, password.value, name.value)
        .then(res => {
          this.props.postToken(email.value, password.value)
            .then(res => this.props.history.push('/question'))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
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
  signup_loading: state.profile.signup_loading
})
export default connect(mapStateToProps, { signUp, postToken })(SignUp)
