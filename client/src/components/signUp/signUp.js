import React, {  useState } from 'react';

import {connect} from 'react-redux';
import FormInput from '../formInput/formInput';
import CustomButton from '../customButton/customButton';
import { errorAutoClear, signUpStart } from '../../redux/auth/auth.action';

import './signup.scss';

const SignUp=({signUpStart,signUpState,errorClear})=>{


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
    
    let element;
    if(signUpState.errors){
        setTimeout(()=>{
            errorClear();
        },5000);
    element=(
        <div className="alert alert-danger" role="alert">{signUpState.errors}</div>
    )
    }else{
        element='';
    }
  
    return(
        <div className="signup">
            <h2>Don't have an account ?</h2>
            <p>SignUp with email and password</p>
            {element}
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
signUpState:state.auth
});
const mapDispatchToProps=dispatch=>({
    signUpStart:(data)=>dispatch(signUpStart(data)),
    errorClear:()=>dispatch(errorAutoClear())
})
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);