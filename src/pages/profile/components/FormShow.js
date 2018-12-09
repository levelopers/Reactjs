import React, { Component } from 'react'
import '../stylesheets/formshow.css'
import { ReactComponent as Pencil } from '../stylesheets/pencil.svg'

const FormShow = ({
  classname,
  lablename,
  content,
  hover,
  leave,
  isHover,
  click,
}) => {
  return (
    <div className={classname}>

      <div className="formshow-box" onMouseLeave={leave}>
        {classname !== "title" &&
          <div className="lable">
            <p>{lablename}</p>
          </div>
        }
        <div className="content" onMouseOver={hover}>
          <p  >
            {content}
          </p>
          {isHover &&
            <div className="formshow-edit">
              <a href='#' onClick={click}>
                <Pencil />
                <div id='edit'>Edit</div>
              </a>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default FormShow

