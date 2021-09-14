import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CustomButton from '../customButton/customButton';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import CartIcon from '../cart-icon/carticon';
import Cartdropdown from '../cart-dropdown/cart-dropdown';
import Logo from '../../image/logo.png';
import './Header.scss';
import { selectCartHidden } from '../../redux/cart/cart.selector';
import { toast } from 'react-toastify';
import { signOutSuccess } from '../../redux/auth/auth.action';

const Header = ({ hidden, history }) => {

    const { isAuthenticated, role } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const signOutTrigger = () => {
        localStorage.removeItem('JWT_TOKEN');
        axios.defaults.headers.common['Authorization'] = '';
        dispatch(signOutSuccess());
        history.push("/");
        toast.success('SignOut Success');
    }
    return (
        <nav className="navbar navbar-expand-lg ">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={Logo} alt="logo" />
                </Link>




                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" >
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item" >
                            <Link className="nav-link" to="/shop">Shop</Link>
                        </li>
                        {
                            isAuthenticated ? role === 1 ? <Link className="dash-link" to="/adminDetails">Dashboard</Link> : <Link className="dash-link" to="/userDetails">Dashboard</Link>
                                : ''
                        }

                        {!isAuthenticated || (isAuthenticated && role === 0) ? <li>
                            <CartIcon />
                        </li> : ''}

                        {

                            !isAuthenticated ?
                                [
                                    <li className="nav-item active" key="signin">
                                        <Link className="nav-link" to="/signin">Sign In</Link>
                                    </li>]
                                : <li className="nav-item active">
                                    <CustomButton label="logout" onClick={() => signOutTrigger()}>
                                        Sign Out</CustomButton>
                                </li>
                        }

                    </ul>
                    {hidden ? '' : <Cartdropdown />}
                </div>
            </div>
        </nav>
    )
}
const mapStateToProps = createStructuredSelector({
    hidden: selectCartHidden
})

export default withRouter(connect(mapStateToProps)(Header));