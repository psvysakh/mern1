import coreActionType from './core.type';

export const fetchProductsStart=(param)=>({
    type:coreActionType.FETCH_PRODUCTS_START,
    payload:param
});

export const fetchProductsBySellSuccess=(products)=>({
    type:coreActionType.FETCH_PRODUCTS_BYSELL_SUCCESS,
    payload:products
});
export const fetchProductsByArrivalSuccess=(products)=>({
    type:coreActionType.FETCH_PRODUCTS_BYARRIVAL_SUCCESS,
    payload:products
});

export const getProductStart=(productId)=>({
    type:coreActionType.GET_PRODUCT_START,
    payload:productId
});
export const getProductSuccess=(product)=>({
    type:coreActionType.GET_PRODUCT_SUCCESS,
    payload:product
});
export const getProductFailure=(error)=>({
    type:coreActionType.GET_PRODUCT_FAILURE,
    payload:error
});


export const getRelatedStart=(productId)=>({
    type:coreActionType.GET_RELATED_START,
    payload:productId
});
export const getRelatedSuccess=(products)=>({
    type:coreActionType.GET_RELATED_SUCCESS,
    payload:products
});
export const getRelatedFailure=(error)=>({
    type:coreActionType.GET_RELATED_FAILURE,
    payload:error
});


export const getCategoriesStart=()=>({
    type:coreActionType.GET_CATEGORIES_START,
});
export const setCategories=(categories)=>({
    type:coreActionType.SET_CATEGORIES,
    payload:categories
});
export const setCategoriesFailure=(error)=>({
    type:coreActionType.SET_CATEGORIES_FAILURE,
    payload:error
});


export const fetchFiltersStart=(filters)=>({
    type:coreActionType.FETCH_FILTERS_START,
    payload:filters
});

export const fetchFiltersSuccess=({size,products})=>({
    type:coreActionType.FETCH_FILTERS_SUCCESS,
    payload:{
        size,
        products
    }
});
export const fetchFiltersFailure=(error)=>({
    type:coreActionType.FETCH_FILTERS_FAILURE,
    payload:error
});

export const loadMoreStart=(filters)=>({
    type:coreActionType.LOAD_MORE_START,
    payload:filters
});

export const loadMoreSuccess=({size,products,toSkip})=>({
    type:coreActionType.LOAD_MORE_SUCCESS,
    payload:{
        size,
        products,
        toSkip
    }
});
export const loadMoreFailure=(error)=>({
    type:coreActionType.LOAD_MORE_FAILURE,
    payload:error
})

export const searchStart=(data)=>({
    type:coreActionType.SEARCH_START,
    payload:data
});
export const searchSuccess=(products)=>({
    type:coreActionType.SEARCH_SUCCESS,
    payload:products
});
export const searchFailure=(error)=>({
    type:coreActionType.SEARCH_FAILURE,
    payload:error
});