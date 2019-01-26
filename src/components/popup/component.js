import React, { Component } from 'react'
import styles from './popup.module.sass'

const default_config = {
  isShow: false,
  title: '',
  message: '',
  buttons: [],
}

export default class PopupInstance extends Component {
  state = default_config
  /**
   * @public open a popup with config
   * @param {object} configs the configs of popup
   * @param {string} configs.message the text content of the popup
   * @param {[object]} configs.buttons define the configs of buttons, which includes,
   *                  text       ===> button text
   *                  onClick    ===> callback when click button
   *                  shouldHold ===> should close popup after clicking? default is true
   */
  open = (config) => {
    this.setState({ isShow: true, ...config })
  }
  close = () => {
    this.setState(default_config)
  }

  handleCloseClick = () => {
    this.setState(default_config)
  }

  render() {
    const { isShow, title, message, buttons } = this.state
    return (
      <div className={styles.outbox}
        style={isShow
          ? { opacity: "1", zIndex: "1" }
          : { opacity: "0", zIndex: "-1000" }
        }
      >
        <div className={styles.content}>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.message}>
            {message}
          </div>
          <div className={styles.buttons}>
            {buttons.map(({ text, click, shouldHold }, index) =>
              <div
                className={styles.btn}
                key={index}
                onClick={click || (() => !shouldHold && this.close())}
              >
                {text}
              </div>
            )}
          </div>
          <div className={styles.close} onClick={this.handleCloseClick}>
            &times;
          </div>
        </div>
      </div>
    )
  }
}
