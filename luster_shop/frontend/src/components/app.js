import React, { Component } from 'react'
import ReactDom from 'react-dom'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from '../store'

import Header from './layouts/header'
import ProductList from './products/product_list'
import ProductDetail from './products/product_detail'

import Login from './accounts/login'
import Register from './accounts/register'
import { loadUser } from '../actions/auth'


class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Header />
                    <div className="container">
                        <Switch>
                            <Route exact path="/login" component={Login} />} />
                            <Route exact path="/register" component={Register} />} />
                            
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
