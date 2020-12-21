import React, { useState } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Formik , Form , Field} from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/formInput/formInput';
import CustomButton from '../../components/customButton/customButton';
import Loader from '../loader/loader';
import ErrorMessage from '../errorMessage/errorMessage';
import Layout from '../Layout/layout';
import { errorAutoClear,resetPassword } from '../../redux/auth/auth.action';


const PasswordReset=({resetPass,match,history,loading,error,errorClear})=>{
    /* const [passwordValue,setPasswordValue]=useState({password:''});

    const {password}=passwordValue;

    const handleChange=(e)=>{
            const {name,value}=e.target;
            setPasswordValue({...passwordValue,[name]:value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        resetPass({password,token:match.params.token,history});
    } */  
    const initialValues={
        password:''
    }
    const onSubmit=({password})=>{
        resetPass({password,token:match.params.token,history});
    }

    const validationSchema=Yup.object({
        password:Yup.string()
        .required('Password is required')
        .min(5,'Minimum 5 Characters needed')
        .matches(/\d/,"One digit is needed")

    }); 
  
    return(
        <Layout>
            <div className="passreset">
        <h2>Changing Password</h2>
        <p>Enter your new Password</p>
        <ErrorMessage error={error} errorClear={errorClear}/>
        <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <Field  
                     name="password" 
                     type="password" 
                     label="Password" 
                     component={FormInput}/>
                        
                    <CustomButton 
                        label="submit"
                        type="submit"
                        value="submit" >
                            {loading ? <Loader/> : 'SUBMIT RESET'}
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
const mapDispatchToProps=dispatch=>({
    resetPass:(data)=>dispatch(resetPassword(data)),
    errorClear:()=>dispatch(errorAutoClear())
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PasswordReset));