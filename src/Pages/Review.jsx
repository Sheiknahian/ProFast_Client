import React, { use, useEffect, useState } from 'react';
import { ImgContext } from '../Context/Image-Context/ImgContext';
import '../../public/Data/review.json';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import Card from './Card';


const Review = () => {
    const [reviews, setReviews] = useState([])
    const {customer} = use(ImgContext);
    useEffect(()=>{
        fetch(`../../Data/review.json`).then(res=>res.json()).then(datas=>setReviews(datas))
    }, [])
    return (
        <div>
            <div className='flex flex-col items-center text-center mt-20'>
                <div>
                    <img src={customer} alt="" />
                </div>
                <div className='md:w-160 mx-10 md:mx-none mt-10'>
                    <h2 className='text-2xl md:text-3xl font-bold text-[#03373D]'>What our customers are sayings</h2>
                    <p className='text-[#03373D] mt-5'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
                </div>
            </div>
            <div className='mt-10'>
                <Swiper
                    modules={[Navigation, Pagination]}
                    pagination={true}
                    loop
                    centeredSlides={true}
                    slidesPerView={3}
                    spaceBetween={30}
                    className="testimonialSwiper"
                    >
                    {
                        reviews.map(review=><SwiperSlide style={{display: 'flex', justifyContent: 'center', marginRight: '30px'}}>
                                                <Card review={review}></Card>
                                            </SwiperSlide>)
                    }
                    
                </Swiper>
            </div>
        </div>
    );
};

export default Review;