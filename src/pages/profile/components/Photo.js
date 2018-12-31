import React from 'react'
import '../stylesheets/photo.css'
import Camera from '../stylesheets/camera.svg'
const Photo = (props) => {
  let img_src = props.input_file_path || props.img || '/avatar_default.jpg'
  let input_ref = null
  return (
    <div>
      <div
        className="photo-container"
        onClick={e => input_ref.click()}
      >
        <div className="photo">
          <img src={img_src} alt="photo" />
        </div>
        <div className="camera">
          <img src={Camera} alt="camera" />
        </div>
      </div>
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        ref={ref => { input_ref = ref }}
        onChange={props.handleChange}
        style={{ display: "none" }} />
    </div>
  )
}
export default Photo

