import axios from 'axios'

import { GET_PRODUCTS, GET_PRODUCT } from './types'


// get all products
export const getProducts = () => dispatch => {
    axios.get('/api/products/')
        .then(res => {
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
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
        .catch(err => console.log(err))
}
