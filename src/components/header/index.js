import React from 'react'
import './header.css'

const Header = (props) => {
  let img_src = props.input_file_path || props.img || '/avatar_default.jpg'
  return (
    <div className="header">
      <div className="logo">
        <h3>BIG FISH</h3>
      </div>
      <div className="portrait">
        <img src={img_src} alt="portrait" />
      </div>
    </div>
  )
}

export default Header