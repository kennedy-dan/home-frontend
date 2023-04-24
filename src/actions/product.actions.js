import axios from "../helpers/axios"
import { ADD_PRODUCTS_FAILURE, ADD_PRODUCTS_REQUEST, ADD_PRODUCTS_SUCCESS } from '../constants/productConstants'

export const addProducts = (userData) => async (dispatch) => {
    try {

        dispatch({ type: ADD_PRODUCTS_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/product/create', userData, config)

        dispatch({
            type: ADD_PRODUCTS_SUCCESS
        })

    } catch (error) {

        dispatch({
            type: ADD_PRODUCTS_FAILURE,
            payload: error.response.data.message
        })
    }
}