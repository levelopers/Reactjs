import React, { Component } from 'react'
import './SignUp.css'
import Form from './components/FormInput'
import { Link } from 'react-router-dom'


export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: {
                value: '',
                isValid: false,
                errorMessage: ''
            },
            name: {
                value: '',
                isValid: false,
                errorMessage: ''
            },
            password: {
                value: '',
                isValid: false,
                errorMessage: ''
            }
        }

    }



    handleChange = (e) => {
        const targetName = e.target.name
        const targetValue = e.target.value

        this.setState({
            [targetName]: {
                ...this.state[targetName],
                value: targetValue
            }
        })
    }

    validate = (targetName, targetValue) => {
        let isValid = false
        let errorMessage = ''


        switch (targetName) {
            case 'email':
                isValid = !!targetValue.match(/[\w-]+@([\w-]+\.)+[\w-]+/i)
                errorMessage = isValid ? '' : 'invalid email'
                break;

            case 'password':
                // isValid = targetValue.match(/(?=.*[a-z])(?=.*[A-Z])(?=.{6,15})/g)
                // isValid = isValid ? true : false
                // errorMessage = isValid ? '' : 'Longer than 6 '

                // // errorMessage = isValid ? '' : 'password has to be 6-15 letter or number with At least one upper case character and At least one lower case character '


                switch (false) {
                    case !!targetValue.match(/(?=.*[a-z])/g):
                        errorMessage = 'at least one lower case'
                        break;
                    case !!targetValue.match(/(?=.*[A-Z])/g):
                        errorMessage = 'at least one Upper case'
                        break;
                    case !!targetValue.match(/(?=.{6,15})/g):
                        errorMessage = 'length between 6 to 15'
                        break;
                }

        }

        if (!targetValue) {
            errorMessage = "Required"
        }
        this.setState({
            [targetName]: {
                ...this.state[targetName],
                isValid: isValid,
                errorMessage: errorMessage
            }
        })
    }



    handleBlur = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.validate(name, value)
    }

    handleClick = () => {
        Object.entries(this.state).forEach(([key, val]) => {
            this.validate(key, val.value)
        })
    }



    render() {
        console.log(this.state);
        return (

            <div className="login" style={{ "backgroundImage": "url('/background.jpg')" }}>


                <div className="out-box">


                    <div id="form-title">
                        BIGFISH
                        </div>

                    <div onSubmit={this.handleSubmit}>
                        <Form name="email" message={this.state.email.errorMessage}
                            handleChange={(e) => this.handleChange(e)} handleBlur={(e) => this.handleBlur(e)} value={this.state.email.value} />
                        <Form name="password" message={this.state.password.errorMessage}
                            handleChange={(e) => this.handleChange(e)} handleBlur={(e) => this.handleBlur(e)} value={this.state.password.value} />
                        <Form name="name" message={this.state.name.errorMessage}
                            handleChange={(e) => this.handleChange(e)} handleBlur={(e) => this.handleBlur(e)} value={this.state.name.value} />



                        <button id="form-button" type="button" onClick={this.handleClick} >

                            SignUp
                        </button>
                    </div>
                    <div className="footer">
                        <span >
                            Already have an account?
                      <Link to="/login">Login</Link>

                        </span>
                    </div>
                </div>


            </div>
        )
    }
}
