
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { fetchFiltersStart, getCategoriesStart, loadMoreStart } from '../redux/core/core.action';

import Checkbox from '../components/checkbox/checkbox';
import Radiobox from '../components/radiobox/radiobox';
import Card from '../components/Card/Card';
import './shop.scss';

const Shop = ({
    categories,
    getCategories,
    prices,
    newFilterFetch,
    products,
    size,
    skip,
    limit,
    loadMore

}) => {


    const [myFilter, setmyFilters] = useState({
        filters: {
            'category': [],
            'price': []
        }
    })
    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === +(value)) {
                array = data[key].array;
            }
        }
        return array;
    }



    const handleFilters = (filters, filterBy) => {
        const newFilter = { ...myFilter }
        newFilter.filters[filterBy] = filters;

        if (filterBy === 'price') {
            let priceValue = handlePrice(filters);
            newFilter.filters[filterBy] = priceValue;
        }

        setmyFilters(newFilter);
        newFilterFetch({ limit, ...myFilter });

    }
    const loadMoreHandle = () => {
        skip = products.length;
        loadMore({ skip, limit, ...myFilter });
    }
    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit ? (
                <button onClick={loadMoreHandle} className="btn btn-primary">Load More</button>
            ) : ''
        )
    }
    useEffect(() => {
        getCategories();
        newFilterFetch({ limit, ...myFilter });
    }, [])
    return (
        <section className="shop-page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2">
                        <h4>Filters</h4>
                        <hr />
                        <h5>Category</h5>
                        <ul>
                            <Checkbox
                                handleFilters={(filters) => handleFilters(filters, 'category')}
                                categories={categories} />
                        </ul>

                        <h5>Price</h5>

                        <Radiobox
                            handleFilters={(filters) => handleFilters(filters, 'price')}
                            prices={prices} />

                    </div>
                    <div className="col-lg-10">
                        <div className="row">
                            {products ? products.map((p, i) => (
                                <div key={i} className="col-lg-3">
                                    <Card product={p} />
                                </div>
                            )) : ''}
                            <div className="col-lg-12 text-center">
                                {loadMoreButton()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
const mapStateToProps = state => ({
    categories: state.core.categories,
    prices: state.core.prices,
    products: state.core.filteredProducts,
    size: state.core.size,
    skip: state.core.skip,
    limit: state.core.limit
})
const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategoriesStart()),
    newFilterFetch: (filters) => dispatch(fetchFiltersStart(filters)),
    loadMore: (filters) => dispatch(loadMoreStart(filters))
})
export default connect(mapStateToProps, mapDispatchToProps)(Shop);