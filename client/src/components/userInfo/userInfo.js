import React,{useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { getDashboardStart } from '../../redux/user/user.action';
import './userInfo.scss';
const UserData=({user,getDashboard})=>{
    const [userData,setUserState]=useState({
        email:'',
        name:'',
        role:''
    });
    let {email,name,role}=userData;
   
    const setUser=()=>{
           
            let {method}=user;
            if(method==='local'){
                const {local:{email},name,role}=user;
                setUserState({...userData,email,name,role});
            }else if(method==='google'){
                const {google:{email},name,role}=user;
                setUserState({...userData,email,name,role});
           }
      
    }
  
    useEffect(()=>{
        if(!user){
            getDashboard();
        }else{
            setUser();
        }
        
    },[user])
    
    return (
        <div className="user-info">
            <h2>User Details</h2>
            <ul>
            <li>{name}</li>
            <li>{email}</li>
            <li>{role===1 ? `Admin`:`User`}</li>
            </ul>
            
           
        </div>
    )
}
const mapStateToProps=state=>({
    user:state.user.secret
    });
    const mapDispatchToProps=dispatch=>({
        getDashboard:()=>dispatch(getDashboardStart())
        });
export default connect(mapStateToProps,mapDispatchToProps)(UserData);