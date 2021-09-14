import coreActionType from './core.type';

const INITIAL_STATE = {
    requesting: false,
    successful: false,
    messages: '',
    errors: '',
    productsBySearch: '',
    productsBySell: '',
    productsByArrival: '',
    filteredProducts: '',
    relatedProducts: '',
    product: '',
    skip: 0,
    limit: 4,
    size: 0,
    categories: '',
    prices: [
        {
            _id: 0,
            name: 'Any',
            array: []
        },
        {
            _id: 1,
            name: '$0 to $990',
            array: [0, 990]
        },
        {
            _id: 2,
            name: '$1000 to $1990',
            array: [1000, 1990]
        },
        {
            _id: 3,
            name: '$2000 to $2990',
            array: [2000, 2990]
        },
        {
            _id: 4,
            name: '$3000 to $3990',
            array: [3000, 3990]
        },
        {
            _id: 5,
            name: 'More than $4000',
            array: [4000, 8000]
        }
    ]
}

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case coreActionType.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                requesting: false,
                successful: false,
                messages: '',
                productsBySell: '',
                productsByArrival: '',
                filteredProducts: '',
                errors: action.payload,
            }
        case coreActionType.SEARCH_FAILURE:
            return {
                ...state,
                errors: action.payload,
                productsBySearch: '',
            }
        case coreActionType.FETCH_PRODUCTS_START:
        case coreActionType.FETCH_FILTERS_START:
            return {
                ...state,
                requesting: true,
                successful: false,
            }
        case coreActionType.FETCH_PRODUCTS_BYSELL_SUCCESS:
            return {
                ...state,
                requesting: false,
                successful: true,
                messages: '',
                errors: '',
                productsBySell: action.payload
            }
        case coreActionType.FETCH_PRODUCTS_BYARRIVAL_SUCCESS:
            return {
                ...state,
                requesting: false,
                successful: true,
                messages: '',
                errors: '',
                productsByArrival: action.payload
            }
        case coreActionType.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case coreActionType.FETCH_FILTERS_SUCCESS:
            return {
                ...state,
                filteredProducts: action.payload.products,
                size: action.payload.size,
            }

        case coreActionType.LOAD_MORE_SUCCESS:
            return {
                ...state,
                size: action.payload.size,
                filteredProducts: [...state.filteredProducts, ...action.payload.products]
            }
        case coreActionType.SEARCH_SUCCESS:
            return {
                ...state,
                productsBySearch: action.payload
            }
        case coreActionType.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload
            }
        case coreActionType.GET_RELATED_SUCCESS:
            return {
                ...state,
                relatedProducts: action.payload,
            }
        default:
            return state;
    }
}

export default productReducer;