import React from 'react';
import './formInput.scss';
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