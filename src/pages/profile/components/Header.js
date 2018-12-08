import React, { Component } from 'react'
import '../stylesheets/header.css'

export default class Header extends Component {
  
  render() {
    let img_src=this.props.input_file_path||this.props.img||'/avatar_default.jpg'

    return (
      <div className="header">
        <div className="logo">
        <h3>BIG FISH</h3>
        </div>
        <div className="portrait">
        <img src={img_src} alt="portrait"/>
        </div>
      </div>
    )
  }
}
