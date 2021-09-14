
import React from 'react';
import {Field,ErrorMessage} from 'formik';
const Select =({name, ...props})=>{
    return (
        <div className="form-group">
         <Field as="select" name={name} >
                        <option value="">--Choose {name}--</option>
                        {
                           props.options? props.options.map((option,i)=>{
                               return <option key={i} value={option._id}>{option.name}</option>
                            }) : ''
                        }
            </Field>
        <ErrorMessage className="error" name={name}/>
    </div>
    )
}

export default Select;