import React, { Component } from 'react'
import '../stylesheets/photo.css'
import Camera from '../stylesheets/camera.svg'
const Photo = (props) => {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     input_file_path:'',
  //     input_file: null,
  //     url: '',
  //     progress: Number
  //   }
  // }
  // handleChange = (e) => {
  //   const file = e.target.files[0]
  //   const img_path=(window.URL || window.webkitURL).createObjectURL(file)
  //   console.log(img_path);


  //   this.setState({
  //     input_file: file,
  //     input_file_path:img_path
  //   }, () => {
  //     //set state callbacks post image to firebase and get url
  //     const { input_file } = this.state
  //     const uploadTask = firebase_storage.ref(`images/${input_file.name}`).put(input_file);
  //     uploadTask.on('state_changed',
  //       (snapshot) => {
  //         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //         this.setState({ progress });
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         firebase_storage.ref('images').child(input_file.name).getDownloadURL().then(url => {
  //           console.log(url);
  //           this.setState({ url });
  //         })
  //       });
  //   })

  // }

  // //after update state
  // componentDidUpdate(){
  //   //update user avatar_url
  //   if(this.state.url){
  //     axios.put(`https://bigfish100.herokuapp.com/users/${this.props.id.toString()}`,{
  //       user:{
  //         avatar_url:this.state.url
  //       }
  //     })
  //     .then(res=>console.log(res))
  //     .catch(err=>console.log(err))
  //   }
  // }

  let img_src = props.input_file_path || props.img || '/avatar_default.jpg'
  let input_ref = null
  return (
    <div>
      <div
        className="photo-container"
        onClick={e => input_ref.click()}
        style={{ backgroundImage: `url(${img_src})` }}
      >
        {/* <Camera /> */}
        <img src={Camera} />
      </div>
      <input
        type="file"
        ref={ref => { input_ref = ref }}
        onChange={props.handleChange}
        style={{ display: "none" }} />
    </div>
  )
}
export default Photo

