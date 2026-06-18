import React, { use } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { ImgContext } from '../Context/Image-Context/ImgContext';
import useRole from '../Hooks/useRole'

const Banner = () => {
    // const {role} = useRole()
    // console.log(role);
    
    const {banner1, banner2, banner3} = use(ImgContext)
    return (
        <Carousel className='md:mx-10'
            autoPlay={true}
            infiniteLoop={true}
            interval={3000}
            transitionTime={1000}
            showThumbs={false}
            showStatus={false}
            showIndicators={true}>
            <div>
                <img src={banner1} />
            </div>
            <div>
                <img src={banner2} />
            </div>
            <div>
                <img src={banner3} />
            </div>
        </Carousel>
    );
};

export default Banner;