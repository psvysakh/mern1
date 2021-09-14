import React from 'react';
import Image from '../Image/Image';
import {useDispatch} from 'react-redux';
import {addToCart,removeFromCart} from '../../redux/cart/cart.action';
import './cart-item-drop.scss';

const CartItemDropdown=({product})=>{
    const dispatch = useDispatch();
    return(
        <div className="cart-item-drop">
        <Image id={product._id}/>
        <div className="item-details">
            <span className="name">{product.name}</span> 
            <span className="price"> ${product.price} x {product.quantity}</span>
            <div className="cart-update">
                <div onClick={()=>dispatch(removeFromCart(product))} className="remove"> - </div>
                <div onClick={()=>dispatch(addToCart(product))} className="add"> + </div>
            </div>
        </div>
    </div>
    )
   
}

export default CartItemDropdown;