import React from 'react';
import {Field, ErrorMessage} from 'formik';
import TextError from './textError';
 
const Input=(props)=>{
    const {name, label, ...rest} = props;
    return(
        <div className="form-group">
            <Field id={name} name={name} {...rest} placeholder={name} className="form-control" />
            <ErrorMessage name={name} component={TextError} />
            
        </div>
        
    )
}

export default Input;