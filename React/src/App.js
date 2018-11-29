import React, { Component } from 'react';
import './App.css';
import {Layout} from './component/project1/pages/signup/Layout'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
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
            <Layout>
            <Route exact path="/" component={Layout} />
            </Layout>
          </Switch>
        </Router>
        </div>

    )
  }
}




export default App;
