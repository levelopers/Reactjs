import React, { Component } from 'react'
import SignUp from './SignUp';
import Login from './Login'
import FormInput from './components/FormInput'
import { Route, Switch, Link } from 'react-router-dom';
import styles from './stylesheets/forminput.module.sass'
import Profile from '../profile/Profile'




export  class Layout extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.state);
    return(
      <div>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    )
  }
}



// class Login extends SignUp {

//   render() {
//     console.log(this.state);
//     return (
//       <div className="login" style={{ "backgroundImage": "url('/background.jpg')" }}>
//         <div className="out-box">
//           <div id="form-title">
//             BIGFISH
//           </div>
//           <div >
//             <FormInput name="email" message={this.state.email.errorMessage}
//               handleChange={(e) => this.handleChange(e)} handleBlur={(e) => this.handleBlur(e)} value={this.state.email.value} />
//             <FormInput name="password" message={this.state.password.errorMessage}
//               handleChange={(e) => this.handleChange(e)} handleBlur={(e) => this.handleBlur(e)} value={this.state.password.value} />

//             <button id="form-button" type="button" onClick={this.handleClick} >
//               Login
//             </button>
//           </div>
//           <div className="footer">
//             <span >
//               Don't have an account?
//               <Link to="/signup">SignUp</Link>
//             </span>
//           </div>
//         </div>


//       </div>
//     )
//   }
// }


