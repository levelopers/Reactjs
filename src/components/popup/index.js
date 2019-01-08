import React from 'react'
import ReactDOM from 'react-dom'
import PopupComponent from './component'

//{style,context,handleClick,button}
export default function popup(props) {
  ReactDOM.render(<PopupComponent {...props} />, document.getElementById(props.root))
}





