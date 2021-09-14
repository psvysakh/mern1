import adminActionType from './admin.type';

const INITIAL_STATE={
    requesting:false,
    success:false,
    message:'',
    errors:'',
    product:'',
    orders:'',
    status:[
        {
            _id:1,
            name:'Not Processed'
        },
        {
            _id:2,
            name:'Processing'
        },
        {
            _id:3,
            name:'Dispatched'
        },
        {
            _id:4,
            name:'Cancelled'
        },
        {
            _id:5,
            name:'Completed'
        }
       
    ]
}

const adminReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case adminActionType.CREATE_CATEGORY_REQUESTING:
        case adminActionType.CREATE_PRODUCT_REQUESTING:
            return {
                ...state,
                requesting:true,
            }
        case adminActionType.CREATE_CATEGORY_SUCCESS:
        case adminActionType.CREATE_PRODUCT_SUCCESS:
            return{
                ...state,
                requesting:false,
                success:true,
                message:action.payload,
            }
        case adminActionType.CREATE_CATEGORY_FAILURE:
        case adminActionType.CREATE_PRODUCT_FAILURE:
            return{
                ...state,
                requesting:false,
                success:false,
                errors:action.payload 
            }
        case adminActionType.ADMIN_PRODUCT_SUCCESS:
            return{
                ...state,
                product:action.payload
            }
        case adminActionType.ORDERS_SUCCESS:
            return{
                ...state,
                orders:action.payload
            }
       case adminActionType.DELETE_PRODUCT_SUCCESS:
           return{
               ...state,
               message:action.payload
           }
        case adminActionType.CLEAR_MESSAGE:
            return{
                ...state,
                message:''
            }
        case adminActionType.CLEAR_ERROR:
            return{
                ...state,
                errors:''
            }
        default :
        return state
    }
}

export default adminReducer;