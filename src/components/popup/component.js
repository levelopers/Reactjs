import React, { Component } from 'react'
import styles from './popup.module.sass'

export default class popupComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: "0",
      visibility: 'hidden'
    }
  }
  componentWillReceiveProps() {
    this.setState({
      opacity: '1',
      visibility: 'visible'
    })
  }
  handleCloseClick = () => {
    this.setState({
      opacity: '0',
      visibility: 'hidden'
    })
  }
  _stopPropergation = (e) => {
    e.stopPropagation()
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ opacity: "1", visibility: 'visible' })
    }, 1);
  }
  render() {
    return (
      //animation style
      <div style={{
        opacity: this.state.opacity,
        visibility: this.state.visibility
      }}
        className={styles.outbox}
        onClick={this.handleCloseClick} >
        {/* custom style */}
        <div
          style={this.props.style}
          className={styles.children_components}
          onClick={this._stopPropergation}
        >
          {/* custom context */}
          {this.props.context}
          {/* custom button */}
          {this.props.button &&
            <div className="button">
              <button onClick={this.props.handleClick}>{this.props.button}</button>
            </div>
          }
          {/* other components */}
          {this.props.components &&
            this.props.components.map((c, index) =>
              <div key={index}>
                {c}
              </div>
            )}
          <div className={styles.close} onClick={this.handleCloseClick}>&times;</div>
        </div>
      </div>
    )
  }
}
