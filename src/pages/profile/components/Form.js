import React, { Component } from 'react'
import '../stylesheets/form.css'
import FormComponent from './FormComponent'
import FromShow from './FormShow'
import axios from 'axios'

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: {
        type: 'text',
        lablename: 'title',
        value:  this.props.name||'call me maybe',
        valueBuffer: '',
        isHover: false,
        isEdit: false,
        api_name: 'name'
      },
      gender: {
        type: 'radio',
        lablename: 'gender',
        value: this.props.gender||'male',
        valueBuffer: '',
        isHover: false,
        isEdit: false,
        api_name: ''
      },
      description: {
        type: 'text',
        lablename: 'description',
        value: this.props.description || 'some descriptionsome descriptionsome descriptionsome description',
        valueBuffer: '',
        isHover: false,
        isEdit: false,
        api_name: 'description'
      }

    }
  }
  
  
  handleClick = (e, name) => {
    let buffer = this.state[name].value
    if (name === "description") {
      buffer = ''
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
      }, () => {
        let put_obj = {
          user: {}
        }
        put_obj.user[this.state[name].api_name] = this.state[name].value
        console.log(put_obj);

        axios.put(`https://bigfish100.herokuapp.com/users/${this.props.id.toString()}`, put_obj)
          .then(res => console.log(res.data.user.name))
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
    console.log(this.state);
    
    return (
      <div className="form-box">
        {
          Object.entries(this.state).map(([name, obj]) =>
            obj.isEdit ?
              <div className="formcomponent">
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



