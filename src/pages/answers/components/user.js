import React from 'react'
import styles from '../stylesheets/user.module.sass'
const User = ({
  users,
  user_id
}) => {
  return (
    <div>
      {users.map(user =>
        user_id === user.id &&
        <div key={`${user.id}`} className={styles.user_box}>
          <div className={styles.img_box}>
            <img src={user.avatar_url} alt="portrait" className={styles.img} />
          </div>
          <div className={styles.user_info}>
            <div className={styles.name}>
              {user.name}
            </div>
            <div className={styles.date}>
              Answered&nbsp; 
              {new Date(user.updated_at).toString().split(' ').slice(1, 3).join(' ')
              .concat(',')
              .concat(
                new Date(user.updated_at).toString().split(' ').slice(3, 4)
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default User