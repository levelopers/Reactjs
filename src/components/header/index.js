import React, { Component } from 'react'
import { withRouter } from 'react-router'
import './header.css'

// const Header = (props) => {
//   console.log(this.props);


//   return (
//     <div className="header">
//       <div className="logo">
//         <h3>BIG FISH</h3>
//       </div>
//       <div className="portrait" onClick={e=>handleClick(e,props)}>
//         <img src={img_src} alt="portrait" />
//       </div>
//     </div>
//   )
// }



class Header extends Component {
  constructor(props) {
    super(props)
  }
  handleClick = () => {
    this.props.history.push('/profile')
  }
  render() {
    let img_src = this.props.input_file_path || this.props.img || '/avatar_default.jpg'
    return (
      <div className="header">
        <div className="logo">
          <h3>BIG FISH</h3>
        </div>
        <div className="portrait" onClick={this.handleClick}>
          <img src={img_src} alt="portrait" />
        </div>
      </div>
    )
  }
}


export default withRouter(Header)