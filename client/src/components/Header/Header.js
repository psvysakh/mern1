import React from 'react';
import {connect} from 'react-redux';
import {Link,withRouter,Redirect} from 'react-router-dom';
import { signOutStart } from '../../redux/auth/auth.action';
import CustomButton from '../customButton/customButton';


import './Header.scss';

const Header =({isAuth,signOut,role})=>{
    const signOutTrigger=()=>{
        signOut();
    }
    return(
    <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
            <Link className="navbar-brand" to="/">ECOM <span>STORE</span></Link>
            {
                isAuth ? role===1 ? <Link className="dash-link" to="/adminDashboard">Dashboard</Link> : <Link className="dash-link" to="/userDashboard">Dashboard</Link>
                : ''
                  
            }
         
            
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
    isAuth:state.auth.isAuthenticated,
    role:state.user.secret.role
})
const mapDispatchToProps=dispatch=>({
    signOut:()=>dispatch(signOutStart())
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));