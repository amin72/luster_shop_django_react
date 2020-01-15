import {
    GET_PRODUCTS,
    GET_PRODUCT,
    ADD_TO_CART,
    LOAD_CART,
    REMOVE_ITEM_FROM_CART
} from '../actions/types'


const initialState = {
    products: {},
    cart: [],
}



// load cart from local storage
const loadCartFromLocalStorage = () => {
    const cartStored = localStorage.getItem('cart')
    const cartParsed = JSON.parse(cartStored)
    return cartParsed ? cartParsed : []
}



// save cart to local storage
export const saveCartToLocalStorage = (cart) => {
    const storedCart = JSON.stringify(cart)
    localStorage.setItem('cart', storedCart)
}



export default (state=initialState, action) => {
    switch (action.type) {
        case LOAD_CART:
            let loadedCart = loadCartFromLocalStorage()
            
            return {
                ...state,
                cart: loadedCart
            }

        case REMOVE_ITEM_FROM_CART:
            loadedCart = loadCartFromLocalStorage()
            const productSlug = action.payload

            const updatedCart = loadedCart.filter(product => product.slug !== productSlug)
            saveCartToLocalStorage(updatedCart)

            return {
                ...state,
                cart: [...updatedCart]
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
                let productUnits = existingProduct[0].units
                productUnits = productUnits ? productUnits + 1 : 1
                existingProduct[0].units = productUnits

                const withoutExistingProduct = cart.filter(p =>
                    p.slug !== product.slug)
    
                result = {
                    ...state,
                    cart: [...withoutExistingProduct, ...existingProduct[0]]
                }
            } else {
                product.units = 1
                result = {
                    ...state,
                    cart: [...cart, product]
                }
            }

            // store cart in local storage
            saveCartToLocalStorage(result.cart)
            return result
        
        default:
            return state
    }
}
