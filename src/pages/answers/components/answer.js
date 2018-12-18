import React from 'react'
import User from './user'

const Answer = ({
  answers,
  users
}) => {

  return (
    <div>
      {answers.map(ans =>
        <div>
          <User users={users} user_id={ans.user_id} />
          <div key={`${ans.id}`}>
            {ans.content}
          </div>
        </div>
      )
      }
    </div>
  )
}
export default Answer