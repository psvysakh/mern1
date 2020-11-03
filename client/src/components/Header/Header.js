import React from 'react';
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import { msgSignOutAutoClear, signOutStart } from '../../redux/auth/auth.action';
import CustomButton from '../customButton/customButton';
import {toast} from 'react-toastify';

import './Header.scss';

const Header =({isAuth,signOut,clearSignOutMsg})=>{
    const signOutTrigger=()=>{
        signOut();
        toast.success("SignOut Successfull");
        setTimeout(()=>{
            clearSignOutMsg();
        },5000);
    }
    return(
    <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
            <Link className="navbar-brand" to="/">ECOM <span>STORE</span></Link>
            <Link className="dash-link" to="/dashboard">Dashboard</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    {
                         !isAuth ?  
                         [<li className="nav-item active" key="signup">
                         <Link className="nav-link" to="/signup">Sign Up</Link>
                         </li>,
                         <li className="nav-item active" key="signin">
                         <Link className="nav-link" to="/signin">Sign In</Link>
                         </li>]
                          :  <li className="nav-item active">
                          <CustomButton label="logout" onClick={signOutTrigger}>
                          Sign Out</CustomButton>
                      </li>
                    }
                   
                </ul>
            </div>
        </div>
      </nav>
    )
}
const mapStateToProps=state=>({
    isAuth:state.auth.isAuthenticated
})
const mapDispatchToProps=dispatch=>({
    signOut:()=>dispatch(signOutStart()),
    clearSignOutMsg:()=>dispatch(msgSignOutAutoClear())
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));