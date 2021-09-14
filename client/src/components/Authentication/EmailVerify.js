
import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyFetch } from '../../apiCall/authApi';
import Loader from '../loader/loader';



import './emailVerify.scss';


const EmailVerify=({match,history})=>{
   
  const [loading,setLoading]=useState(false);  

  

useEffect(()=>{
    setLoading(true);
    verifyFetch(match.params.token)
    .then(res=>{
        setLoading(false);
        toast.success(res.data.message);
        history.push('/signin');
        
    })
    .catch(err=>{
        setLoading(false);
        toast.error(err.response.data.error);
        history.push('/');
    });
},[])
   
   
return(
      

       <div className="row">
           <div className="col-lg-12">
                
                {loading ? (
                    <div>
                        <h1>Processing</h1>
                        <Loader/>
                    </div>
                ):null}
           </div>
        </div>

)
}


export default withRouter(EmailVerify);


 {/* <Authlayout>
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
       </Authlayout> */}