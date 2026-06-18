import React, { use, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { ImgContext } from '../Context/Image-Context/ImgContext';
import { FaHistory, FaRegMap, FaUser } from "react-icons/fa";
import { MdAssignmentAdd, MdOutlineSettings, MdOutlineSpaceDashboard, MdOutlineTaskAlt } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { AiOutlineProduct } from "react-icons/ai";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaMotorcycle } from "react-icons/fa";
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import useRole from '../Hooks/useRole';
import Footer from '../Pages/Footer';
import Swal from 'sweetalert2';



const DashboardLayout = () => {
    const {logo} = use(ImgContext)
    const [open, setOpen] = useState(false)
    const {logout, user} = use(AuthContext)
    const {role} = useRole()
    // console.log(role);
    // console.log(user.displayName);
    
    
    const handleToggle = () => {
        setOpen(!open)
    }

    const handleLogout = () => {
            Swal.fire({
                title: "Are you sure?",
                text: "Are you want to Logout?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dfd225",
                cancelButtonColor: "rgb(51, 173, 221)",
                confirmButtonText: "Logout"
            }).then((result) => {
                    if (result.isConfirmed){
                        logout()
                        alert(`${role} Loged Out!`)
                    }
            });
        }
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-white mb-10 flex justify-between">
                        <label onClick={handleToggle} htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost hover:bg-[#CAEB66] border-none shadow-none hover:text-black">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className='flex items-center mr-10 gap-3'>
                            <img className='rounded-full w-10' src={user?.photoURL} alt="profile" />
                            <div>
                                <p className='text-md font-semibold'>{user?.displayName}</p>
                                <p className='capitalize'>{role}</p>
                            </div>
                        </div>
                    </nav>
                    {/* Page content here */}
                    <Outlet></Outlet>
                    <Footer></Footer> 
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-screen flex-col items-start bg-white is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <Link to={'/'}>
                    {
                        open ? 
                        <div className='flex items-center m-2'>
                            <img src={logo} alt="" />
                            <h2 className='text-2xl font-bold'>ProFast</h2>
                        </div>
                        :
                        <div className='m-2'>
                            <img src={logo} alt="" />
                        </div>
                    }
                    </Link>
                        <ul className={`menu w-full ${open ? 'gap-2' : 'mt-5 gap-1'}`}>
                            <h3 className={open ? 'text-md font-semibold' : 'hidden'}>MENU</h3>
                            {/* List item */}
                            <li>
                                <NavLink to={'/dashboard'} className={({isActive})=> isActive ? 'bg-[#CAEB66] font-semibold text-[15px]' : ''}>
                                    <button className="is-drawer-close:tooltip flex items-center gap-2 is-drawer-close:tooltip-right cursor-pointer" data-tip="Dashboard">
                                        <MdOutlineSpaceDashboard></MdOutlineSpaceDashboard>
                                        <span className="is-drawer-close:hidden">Dashboard</span>
                                    </button>
                                </NavLink>
                            </li>
                        {
                            role === 'user' &&
                            <>
                            <li>
                                <NavLink to={'/myParcels'} className={({isActive})=> isActive ? 'bg-[#CAEB66] font-semibold text-[15px]' : ''}>
                                    <button className="is-drawer-close:tooltip flex items-center gap-2 is-drawer-close:tooltip-right cursor-pointer" data-tip="My Parcels">
                                        <AiOutlineProduct></AiOutlineProduct>
                                        <span className="is-drawer-close:hidden">My Parcels</span>
                                    </button>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/paymentHistory'} className={({isActive})=> isActive ? 'bg-[#CAEB66] font-semibold text-[15px]' : ''}>
                                    <button className="is-drawer-close:tooltip flex items-center gap-2 cursor-pointer is-drawer-close:tooltip-right" data-tip="Payment History">
                                        <FaHistory></FaHistory>
                                        <span className="is-drawer-close:hidden">Payment History</span>
                                    </button>
                                </NavLink>
                            </li>
                            </>
                            
                        }
                        
                        {
                            role === 'admin' &&
                            <>
                            <li>
                                <NavLink to={'/approveRiders'} className={({isActive})=> isActive ? 'bg-[#CAEB66] font-semibold text-[15px]' : ''}>
                                    <button className="is-drawer-close:tooltip flex items-center gap-2 cursor-pointer is-drawer-close:tooltip-right" data-tip="Approve Riders">
                                        <FaMotorcycle></FaMotorcycle>
                                        <span className="is-drawer-close:hidden">Approve Riders</span>
                                    </button>
                                </NavLink>
                            </li>
                            
                            <li>
                                <NavLink to={'/manageUsers'} className={({isActive})=> isActive ? 'bg-[#CAEB66] font-semibold text-[15px]' : ''}>
                                    <button className="is-drawer-close:tooltip flex items-center gap-2 cursor-pointer is-drawer-close:tooltip-right" data-tip="Manage Users">
                                        <FaUser></FaUser>
                                        <span className="is-drawer-close:hidden">Manage Users</span>
                                    </button>
                                </NavLink>
                            </li>
                            
                            <li>
                                <NavLink to={'/assignRiders'} className={({isActive})=> isActive ? 'bg-[#CAEB66] font-semibold text-[15px]' : ''}>
                                    <button className="is-drawer-close:tooltip flex items-center gap-2 cursor-pointer is-drawer-close:tooltip-right" data-tip="Assign Riders">
                                        <MdAssignmentAdd />
                                        <span className="is-drawer-close:hidden">Assign Riders</span>
                                    </button>
                                </NavLink>
                            </li>
                            </>
                        }

                        {
                            role === 'rider' &&
                            <>
                            <li>
                                <NavLink to={'/assignedWorks'} className={({isActive})=> isActive ? 'bg-[#CAEB66] font-semibold text-[15px]' : ''}>
                                    <button className="is-drawer-close:tooltip flex items-center gap-2 cursor-pointer is-drawer-close:tooltip-right" data-tip="Assigned Works">
                                        <MdAssignmentAdd />
                                        <span className="is-drawer-close:hidden">Assigned Works</span>
                                    </button>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/completedTasks'} className={({isActive})=> isActive ? 'bg-[#CAEB66] font-semibold text-[15px]' : ''}>
                                    <button className="is-drawer-close:tooltip flex items-center gap-2 cursor-pointer is-drawer-close:tooltip-right" data-tip="Completed Tasks">
                                        <MdOutlineTaskAlt />
                                        <span className="is-drawer-close:hidden">Completed Tasks</span>
                                    </button>
                                </NavLink>
                            </li>
                            </>
                        }
                            <li>
                                <NavLink to={'/coverageArea'} className={({isActive})=> isActive ? 'bg-[#CAEB66] font-semibold text-[15px]' : ''}>
                                    <button className="is-drawer-close:tooltip flex items-center gap-2 cursor-pointer is-drawer-close:tooltip-right" data-tip="Coverage Area">
                                        <FaRegMap></FaRegMap>
                                        <span className="is-drawer-close:hidden">Coverage Area</span>
                                    </button>
                                </NavLink>
                            </li>
                            <h3 className={open ? 'text-md font-semibold mt-5' : 'hidden'}>GENERAL</h3>
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Settings">
                                {/* Settings icon */}
                                    <MdOutlineSettings></MdOutlineSettings>
                                    <span className="is-drawer-close:hidden">Settings</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Logout">
                                    <LuLogOut></LuLogOut>
                                    <span className="is-drawer-close:hidden">Logout</span>
                                </button>
                            </li>
                            <li>
                                <NavLink to={'/forgetpass'}>
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right cursor-pointer flex items-center gap-2" data-tip="Change Password">
                                        <RiLockPasswordLine></RiLockPasswordLine>
                                        <span className="is-drawer-close:hidden">Change Password</span>
                                    </button>
                                </NavLink>
                            </li>
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Help">
                                {/* Settings icon */}
                                    <IoMdHelpCircleOutline></IoMdHelpCircleOutline>
                                    <span className="is-drawer-close:hidden">Help</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;