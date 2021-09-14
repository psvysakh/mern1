import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartItemsCount, selectCartItemsTotal } from '../redux/cart/cart.selector';
import CartItems from '../components/cart-items/cart-items';

import './cart.scss';
import { Link } from 'react-router-dom';
import CustomButton from '../components/customButton/customButton';
import { storeCart } from '../apiCall/api';


const Cart = ({ cartItems, total, count, history }) => {

    const saveCart = () => {
        storeCart(cartItems)
            .then(res => {
                history.push('/checkout');
            })
            .catch(err => {
                console.log(err.response.data);
            })
    }

    return (
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="col-lg-7">
                    <div className="cart-page">
                        <div className="cart-header">
                            <div className="header-block">
                                <span>Product</span>
                            </div>
                            <div className="header-block">
                                <span>Description</span>
                            </div>
                            <div className="header-block">
                                <span>Quantity</span>
                            </div>
                            <div className="header-block">
                                <span>Price</span>
                            </div>
                            <div className="header-block">
                                <span>Remove</span>
                            </div>
                        </div>
                        {
                            cartItems.map(item =>
                                <CartItems key={item._id} item={item} />
                            )
                        }

                        {count === 0 ? (
                            <div className="text-center empty">
                                <h4>Cart Is Empty !</h4>
                                <Link to="/shop">Go to Purchase</Link>
                            </div>
                        ) : ''
                        }
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="right">
                        <div className="total">
                            <h3>Order Summary</h3>
                            <span>Total: <strong>${total}</strong> </span>
                        </div>
                        <CustomButton onClick={() => {
                            history.push('/checkout');
                            saveCart();
                        }}
                            label="checkout"
                        >
                            Checkout
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartItemsTotal,
    count: selectCartItemsCount
})


export default connect(mapStateToProps)(Cart);