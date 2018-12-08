import React, { Component } from 'react';
import './App.css';
import {Layout} from './pages/loginsignup/Layout'
import Profile from './pages/profile/Profile'
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
        {/* <Router>
          <Switch>
            <Layout>
            <Route exact path="/" component={Layout} />
            </Layout>
            <Route exact path ="/" component={Profile}/>
            
          </Switch>
        </Router> */}
        <Profile/>
        {/* <RenderImg/> */}
        </div>

    )
  }
}


// function RenderImg(){
//   return (
//     <div>
//       <img src='https://firebasestorage.googleapis.com/v0/b/bigfish-firebase.appspot.com/o/images%2Fbackground.jpg?alt=media&token=418da9eb-14a8-4747-84d1-2f18108e74c8' alt=""/>
//     </div>
//   )
// }



export default App;
