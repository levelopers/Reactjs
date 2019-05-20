import React from 'react'
import styles from '../stylesheets/logout.module.sass'
import Auth from '../../../modules/Auth'
import { go } from '../../../modules/Navigation'

export default function Logout() {
  return (
    <div className={styles.outbox}>
      <button onClick={() => { Auth.loggout(); go('/login') }}>logout</button>
    </div>
  )
}
