import { combineReducers } from 'redux'
import products from './products'
import auth from './auth'
import errors from './errors'
import messages from './messages'


export default combineReducers({
    products,
    auth,
    errors,
    messages,
})
