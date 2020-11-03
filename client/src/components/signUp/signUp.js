import React, {  useState } from 'react';

import {connect} from 'react-redux';
import FormInput from '../formInput/formInput';
import CustomButton from '../customButton/customButton';
import { msgSignUpAutoClear, signUpStart } from '../../redux/auth/auth.action';

import './signup.scss';

const SignUp=({signUpStart,msgAutoClear,errorMsg})=>{


    const [signUpData,setSignUpData]=useState({
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
        <div className="signup">
            <h2>Don't have an account ?</h2>
            <p>SignUp with email and password</p>
            {errorMsg ? formvalidationMsg(errorMsg) :''}
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput 
                name="name"
                type="text"
                label="Name"
                value={name}
                required
                handleChange={handleChange}/>
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
                label="signup"
                type="submit"
                value="submit" >SIGN UP</CustomButton>
                
            </form>
          
        </div>
    )
}
const mapStateToProps=state=>({
    errorMsg:state.auth.signUp.errorMsg
})
const mapDispatchToProps=dispatch=>({
    signUpStart:(data)=>dispatch(signUpStart(data)),
    msgAutoClear:()=>dispatch(msgSignUpAutoClear())
})
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);