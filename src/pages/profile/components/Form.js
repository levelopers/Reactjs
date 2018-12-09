import React, { Component } from 'react'
import '../stylesheets/form.css'
import FormComponent from './FormComponent'
import FromShow from './FormShow'
// todo
// git work flow

//todo
// server call?

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: {
        type: 'text',
        lablename: 'title',
        value: 'call me maybe',
        valueBuffer: '',
        isHover: false,
        isEdit: false
      },
      gender: {
        type: 'radio',
        lablename: 'gender',
        value: 'male',
        valueBuffer: '',
        isHover: false,
        isEdit: false
      },
      description: {
        type: 'text',
        lablename: 'description',
        value: 'some descriptionsome descriptionsome descriptionsome description',
        valueBuffer: '',
        isHover: false,
        isEdit: false
      }

    }
  }
  handleClick = (e, name) => {
    let buffer=this.state[name].value
    if(name==="description"){
      buffer=''
    }
    this.setState({
      [name]: {
        ...this.state[name],
        isEdit: true,
        isHover: false,
        valueBuffer: buffer
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
    if (e.target.name === "save") {
      this.setState({
        [name]: {
          ...this.state[name],
          isEdit: false,
          value: this.state[name].valueBuffer
        }
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

            obj.isEdit ?
              <div className="formcomponent">
              {/* todo: inner state? */}
                <FormComponent
                  type={obj.type}
                  classname={obj.lablename}
                  labelName={obj.lablename}
                  change={e => this.handleChange(e, name)}
                  submit={e => this.handleSubmit(e, name)}
                  value={obj.valueBuffer}
                />
              </div>
              :
              <div className="formshow">
                <FromShow
                  classname={obj.lablename}
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



