import axios from 'axios'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types'

import { returnErrors, createMessage } from './messages'


// Check token and load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING })

    // Get token from state
    const token = getState().auth.token

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    axios.get('/api/auth/user/', config)
        .then(res => {
            dispatch({ 
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.state))
        })
}



// Login user
export const login = (username, password) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ username, password })

    axios.post('/api/auth/login/', body, config)
        .then(res => {
            dispatch({ 
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            dispatch(createMessage({ userLoggedIn: "You are logged in into your account!" }))
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.state))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}



// Logout user
export const logout = () => (dispatch, getState) => {
    // Get token from state
    const token = getState().auth.token

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }
    
    axios.post('/api/auth/logout/', null, config)
        .then(res => {
            dispatch({ 
                type: LOGOUT_SUCCESS,
                payload: res.data
            })
            dispatch(createMessage({ userLoggedOut: "You are logged out from your account!" }))
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.state))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}



// Register user
export const register = ({ username, email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ username, email, password })

    axios.post('/api/auth/register/', body, config)
        .then(res => {
            dispatch({ 
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            dispatch(createMessage({ accountCreated: "Your account was created successfully!" }))
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.state))
            dispatch({
                type: REGISTER_FAIL
            })
        })

}
