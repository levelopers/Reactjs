import React, { Component } from 'react'
import { withRouter } from 'react-router'
export let navigation = null

class History extends Component {
  push = (path) => {
    this.props.history.push(path)
  }
  render() {
    return null
  }
}
export default withRouter(History)