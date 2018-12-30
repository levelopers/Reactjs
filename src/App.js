import React, { Component } from 'react';
import './App.css';
import Profile from './pages/profile/Profile'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './pages/loginsignup/SignUp';
import Login from './pages/loginsignup/Login'
import Question from './pages/question/question'
// import Answers from './pages/answers/answers'
import AnswersContainer from './pages/answers/containers/answers.container'
import { insertToken } from './redux/actions/tokenActions'
import { connect } from 'react-redux';

class App extends Component {
  render() {
    // Auth.loggout()
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/signup" component={SignUp} />
            {this.props.token && [
              <Route key="profile" path="/profile" component={Profile} />,
              <Route key="question" path="/question" component={Question} />,
              <Route key="answer" path="/answers/:ques_id" component={AnswersContainer} />,
              <Redirect key="redirect_question" to ="/question"/>
            ]}
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Login} />
            <Redirect to="/login" />
          </Switch>
        </Router>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  token: state.token.token
})
export default connect(mapStateToProps, { insertToken })(App)
