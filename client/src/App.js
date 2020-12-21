import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect} from 'react-router-dom';
import axios from 'axios';
//Components
import Header from './components/Header/Header';
import SignUp from './components/signUp/signUp';
import SignIn from './components/signIn/signIn';
import GetResetForm from './components/reset/reset';
import PasswordReset from './components/reset/passwordReset';
import VerifyToken from './components/EmailVerify/EmailVerify';
import adminDashboard from './pages/Dashboard/adminDashboard';
import userDashboard from './pages/Dashboard/userDashboard';
//Page Components
import Homepage from './pages/Home/HomePage';

import Page404 from './components/404/404';

//Auth Guard Coomponents
import PrivateRoute from './components/hoc/privateRoute';
import AdminRoute from './components/hoc/adminRoute';

import {ToastContainer,toast} from 'react-toastify';


axios.defaults.baseURL = 'http://localhost:8001';
axios.defaults.headers.post['Content-Type'] = 'application/json';


const App=({isAuth,jwtToken})=>{

    useEffect(()=>{
      if(jwtToken){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('JWT_TOKEN');
      }
    },[jwtToken]);

    return(
      <div>
          <Header/>
          <ToastContainer/>
          <Switch>
              <Route exact={true} path="/" component={Homepage}/>
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp}/>
              <Route  path="/signin/reset" component={GetResetForm}/>
              <Route  path="/signin/reset/:token" component={PasswordReset} />
              <Route  path="/signup/verifyToken" component={VerifyToken} />
              <PrivateRoute exact path="/userDashboard" component={userDashboard}/>   
              <AdminRoute exact path="/adminDashboard" component={adminDashboard}/>
             <Route path='*' exact={true} component={Page404} />
          </Switch>
      </div>
    )
  
}


const mapStateToProps=state=>({
  isAuth:state.auth.isAuthenticated,
  jwtToken:state.auth.token,
})
export default connect(mapStateToProps)(App);
