import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchProductsStart } from '../redux/core/core.action';

import Card from '../components/Card/Card';
import Search from '../components/search/search';
import Banner from '../components/Banner/Banner';


import './home.scss';

const Homepage = () => {
    const { productsBySell, productsByArrival, productsBySearch } = useSelector(state => state.core);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProductsStart('createdAt'));
        dispatch(fetchProductsStart('sold'));

    }, []);

    return (
        <div>
            <Banner />
            <section className="home">
                <div className="container">
                    {/*  <div className="row">
                        <div className="col-lg-12">
                            <div className="jumbotron jumbotron-fluid">
                                <div className="container">
                                    <h1 className="display-4">Books For Developers</h1>
                                    <p className="lead">Learning Path for Beginners to Advanced Level Developers </p>
                                    <Search />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <h3>{productsBySearch ? `${productsBySearch.length} product found` : ''}</h3>
                    <div className="row">

                        {productsBySearch ? productsBySearch.map((p, i) => {
                            return (
                                <div key={i} className="col-lg-3">
                                    <Card product={p} />
                                </div>
                            )
                        }) : ''}

                    </div>
                    <h2>By Arrival</h2>
                    <div className="row">

                        {productsByArrival ? productsByArrival.map((p, i) => {
                            return (
                                <div key={i} className="col-lg-3">
                                    <Card product={p} />
                                </div>
                            )
                        }) : ''}


                    </div>
                    <h2>By Sell</h2>
                    <div className="row">

                        {productsBySell ? productsBySell.map((p, i) => {
                            return (
                                <div key={i} className="col-lg-3">
                                    <Card product={p} />
                                </div>
                            )
                        }) : ''}



                    </div>
                </div>
            </section>

        </div>

    )
}

export default Homepage;