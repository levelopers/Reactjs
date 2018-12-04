import React, { Component } from 'react'

const FormComponent = ({
    type,
    classname,
    change,
    value,
    submit
}) => {
    
    return (
        <div className={classname}>
            <input type={type} onChange={change} value={value}/>
            <button name="save" onClick={submit}>save</button>
            <button name="cancel" onClick={submit}> cancel</button>
        </div>
    )
}
export default FormComponent;

