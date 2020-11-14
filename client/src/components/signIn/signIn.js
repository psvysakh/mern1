
import React, { useState } from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


import FormInput from '../formInput/formInput';
import CustomButton from '../customButton/customButton';
import {signInStart,errorAutoClear } from '../../redux/auth/auth.action';


import './signin.scss';

const SignIn=({signInStart,signInState,errorClear,match})=>{
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
    let element;
    if(signInState.errors){
        setTimeout(()=>{
            errorClear();
        },5000);
    element=(
        <div className="alert alert-danger" role="alert">{signInState.errors}</div>
    )
    }else{
        element='';
    }
  
return(
        <div className="signin">
            <h2>Have an account ?</h2>
            <p>Sign In with your Email</p>
            {element}
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
               
               <div className="forgot">
                    <Link  to={`${match.path}/reset`}>forgot password?</Link>
                </div>
            </form>
           
    </div>
)
}
const mapStateToProps=state=>({
signInState:state.auth
});
const mapDispatchToProps=dispatch=>({
    signInStart:(data)=>dispatch(signInStart(data)),
    errorClear:()=>dispatch(errorAutoClear())
});
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignIn));