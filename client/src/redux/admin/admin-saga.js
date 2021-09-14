import {takeLatest,put,all,call} from 'redux-saga/effects';
import axios from 'axios';
import adminActionType from './admin.type';


import {
    createCategoryRequesting,
    createCategorySuccess,
    createCategoryFailure,
    createProductRequesting,
    createProductSuccess,
    createProductFailure,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductSuccess,
    updateProductFailure,
    getOrdersSuccess

} from './admin.action'

const ordersFetch=async()=>{
    return await axios.get('/admin/orders')
    .then(res=>{
        console.log(`response `,res.data);
        return res.data;
    }).catch(err=>{
        return err.response.data;
    })
}

const deleteProductFetch=async({productId})=>{
    return await axios.delete(`/product/${productId}`)
    .then(res=>{
        console.log(`response `,res.data);
        return res.data;
    }).catch(err=>{
        return err.response.data;
    })
}
const updateProductFetch=async({productId,formData})=>{
    console.log(productId);
    return await axios.put(`/product/update/${productId}`,
    formData)
    .then(res=>{
        console.log(`response `,res.data);
        return res.data;
    }).catch(err=>{
        return err.response.data;
    })
}

const createProductFetch=async(data)=>{
    return await axios.post('/product/create',
    data
    ).then(res=>{
        console.log(`response `,res.data);
        return res.data;
    }).catch(err=>{
        return err.response.data;
    })
}

const createCategoryFetch=async(data)=>{
    return await axios.post('/category/create',
    {
        name:data.name
    }
    ).then(res=>{
        console.log(`response `,res.data);
        return res.data;
    }).catch(err=>{
        return err.response.data;
    })
}
export function* orders(){
    try{
        const orders = yield call(ordersFetch);
        yield put(getOrdersSuccess(orders));
    }catch(error){
        console.log(error);
    }
}

export function* deleteProduct(action){
    const {history} = action.payload;
    console.log(history);
    console.log(action.payload);
    try{
        const {message}=yield call(deleteProductFetch,action.payload);
        if(message){
            yield put(deleteProductSuccess(message));
            yield history.push("/");
        } 
    }catch(error){
       yield put(deleteProductFailure(error)); 
    }
}
export function* updateProduct(action){
    const {history}=action.payload;
    console.log(action.payload);
    try{
        const {message}=yield call(updateProductFetch,action.payload);
        if(message){
            yield put(updateProductSuccess(message));
            yield history.push('/');
        } 
    }catch(error){
       yield put(updateProductFailure(error)); 
    }
}
export function* createProduct(action){
    console.log(action.payload);
    try{
        yield put(createProductRequesting());
        const {message,error}=yield call(createProductFetch,action.payload);
        if(message){
            yield put(createProductSuccess(message));
        } 
        if(error){
            throw error
        }
    }catch(error){
       yield put(createProductFailure(error)); 
    }
}

export function* createCategory(action){
    try{
        yield put(createCategoryRequesting());
        const {message,error}=yield call(createCategoryFetch,action.payload);
        if(message){
            yield put(createCategorySuccess(message));
        } 
        if(error){
            throw error
        }
    }catch(error){
       yield put(createCategoryFailure(error)); 
    }
}
export function* onOrders(){
    yield takeLatest(adminActionType.ORDERS_START,
        orders)
}

export function* onDeleteProduct(){
    yield takeLatest(adminActionType.DELETE_PRODUCT_START,
        deleteProduct)
}
export function* onUpdateProduct(){
    yield takeLatest(adminActionType.UPDATE_PRODUCT_START,
        updateProduct)
}
export function* onCreateProduct(){
    yield takeLatest(adminActionType.CREATE_PRODUCT_START,
        createProduct)
}
export function* onCreateCategory(){
    yield takeLatest(adminActionType.CREATE_CATEGORY_START,
        createCategory)
} 



export function* adminSagas(){
   yield all([
       call(onCreateCategory),
       call(onCreateProduct),
       call(onUpdateProduct),
       call(onDeleteProduct),
       call(onOrders),
   ])
}