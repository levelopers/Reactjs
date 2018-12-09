import FormInput from './components/FormInput'
import React, { Component } from 'react'

class Base extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <FormInput
          name={this.props.name}
          message={this.props.message}
          handleChange={e => this.props.handleChange(e)}
          handleBlur={e => this.props.handleBlur(e)}
          value={this.props.value}
        />
      </div>
    )
  }
}

export default Base


