import React from 'react';

import Userdata from '../../components/userInfo/userInfo';


const userDashboard=()=>{
        return(
            <section className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                           <Userdata/>
                       </div>
                       <div className="col-lg-7">
                            <div className="spacer-small"></div>
                            You Represent User
                        </div>
                    </div>
                </div> 
            </section>
        )
    
}

export default userDashboard;