import React from 'react';
import {withRouter} from 'react-router-dom';


import Google from '../../components/google/google';


import 'react-toastify/dist/ReactToastify.css';
import './Layout.scss';
import CustomButton from '../../components/customButton/customButton';





const Layout =({history,children})=>{

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
                            >{'\<'}</CustomButton>
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



export default withRouter(Layout);