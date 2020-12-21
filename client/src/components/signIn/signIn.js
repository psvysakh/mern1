
import React, { useState,useEffect } from 'react';
import {Link,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { Formik , Form , Field} from 'formik';
import * as Yup from 'yup';

import FormInput from '../formInput/formInput';
import CustomButton from '../customButton/customButton';
import Loader from '../loader/loader';
import ErrorMessage from '../errorMessage/errorMessage';
import {signInStart,errorAutoClear,messageAutoClear } from '../../redux/auth/auth.action';

import Layout from '../Layout/layout';

import './signin.scss';



const SignIn=({
    signInStart,
    error,
    errorClear,
    match,
    loading,
    isAuth,
    role,
    })=>{

   /*  const [userCredential,setUserCredential]=useState({
        email:'',
        password:''
    }); */
   /*  const {email,password}=userCredential; */
   /*  const handleChange=(e)=>{
        const {name,value}=e.target;
        setUserCredential({...userCredential,[name]:value});
    } */
   /*  const handleSubmit=async (e)=>{
        e.preventDefault();
        signInStart({userCredentials:{email,password}});
       
        setUserCredential({...userCredential});
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
            email:'',
            password:''
    }
    const onSubmit=values=>{
        signInStart(values);
    }
  
    const validationSchema=Yup.object({
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
     <div className="signin">
            <h2>Have an account ?</h2>
            <p>Sign In with your Email</p>
            <ErrorMessage error={error} errorClear={errorClear}/>
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

                    <Field  
                    name="password" 
                    type="password" 
                    label="Password" 
                    component={FormInput}/>

                    <CustomButton label="signin" type="submit" value="submit" >
                        {loading ? <Loader/> : 'SIGN IN'}
                    </CustomButton>
                    

                    <div className="forgot">
                        <Link  to={`${match.path}/reset`}>forgot password?</Link>
                    </div>
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
    signInStart:(data)=>dispatch(signInStart(data)),
    errorClear:()=>dispatch(errorAutoClear())
});
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignIn));