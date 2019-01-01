import React from 'react'
import styles from '../stylesheets/loginsignup.module.sass'

export default function Button({
  click,
  canSubmit,
  textName
}) {
  return (
    <div >
      <button
        className={styles.form_button}
        type="button"
        onClick={click}
        disabled={!canSubmit}
      >
        {textName}
      </button>
    </div>
  )
}

