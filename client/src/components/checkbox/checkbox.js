
import React, { useState } from 'react';

import './checkbox.scss';
const Checkbox=({categories,handleFilters})=>{
    
    const [checked, setChecked] = useState([]);

    const handleToggle=c=>()=>{
        const currentCatId = checked.indexOf(c);
        const newCatId = [...checked];

        if(currentCatId===-1){
            newCatId.push(c);
        }else{
            newCatId.splice(currentCatId,1);
        }
        setChecked(newCatId);
        handleFilters(newCatId);
    }


   
    return  categories ? categories.map((cat,i)=>
                 (
                        <li key={i} className="check_list_items">
                            <input 
                            onChange={handleToggle(cat._id)}
                            value={checked.indexOf(cat._id===-1)}
                            type="checkbox" 
                            />
                            <label>{cat.name}</label>
                        </li>
                    )
            ):'';
}

export default Checkbox;