import React from 'react';
import {Route,withRouter} from 'react-router-dom';

import SignUp from '../../components/signUp/signUp';
import SignIn from '../../components/signIn/signIn';
import GetResetForm from '../../components/reset/reset';
import PasswordReset from '../../components/reset/passwordReset';

import Google from '../../components/google/google';


import 'react-toastify/dist/ReactToastify.css';
import './signInUp.scss';
import CustomButton from '../../components/customButton/customButton';





const SignInUpPage =({history})=>{

    return(
    <section className="authentication">
        <div className="container">
            <div className="spacer-small"></div>
            
                <div className="row">
                    <div className="col-lg-4">
                        <div className="wrapper">
                            <CustomButton
                            label="goback"
                            type="button"
                            onClick={history.goBack}
                            >C</CustomButton>
                            <div className=" thirdParty">
                                <h2>Signin with</h2>
                                <Google/>
                            </div>
                            <Route exact path="/signin" render={()=><SignIn/>}/>
                            <Route exact path="/signup" render={()=><SignUp/>}/>
                            <Route exact path="/signin/reset" render={()=><GetResetForm/>}/>
                            <Route exact path="/signin/reset/:token" render={()=><PasswordReset/>}/>
                        </div>
                    </div>
                   <div className="col-lg-8">
                        <div className="title">
                            <p>Buy Everything Online <br/> Get Valuable Gift. </p>
                        </div>
                   </div>
               </div>   
        </div>
    </section>
    )
}



export default withRouter(SignInUpPage);