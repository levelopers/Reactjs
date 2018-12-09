import React, { Component } from 'react'
import '../stylesheets/formshow.css'

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
        { classname  !== "title" &&
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
          {/* todo inline? */}
            <a href='#' onClick={click}><Pencil />
            {/* todo 代码整洁 */}
           <div>Edit</div> 
            </a>

          </div>
          }
        </div>
      </div>
    </div>

  )
}

export default FormShow

// todo no need
function Pencil() {
  return (
    <svg width="26px" height="25px" viewBox="0 0 26 25" version="1.1" xmlns="http://www.w3.org/2000/svg" >
      <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="button/edit" transform="translate(0.000000, -2.000000)" fill="#ED5736" fill-rule="nonzero">
          <g id="pencil-edit-button" transform="translate(0.000000, 2.000000)">
            <path d="M15.6016603,4.18050285 L20.7055503,9.28434535 L7.78619545,22.2037002 L2.68519924,17.0998577 L15.6016603,4.18050285 Z M24.5784156,2.94957306 L22.302277,0.673434535 C21.4226281,-0.206214421 19.99426,-0.206214421 19.1116224,0.673434535 L16.9313093,2.85374763 L22.0351992,7.95763757 L24.5784156,5.41442125 C25.2606736,4.73211575 25.2606736,3.63183112 24.5784156,2.94957306 Z M0.0142314991,24.2737192 C-0.0786527514,24.6917457 0.298766603,25.0663188 0.716840607,24.9646584 L6.40426945,23.5856736 L1.30327324,18.4818311 L0.0142314991,24.2737192 Z" id="Shape"></path>
          </g>
        </g>
      </g>
    </svg>
  )
}