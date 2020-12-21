import React, {  useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik , Form , Field } from 'formik';
import * as Yup from 'yup';

import {connect} from 'react-redux';
import FormInput from '../formInput/formInput';
import CustomButton from '../customButton/customButton';
import Loader from '../loader/loader';
import ErrorMessage from '../errorMessage/errorMessage';
import { errorAutoClear, signUpStart } from '../../redux/auth/auth.action';

import Layout from '../Layout/layout';


import './signup.scss';

const SignUp=({signUpStart,loading,error,errorClear,isAuth,
    role})=>{


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

    const redirectUser=()=>{
        if(isAuth){
            if(role===1){
                return <Redirect to="/adminDashboard"/>
            }else{
               return <Redirect to="/userDashboard" />
            }
        }
    }
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
  
  
    return(
       <Layout>
           <div className="signup">
            <h2>Don't have an account ?</h2>
            <p>SignUp with email and password</p>
            <ErrorMessage error={error} errorClear={errorClear}/>
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
            {redirectUser()}
        </div>
       </Layout>
    )
}
const mapStateToProps=state=>({
error:state.auth.errors,
loading:state.auth.requesting,
isAuth:state.auth.isAuthenticated,
role:state.auth.role
});
const mapDispatchToProps=dispatch=>({
    signUpStart:(data)=>dispatch(signUpStart(data)),
    errorClear:()=>dispatch(errorAutoClear())
})
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);