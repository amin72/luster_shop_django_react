import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { getProducts } from '../../actions/products'

import ReactPaginate from 'react-paginate'


class ProductList extends Component {
    state = {
        currentPage: 1
    }


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


    handlePageClick = data => {
        const currentPage = data.selected + 1

        this.setState({ currentPage: currentPage }, () => {
            const pagePraram = `?page=${currentPage}`
            this.props.getProducts(pagePraram)
        })
    }


    render() {
        const products = this.props.products.results
        const cart = this.props.cart

        return (
            <div className="row">
                <h1>Cart Items</h1>
                <ul className="list-group">
                {
                    cart.map(product => (
                        <li
                            key={product.slug}
                            className="list-group-item">{ product.name } {product.units}
                        </li>
                    ))
                }
                </ul>

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

                { this.props.paginate && products ? (
                    <nav aria-label="Page navigation example">

                    <ReactPaginate
                        previousLabel={<span>&laquo;</span>}
                        nextLabel={<span>&raquo;</span>}
                        pageCount={this.props.products.count / this.props.pageSize}
                        marginPagesDisplayed={3}
                        pageRangeDisplayed={0}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'page-link'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        activeClassName={'active'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        />
                        </nav>) : null
                }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    products: state.products.products,
    cart: state.products.cart,
})


export default connect(mapStateToProps, { getProducts }) (ProductList)
