import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';
import Cart from '../../image/cart.png';


import './carticon.scss';
import { toggleCartHidden } from '../../redux/cart/cart.action';

const CartIcon = ({ toggleHidden, count }) => {
    return (
        <div className="cart-icon">
            <img src={Cart} onClick={toggleHidden} className="cart" />
            {count > 0 ? <span className="item-count">{count}</span> : ''}
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    count: selectCartItemsCount
})
const mapDispatchToProps = dispatch => ({
    toggleHidden: () => dispatch(toggleCartHidden())
})
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);