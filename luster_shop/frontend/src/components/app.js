import React, { Component } from 'react'
import ReactDom from 'react-dom'

import Header from './layouts/header'

import { Provider } from 'react-redux'
import store from '../store'


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Header />
            </Provider>
        )
    }
}


ReactDom.render(<App />, document.getElementById('app'))
