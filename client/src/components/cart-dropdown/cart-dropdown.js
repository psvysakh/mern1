import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect,useDispatch} from 'react-redux';

import {createStructuredSelector} from 'reselect';
import { selectCartItems, selectCartItemsCount } from '../../redux/cart/cart.selector';
import CartItemDropdown from '../cart-item-drop/cart-item-drop';
import CustomButton from '../customButton/customButton';
import './cart-dropdown.scss';
import { toggleCartHidden } from '../../redux/cart/cart.action';
const Cartdropdown=({cartItems,history,count})=>{
    const dispatch=useDispatch();
    const showButtons=()=>{
        return (
            <div>
                 <CustomButton
            onClick={()=>{
                history.push('/cart');
                dispatch(toggleCartHidden());
             }}
             label="cart">
                Cart
            </CustomButton>
            <CustomButton onClick={()=>{
               history.push('/checkout');
               dispatch(toggleCartHidden());
            }}
            label="checkout"
              >   
                Checkout
            </CustomButton>
            </div>
        )
    }
    return(
        <div className="cart-wrapper">
            <div className="cart-dropdown">
            {
                cartItems ? cartItems.map((item,i)=>
                   <CartItemDropdown key={i} product={item}/>
                    ) : ''
            }
            </div>
           
           {count > 0 ?  showButtons() : ''}
        </div>
    )
}
const mapStateToProps=createStructuredSelector({
    cartItems:selectCartItems,
    count:selectCartItemsCount
})
export default withRouter(connect(mapStateToProps)(Cartdropdown));