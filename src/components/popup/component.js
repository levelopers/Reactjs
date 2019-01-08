import React, { Component } from 'react'
import styles from './popup.module.sass'

export default class popupComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: true,
      show: 'visible',
      opacity: "0"
    }
  }
  componentWillReceiveProps() {
    this.setState({
      show: 'visible',
      isOpen: true,
      opacity: '1',
    })
  }
  handleCloseClick = () => {
    this.setState({
      isOpen: false,
      show: 'hidden',
      opacity: '0'
    })
  }
  _stopPropergation = (e) => {
    e.stopPropagation()
  }
  componentDidMount() {
    this.setState({ opacity: "1" })
  }
  render() {
    console.log(this.state.opacity);
    return (
      // this.state.isOpen
      //   ?
      <div style={{
        visibility: this.state.show,
        opacity: this.state.opacity
      }}
        className={styles.outbox}
        onClick={this.handleCloseClick} >
        <div
          style={this.props.style}
          className={styles.children_components}
          onClick={this._stopPropergation}
        >
          {this.props.context}
          {this.props.button &&
            <div className="button">
              <button onClick={this.props.handleClick}>{this.props.button}</button>
            </div>
          }
          {this.props.components &&
            this.props.components.map(c =>
              c
            )}
          <div className={styles.close} onClick={this.handleCloseClick}>&times;</div>
        </div>
      </div>
      // : null
    )
  }
}
