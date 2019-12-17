import React, { Component } from 'react'
import ReactDom from 'react-dom'

import { Provider } from 'react-redux'
import store from '../store'

import Header from './layouts/header'
import ProductList from './products/product_list'


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Header />
                <div className="container">
                    <ProductList />
                </div>
            </Provider>
        )
    }
}


ReactDom.render(<App />, document.getElementById('app'))
