import React, { use, useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa";
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import { Navigate } from 'react-router';


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = use(AuthContext)
    const [search, setSearch] = useState('')
    const {isLoading, isFetching, error, refetch, data: users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users?searchedText=${search}&email=${user?.email}`)
            return res.data.filter(d=> d.email !== user?.email)
        }
    }) 
    console.log(users);
    
    useEffect(()=>{
        if (error?.response?.status === 403) {
            <Navigate to={'/forbidden'}></Navigate>
        }
    }, [error])
    const handleSearch = (e) => {
        setSearch(e.target.value);
        refetch(); 
    }
    
    const handleMakeAdmin = (id, name) => {
        const roleInfo = {role: 'admin'}
        Swal.fire({
                title: "Are you sure?",
                text: `Are you want to set ${name}'s role to Admin?`,
                showCancelButton: true,
                confirmButtonColor: "",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirm"
            }).then((result) => {
                    if (result.isConfirmed){
                        axiosSecure.patch(`/users/${id}?email=${user?.email}`, roleInfo)
                            .then(res=>{
                                if (res.data.modifiedCount > 0){
                                    refetch()
                                    Swal.fire({
                                        title: "Confirmed!",
                                        text: `${name} has been set to an Admin`,
                                        icon: "success"
                                    });
                                }
                            })
                    }
            });
    }
    const handleRemoveAdmin = (id, name) => {
        const roleInfo = {role: 'user'}
        Swal.fire({
                title: "Are you sure?",
                text: `Are you want to remove ${name} as an admin?`,
                showCancelButton: true,
                confirmButtonColor: "",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirm"
            }).then((result) => {
                    if (result.isConfirmed){
                        axiosSecure.patch(`/users/${id}?email=${user?.email}`, roleInfo)
                            .then(res=>{
                                if (res.data.modifiedCount > 0){
                                    refetch()
                                    Swal.fire({
                                        title: "Confirmed!",
                                        text: `${name} has been removed as an Admin`,
                                        icon: "success"
                                    });
                                }
                            })
                    }
            });
    }
    
    if(isLoading){
        return <div className='w-full flex min-h-screen items-start justify-center'><span className="loading loading-spinner loading-xl"></span></div>
    }
    return (
        <div className='mx-10 min-h-screen bg-white rounded-2xl p-5'>
            <h2 className='text-4xl font-bold mt-5'>Manage Users: {users.length}</h2>
            {
                search && <p className='mt-2'>Searching: {search}</p>
            }
            <div>
                <label className="input bg-white border-gray-500 mt-5">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" onChange={handleSearch} required placeholder="Search" />
                    </label>
            </div>
            {
                isFetching && <p className='mt-2'>Searching...</p>
            }
            <div className='overflow-hidden rounded-2xl mt-10'>
                <table className='w-full table'>
                    <thead>
                        <tr className='bg-gray-200 text-[16px] h-15 text-black rounded-t-2xl'>
                            <td className='font-semibold p-2'></td>
                            <td className='font-semibold p-2'>Name</td>
                            <td className='font-semibold p-2'>User Info</td>
                            <td className='font-semibold p-2'>Total Parcels</td>
                            <td className='font-semibold p-2'>Role</td>
                            <td className='font-semibold p-2 text-center'>Admin Action</td>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {
                        users?.map((user, index)=>
                            <tr className={index % 2 == 0 ? 'bg-white' : 'bg-gray-200'}>
                                <td>{index+1}</td>
                                <td className=''>{user.name}</td>
                                <td className='flex items-center'>
                                    <img className='rounded-full w-10 h-10 border border-1 mr-3 border-gray-700' src={user?.imgURL} alt="user
                                    " />
                                    <div>
                                        <p>{user.email}</p>
                                        <p>Bangladesh</p>
                                    </div>
                                </td>
                                <td>{user.userParcels.length}</td>
                                <td className={`
                                    ${user.role === 'user' && 'text-yellow-500'}
                                    ${user.role === 'admin' && 'text-green-500'}
                                    font-semibold capitalize`}>{user.role}</td>
                                <td className='text-xl text-center'>
                                {
                                    user.role === 'admin' ?
                                    <button onClick={()=>handleRemoveAdmin(user._id, user.name)} className='btn border-none shadow-none text-black bg-red-400'>
                                        <FaUserMinus></FaUserMinus>
                                    </button>
                                    :
                                    <button onClick={()=>handleMakeAdmin(user._id, user.name)} className='btn border-none shadow-none text-black bg-green-400'>
                                        <FaUserShield></FaUserShield>
                                    </button>
                                }
                                </td>
                            </tr>)
                    } 
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;