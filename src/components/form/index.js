import React, { Component } from 'react'

const Form = ({ configs, handleButton, button, styles }) => {
  const Types = ({ config, index }) => {
    switch (config.type) {
      case 'text':
        return <Input config={config} />
      case 'textArea':
        return <TextArea config={config} />
      default: return null
    }
  }
  const Input = ({ config }) => {
    return (
      <input
        type={config.type} className={styles.form_input}
        placeholder={config.placeholder}
        onChange={e => config.handleChange(e)}
        value={config.value} />
    )
  }
  const TextArea = ({ config }) => {
    return (
      <textarea
        type={config.type}
        className={styles.form_textArea}
        placeholder={config.placeholder}
        rows={config.rows}
        cols={config.cols}
        onChange={e => config.handleChange(e)}
        value={config.value} />
    )
  }
  return (
    <div className={styles.form_outbox}>
      <form className={styles.form_form}>
        {configs.map(config =>
          <Types config={config}
            key={configs.indexOf(config)}
            index={configs.indexOf(config)}
          />
        )}
      </form>
      <button
        className={styles.form_button}
        onClick={handleButton}>
        {button}
      </button>
    </div>
  )
}
export default Form
