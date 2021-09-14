import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8001';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('JWT_TOKEN');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const setAddressFetch=async(data)=>{
    return await axios.post('/user/address',data);
   
}

export const updateAddressFetch=async(address)=>{
    return await axios.put('/user/address',address);
}

export const getAddressFetch=async()=>{
    return await axios.get('/user/address');
}

export const deleteAddressFetch=async(addressId)=>{

    return await axios.delete(`/user/address/${addressId}`);
}

export const storeCart=async(data)=>{
    return await axios.post('/user/cart',data);
}

export const createOrder=async(data)=>{
    return await axios.post('/user/order',data);
}

export const getOrders=async()=>{
    
    return await axios.get('/user/order');
}

export const removeCart= async()=>{
    return await axios.delete('/user/cart');
}

export const updateStatus=async(orderId,orderStatus)=>{
    return await axios.put('/admin/orderStatus',{
        orderId,
        orderStatus
    });
}