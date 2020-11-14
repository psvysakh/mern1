import React, { useState } from 'react';
import {connect} from 'react-redux';

import FormInput from '../formInput/formInput';
import CustomButton from '../customButton/customButton';
import { getResetForm } from '../../redux/auth/auth.action';

import './reset.scss';

const GetResetForm=({getResetForm})=>{

    const [emailValue,setEmailValue]=useState({email:''});

    const {email}=emailValue;

    const handleChange=(e)=>{
            const {name,value}=e.target;
            setEmailValue({...emailValue,[name]:value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        getResetForm({email});
    }   

    return(
        <div className="reset">
                    <h2>Need Password Recovery ?</h2>
                    <p>Enter your email</p>
                  
                   
                    <form onSubmit={handleSubmit}>
                        <FormInput 
                        name="email"
                        type="email"
                        label="Email"
                        value={email} 
                        required
                        handleChange={handleChange}/>
                        <CustomButton 
                        label="reset"
                        type="submit"
                        value="submit" >Recover Password</CustomButton>
                    </form>   
        </div>
           
    )
}
const mapDispatchToProps=dispatch=>({
    getResetForm:(data)=>dispatch(getResetForm(data))
});

export default connect(null,mapDispatchToProps)(GetResetForm);