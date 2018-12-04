import React, { Component } from 'react'
import '../stylesheets/header.css'

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
        <h3>BIG FISH</h3>
        </div>
        <div className="portrait">
        <img src={'/avatar_default.jpg'} alt="portrait"/>
        </div>
      </div>
    )
  }
}
