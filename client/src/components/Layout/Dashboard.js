import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faPowerOff, faEdit, faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.scss';

const Dashboard=({children})=>{
    const {name} = useSelector(state=>state.user);
   const {role} = useSelector(state=>state.auth);

    const userRoute=()=>{
        return (
            <div className="menu">
            <div className="d-flex align-items-center"><FontAwesomeIcon icon={faUser}
                style={{ marginRight:'5px' }}/>
              <span>ACCOUNT SETTINGS</span>
            </div>
          
                <ul>
                    <li>
                        <Link to="/userDetails">Personal Information</Link>
                    </li>
                    <li>
                        <Link to={`/address`}>Address</Link>  
                    </li>
                </ul>
                <div className="d-flex align-items-center"><FontAwesomeIcon icon={faShoppingBag}
                style={{ marginRight:'5px' }}/>
              <span>PURCHASE</span>
            </div>
          
                <ul>
                    <li>
                        <Link to="/orders">ORDERS</Link>
                    </li>
                    <li>
                        <Link to="/cart">CART</Link>
                    </li>
                </ul>
             
            <div><FontAwesomeIcon icon={faPowerOff}
            style={{ marginRight:'5px' }}/>Logout</div>
       
        </div>
         
        )
    }
    const adminRoute=()=>{
        return (
            <div className="menu">
                <div className="d-flex align-items-center"><FontAwesomeIcon icon={faUser}
                    style={{ marginRight:'5px' }}/>
                  <span>ACCOUNT SETTINGS</span>
                </div>
              
                    <ul>
                        <li>
                            <Link to="/adminDetails">Personal Information</Link>
                        </li>
                        <li>
                            <Link to={`/address`}>Address</Link>  
                        </li>
                    </ul>
                    <div className="d-flex align-items-center"><FontAwesomeIcon icon={faEdit}
                    style={{ marginRight:'5px' }}/>
                  <span>PRODUCTS</span>
                </div>
              
                    <ul>
                        <li>
                            <Link to="/createCategory">CREATE CATEGORY</Link>
                        </li>
                        <li>
                            <Link to="/createProduct">ADD PRODUCT</Link>
                        </li>
                        <li>
                            <Link to="/orderList">ORDERS</Link>
                        </li>
                    </ul>
                 
                <div><FontAwesomeIcon icon={faPowerOff}
                style={{ marginRight:'5px' }}/>Logout</div>
           
            </div>
            
        )
    }


    return (
        <section className="dashboard">
            <div className="container-fluid">
                <div className="spacer-small"></div>
                <div className="row">
                    <div className="col-lg-3">
                         <div className="row">
                            <div className="col-lg-12">
                                <div className="user-info">
                                    <img className="photo" src={require('../../image/avatar.png')} alt="avatar"/>
                                    <ul>
                                           <li>Hello ! <h2>{name}</h2></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-12 mt-3">
                                 <div className="card routes">
                                     {role===1 ? adminRoute() : userRoute()}
                                 </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="card childs">
                         {children}
                        </div>
                    </div>
                </div>
            </div> 
        </section>
    )
}


export default Dashboard;