import React from 'react';
import logo from './assets/brands/logo.png'
import banner1 from './assets/banner/banner1.png'
import banner2 from './assets/banner/banner2.png'
import banner3 from './assets/banner/banner3.png'
import bookingIcon from './assets/Icons/bookingIcon.png'
import service from './assets/Icons/service.png'
import amazon from './assets/brands/amazon.png'
import casio from './assets/brands/casio.png'
import moonstar from './assets/brands/moonstar.png'
import randstar from './assets/brands/randstad.png'
import starPeople from './assets/brands/start-people 1.png'
import star from './assets/brands/start.png'
import tracking from './assets/Icons/live-tracking.png'
import delivery from './assets/Icons/safe-delivery.png'
import merchant from './assets/Icons/location-merchant.png'
import merchantBg from './assets/Icons/be-a-merchant-bg.png'
import customer from './assets/Icons/customer-top.png'
import quote from './assets/Icons/reviewQuote.png'
import fb from './assets/Icons/fb-icon.png'
import yt from './assets/Icons/yt-icon.png'
import lin from './assets/Icons/lin-icon.png'
import twit from './assets/Icons/x-icon.png'
import authImg from './assets/Icons/authImage.png'
import uploadImg from './assets/Icons/image-upload-icon.png'
import agent from './assets/Icons/agent-pending.png'

import { ImgContext } from './ImgContext';

const ImgProvider = ({children}) => {
    // console.log(banner1, banner2, banner3);
    // console.log(bookingIcon);
    
    
    const imgInfo = {
        logo,
        banner1, banner2, banner3,
        bookingIcon, service,
        amazon, casio, moonstar, randstar, starPeople, star,
        tracking, delivery,
        merchant, merchantBg,
        customer,
        quote,
        fb, yt, lin, twit,
        authImg, uploadImg,
        agent
    }
    return (
        <ImgContext value={imgInfo}>
            {children}
        </ImgContext>
    )
};

export default ImgProvider;