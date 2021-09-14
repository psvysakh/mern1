import React from 'react';
import Image from '../Image/Image';
import {useDispatch} from 'react-redux';
import {addToCart,clearItemFromCart,removeFromCart} from '../../redux/cart/cart.action';

import './checkout-item.scss';
const CheckoutItem=({item})=>{
    const dispatch = useDispatch();
 return(<div className="checkout-item">
     <div className="item-body">
        <div className="item-block">
            <Image id={item._id}/>
        </div>
        <div className="item-block">
            <span>{item.name}</span>
        </div>
        <div className="item-block add">
            <span className="sub" onClick={()=>dispatch(removeFromCart(item))}>&#10094;</span>
            <span>{item.quantity}</span>
            <span className="add" onClick={()=>dispatch(addToCart(item))}>&#10095;</span>
        </div>
        <div className="item-block">
            <span>{item.price}</span>
        </div>
        <div className="item-block">
            <span className="remove" onClick={()=>dispatch(clearItemFromCart(item))}>&#10005;</span>
        </div>
     </div>
 </div>)
}

export default CheckoutItem;