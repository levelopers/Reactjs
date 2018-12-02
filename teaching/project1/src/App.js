import React, { Component } from 'react';
import { Login, SignUp } from './project1/pages/signInSignUp'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Redirect to="/login" />
          </Switch>
        </Router>
        {/* <button onClick={handleClick}>SADasdasf</button> */}
      </div>
    )
  }
}
const body={
  "user": {
    "id":"1",
    "name":"allen"
  }
}
function handleClick(){
  fetch('https://bigfish100.herokuapp.com/users/1',{
    method:"PUT",
    body:JSON.stringify(body),
    headers:{"Content-Type":"application/json"}
  })
  .then(res=>res.json())
  .then(response=>console.log(response))
}




export default App;
