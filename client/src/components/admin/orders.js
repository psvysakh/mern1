import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { updateStatus } from '../../apiCall/api';

import { getOrderStart } from '../../redux/admin/admin.action';

import Image from '../Image/Image';


const OrderList=()=>{
    const {orders} = useSelector(state=>state.admin);

    const dispatch= useDispatch();

    const handleStatusChange=(orderId,orderStatus)=>{
        updateStatus(orderId,orderStatus)
        .then(res=>{
            console.log(res);
            dispatch(getOrderStart());
        })
        .catch(err=>{
            console.log(err);
        });
    }


    useEffect(()=>{
        dispatch(getOrderStart());
    },[]);

    return(
        
        orders ? orders.map((items,i)=>{
                return(
                    <div key={i} className="card orders">
                        <div className="row">
                            <div className="col-lg-7">
                                {
                                    items.products.map((prod,i)=>{
                                     return(
                                        <div key={i} className="wrapper">
                                            <Image name={prod.product.name} id={prod.product._id}/>
                                            <div>
                                                <h2>{prod.product.name}</h2>
                                                <p>{prod.product.description}</p>
                                                <span>{prod.product.price}</span>
                                            </div>
                                        </div>
                                     )   
                                    })
                                }
                            </div>
                            <div className="col-lg-5">
                               <strong>{items.paymentIntent.paymentIntent.amount / 100}</strong>
                             
                               <select 
                                name="orderStatus"
                                defaultValue={items.orderStatus}
                                className="form-control"
                                onChange={(e)=>handleStatusChange(items._id,e.target.value)}
                                >
                                    <option value="Not Processed">Not Processed</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )
        }) : ''
   
    )
}

export default OrderList;