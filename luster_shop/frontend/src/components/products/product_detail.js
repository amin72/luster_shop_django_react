import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getProduct } from '../../actions/products'


class ProductDetail extends Component {
    static propTypes = {
        product: PropTypes.object
    }


    componentDidMount() {
        this.props.getProduct(this.props.match.params.slug)
    }


    render() {
        const product = this.props.product

        return (
            <Fragment>
                { product ? (
                    <div className="row">
                        <h1>Product Detail</h1>
                        <div className="row">
                            <img className="mx-auto img-fluid img-thumbnail rounded" src={ product.image } alt={product.name} />
                        </div>
                        <div className="row"><h4 className="my-1 product-name" style={{ height: "50px", overflow: "hidden", fontSize: "20px" }}>{ product.name }</h4></div>
                        <div className="row"><span className="mt-5"><strong>{ product.price }</strong></span></div>
                    </div>
                ) : null }
            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
    product: state.products.product
})


export default connect(mapStateToProps, { getProduct }) (ProductDetail)
