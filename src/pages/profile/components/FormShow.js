import React from 'react'
import '../stylesheets/formshow.css'
import Pencil from '../stylesheets/pencil.svg'
import Dotdotdot from 'react-dotdotdot'

const FormShow = ({
  lablename,
  content,
  hover,
  leave,
  isHover,
  click,
}) => {
  return (
    <div className={lablename}>
      <div className="formshow-box" onMouseLeave={leave}>
        {lablename !== "title" &&
          <div className="lable">
            <p>{lablename}</p>
          </div>
        }
        <div className="content" onMouseOver={hover}>
          <Dotdotdot clamp={3}>
            <p>
              {content.split(' ').map((item, key) => {
                return <span key={key}>{item}<br /></span>
              })}
            </p>
          </Dotdotdot>
        </div>
        {isHover &&
          <div className="formshow-edit">
            <div onClick={click}>
              <img src={Pencil} alt="" />
              <div id='edit'>Edit</div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default FormShow

