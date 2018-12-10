import React, { Component } from 'react';
import './App.css';
import {Layout} from './pages/loginsignup/Layout'
import Profile from './pages/profile/Profile'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SignUp from './pages/loginsignup/SignUp';
import Login from './pages/loginsignup/Login'
import Question from './pages/question/question'

class App extends Component {
  

  //password validate seperate
  //error message (white background color)
  //router --> component dupalicate
  //          route component variable
  //new repo, project structure 
  
  render() {
    return (
 
        <div>
        <Router>
          <Switch>
            <Route  path="/login" component={Login} />
            <Route  path="/signup" component={SignUp} />
            <Route  path="/profile" component={Profile} />
            <Route exact path="/" component={Login}/> */}
          </Switch>
        </Router>
        {/* <Question/> */}
        </div>

    )
  }
}
export default App;
