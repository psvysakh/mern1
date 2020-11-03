import React from 'react';
import {connect} from 'react-redux';
import  GoogleLogin from 'react-google-login';
import { googleOAut } from '../../redux/auth/auth.action';

const Google=({googleAuthent})=>{

    const responseGoogle= (res)=>{
        googleAuthent({token:res.accessToken});
    
   }

    return(
        <GoogleLogin
        clientId="580298208669-lbhqf67ulguuhi0siq9ad9dmis4370g3.apps.googleusercontent.com"
        buttonText="Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        className="btn btn-outline-danger"
        />
    )
}
const mapDispatchToProps=dispatch=>({
    googleAuthent:(data)=>dispatch(googleOAut(data))
})
export default connect(null,mapDispatchToProps)(Google);