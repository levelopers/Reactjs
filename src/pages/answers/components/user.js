import React from 'react'
import styles from '../stylesheets/user.module.sass'
import portrait from '../../../assets/avatar_default.jpg'
const User = ({
  users,
  user_id
}) => {
  const user = users.find(userObj => user_id === userObj.id)
  if (!user) return null
  var options = { year: 'numeric', month: 'short', day: 'numeric' };
  return (
    <div>
      {
        <div key={`${user_id}`} className={styles.user_box}>
          <div className={styles.img_box}>
            <img src={user.avatar_url || portrait} alt="portrait" className={styles.img} />
          </div>
          <div className={styles.user_info}>
            <div className={styles.name}>
              {user.name}
            </div>
            <div className={styles.date}>
              Answered&nbsp;
              {new Date(user.updated_at).toLocaleDateString('en-US', options)}
            </div>
          </div>
        </div>
      }
    </div>
  )
}
export default User