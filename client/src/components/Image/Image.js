import React from 'react';

const Image =({name,id})=>{
return (
    <div className="product-img">
        <img
            src={`http://localhost:8001/product/photo/${id}`}
            alt={name}
            className="mb-2"
            style={{width:"100%",height:"auto"}}
        />
    </div>
)
}

export default Image;