import React, { Component } from 'react'
import SignUp from './SignUp';
import FormInput from './components/FormInput'
import { Route, Switch, Link } from 'react-router-dom';


export const Layout = () =>

  (
    <div>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  )



class Login extends SignUp {
  render() {
    console.log(this.state);
    return (
      <div className="login" style={{ "backgroundImage": "url('/background.jpg')" }}>
        <div className="out-box">
          <div id="form-title">
            BIGFISH
          </div>
          <div >
            <FormInput name="email" message={this.state.email.errorMessage}
              handleChange={(e) => this.handleChange(e)} handleBlur={(e) => this.handleBlur(e)} value={this.state.email.value} />
            <FormInput name="password" message={this.state.password.errorMessage}
              handleChange={(e) => this.handleChange(e)} handleBlur={(e) => this.handleBlur(e)} value={this.state.password.value} />

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
    )
  }
}


