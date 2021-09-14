
import adminActionType from './admin.type';

export const createCategoryStart=(category)=>({
    type:adminActionType.CREATE_CATEGORY_START,
    payload:category
});
export const createCategoryRequesting=()=>({
    type:adminActionType.CREATE_CATEGORY_REQUESTING,
});
export const createCategorySuccess=(message)=>({
    type:adminActionType.CREATE_CATEGORY_SUCCESS,
    payload:message
});
export const createCategoryFailure=(error)=>({
    type:adminActionType.CREATE_CATEGORY_FAILURE,
    payload:error
});


export const createProductStart=(product)=>({
    type:adminActionType.CREATE_PRODUCT_START,
    payload:product
});
export const createProductRequesting=()=>({
    type:adminActionType.CREATE_PRODUCT_REQUESTING,
});
export const createProductSuccess=(message)=>({
    type:adminActionType.CREATE_PRODUCT_SUCCESS,
    payload:message
});
export const createProductFailure=(error)=>({
    type:adminActionType.CREATE_PRODUCT_FAILURE,
    payload:error
});

export const updateProductStart=(productId)=>({
    type:adminActionType.UPDATE_PRODUCT_START,
    payload:productId
})
export const updateProductSuccess=(message)=>({
    type:adminActionType.UPDATE_PRODUCT_SUCCESS,
    payload:message
})
export const updateProductFailure=(error)=>({
    type:adminActionType.UPDATE_PRODUCT_FAILURE,
    payload:error
})


export const getAdminProductSuccess=(product)=>({
    type:adminActionType.ADMIN_PRODUCT_SUCCESS,
    payload:product
});

export const deleteProductStart=(data)=>({
    type:adminActionType.DELETE_PRODUCT_START,
    payload:data
})
export const deleteProductSuccess=(message)=>({
    type:adminActionType.DELETE_PRODUCT_SUCCESS,
    payload:message
})
export const deleteProductFailure=(error)=>({
    type:adminActionType.DELETE_PRODUCT_FAILURE,
    payload:error
})

export const getOrderStart=()=>({
    type:adminActionType.ORDERS_START
})
export const getOrdersSuccess=(orders)=>({
    type:adminActionType.ORDERS_SUCCESS,
    payload:orders
})

export const clearAdminMsg=()=>({
    type:adminActionType.CLEAR_MESSAGE
});
export const clearAdminError=()=>({
    type:adminActionType.CLEAR_ERROR
});