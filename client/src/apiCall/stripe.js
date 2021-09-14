import axios from 'axios';

export const createPaymentIntent=async()=>{
    return await axios.post('/stripe/create-payment-intent');
}