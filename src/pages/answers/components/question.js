import React from 'react'
import styles from '../stylesheets/question.module.sass'
import Dotdotdot from 'react-dotdotdot'
export default function Question({
  questions,
  question_id
}) {
  return (
    <div className={styles.question_outbox}>
      {questions.map(ques =>
        ques.id === question_id &&
        <div key={ques.id}>
          <div className={styles.question_title}>
            <Dotdotdot clamp={2}>
              {ques.title}
            </Dotdotdot>
          </div>
          <Dotdotdot clamp={3}>
            {ques.content}
          </Dotdotdot>
        </div>
      )}
    </div>
  )
}
