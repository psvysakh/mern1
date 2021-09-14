import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Banner1 from '../../image/banner-1.jpg';
const Banner = () => {
    return (
        <Carousel showThumbs={false}>
            <div>
                <img src={Banner1} />
            </div>
            <div>
                <img src={Banner1} />
            </div>
            <div>
                <img src={Banner1} />
            </div>
        </Carousel>
    )
}

export default Banner;