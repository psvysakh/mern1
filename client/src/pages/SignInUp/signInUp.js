import React from 'react';
import {Route} from 'react-router-dom';

import SignUp from '../../components/signUp/signUp';
import SignIn from '../../components/signIn/signIn';

import Google from '../../components/google/google';


import 'react-toastify/dist/ReactToastify.css';
import './signInUp.scss';




const SignInUpPage =()=>{

   
    return(
    <section className="authentication">
        <div className="container">
            <div className="spacer-small"></div>
            
                <div className="row">
                    <div className="col-lg-5">
                        <div className="wrapper">
                            <div className=" thirdParty">
                                <h2>Signin with</h2>
                                <Google/>
                            </div>
                            <Route exact path="/signin" 
                            render={()=>(
                                <SignIn/>
                            )              
                            }
                            />
                            <Route exact path="/signup" 
                            render={()=>(
                                    <SignUp/>
                            )              
                            }
                            />
                        </div>
                    </div>
                   
               </div>   
        </div>
    </section>
    )
}



export default SignInUpPage;