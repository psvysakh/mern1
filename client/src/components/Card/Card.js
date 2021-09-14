import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Image from '../Image/Image';
import CustomButton from '../customButton/customButton';
import './Card.scss';
import { addToCart } from '../../redux/cart/cart.action';
import { deleteProductStart } from '../../redux/admin/admin.action';

const Card = ({ product, history }) => {
    const { isAuthenticated, role } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    return (
        <div className=" mb-3">

            <div className="card product">
                <Link to={`/product/${product.name.split(' ').join('')}/${product._id}`}>
                    <Image name={product.name} id={product._id} />
                </Link>
                <div className="details">
                    <h2> {product.name}</h2>
                    <p>{product.description.substring(0, 25)}</p>
                    <p>$ {product.price}</p>
                    <div className="d-flex">

                        {isAuthenticated && role === 1 ? (
                            <div className="d-flex">
                                <Link to={`/update/${product._id}`}>
                                    <CustomButton className="btn btn-outline-primary">Update</CustomButton>
                                </Link>
                                <CustomButton
                                    className="btn btn-outline-danger"
                                    onClick={() => dispatch(deleteProductStart({ history, productId: product._id }))}>Delete</CustomButton>

                            </div>

                        ) :
                            (
                                <div className="d-flex">
                                    <Link to={`/product/${product.name.split(' ').join('')}/${product._id}`}>
                                        <CustomButton className="btn btn-outline-primary view">View Product</CustomButton>
                                    </Link>
                                    <CustomButton onClick={() => dispatch(addToCart(product))} className="btn btn-outline-warning cart">
                                        Add to Cart
                                    </CustomButton>
                                </div>
                            )
                        }

                    </div>
                </div>

            </div>

        </div>
    )
}

export default withRouter(Card);