import React from 'react';

const Radiobox=({prices,handleFilters})=>{
  

    const handleChange=(e)=>{
        handleFilters(e.target.value);
    }

    return  prices.map((p,i)=>(
        <div key={i}>
            <input  
            type="radio" 
            value={`${p._id}`} 
            name={p}
            onChange={handleChange}
            className="mb-3"/>
            <label>{p.name}</label>
        </div>
    ));
}

export default Radiobox;