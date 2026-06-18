import React, { use } from 'react';
import { ImgContext } from '../Context/Image-Context/ImgContext';
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    const {logo} = use(ImgContext)
    return (
        <div className='px-5 min-h-screen bg-white'>
            <Link to={'/'}>
                <div className='flex items-center pt-5'>
                    <img src={logo} alt="" />
                    <h2 className='text-2xl font-bold'>ProFast</h2>
                </div>
            </Link>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;