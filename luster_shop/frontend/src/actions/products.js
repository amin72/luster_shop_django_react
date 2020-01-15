import axios from 'axios'

import {
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_TO_CART,
    LOAD_CART,
    REMOVE_ITEM_FROM_CART
} from './types'

import { returnErrors, createMessage } from './messages'


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



// add product to cart
export const addToCart = (product) => dispatch => {
    dispatch({
        type: ADD_TO_CART,
        payload: product
    })

    dispatch(createMessage(
        { itemAddedToCart: "Item was added to cart" }
    ))
}



// load cart
export const loadCart = () => dispatch => {
    dispatch({
        type: LOAD_CART
    })    
}



// remove product from cart
export const removeItemFromCart = (productSlug) => dispatch => {
    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: productSlug
    })

    dispatch(createMessage(
        { itemRemovedFromCart: "Item removed from cart" }
    ))
}
