import axios from 'axios'

import { GET_PRODUCTS, GET_PRODUCT } from './types'
import { returnErrors } from './messages'


// get all products
export const getProducts = (param) => dispatch => {
    axios.get(`/api/products/${param}`)
        .then(res => {
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.state))
        })
}


// get one product, used for detail page
export const getProduct = (product_slug) => dispatch => {
    axios.get(`/api/products/${product_slug}`)
        .then(res => {
            dispatch({
                type: GET_PRODUCT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.state))
        })
}
