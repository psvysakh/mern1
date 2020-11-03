
import React from 'react';

import './customButton.scss';

const CustomButton=({children,label,...otherProps})=>{
    return(
        <button className={`btn ${label?label:''}`} {...otherProps}>
            {children}
        </button>
    )
}
export default CustomButton;