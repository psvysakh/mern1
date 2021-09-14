import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Dashboard from '../Layout/Dashboard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { getDashboardStart } from '../../redux/user/user.action';
const PersonalInfo=()=>{
        const user = useSelector(state=>state.user);
        const dispatch = useDispatch();
 
   
    const setUser=()=>{
           return (
            <ul>
                <li>{user.name}</li>
                <li><FontAwesomeIcon icon={faEnvelope}
                style={{ marginRight:'5px' }}/> {user.method ? user.method[0]==='google' ? user.google.email : user.local.email : ''}</li>
                <li><FontAwesomeIcon icon={faUser}
                 style={{ marginRight:'5px' }}/>{user.role===1 ? `Admin`:`User`}</li>
            </ul>
           )
    }
  
useEffect(()=>{
    dispatch(getDashboardStart());
},[])

    
    
    return(
        <Dashboard>
            <div>
                <h3>Personal Information</h3>
                
                {setUser()}
            </div>
        </Dashboard>
    )
}


        export default PersonalInfo;