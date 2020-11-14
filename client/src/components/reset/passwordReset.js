import React, { useState } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import FormInput from '../../components/formInput/formInput';
import CustomButton from '../../components/customButton/customButton';
import { resetPassword } from '../../redux/auth/auth.action';


const PasswordReset=({resetPass,match,history})=>{
    const [passwordValue,setPasswordValue]=useState({password:''});

    const {password}=passwordValue;

    const handleChange=(e)=>{
            const {name,value}=e.target;
            setPasswordValue({...passwordValue,[name]:value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        resetPass({password,token:match.params.token,history});
    }   

    return(
        <div className="passreset">
        <h2>Changing Password</h2>
        <p>Enter your new Password</p>
                    <form onSubmit={handleSubmit}>
                        <FormInput 
                        name="password"
                        type="password"
                        label="password"
                        value={password} 
                        required
                        handleChange={handleChange}/>
                        <CustomButton 
                        label="submit"
                        type="submit"
                        value="submit" >Submit Reset</CustomButton>
                    </form>   
        </div>
           
    )
}
const mapDispatchToProps=dispatch=>({
    resetPass:(data)=>dispatch(resetPassword(data))
})

export default withRouter(connect(null,mapDispatchToProps)(PasswordReset));