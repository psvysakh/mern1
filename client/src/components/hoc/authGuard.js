import React,{Component} from 'react';

import {connect} from 'react-redux';

export default (OriginalComponent)=>{
    class AuthGuard extends Component{
        checkAuth(){
            if(!this.props.isAuth && !this.props.jwtToken){
                console.log("User entrance is not Allowed");
                this.props.history.push('/');
            }
        }
        componentDidMount(){
            console.log(`Executed after dashboard rendering finished and is Authent`,this.props.isAuth,`and token`,this.props.jwtToken);
           this.checkAuth();
           
        }
        componentDidUpdate(){
            console.log(`Executed after dashboard updation finished and is Authent`,this.props.isAuth,`and token`,this.props.jwtToken);
            this.checkAuth();
        }
        render(){
            return  (
                !this.props.isAuth && !this.props.jwtToken ? '': <OriginalComponent {...this.props} />
                )
        }
    }
    const mapStateToProps=state=>({
        isAuth:state.auth.isAuthenticated,
        jwtToken:state.auth.token
    });
    return connect(mapStateToProps)(AuthGuard);
}

