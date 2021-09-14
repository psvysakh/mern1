import React from 'react';

const ErrorMessage =({errors})=>{
    const showError=()=>{
       return <div className="alert alert-danger" role="alert" style={{display: errors ? '' : 'none'}}>{errors}</div>
    }
    return(
        errors ? showError() : ''
    )
}

export default ErrorMessage;