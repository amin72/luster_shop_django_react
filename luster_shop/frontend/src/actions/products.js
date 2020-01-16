import axios from 'axios'

import {
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_TO_CART,
    LOAD_CART,
    REMOVE_ITEM_FROM_CART
} from './types'

import { returnErrors, createMessage } from './messages'
import { loadCartFromLocalStorage } from '../reducers/products'


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
    const productQuantity = product.quantity ? product.quantity : 0
    
    if (productQuantity == 0) {
        return dispatch(returnErrors({
            itemNotAvailable: "Item's not avialable."
        }))
    }

    const cart = loadCartFromLocalStorage('cart')
    const lookupProduct = cart.filter(p => p.slug === product.slug)
    let productUnits = 0
   
    // found the product in cart
    if (lookupProduct.length > 0) {
        productUnits = lookupProduct[0].units ? lookupProduct[0].units : 0    
    } else {
        productUnits = product.units ? product.units : 0
    }

    // if can't add more items of the product to cart
    if (productUnits >= productQuantity) {
        dispatch(returnErrors({
            cantAddMoreItems: "Can not add more items of this product."
        }))
    } else {
        // we can add more items of the product to cart
        dispatch({
            type: ADD_TO_CART,
            payload: product
        })

        dispatch(createMessage(
            { itemAddedToCart: "Item was added to cart" }
        ))
    }
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
