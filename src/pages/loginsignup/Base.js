import FormInput from './components/FormInput'
import React, { Component } from 'react'
import validation from './utils/validation'



 class Base extends Component{

  constructor(props){
    super(props)
    this.state={}
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
    
    //validate input text on blur
    handleBlur = (e) => {
        const name = e.target.name
        const value = e.target.value
    
        let { targetName, isValid, errorMessage } = validation(name, value)
       this.setState({
            [targetName]: {
                ...this.state[targetName],
                isValid: isValid,
                errorMessage: errorMessage
            }
        })
    }
    
    //validate input text on submit
    handleClick = () => {
        Object.entries(this.props.state).forEach(([key, val]) => {
            let { targetName, isValid, errorMessage } = validation(key, val.value)
    
            this.setState({
                [targetName]: {
                    ...this.state[targetName],
                    isValid: isValid,
                    errorMessage: errorMessage
                }
            })
        })
    }
    render(){
      console.log(this.state);
      
        return (
            <div>
                <FormInput
                    name={this.props.name}
                    message={this.props.message}
                    handleChange={e => this.handleChange(e)}
                    handleBlur={e => this.handleBlur(e)}
                    value={this.props.value}
                    eventState={this.props.eventState(this.state)}
                />
            </div>
        )
    }
}

export default Base


