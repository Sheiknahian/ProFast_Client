import React, { use, useState } from 'react';
import { ImgContext } from '../Context/Image-Context/ImgContext';
import { Link } from 'react-router';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import { IoMdMenu } from "react-icons/io";


const Navbar = () => {
    const [active, setActive] = useState('service')
    const {logo} = use(ImgContext)
    const {user, logout} = use(AuthContext)
    return (
        <div className='mx-10 py-5'>
            <div className='bg-white hidden md:flex p-5 rounded-lg justify-between items-center'>
                <div className='flex items-center'>
                    <img src={logo} alt="" />
                    <h2 className='text-2xl font-bold'>ProFast</h2>
                </div>
                <ul className='flex items-center gap-5'>
                    <Link onClick={()=>setActive('service')} to={'/'}>
                        <li className={`text-gray-700 font-semibold cursor-pointer hover:bg-[#CAEB66] p-2 px-3 rounded-full ${active === 'service' && 'bg-[#CAEB66]'}`}>Service</li>
                    </Link>
                {
                    user &&
                    <Link to={'/dashboard'}>
                        <li className='text-gray-700 font-semibold cursor-pointer hover:bg-[#CAEB66] p-2 rounded-full'>Dashboard</li>
                    </Link>
                }
                    <Link onClick={()=>setActive('coverage')} to={'/coverage'}>
                        <li className={`text-gray-700 font-semibold cursor-pointer hover:bg-[#CAEB66] p-2 px-3 rounded-full ${active === 'coverage' && 'bg-[#CAEB66]'}`}>Coverage</li>
                    </Link>
                    <Link onClick={()=>setActive('sendparcel')} to={'/sendparcel'}>
                        <li className={`text-gray-700 font-semibold cursor-pointer hover:bg-[#CAEB66] p-2 px-3 rounded-full  ${active === 'sendparcel' && 'bg-[#CAEB66]'}`}>Send Parcel</li>
                    </Link>
                    <Link onClick={()=>setActive('rider')} to={'/rider'}>
                        <li className={`text-gray-700 font-semibold cursor-pointer hover:bg-[#CAEB66] p-2 px-3 rounded-full ${active === 'rider' && 'bg-[#CAEB66]'}`}>Be A Rider</li>
                    </Link>
                </ul>
                {
                    !user ?
                    <div className='flex gap-4'>
                        <Link to={'/signup'}>
                            <button className='btn bg-white text-gray-700 font-semibold shadow-none border-gray-400 rounded-xl text-lg p-6'>Sign In</button>
                        </Link>
                        <Link to={'/rider'}>
                            <button className='btn bg-[#CAEB66] text-black font-semibold shadow-none border-[#CAEB66] rounded-xl text-lg p-6'>Be A Rider</button>
                        </Link>
                    </div>
                    :
                    <div className='flex items-center gap-5'>
                        <img src={user?.photoURL} className='w-12 h-12 rounded-full' alt="" />
                        <button onClick={logout} className='btn bg-white text-gray-700 font-semibold shadow-none border-gray-400 rounded-xl text-lg p-6'>Logout</button>
                    </div>
                }
            </div>
            <div className='flex justify-between md:hidden'>
                <div className="drawer">
                    <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-1" className="btn drawer-button text-2xl bg-transparent border-none shadow-none text-black"><IoMdMenu></IoMdMenu></label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                        </ul>
                    </div>
                </div>
                <div className='flex items-center'>
                    <img src={logo} alt="" />
                    <h2 className='text-2xl font-bold'>ProFast</h2>
                </div>
            </div>
        </div>
    );
};

export default Navbar;