import React, { Component } from 'react'
import '../stylesheets/formcomponent.css'
const FormComponent = ({
    type,
    classname,
    change,
    value,
    submit
}) => {
    let ph=''
    switch(classname){
        case "title":
        ph='please enter your name'
        break;
        case "description":
        ph='Short Description'
        break;
        default:
        ph=''
    }
    
    return (
        <div className={classname}>
            <input type={type} onChange={change} value={value} placeholder={ph}/>
            <div className="formcomponent-btn">
            <button name="save" onClick={submit}>save</button>
            <button name="cancel" onClick={submit}> cancel</button>
            </div>
        </div>
    )
}
export default FormComponent;

