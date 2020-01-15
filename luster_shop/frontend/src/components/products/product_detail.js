import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getProduct } from '../../actions/products'
import { addToCart } from '../../actions/products'


class ProductDetail extends Component {
    static propTypes = {
        product: PropTypes.object
    }


    componentDidMount() {
        this.props.getProduct(this.props.match.params.slug)
    }


    render() {
        const product = this.props.product
        const productSlug = this.props.match.params.slug
        const cart = this.props.cart

        return (
            <Fragment>
                <h1>Cart Items</h1>
                <ul className="list-group">
                {
                    cart.map(product => (
                        <li
                            key={product.slug}
                            className="list-group-item">{ product.name }
                        </li>
                    ))
                }
                </ul>

                { product ? (
                    <div className="row">
                        <h1>Product Detail</h1>
                        <div className="col-md-6">
                            <img className="mx-auto img-fluid img-thumbnail rounded" src={ product.image } alt={product.name} />
                        </div>
                        <div className="col-md-6">
                            <h4 className="my-1 product-name" style={{ height: "50px", overflow: "hidden", fontSize: "20px" }}>{ product.name }</h4>
                            </div>
                        <div className="col-md-3">
                            <span className="mt-5"><strong>{ product.price }</strong></span>
                        </div>
                        <div className="col-md-3"><a onClick={() => this.props.addToCart(product) }  className="btn btn-success text-light">Add to cart</a></div>
                    </div>
                ) : null }
            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
    product: state.products.product,
    cart: state.products.cart
})


export default connect(mapStateToProps, { getProduct, addToCart }) (ProductDetail)
