import React from 'react'

const User =({
users,
user_id
})=>{
  return (
    <div>
      {users.map(user=>
            user_id === user.id &&
            <div key={`${user.id}`}>
            {user.name}
            {new Date(user.updated_at).toString().split(' ').slice(1, 4).join('-')}
          </div>
        )}
    </div>
  )
}
export default User