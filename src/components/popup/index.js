import React from 'react'
import ReactDOM from 'react-dom'
import PopupComponent from './component'

//const {style,context,handleClick,button,components} = props
export default function popup(props) {
  ReactDOM.render(<PopupComponent {...props} />, document.getElementById(props.root))
}





