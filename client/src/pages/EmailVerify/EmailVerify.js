
import React, { useState } from 'react';

import {connect} from 'react-redux';

import FormInput from '../../components/formInput/formInput';
import CustomButton from '../../components/customButton/customButton';
import { verifyToken } from '../../redux/auth/auth.action';




const EmailVerify=({verifyToken,history})=>{
   
    const [tokenValue,setTokenValue]=useState({
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
    }
  
   
   
return(
    <section className="Home-page">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 offset-md-3">
                    <h2>Email Verification</h2>
                    <form onSubmit={handleSubmit}>
                        <FormInput 
                        name="token"
                        type="token"
                        label="token"
                        value={token} 
                        required
                        handleChange={handleChange}/>
                        <CustomButton 
                        label="signin"
                        type="submit"
                        value="submit" >Verify</CustomButton>
                    </form>   
                </div>
            </div>
        </div>
    </section>
)
}

const maspDispatchToProps=dispatch=>({
    verifyToken:(data)=>dispatch(verifyToken(data))
});
export default connect(null,maspDispatchToProps)(EmailVerify);