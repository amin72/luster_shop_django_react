import React, { Component } from 'react'
import ReactDom from 'react-dom'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from '../store'

import Header from './layouts/header'
import ProductList from './products/product_list'
import ProductDetail from './products/product_detail'


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Header />
                    <div className="container">
                        <Switch>
                            <Route path="/products" render={props => <ProductList paginate={true} pageSize={10} {...props} />} />
                            <Route exact path="/" component={ProductList} />
                            <Route path="/:slug" component={ProductDetail} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
}


ReactDom.render(<App />, document.getElementById('app'))
