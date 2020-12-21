import React from 'react';

const ErrorMessage =({error,errorClear})=>{
    const showError=()=>{
        setTimeout(()=>{
                errorClear();
            },5000);
       return <div className="alert alert-danger" role="alert" style={{display: error ? '' : 'none'}}>{error}</div>
    }
    return(
        error ? showError() : ''
    )
}

export default ErrorMessage;