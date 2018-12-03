import FormInput from './components/FormInput'
import React, { Component } from 'react'
import validation from './utils/validation'

export default class Base extends Component {

    constructor(props) {
        super(props)

    }

    handleChange = (e) => {
        const targetName = e.target.name
        const targetValue = e.target.value
    
        this.props.setState({
            [targetName]: {
                ...this.props.state[targetName],
                value: targetValue
            }
        })
    }
    
    //validate input text on blur
    handleBlur = (e) => {
        const name = e.target.name
        const value = e.target.value
    
        let { targetName, isValid, errorMessage } = validation(name, value)
        this.props.setState({
            [targetName]: {
                ...this.props.state[targetName],
                isValid: isValid,
                errorMessage: errorMessage
            }
        })
    }
    
    //validate input text on submit
    handleClick = () => {
        Object.entries(this.props.state).forEach(([key, val]) => {
            let { targetName, isValid, errorMessage } = validation(key, val.value)
    
            this.props.setState({
                [targetName]: {
                    ...this.props.state[targetName],
                    isValid: isValid,
                    errorMessage: errorMessage
                }
            })
        })
    }

    render() {
        return (
            <div>
                <FormInput
                    name={this.props.name}
                    message={this.props.message}
                    handleChange={e => this.handleChange(e)}
                    handleBlur={e => this.handleBlur(e)}
                    value={this.props.value}
                />
            </div>
        )
    }
}


