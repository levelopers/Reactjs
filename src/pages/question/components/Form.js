import styles from '../stylesheets/question.module.sass'
import React from 'react'
const Form = ({
  inputValue,
  textareaValue,
  handleTitleChange,
  handleContentChange,
  handleButton
}) => {
  return (
    <div className={styles.form_outbox}>
      <form className={styles.form_form}>
        <input
          type='text' className={styles.form_input}
          placeholder='Title'
          onChange={e => handleTitleChange(e)}
          value={inputValue} />
        <textarea
          className={styles.form_textArea}
          placeholder='Content'
          cols={20}
          onChange={e => handleContentChange(e)}
          value={textareaValue} />
      </form>
      <button
        className={styles.form_button}
        onClick={e => handleButton(e)}>
        Ask
        </button>
    </div>
  )
}
export default Form