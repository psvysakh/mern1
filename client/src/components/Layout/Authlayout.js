import React from 'react';
import {withRouter} from 'react-router-dom';


import Google from '../Authentication/google/google';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import './Layout.scss';
import CustomButton from '../customButton/customButton';





const AuthLayout =({history,children})=>{

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
                            ><FontAwesomeIcon icon={faChevronLeft}
                            style={{ marginRight:'5px' }}/></CustomButton>
                            <div className=" thirdParty">
                                <h2>Signin with</h2>
                                <Google/>
                            </div>
                           
                           {children}
                          
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



export default withRouter(AuthLayout);