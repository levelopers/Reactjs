import React, { Component } from 'react';
import './App.css';
import Profile from './pages/profile/Profile'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './pages/loginsignup/SignUp';
import Login from './pages/loginsignup/Login'
import Question from './pages/question/question'
import Answers from './pages/answers/answers'
import { insertToken } from './redux/actions/tokenActions'
import { connect } from 'react-redux';

class App extends Component {
  render() {
    // localStorage.clear()
    if(!this.props.token){
    this.props.insertToken()
    }
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            {!localStorage.getItem('auth') && <Redirect to="/login" />}
            <Route path="/signup" component={SignUp} />
            <Route path="/profile" component={Profile} />
            <Route path="/question" component={Question} />
            <Route path="/answers/:ques_id" component={Answers} />
            <Route exact path="/" component={Login} />
          </Switch>
        </Router>
      </div>
    )
  }
}
const mapStateToProps =(state)=>({
  token:state.token.token
})
export default connect(mapStateToProps , { insertToken })(App)
