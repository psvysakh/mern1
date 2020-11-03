import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect} from 'react-router-dom';

//Components
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/dashBoard';
//Page Components
import Homepage from './pages/Home/HomePage';
import SignInUpPage from './pages/SignInUp/signInUp';
import VerifyToken from './pages/EmailVerify/EmailVerify';

import AuthGuard from './components/hoc/authGuard';

import {ToastContainer,toast} from 'react-toastify';
import { msgSignInAutoClear, msgSignUpAutoClear,msgVerifyEmailAutoClear } from './redux/auth/auth.action';





class App extends React.Component{

 
  componentDidUpdate(){
   

    if(this.props.isAuth && this.props.signInMsg){
      toast.success(this.props.signInMsg);
      setTimeout(()=>{
        this.props.clearSignInMsg();
      },5000);
    }
    if(this.props.signUpMsg || this.props.verifyMsg){
      toast.success(this.props.signUpMsg || this.props.verifyMsg);
                setTimeout(()=>{
                  this.props.clearSignUpMsg();
                  this.props.clearVerifyMsg();
                },5000);
                }
    
  
  }
  
  
  render(){
    console.log(`Authen----`,this.props.isAuth)
    return(
      <div>
          <Header/>
          <ToastContainer/>
          <Switch>
              <Route exact={true} path="/" component={Homepage}/>
              <Route exact path="/signin" render={()=>this.props.isAuth ? (<Redirect to="/dashboard"/>): <SignInUpPage/> } />
              <Route exact path="/signup" render={()=>this.props.isAuth ? (<Redirect to="/dashboard"/>): <SignInUpPage/> } />
              <Route exact path="/verifyToken" component={VerifyToken}/>
              <Route exact path="/dashboard" component={AuthGuard(Dashboard)}/>
          </Switch>
      </div>
    )
  }
  
}


const mapStateToProps=state=>({
  isAuth:state.auth.isAuthenticated,
  signInMsg:state.auth.signIn.message,
  signUpMsg:state.auth.signUp.message,
  verifyMsg:state.auth.emailVerify.message
})
const mapDispatchToProps=dispatch=>({
clearSignInMsg:()=>dispatch(msgSignInAutoClear()),
clearSignUpMsg:()=>dispatch(msgSignUpAutoClear()),
clearVerifyMsg:()=>dispatch(msgVerifyEmailAutoClear())
});
export default connect(mapStateToProps,mapDispatchToProps)(App);
