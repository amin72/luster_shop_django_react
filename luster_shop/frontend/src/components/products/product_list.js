import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { getProducts } from '../../actions/products'


class ProductList extends Component {
    static propTypes = {
        products: PropTypes.object.isRequired,
        getProducts: PropTypes.func.isRequired,
    }


    componentDidMount() {
        this.props.getProducts(this.props.location.search)
    }


    componentDidUpdate(prevProps) {
        if (this.props.location.search != prevProps.location.search) {
            this.props.getProducts(this.props.location.search)
        }
    }


    render() {
        const products = this.props.products.results
        
        return (
            <div className="row">
                <h1>Product List</h1>
                { products ?
                    products.map(product => (
                        <div key={product.name} className="col-lg-3 col-md-4 my-4 border-5 px-4">
                            <div className="row">
                                <Link to={ product.slug }>
                                    <img className="mx-auto img-fluid img-thumbnail rounded" src={ product.image } alt={product.name} />
                                </Link>
                            </div>
                            
                            <h4 className="my-1 product-name" style={{ height: "50px", overflow: "hidden", fontSize: "16px" }}><a href="#">{ product.name }</a></h4>
                            <span className="mt-5"><strong>{ product.price }</strong></span>
                        </div>
                        )
                    ) : null
                }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    products: state.products.products
})


export default connect(mapStateToProps, { getProducts }) (ProductList)
