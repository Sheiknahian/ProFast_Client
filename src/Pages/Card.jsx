import React, { use } from 'react';
import { ImgContext } from '../Context/Image-Context/ImgContext';
import './card.css'

const Card = ({review}) => {
    const {quote} = use(ImgContext);
    // console.log(review);
    
    return (
        <div className='bg-white w-80 h-60 p-5 mb-15 rounded-xl'>
            <div>
                <img src={quote} alt="" />
            </div>
            <div>
                <p>{review.review}</p>
            </div>
             <div className='w-9/10 mx-auto border-t-3 border-dotted border-gray-400 my-5'></div>
            <div className='flex gap-4 items-center'>
                <div className='w-10 h-10 rounded-full bg-[#03373D]'></div>
                <div>
                    <h4 className='text-[#03373D] text-lg font-bold'>{review.userName}</h4>
                    <p>{review.user_email}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;