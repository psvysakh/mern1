export const addItemToCart=(cartItems,addItem)=>{
    const existing = cartItems.find(item=>item._id===addItem._id);
    if(existing){
        return cartItems.map(item=>
           item._id===addItem._id ?
           {...item,quantity:item.quantity + 1} 
           :
           item)
    }

    return [...cartItems,{_id:addItem._id,name:addItem.name,price:addItem.price,quantity:1}]
}

export const removeItemFromCart=(cartItems,removeItem)=>{
    const existing = cartItems.find(item=>item._id===removeItem._id);
    if(existing.quantity===1){
        return cartItems.filter(item=>item._id !==removeItem._id); 
    }
     return  cartItems.map(item=>
            item._id===removeItem._id ?
            {...item,quantity:item.quantity - 1}
            :
            item
            )
   
}