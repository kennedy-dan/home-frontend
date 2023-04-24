import { ADD_PRODUCTS_FAILURE, ADD_PRODUCTS_REQUEST, ADD_PRODUCTS_SUCCESS, CLEAR_ERRORS } from '../constants/productConstants'

export const productReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case ADD_PRODUCTS_REQUEST:
            return {
                loading: true,
            };



        case ADD_PRODUCTS_SUCCESS:
            return {
                loading: false,
                success: true,
            };



        case ADD_PRODUCTS_FAILURE:
            return {
                loading: false,
                error: action.payload,
            };


        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
