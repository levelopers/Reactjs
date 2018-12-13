import React from 'react'
// import styles from '../stylesheets/formcomponent.sass'

const FormComponent = ({
    type,
    classname,
    change,
    value,
    submit
}) => {
    let ph = ''
    let checked;
    if(value==="male"){
        checked=true;
    }else if(value==="female"){
        checked=false;
    }
    switch (classname) {
        case "title":
            ph = 'please enter your name'
            break;
        case "description":
            ph = 'Short Description'
            break;
        
        default:
            ph = ''
    }
    return (
        <div className={classname}>
            {classname === "gender" ?
                <div className="gender_inner">
                    <input type={type} onChange={change} value="male" checked={checked} /><label>Male</label>
                    <input type={type} onChange={change} value="female" checked={!checked} /><label>Female</label>
                </div>
                :
                <input type={type} onChange={change} value={value} placeholder={ph}/>
            }
            <div className="formcomponent-btn">
                <button name="save" onClick={submit}>save</button>
                <button name="cancel" onClick={submit}> cancel</button>
            </div>
        </div>
    )
}
export default FormComponent;

