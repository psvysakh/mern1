import React, { useState,useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {CardElement,useStripe,useElements} from '@stripe/react-stripe-js';
import {createPaymentIntent} from '../../apiCall/stripe';
import {createOrder, removeCart} from '../../apiCall/api';

import './stripeCheckout.scss';
import { clearCart } from '../../redux/cart/cart.action';

const StripeCheckout=()=>{

    const [dataState,setDataState]=useState({
        success:false,
        error:null,
        processing:'',
        disabled:true,
        clientSecret:''
    });

    const {success,error,processing,disabled,clientSecret}=dataState;
  

    const stripe = useStripe();
    const elements = useElements();

    const dispatch=useDispatch();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setDataState({
            ...dataState,
            error:null,
            processing:true,
        });
       
        const payload = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method:{
                    card:elements.getElement(CardElement),
                    billing_details:{
                        name:e.target.name.value,
                    }
                }
            });
            if(payload.error){
                console.log(payload.error);
                setDataState({
                    ...dataState,
                    error:e.error ? e.error.message : null ,
                    processing:false,
                  })
            }else{
                 //Create Order when paymentIntent Payload available
                createOrder(payload)
                .then(res=>{
                    console.log(res.data);
                })
                .catch(err=>{
                    console.log(err.response.data.error);
                });
                //Remove Cart from Backend and then From Front End
                removeCart()
                .then(res=>{
                    console.log(res.data);
                    dispatch(clearCart());
                })
                .catch(err=>{
                    console.log(err.response.data.error);
                })

                setDataState({
                    ...dataState,
                    error:null,
                    processing:false,
                    success:true,
                   
                })
            }
    }
    const handleChange=async(e)=>{
        setDataState({
            ...dataState,
            disabled:e.empty,
            error:e.error ? e.error.message : null ,
           
        });

    }

    const cardStyle = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };

    useEffect(()=>{
        createPaymentIntent()
        .then(res=>{
            setDataState({
                ...dataState,
                clientSecret:res.data.clientSecret,
                });
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);

    return(
        <div className="stripe">
            <form id="payment-form" className="stripe-form"
            onSubmit={handleSubmit}>
                <CardElement
                    id="card-element"
                    options={cardStyle}
                    onChange={handleChange}
                />
                <button
                className="stripe-button"
                disabled={processing || disabled || success}>
                        <span id="button-text">
                            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
                        </span>
                </button>
                {error ? <div className="error">{error}</div>:''}
                {success ? <div>Payment Successfull</div> : ''}
            </form>
           
        </div>
    )
}

export default StripeCheckout;