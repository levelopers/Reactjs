import React from 'react'
import styles from '../stylesheets/question.module.sass'

export default function Conversation({
  question,
  answers,
  users,
}) {
  let user, content, answer
  if (Object.keys(question).length > 0) {
    if (answers.length > 0) {
      answers.map(ans => {
        if (ans.question_id === question.id) {
          answer = ans.all_answers[0]
          content = answer.content
          if (users.length > 0) {
            user = users.find(user =>
              user.id === ans.all_answers[0].user_id
            )
          }
        }
      })
    }
  }
  return (
    <div>
      <div 
      id={answer && answer.id}
       key={answer && answer.id} 
       className={styles.answer}
       >
        {user && user.name.concat(": ")}
        {content}
      </div>
    </div>
  )
}
