import React, { Component } from 'react'
import '../stylesheets/form.css'
import FormComponent from './FormComponent'
import FromShow from './FormShow'

export default class Form extends Component {
  constructor(props) {
    super(props);
    //input configs
    this.title = {
      type: 'text',
      lablename: 'title',
      api_name: 'name',
    }
    this.gender = {
      type: 'radio',
      lablename: 'gender',
      api_name: '',
    }
    this.description = {
      type: 'text',
      lablename: 'description',
      api_name: 'description'
    }
    this.state = {
      title: {
        ...this.title,
        value: this.props.name || 'call me maybe',
        valueBuffer: '',
        isHover: false,
        isEdit: false,
      },
      gender: {
        ...this.gender,
        value: this.props.gender || 'male',
        valueBuffer: '',
        isHover: false,
        isEdit: false,
      },
      description: {
        ...this.description,
        value: this.props.description || 'some descriptionsome descriptionsome descriptionsome description',
        valueBuffer: '',
        isHover: false,
        isEdit: false,
      }

    }
  }

  handleClick = (e, name) => {
    let buffer = this.state[name].value
    if (name === "description") {
      buffer = ''
    }
    //transform to isEdit state and set others is not edited
    Object.entries(this.state).map(([attr_name, obj]) => {
      if (attr_name === name) {
        this.setState({
          [name]: {
            ...this.state[name],
            isEdit: true,
            isHover: false,
            valueBuffer: buffer
          }
        })
      } else {
        this.setState({
          [attr_name]: {
            ...this.state[attr_name],
            isEdit: false,
            isHover: false,
          }
        })
      }
    })

  }
  handleHover = (e, name) => {
    this.setState({
      [name]: {
        ...this.state[name],
        isHover: true
      }
    })
  }
  handleLeave = (e, name) => {
    this.setState({
      [name]: {
        ...this.state[name],
        isHover: false
      }
    })
  }
  handleChange = (e, name) => {
    this.setState({
      [name]: {
        ...this.state[name],
        valueBuffer: e.target.value
      }
    })
  }
  handleSubmit = (e, name) => {
    //save input values and send update request
    if (e.target.name === "save") {
      this.setState({
        [name]: {
          ...this.state[name],
          isEdit: false,
          value: this.state[name].valueBuffer
        }
      }, () => {
        //put request update user info
        const attr = this.state[name].api_name
        this.props.updateProfile({
          [attr]: this.state[name].value
        })
      })
    } else {
      this.setState({
        [name]: {
          ...this.state[name],
          isEdit: false,
        }
      })
    }
  }
  render() {
    return (
      <div className="form-box">
        {
          Object.entries(this.state).map(([name, obj]) =>
            //render components upon isEdit state
            obj.isEdit ?
              <div className="formcomponent" key={`component-${name}`}>
                <FormComponent
                  type={obj.type}
                  lablename={obj.lablename}
                  change={e => this.handleChange(e, name)}
                  submit={e => this.handleSubmit(e, name)}
                  value={obj.valueBuffer}
                />
              </div>
              :
              <div className="formshow" key={`show-${name}`}>
                <FromShow
                  lablename={obj.lablename}
                  content={obj.value}
                  isHover={obj.isHover}
                  isEdit={obj.isEdit}
                  hover={(e) => this.handleHover(e, name)}
                  leave={e => this.handleLeave(e, name)}
                  click={(e) => this.handleClick(e, name)}
                />
              </div>
          )
        }
      </div>
    )
  }
}



