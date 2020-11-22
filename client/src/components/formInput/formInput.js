import React from 'react';

import './formInput.scss';

const FormInput=({label,field,name,form:{touched,errors}, ...otherProps})=>{
 
    return(
        <div className="form-group">
            <input 
            className="form-control"
            placeholder={label}
            {...field}
            {...otherProps}
            />
            {touched[field.name] && errors[field.name]? <div className="error">{errors[field.name]}</div> : null}
        </div>
        
    )
}

export default FormInput;