import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getProducts } from '../../actions/products'


class ProductList extends Component {
    static propTypes = {
        products: PropTypes.object.isRequired
    }


    componentDidMount() {
        this.props.getProducts()
    }


    render() {
        const products = this.props.products.results
        let product_results = null

        if (products) {
            product_results = products.map(product => {
                const key = product.name + product.model + product.code
                return (
                    <div key={key} className="col-lg-3 col-md-4 my-4 border-5 px-4">
                        <div className="row">
                            <a href="#">
                                <img className="mx-auto img-fluid img-thumbnail rounded" src={ product.image } alt={product.name} />
                            </a>
                        </div>
                        <h4 className="my-1 product-name" style={{ height: "50px", overflow: "hidden", fontSize: "16px" }}><a href="#">{ product.name }</a></h4>
                        <span className="mt-5"><strong>{ product.price }</strong></span>
                    </div>
                )
            })
        }

        return (
            <Fragment>
                <h1>Product List</h1>
                <div className="row">
                {
                    products && product_results ? product_results : null
                }
                </div>
            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
    products: state.products.products
})


export default connect(mapStateToProps, { getProducts }) (ProductList)
