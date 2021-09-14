import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/stripeCheckout/stripeCheckout";
import StripeImg from '../image/stripe.jpg';
import './payment.scss';

console.log(`STRIPE KEY`, process.env.STRIPE_PUBLIC_KEY);
const promise = loadStripe('pk_test_R2Aotq8s9j4WCYlsG3QCwYVZ00bSQLTvwv');

const Payment = () => {
    return (
        <div className="container">
            <div className="pay-layout">
                <div className="row">

                    <div className="col-lg-5">
                        <img src={StripeImg} alt="stripe" />
                    </div>
                    <div className="col-lg-7">
                        <h4>Complete Purchase</h4>
                        <Elements stripe={promise}>
                            <StripeCheckout />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;