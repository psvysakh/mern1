import React from 'react';
import Select from '../formComponents/select';
import Input from '../formComponents/input';
import TextArea from '../formComponents/textarea';

const FormikControl =(props)=>{
    const {control, ...rest} = props;
    switch(control){
        case 'input':
            return <Input {...rest} />
        case 'textarea':
            return <TextArea {...rest} />
  
        case 'select':
            return <Select {...rest}/>
        case 'radio':
        case 'checkbox':
        default :
            return;
    }
}

export default FormikControl;