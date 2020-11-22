import React, {  useState } from 'react';
import { Formik , Form , Field , ErrorMessage} from 'formik';
import * as Yup from 'yup';

import {connect} from 'react-redux';
import FormInput from '../formInput/formInput';
import CustomButton from '../customButton/customButton';
import Loader from '../loader/loader';
import { errorAutoClear, signUpStart } from '../../redux/auth/auth.action';



import './signup.scss';

const SignUp=({signUpStart,loading,error,errorClear})=>{


    /* const [signUpData,setSignUpData]=useState({
        name:'',
        email:'',
        password:''
    });

 
    const {name,email,password}=signUpData;
    const handleChange=(event)=>{
        setSignUpData({...signUpData,[event.target.name]:event.target.value});
    }


    const handleSubmit=async(e)=>{
        e.preventDefault();
        signUpStart({userCredentials:{name,email,password}});
        
        setSignUpData({
           ...signUpData
        })
    } */
    const initialValues={
        name:'',
        email:'',
        password:''
    }
    const onSubmit=values=>{
        signUpStart(values);
    }

    const validationSchema=Yup.object({
        name:Yup.string()
        .required('Name is required'),
        email:Yup.string()
        .required('Email is required')
        .email('Invalid Email'),
        password:Yup.string()
        .required('Password is required')
        .min(5,'Minimum 5 Characters needed')
        .matches(/\d/,"One digit is needed")

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
        <div className="signup">
            <h2>Don't have an account ?</h2>
            <p>SignUp with email and password</p>
            {showError()}
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
                <Form>
                        
                    <Field 
                    name="name" 
                    type="text" 
                    label="Name"
                    component={FormInput}/>
                       
                    <Field 
                    name="email" 
                    type="email" 
                    label="Email" 
                    component={FormInput}/>
                       
                        
                    <Field 
                     name="password" 
                     type="password" 
                     label="Password" 
                     component={FormInput}/>
                        
                    <CustomButton 
                    label="signup"
                    type="submit"
                    value="submit" >
                         {loading ? <Loader/> : 'SIGN UP'}
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
    signUpStart:(data)=>dispatch(signUpStart(data)),
    errorClear:()=>dispatch(errorAutoClear())
})
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);