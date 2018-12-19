import React from 'react'
import User from './user'
import styles from '../stylesheets/answer.module.sass'
const Answer = ({
  answers,
  users
}) => {
  return (
    <div className={styles.answer_outbox}>
      <div className={styles.answer_innerbox}>
        {answers.map(ans =>
          <div key={ans.id} className={styles.answer}>
            <User users={users} user_id={ans.user_id} />
            <div className={styles.content}>
              <p>{ans.content}</p>
            </div>
          </div>
        )
        }
      </div>
    </div>

  )
}
export default Answer