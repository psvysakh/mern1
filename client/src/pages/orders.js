import React, { useEffect, useState } from 'react';
import { getOrders } from '../apiCall/api';
import Image from '../components/Image/Image';

import './orders.scss';
const Orders = () => {

    const [orders, setOrders] = useState();

    useEffect(() => {
        getOrders()
            .then(res => {
                console.log(res.data);
                setOrders(res.data);
            })
            .catch(err => {
                console.log(err.response.data.error);
            })
    }, []);

    return (

        orders ? orders.map((items, i) => {
            return (
                <div className="container">
                    <div key={i} className="card orders">
                        <div className="row">
                            <div className="col-lg-7">
                                {
                                    items.products.map((prod, i) => {
                                        return (
                                            <div key={i} className="wrapper">
                                                <Image name={prod.product.name} id={prod.product._id} />
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
                                <div>{items.orderStatus}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }) : ''

    )
}

export default Orders;