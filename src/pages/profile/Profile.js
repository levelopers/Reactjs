import React, { Component } from 'react'
import Header from './components/Header'
import Form from './components/Form'
import Photo from './components/Photo'
import axios from 'axios'
import './stylesheets/profile.css'
import firebase_storage from './utils/firebase/index'
import { connect } from 'react-redux'
import { getProfile } from '../../redux/actions/profileActions'



class Profile extends Component {
  constructor(props) {

    super(props)
    this.state = {
      id: localStorage.getItem('id'),
      name: '',
      email: localStorage.getItem('email'),
      gender: '',
      avatar_url: '',
      description: '',
      done: false,
      input_file_path: '',
      input_file: null,
      url: '',
      progress: Number
    }
    
  }
  //change image
  handleChange = (e) => {
    const file = e.target.files[0]
    const img_path = (window.URL || window.webkitURL).createObjectURL(file)

    this.setState({
      input_file: file,
      input_file_path: img_path
    }, () => {
      //set state callbacks post image to firebase and get url
      const { input_file } = this.state
      const uploadTask = firebase_storage.ref(`images/${input_file.name}`).put(input_file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({ progress });
        },
        (error) => {
          console.log(error);
        },
        () => {
          firebase_storage.ref('images').child(input_file.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({ url });
          })
        });
    })
  }
  //after update state
  componentDidUpdate() {
    //update user avatar_url
    if (this.state.url) {
      axios.put(`https://bigfish100.herokuapp.com/users/${this.state.id.toString()}`, {
        user: {
          avatar_url: this.state.url
        }
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  }

  componentDidMount() {

    // axios.get(`https://bigfish100.herokuapp.com/users/${this.state.id}`)
    //   .then(res => {
    //     const user = res.data.user
    //     this.setState({
    //       name: user.name,
    //       email: user.email,
    //       id: user.id,
    //       avatar_url: user.avatar_url,
    //       description: user.description,
    //       gender: user.gender,
    //       done: true
    //     })
    //     console.log(res);

    //   })
    this.props.getProfile()
  }

  render() {
    console.log(this.state);
    {!localStorage.getItem('user_key') && this.props.history.push('/login')}

    const user = this.props.user
      return (
        <div className="profile">
          <Header
            img={user.avatar_url}
            input_file_path={this.state.input_file_path}
            id={user.id}
            handleChange={this.handleChange}
          />
          <div className="content">
            <div className="box">
              <Photo
                img={user.avatar_url}
                input_file_path={this.state.input_file_path}
                id={user.id}
                handleChange={this.handleChange}
              />
              <Form
                id={user.id}
                email={user.email}
                name={user.name}
                gender={user.gender}
                description={user.description}
              />
            </div>
          </div>
        </div>
      )
  }
}

const mapStoretoProps = state => ({
  user: state.profile.user
})

// function mapStoretoProps(state){
//   return function(){

//   }
// }

export default connect(mapStoretoProps, { getProfile })(Profile)
