import React, { use } from 'react';
import { ImgContext } from '../Context/Image-Context/ImgContext';
import useRole from '../Hooks/useRole';
import { AuthContext } from '../Context/Auth-Context/AuthContext';

const Footer = () => {
    const {logo, fb, yt, lin, twit} = use(ImgContext);
    const {loading} = use(AuthContext)
    const {isLoading} = useRole()
    if(isLoading || loading){
        return <div></div>
    }
    return (
        <div className='mx-10 pb-10 mt-10 rounded-3xl flex flex-col justify-center items-center gap-10 bg-black py-20'>
            <div>
                <div className='flex justify-center items-center'>
                    <img src={logo} alt="" />
                    <h2 className='text-2xl text-white font-bold'>ProFast</h2>
                </div>
                <p className='mt-2 text-gray-300 px-5 md:px-none md:w-150 text-center'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <ul className='flex p-5 gap-4 md:gap-8 flex-wrap'>
                <li className='text-white'>Services</li>
                <li className='text-white'>Coverage</li>
                <li className='text-white'>About Us</li>
                <li className='text-white'>Pricing</li>
                <li className='text-white'>Blog</li>
                <li className='text-white'>Contact</li>
            </ul>
            <div className='flex gap-5'>
                <img src={fb} alt="" />
                <img src={yt} alt="" />
                <img src={lin} alt="" />
                <img src={twit} alt="" />
            </div>
        </div>
    );
};

export default Footer;