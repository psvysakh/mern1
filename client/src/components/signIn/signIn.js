
import React, { useState } from 'react';

import {connect} from 'react-redux';

import FormInput from '../formInput/formInput';
import CustomButton from '../customButton/customButton';
import { msgSignInAutoClear, signInStart } from '../../redux/auth/auth.action';


import './signin.scss';

const SignIn=({signInStart,msgAutoClear,errorMsg})=>{
    
    const [userCredential,setUserCredential]=useState({
        email:'',
        password:''
    });
    
 
    const {email,password}=userCredential;
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setUserCredential({...userCredential,[name]:value});
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        signInStart({userCredentials:{email,password}});
        setUserCredential({...userCredential});
    }
    const formvalidationMsg=(errorMsg)=>{
        setTimeout(()=>{
            msgAutoClear();
        },5000);
        return(
            <div className="alert alert-danger" role="alert">
                {errorMsg}
              </div>
        )
        
    } 
   
   
return(
        <div className="signin">
            <h2>If have an account</h2>
            <p>Sign In with your Email</p>
            {errorMsg ? formvalidationMsg(errorMsg):''}
            <form onSubmit={handleSubmit}>
                <FormInput 
                 name="email"
                type="email"
                label="Email"
                value={email} 
                required
                handleChange={handleChange}/>
        
                <FormInput 
                name="password"
                type="password"
                label="Password"
                value={password} 
                required
                handleChange={handleChange}/>
                <CustomButton 
                label="signin"
                type="submit"
                value="submit" >SIGN IN</CustomButton>
                
            </form>
           
    </div>
)
}
const mapStateToProps=state=>({
    errorMsg:state.auth.signIn.errorMsg,
    isAuth:state.auth.isAuthenticated
});
const maspDispatchToProps=dispatch=>({
    signInStart:(data)=>dispatch(signInStart(data)),
    msgAutoClear:()=>dispatch(msgSignInAutoClear())
});
export default connect(mapStateToProps,maspDispatchToProps)(SignIn);