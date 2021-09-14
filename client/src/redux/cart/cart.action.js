import cartActionType from './cart.type';

export const toggleCartHidden=()=>({
    type:cartActionType.TOGGLE_CART_HIDDEN
});

export const addToCart=(product)=>({
    type:cartActionType.ADD_ITEM,
    payload:product
})

export const removeFromCart=(product)=>({
    type:cartActionType.REMOVE_ITEM,
    payload:product
})

export const clearItemFromCart=(product)=>({
    type:cartActionType.CLEAR_ITEM_FROM_CART,
    payload:product
})

export const clearCart=()=>({
    type:cartActionType.CLEAR_CART
})