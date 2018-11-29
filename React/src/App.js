import React, { Component } from 'react';
import './App.css';
import Login from './component/project1/Login'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
class App extends Component {
  

  //password validate seperate
  //error message (white background color)
  //router --> component dupalicate
  //          route component variable
  //new repo, project structure 
  
  render() {
    return (
      // <div>
      //   asdadas

      //   asda
      //   da
      //   sda

        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            {/* <Route path="/login" component={Login} /> */}
            {/* <Route path="/signup" component={SignUp} /> */}
          </Switch>
        </Router>
      // </div>

    )
  }
}




export default App;
