import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {getCategoriesStart, searchStart} from '../../redux/core/core.action';
const Search=({categories,getCategories,getSearch})=>{
    const [data,setData]=useState({
        search:'',
        category:''
    })
    useEffect(()=>{
        getCategories();
    },[]);
    const searchHandle=name=>e=>{
        
        setData({...data,[name]:e.target.value});
   
    }
    const searchSubmit=(e)=>{
        e.preventDefault();
        getSearch(data);
    }

return (
    <form onSubmit={searchSubmit}>
    <div className="input-group mb-3">
        <div className="input-group-prepend">

                <select className="custom-select" onChange={searchHandle("category")}>
                  <option value="All">All</option>
                  {categories ? categories.map((cat,i)=>{
                       return ( <option key={i} value={cat._id}>{cat.name}</option>)
                   }):''}
                </select>
               
               
        </div>
        <input 
        type="text" 
        className="form-control" 
        onChange={searchHandle("search")}/>
        <div className="input-group-append">
          <button className="btn btn-success" type="submit">Search</button>
        </div>
    </div>
    </form>
)
}
const mapStateToProps=state=>({
    categories:state.core.categories
});
const mapDispatchToProps=dispatch=>({
    getCategories:()=>dispatch(getCategoriesStart()),
    getSearch:(data)=>dispatch(searchStart(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(Search);