import React from 'react';
import {Field,ErrorMessage} from 'formik';
import TextError from './textError';

const Select=(props)=>{
    const {name,label,options, ...rest} = props;
return(
    <div className="form-group">
        <Field as='select' name={name} {...rest} className="form-control">
            {
                options.map((option,i)=>{
                    return(
                        <option key={option._id} value={option._id}>{option.orderStatus}</option>
                    )
                })
            }
        </Field>
        <ErrorMessage name={name} component={TextError} />
    </div>
)
}

export default Select;