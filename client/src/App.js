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
import { messageAutoClear } from './redux/auth/auth.action';





class App extends React.Component{

 componentDidMount(){
   console.log(`App Rendering`);
 }
  componentDidUpdate(){
  
      if(this.props.message){
          toast.success(this.props.message);
          setTimeout(()=>{
            this.props.msgClear();
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
              <Route path="/signin" render={()=>this.props.isAuth ? (<Redirect to="/dashboard"/>): <SignInUpPage/> } />
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
  message:state.auth.messages
})
const mapDispatchToProps=dispatch=>({
msgClear:()=>dispatch(messageAutoClear())
});
export default connect(mapStateToProps,mapDispatchToProps)(App);
