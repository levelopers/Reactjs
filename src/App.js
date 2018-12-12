import React, { Component } from 'react';
import './App.css';
import {Layout} from './pages/loginsignup/Layout'
import Profile from './pages/profile/Profile'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import SignUp from './pages/loginsignup/SignUp';
import Login from './pages/loginsignup/Login'
import Question from './pages/question/question'
import { postToken } from './redux/actions/tokenActions'

class App extends Component {
  

  //password validate seperate
  //error message (white background color)
  //router --> component dupalicate
  //          route component variable
  //new repo, project structure 
  
  render() {
    // console.log(localStorage.getItem('token'));
    console.log(localStorage);
    // localStorage.setItem('user_key','')
    return (
      
        <div>
        <Router>
          <Switch>
            <Route  path="/login" component={Login} />
            <Route  path="/signup" component={SignUp} />
            <Route  path="/profile" component={Profile} />
            <Route path="/question" component={Question}/>
            <Route exact path="/" component={Login}/> 
          </Switch>
        </Router>
        {/* <Question/> */}
        </div>

    )
  }
}
export default App;
