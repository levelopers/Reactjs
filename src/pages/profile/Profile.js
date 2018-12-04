import React, { Component } from 'react'
import Header from './components/Header'
import FormInput from './components/FormInput'
import Photo from './components/Photo'
import './stylesheets/profile.css'

export default class Profile extends Component {


  render() {
    return (
      <div className="profile">
        <Header />
        <div className="content">
          <div className="box">
            <Photo />
            <FormInput />
          </div>
        </div>
      </div>
    )
  }
}
