import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { Formik , Form  } from 'formik';
import * as Yup from 'yup';


import FormikControl from '../formikControl/formikControl';
import CustomButton from '../customButton/customButton';
import Loader from '../loader/loader';

import Authlayout from '../Layout/Authlayout';


import './signup.scss';
import { signUpFetch } from '../../apiCall/authApi';
import { toast } from 'react-toastify';

const SignUp=()=>{

    const [loading,setLoading]=useState(false);
  
    const { isAuthenticated }=useSelector(state=>state.auth);


    const redirectUser=()=>{

        if(isAuthenticated){
            return <Redirect to="/"/>
        }

    }

    const initialValues={
        name:'',
        email:'',
        password:''
    }
    const onSubmit=values=>{
        setLoading(true);

        signUpFetch(values)
        .then(res=>{
            const {message}=res.data;

            setLoading(false);

            toast.success(message);
        })
        .catch(err=>{
            setLoading(false);

            toast.error(err.response.data.error);
        })
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
       <Authlayout>
           <div className="signup">
            <h2>Don't have an account ?</h2>
            <p>SignUp with email and password</p>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
                <Form>
                        
                    <FormikControl 
                    control="input"
                    name="name" 
                    type="text" 
                    label="Name"
                   />
                       
                    <FormikControl 
                    control="input"
                    name="email" 
                    type="email" 
                    label="Email" 
                   />
                       
                        
                    <FormikControl 
                    control="input"
                     name="password" 
                     type="password" 
                     label="Password" 
                    />
                        
                    <CustomButton 
                    label="signup"
                    type="submit"
                    value="submit" >
                         {loading ? <Loader/> : 'SIGN UP'}
                    </CustomButton>

                </Form>
            </Formik>
        </div>
        {redirectUser()}
       </Authlayout>
       
    )
}


export default SignUp;