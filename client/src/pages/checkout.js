import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartItemsCount, selectCartItemsTotal } from '../redux/cart/cart.selector';
import CheckoutItem from '../components/checkout-item/checkout-item';

import './checkout.scss';
import { Link } from 'react-router-dom';
import CustomButton from '../components/customButton/customButton';
import Address from '../components/user/address';


const Checkout = ({ cartItems, total, count, history }) => (
    <div className="container-fluid">
        <div className="row mt-5">
            <div className="col-lg-7">
                <div className="checkout-page">
                    <Address title="Current Shipping Address" checking={true} />
                    <div className="text-right">
                        <CustomButton
                            onClick={() => history.push('/payment')}
                            label="order"
                        >
                            Order Now
                        </CustomButton>
                    </div>
                </div>

            </div>
            <div className="col-lg-5">

                <div className="right">
                    <div className="total">
                        <h3>Price Details</h3>
                        <span>Total: <strong>${total}</strong> </span>
                    </div>
                </div>
            </div>

        </div>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartItemsTotal,
    count: selectCartItemsCount
})


export default connect(mapStateToProps)(Checkout);