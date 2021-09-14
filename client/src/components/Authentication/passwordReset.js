import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { Formik , Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../formikControl/formikControl';
import CustomButton from '../customButton/customButton';
import Loader from '../loader/loader';
import Authlayout from '../Layout/Authlayout';
import { resetPassFetch } from '../../apiCall/authApi';
import { toast } from 'react-toastify';


const PasswordReset=({match,history})=>{
    
    const [loading,setLoading]=useState(false);

    const initialValues={
        password:''
    }
    const onSubmit=({password})=>{
        setLoading(true);
        resetPassFetch({password,token:match.params.token})
        .then(res=>{
            setLoading(false);
            history.push('/signin');
            toast.success(res.data.message);
        })
        .catch(err=>{
            setLoading(false);
            history.push('/');
            toast.error(err.response.data.error);
        })
    }

    const validationSchema=Yup.object({
        password:Yup.string()
        .required('Password is required')
        .min(5,'Minimum 5 Characters needed')
        .matches(/\d/,"One digit is needed")

    }); 
  
    return(
        <Authlayout>
            <div className="passreset">
        <h2>Changing Password</h2>
        <p>Enter your new Password</p>
       
        <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <FormikControl  
                     control="input"
                     name="password" 
                     type="password" 
                     label="Password" 
                   />
                        
                    <CustomButton 
                        label="submit"
                        type="submit"
                        value="submit" >
                            {loading ? <Loader/> : 'SUBMIT RESET'}
                        </CustomButton>
                </Form>
            </Formik>
                     
        </div>
        </Authlayout>
           
    )
}


export default withRouter(PasswordReset);