import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Formik , Form , Field , ErrorMessage} from 'formik';
import * as Yup from 'yup';

import FormInput from '../formInput/formInput';
import CustomButton from '../customButton/customButton';
import Loader from '../loader/loader';
import { errorAutoClear,getResetForm } from '../../redux/auth/auth.action';

import './reset.scss';

const GetResetForm=({getResetForm,loading,error,errorClear})=>{

    /* const [emailValue,setEmailValue]=useState({email:''});

    const {email}=emailValue;

    const handleChange=(e)=>{
            const {name,value}=e.target;
            setEmailValue({...emailValue,[name]:value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        getResetForm({email});
    }    */
    const initialValues={
        email:''
    }
    const onSubmit=values=>{
        getResetForm(values);
    }

    const validationSchema=Yup.object({
        email:Yup.string()
        .required('Email is required')
        .email('Invalid Email')

    });
    const showError=()=>{
        if(error){
            setTimeout(()=>{
                errorClear();
            },5000);
        }
       return <div className="alert alert-danger" role="alert" style={{display: error ? '' : 'none'}}>{error}</div>
    }
    return(
        <div className="reset">
                    <h2>Need Password Recovery ?</h2>
                    <p>Enter your email</p>
                  
                    {showError()} 
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        >
                            <Form>
                                    
                                <Field 
                                 name="email" 
                                 type="email" 
                                 label="Email" 
                                 component={FormInput}/>
                                   
                                <CustomButton 
                                label="reset"
                                type="submit"
                                value="submit" >
                                    {loading ? <Loader/> : 'RECOVER PASSWORD'}
                                </CustomButton>

                            </Form>
                        </Formik>
                   
        </div>
           
    )
}
const mapStateToProps=state=>({
    error:state.auth.errors,
    loading:state.auth.requesting
    });
const mapDispatchToProps=dispatch=>({
    getResetForm:(data)=>dispatch(getResetForm(data)),
    errorClear:()=>dispatch(errorAutoClear())
});

export default connect(mapStateToProps,mapDispatchToProps)(GetResetForm);