
import userActionType from './user.type';


export const getDashboardStart= ()=>({
    type:userActionType.DASH_GET_START
});
export const getDashboardSuccess=({data})=>({
    type:userActionType.DASH_GET_SUCCESS,
    payload:data
})