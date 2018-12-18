import React from 'react'
import styles from '../stylesheets/question.module.sass'
export default function Question({
    questions,
    question_id
}) {
  return (
    <div className={styles.question_outbox}>
      {questions.map(ques=>
        ques.id===question_id &&
        <div key={ques.id} className={styles.question_title}>
            {ques.title}
        </div>
        )}
    </div>
  )
}
