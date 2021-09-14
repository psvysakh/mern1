import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductStart, getRelatedStart } from '../redux/core/core.action';
import Image from '../components/Image/Image';
import Card from '../components/Card/Card';
import { addToCart } from '../redux/cart/cart.action';
const Product = ({
    product,
    getProduct,
    getRelated,
    related,
    match,
    addToCart,
    isAuth,
    role,
    cart
}) => {



    const callProducts = (productId) => {
        getProduct({ type: 'user', productId });
        getRelated(productId);
    }

    useEffect(() => {
        const productId = match.params.productId;
        callProducts(productId);
    }, [match]);

    return (
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="col-lg-1">
                </div>
                <div className="col-lg-5 ">
                    <Image name={product.name} id={product._id} />
                </div>
                <div className="col-lg-5">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <strong>${product.price}</strong>
                    <p>{product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>

                    {isAuth && role === 1 ? (
                        <button
                            className="btn btn-primary">
                            Update
                        </button>
                    ) : ''}
                    {cart.cartItems.findIndex((item) => item._id === product._id) >= 0 ?
                        <button className="btn btn-dark view-cart">
                            <Link to="/cart"> View Cart</Link>
                        </button>
                        : <button onClick={() => addToCart(product)}
                            className="btn btn-primary cart"> Add to Cart </button>

                    }

                </div>
                <div className="col-lg-12">
                    <h4>Related Products</h4>
                    <div className="row">
                        {related ? related.map((p, i) => {
                            return (<div className="col-lg-3">
                                <Card key={i} product={p} />
                            </div>)

                        }) : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated,
    role: state.auth.role,
    product: state.core.product,
    related: state.core.relatedProducts,
    cart: state.cart
});
const mapDispatchToProps = dispatch => ({
    getProduct: (productId) => dispatch(getProductStart(productId)),
    getRelated: (productId) => dispatch(getRelatedStart(productId)),
    addToCart: (product) => dispatch(addToCart(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);