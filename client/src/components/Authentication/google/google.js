import React from 'react';
import { useDispatch } from 'react-redux';
import  GoogleLogin from 'react-google-login';
import './google.scss';
import { googleFetch } from '../../../apiCall/authApi';
import { signInSuccess } from '../../../redux/auth/auth.action';
import { toast } from 'react-toastify';

const Google=()=>{

    const dispatch=useDispatch();

    const responseGoogle= (res)=>{
        const accessToken=res.accessToken
        googleFetch(accessToken)
        .then(res=>{
            const {newtoken,role}=res.data;

            localStorage.setItem('JWT_TOKEN',newtoken);

            dispatch(signInSuccess({newtoken,role}));

            

            toast.success("Google SignIn Succes");
        })
        .catch(err=>{
            
            toast.error(err.response.data.error);
        });
    
   }

    return(
        <GoogleLogin
        clientId="580298208669-lbhqf67ulguuhi0siq9ad9dmis4370g3.apps.googleusercontent.com"
        buttonText="Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        className="btn btn-google"
        />
    )
}

export default Google;