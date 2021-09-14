import {takeLatest,put,all,call,takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import queryString from 'query-string';

import coreActionType from './core.type';


import {
    fetchFiltersFailure,
    fetchFiltersSuccess,
    fetchProductsByArrivalSuccess,
fetchProductsBySellSuccess,
getProductFailure,
getProductSuccess,
getRelatedFailure,
getRelatedSuccess,
loadMoreFailure,
loadMoreSuccess,
searchFailure,
searchSuccess,
setCategories,
setCategoriesFailure
} from './core.action';
import { getAdminProductSuccess } from '../admin/admin.action';


const relatedFetch = async(productId)=>{
    console.log(productId)
    return await axios.get(`/product/related/${productId}`)
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        return err.response.data;
    })
}
const productFetch = async({productId})=>{
    return await axios.get(`/product/${productId}`)
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        return err.response.data;
    })
}

const searchFetch=async(data)=>{
    const query = queryString.stringify(data);
    return await axios.get(`/product/search?${query}`)
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        return err.response.data; 
    })
}

const getFilterFetch=async(data)=>{
    console.log(data)
    return await axios.post('/product/bysearch',
    data
    ).then(res=>{
        return res.data;
    }).catch(err=>{
        return err.response.data;
    })
}
const getCategoriesFetch=async()=>{
    return await axios.get('/category/list' ).then(res=>{
     
        return res.data;
    }).catch(err=>{
        return err.response.data;
    })
}
const productsFetch=async(param)=>{
    return await axios.get(`/product/list?order=desc&sortBy=${param}&limit=4` ).then(res=>{
      
        return res.data;
    }).catch(err=>{
        return err.response.data;
    })
}


export function* getRelated(action){
    try{
        const products = yield call(relatedFetch,action.payload);
        if(products){
            yield put(getRelatedSuccess(products));
        }
    }catch(error){
        yield put(getRelatedFailure(error));
    }
}
export function* getProduct(action){
    const {type} = action.payload;
    try{
        const product = yield call(productFetch,action.payload);
        if(product){
            if(type==='admin'){
                yield put(getAdminProductSuccess(product));
            }
            if(type==='user'){
                yield put(getProductSuccess(product));
            }
           
        }
    }catch(error){
        yield put(getProductFailure(error));
    }
}

export function* search(action){
    try{
       const {error,products}= yield call(searchFetch,action.payload);
       if(products){
           console.log(products)
           yield put(searchSuccess(products));
       }
       if(error){
           throw error;
       }
    }
    catch(error){
        yield put(searchFailure(error));
    }
}

export function* loadMore(action){
    try{
    const {size,data}=yield call(getFilterFetch,action.payload);
    if(data){
        yield put(loadMoreSuccess({size,products:data}));
    }
    }catch(error){
        yield put(loadMoreFailure(error));
    }
}

export function* getFiltered(action){
   const skip=0;
    try{
    const {size,data}=yield call(getFilterFetch,{skip,...action.payload});
    if(data){
        yield put(fetchFiltersSuccess({size,products:data}));
        
    }
  
    }catch(error){
        yield put(fetchFiltersFailure(error));
    }
}
export function* getCategories(){
    try{
        const {categories,error}=yield call(getCategoriesFetch);
        if(categories){
            yield put(setCategories(categories));
        } 
        if(error){
            throw error
        }
    }catch(error){
       yield put(setCategoriesFailure(error)); 
    }
}
export function* fetchProducts(action){
    console.log("called herer");
    try{
        if(action.payload==='sold'){
            const product=yield call(productsFetch,action.payload);
       
         
            yield put(fetchProductsBySellSuccess(product))
        }else if(action.payload==='createdAt'){
            const product=yield call(productsFetch,action.payload);
       

            yield put(fetchProductsByArrivalSuccess(product))
        }
        
    }catch(error){
       console.log(error);
    }
}
export function* onRelated() {
    yield takeLatest(coreActionType.GET_RELATED_START,
        getRelated)
}
export function* onProduct() {
    yield takeLatest(coreActionType.GET_PRODUCT_START,
        getProduct)
}

export function* onSearch(){
    yield takeLatest(coreActionType.SEARCH_START,
        search)
}
export function* onLoadMore(){
    yield takeLatest(coreActionType.LOAD_MORE_START,
        loadMore)
}
export function* onFetchFilters(){
    yield takeLatest(coreActionType.FETCH_FILTERS_START,
        getFiltered)
}
export function* onGetCategories(){
    yield takeLatest(coreActionType.GET_CATEGORIES_START,
        getCategories)
}
export function* onFetchProducts(){
    yield takeEvery(coreActionType.FETCH_PRODUCTS_START,
        fetchProducts)
} 

export function* coreSagas(){
    yield all([
        call(onFetchProducts),
        call(onGetCategories),
        call(onFetchFilters),
        call(onLoadMore),
        call(onSearch),
        call(onProduct),
        call(onRelated)
    ])
}