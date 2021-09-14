
import userActionType from './user.type';


export const getDashboardStart= ()=>({
    type:userActionType.DASH_GET_START
});
export const getDashboardSuccess=(data)=>({
    type:userActionType.DASH_GET_SUCCESS,
    payload:data
})


export const setAddressStart=(address)=>({
    type:userActionType.SET_ADDRESS_START,
    payload:address
});
export const setAddressSuccess=(address)=>({
    type:userActionType.SET_ADDRESS_SUCCESS,
    payload:address
});
export const setAddressFailure=(error)=>({
    type:userActionType.SET_ADDRESS_FAILURE,
    payload:error
});


export const updateAddressStart=(address)=>({
    type:userActionType.UPDATE_ADDRESS_START,
    payload:address
});
export const updateAddressSuccess=({message})=>({
    type:userActionType.UPDATE_ADDRESS_SUCCESS,
    payload:message
});
export const updateAddressFailure=(error)=>({
    type:userActionType.UPDATE_ADDRESS_FAILURE,
    payload:error
});


export const getAddressStart=()=>({
    type:userActionType.GET_ADDRESS_START
});
export const getAddressSuccess=(address)=>({
    type:userActionType.GET_ADDRESS_SUCCESS,
    payload:address
});
export const getAddressFailure=(error)=>({
    type:userActionType.GET_ADDRESS_FAILURE,
    payload:error
});

export const deleteAddressStart=(addressId)=>({
    type:userActionType.DELETE_ADDRESS_START,
    payload:addressId
});
export const deleteAddressSuccess=(address)=>({
    type:userActionType.DELETE_ADDRESS_SUCCESS,
    payload:address
});
export const deleteAddressFailure=(error)=>({
    type:userActionType.DELETE_ADDRESS_FAILURE,
    payload:error
});



