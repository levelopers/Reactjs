import React from 'react'
import '../stylesheets/photo.css'
import { ReactComponent as Camera } from '../stylesheets/camera.svg'
const Photo = (props) => {
  let img_src = props.input_file_path || props.img || '/avatar_default.jpg'
  let input_ref = null
  return (
    <div>
      <div
        className="photo-container"
        onClick={e => input_ref.click()}
        style={{ backgroundImage: `url(${img_src})` }}
      >
        <Camera />
      </div>
      <input
        type="file"
        accept="image/*"
        ref={ref => { input_ref = ref }}
        onChange={props.handleChange}
        style={{ display: "none" }} />
    </div>
  )
}
export default Photo

