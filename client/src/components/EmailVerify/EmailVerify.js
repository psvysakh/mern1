
import React, { useState } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Formik , Form , Field} from 'formik';
import * as Yup from 'yup';

import FormInput from '../formInput/formInput';

import CustomButton from '../customButton/customButton';
import Loader from '../loader/loader';
import ErrorMessage from '../errorMessage/errorMessage';
import Layout from '../Layout/layout';
import { errorAutoClear,verifyToken } from '../../redux/auth/auth.action';

import './emailVerify.scss';


const EmailVerify=({verifyToken,history,loading,error,errorClear})=>{
   
    /* const [tokenValue,setTokenValue]=useState({
       token:''
    });
    
 
    const {token}=tokenValue;
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setTokenValue({...tokenValue,[name]:value});
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        verifyToken({token,history});
        setTokenValue({...tokenValue});
    } */
    const initialValues={
        token:''
}
const onSubmit=({token})=>{
    verifyToken({token,history});
}

const validationSchema=Yup.object({
    token:Yup.string()
    .required('Token is required')
    
});


   
   
return(
       <Layout>
            <div className="verify">
                    <h2>Verify Email</h2>
                    <p>Enter your token</p>
                  
                    <ErrorMessage error={error} errorClear={errorClear}/>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        >
                            <Form>
                                 <Field 
                                  name="token" 
                                  type="token" 
                                  label="token"
                                  component={FormInput}/>
                                    
                                <CustomButton 
                                label="signin"
                                type="submit"
                                value="submit" >
                                    {loading ? <Loader/> : 'VERIFY'}
                                </CustomButton>

                            </Form>
                        </Formik>
                   
        </div>
       </Layout>

)
}
const mapStateToProps=state=>({
    error:state.auth.errors,
    loading:state.auth.requesting
    });
const maspDispatchToProps=dispatch=>({
    verifyToken:(data)=>dispatch(verifyToken(data)),
    errorClear:()=>dispatch(errorAutoClear())
});
export default withRouter(connect(mapStateToProps,maspDispatchToProps)(EmailVerify));