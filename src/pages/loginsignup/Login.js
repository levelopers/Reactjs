import React, { Component } from 'react'
import styles from './stylesheets/signup.module.sass'
import { Link } from 'react-router-dom'
import validation from './utils/validation'
import Base from './Base'
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
      let { isValid } = validation(key, val.value)
      canSubmit = isValid && !!canSubmit
    })
    if (canSubmit) {
      this.props.postToken(this.state.email.value, this.state.password.value)
      .then(res=>{
        console.log(res)
        return this.props.history.push('/question')
      }).catch(err=>{
        if(err.response.data.errors[0].code==="invalid_credential"){
        alert('invalid email or password')
        }
      })
      
    }
  }

  render() {
    // console.log(this.state);
    return (
      <div className={styles.login} style={{ "backgroundImage": "url('/background.jpg')", backgroundSize: "cover" }}>
        <div className={styles.outbox}>
          <div className={styles.form_title}>
            BIGFISH
          </div>
          <div className={styles.form_input}>
            {Object.keys(this.state).map(attrName =>
              <div key={attrName}>
                <Base
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
              Don't have an account?
              <Link to="/signup">SignUp</Link>
            </span>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps  = state => ({
  token: state.token.token
})
export default connect(mapStateToProps , { postToken })(Login)