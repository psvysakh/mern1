import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
//Components
import Header from './components/Header/Header';
import Footer from './components/footer/footer';
import SignUp from './components/Authentication/signUp';
import SignIn from './components/Authentication/signIn';
import GetResetForm from './components/Authentication/reset';
import PasswordReset from './components/Authentication/passwordReset';
import VerifyToken from './components/Authentication/EmailVerify';

import PersonalInfo from './components/PersonalInfo/personalInfo';
import Address from './components/user/address';
//Admin Components
import Createcategory from './components/admin/createCategory';
import Createproduct from './components/admin/createProduct';
import Update from './components/admin/update';
import OrderList from './components/admin/orders';
//Page Components
import Homepage from './pages/HomePage';
import Shop from './pages/shop';
import Cart from './pages/cart';
import Orders from './pages/orders';
import Product from './pages/product';
import Checkout from './pages/checkout';
import Payment from './pages/payment';
import Page404 from './components/404/404';

//Auth Guard Coomponents
import PrivateRoute from './components/hoc/privateRoute';
import AdminRoute from './components/hoc/adminRoute';
import UserRoute from './components/hoc/userRoute';

import { ToastContainer } from 'react-toastify';


axios.defaults.baseURL = 'http://localhost:8001';
axios.defaults.headers.post['Content-Type'] = 'application/json';


const App = ({ jwtToken }) => {

  useEffect(() => {
    if (jwtToken) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('JWT_TOKEN');

    }
  }, [jwtToken]);

  return (
    <div>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact={true} path="/" component={Homepage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin/reset" component={GetResetForm} />
        <Route exact path="/signin/reset/:token" component={PasswordReset} />
        <Route exact path="/signup/verifyToken/:token" component={VerifyToken} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/product/:productName/:productId" component={Product} />



        <PrivateRoute exact path="/checkout" component={Checkout} />
        <PrivateRoute exact path="/address" component={Address} />
        <PrivateRoute exact path="/payment" component={Payment} />
        <PrivateRoute exact path="/orders" component={Orders} />

        <UserRoute exact path="/userDetails" component={PersonalInfo} />

        <AdminRoute exact path="/adminDetails" component={PersonalInfo} />
        <AdminRoute exact path="/createCategory" component={Createcategory} />
        <AdminRoute exact path="/createProduct" component={Createproduct} />
        <AdminRoute exact path="/update/:productId" component={Update} />
        <AdminRoute exact path="/orderList" component={OrderList} />

        <Route path='*' exact={true} component={Page404} />
      </Switch>
      <Footer />
    </div>
  )

}


const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  jwtToken: state.auth.token,
})
export default connect(mapStateToProps)(App);
