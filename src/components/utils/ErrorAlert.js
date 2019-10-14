import React from 'react'


const ErrorAlert = (props) => {
    
    return(
        <div className={ props.msg !== "" ? 'alert alert-success fixed active' : 'alert alert-success fixed' } role="alert">{props.msg}</div>
    )
}   

        
export default ErrorAlert;