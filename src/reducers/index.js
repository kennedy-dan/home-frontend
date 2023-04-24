import { combineReducers } from 'redux'
import { productReducer } from '../reducers/productReducer'

const reducer = combineReducers({
    product : productReducer
})

export default reducer

