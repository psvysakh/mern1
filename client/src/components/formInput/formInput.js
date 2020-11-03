import React from 'react';
const FormInput=({handleChange,label, ...otherProps})=>{
    return(
        <div className="form-group">
            
            <input 
            className="form-control"
            {...otherProps}
            placeholder={label}
            onChange={handleChange}
            />
        </div>
        
    )
}

export default FormInput;