import React,{ Component } from 'react';
import {Route,Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

const AdminRoute=({component: Component, isAuth,role, ...rest})=>{
    return (
        <Route 
        {...rest}
        render={props=>
        isAuth && role===1 ? <Component {...props}/> :
        <Redirect 
            to={{
                pathname:'/signin',
            }}
        />
        }
    />
    )
}

const mapStateToProps=state=>({
isAuth:state.auth.isAuthenticated,
role:state.auth.role
});

export default connect(mapStateToProps)(AdminRoute);