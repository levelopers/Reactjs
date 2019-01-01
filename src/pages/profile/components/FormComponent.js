import styles from '../stylesheets/formcomponent.module.sass'
import React, { Component } from 'react'

export default class FormComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      male: {
        display: 'block'
      },
      female: {
        display: 'none'
      },
      placeholder: ''
    }
  }
  componentDidMount() {
    if (this.props.value === "female") {
      this.setState({
        male: {
          display: 'none'
        },
        female: {
          display: 'block'
        }
      })
    } else {
      switch (this.props.lablename) {
        case "title":
          this.setState({
            placeholder: 'please enter your name'
          })
          break;
        case "description":
          this.setState({
            placeholder: 'Short Description'
          })
          break;
        default:
          this.placeholder = ''
      }
    }
  }
  handleRadioCheck = (e, targetValue) => {
    const obj = { target: { value: null } }
    switch (targetValue) {
      case "male":
        obj.target.value = targetValue
        this.props.change(obj, 'gender')
        this.setState({
          male: {
            display: 'block'
          },
          female: {
            display: 'none'
          }
        });
        break;
      case "female":
        obj.target.value = targetValue
        this.props.change(obj, 'gender')
        this.setState({
          male: {
            display: 'none'
          },
          female: {
            display: 'block'
          }
        });
        break;
      default: return null
    }
  }
  render() {
    const {
      type,
      lablename,
      change,
      value,
      submit
    } = this.props
    return (
      <div className={styles.input_outbox}>
        {/* custom type radio input by css */}
        {lablename === "gender" ?
          <div className={styles.gender_inner}>
            <div className={styles.genders}>
              <div onClick={e => this.handleRadioCheck(e, "male")} className={styles.radio}>
                <div className={styles.radio_inner} style={this.state.male} />
              </div>
              <label>Male</label>
            </div >
            <div className={styles.genders}>
              <div onClick={e => this.handleRadioCheck(e, "female")} className={styles.radio}>
                <div className={styles.radio_inner} style={this.state.female} />
              </div>
              <label>Female</label>
            </div>
          </div>
          :
          // render type text input
          <div className={styles.input}>
            <input type={type} onChange={change} value={value} placeholder={this.state.placeholder} />
          </div>
        }
        <div className={styles.btns}>
          <button name="save" onClick={submit}>Save</button>
          <button name="cancel" onClick={submit}>Cancel</button>
        </div>
      </div>
    )
  }
}
