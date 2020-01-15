import {
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_TO_CART,
    LOAD_CART
} from '../actions/types'


const initialState = {
    products: {},
    cart: [],
}


export default (state=initialState, action) => {
    switch (action.type) {
        case LOAD_CART:
            const cartStored = localStorage.getItem('cart')
            const cartParsed = JSON.parse(cartStored)
            const loadedCart = cartParsed ? cartParsed : []
            
            return {
                ...state,
                cart: loadedCart
            }

        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            }

        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
            }

        case ADD_TO_CART:
            const product = action.payload
            const cart = state.cart
            let result;
    
            const existingProduct = cart.filter(p => p.slug === product.slug)
    
            if (existingProduct.length > 0) {
                const withoutExistingProduct = cart.filter(p =>
                    p.slug !== product.slug)

                // initialize units if not set
                let existingProductUnits = existingProduct[0].units
                let productUnits = product.units
                
                existingProductUnits = existingProductUnits ? existingProductUnits : 1
                productUnits = productUnits ? productUnits : 0

                const updatedUnitsProduct = {
                    ...existingProduct[0],
                    units: existingProductUnits + productUnits
                }
    
                result = {
                    ...state,
                    cart: [...withoutExistingProduct, updatedUnitsProduct]
                }
            } else {
                product.units = 1
                result = {
                    ...state,
                    cart: [...cart, product]
                }
            }

            // store cart in local storage
            const storedCart = JSON.stringify(result.cart)
            localStorage.setItem('cart', storedCart)
            return result
        
        default:
            return state
    }
}