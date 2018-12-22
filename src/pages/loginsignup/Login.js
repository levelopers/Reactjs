import React, { Component } from 'react'
import styles from './stylesheets/loginsignup.module.sass'
import { Link } from 'react-router-dom'
import validation from './utils/validation'
import Forminput from './components/FormInput'
import { connect } from 'react-redux';
import { postToken } from '../../redux/actions/tokenActions';

class Login extends Component {
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
      canSubmit = isValid && !!canSubmit
    })
    if (canSubmit && !this.props.token_loading) {
      this.props.postToken(this.state.email.value, this.state.password.value)
        .then(res => {
          this.props.history.push('/question')
        }).catch(err => {
          alert(err)
          this.setState({
            email: {
              ...this.state.email,
              isValid: false,
            },
            password: {
              ...this.state.password,
              isValid: false,
            }
          })
        })
    }
  }

  render() {
    return (
      <div className={styles.login} style={{ "backgroundImage": "url('/background.jpg')", backgroundSize: "cover" }}>
        <div className={styles.outbox}>
          <div className={styles.form_title}>
            BIGFISH
          </div>
          <div className={styles.form}>
            {Object.keys(this.state).map(attrName =>
              <div key={attrName}>
                <Forminput
                  name={attrName}
                  message={this.state[attrName].errorMessage}
                  value={this.state[attrName].value}
                  handleChange={this.handleChange}
                  handleBlur={this.handleBlur}
                  handleClick={this.handleClick}
                />
              </div>
            )}
            <button className={styles.form_button} type="button" onClick={this.handleClick} >
              Login
            </button>
          </div>
          <div className={styles.footer}>
            <span >
              Don't have an account?&nbsp;
            </span>
            <Link to="/signup">SignUp</Link>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  token: state.token.token,
  token_loading: state.token.token_loading,
  login_err: state.token.error
})
export default connect(mapStateToProps, { postToken })(Login)