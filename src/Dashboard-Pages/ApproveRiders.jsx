import React, { use } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdCancel, MdPersonRemove } from 'react-icons/md';
import { FaCheck, FaUserCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/Auth-Context/AuthContext';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = use(AuthContext)
    const {data: riders=[], refetch, isLoading} = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/riders?email=${user?.email}`);
            return res.data
        }
    })
    // console.log(riders);
    
    const handleApproval = (id, email) => {
        console.log(id);
        
        Swal.fire({
                    title: "Are you sure?",
                    text: "Are you want to Approve This Rider Request?",
                    showCancelButton: true,
                    confirmButtonColor: "",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Approve"
                }).then((result) => {
                        if (result.isConfirmed){
                            axiosSecure.patch(`/riders?id=${id}&email=${email}`, {action: 'Approve'})
                                .then(res=>{
                                    if (res.data.modifiedCount > 0){
                                        refetch()
                                        Swal.fire({
                                            title: "Approved!",
                                            text: "This Rider Request Has Been Approved By Admin",
                                            icon: "success"
                                        });
                                    }
                                })
                        }
                });
    }
    const handleReject = (id) => {
        Swal.fire({
                    title: "Are you sure?",
                    text: "Are you want to Reject This Rider Request?",
                    showCancelButton: true,
                    confirmButtonColor: "",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Reject"
                }).then((result) => {
                        if (result.isConfirmed){
                            axiosSecure.patch(`/riders?id=${id}`, {action: 'Reject'})
                                .then(res=>{
                                    if (res.data.modifiedCount > 0){
                                        refetch()
                                        Swal.fire({
                                            title: "Rejected!",
                                            text: "This Rider Request Has Been Rejected By Admin",
                                            icon: "success"
                                        });
                                    }
                                })
                        }
                });
    }
    const handleRemove = (id, email) => {
        Swal.fire({
                    title: "Are you sure?",
                    text: "Are you want to Remove This Rider?",
                    showCancelButton: true,
                    confirmButtonColor: "",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Remove"
                }).then((result) => {
                        if (result.isConfirmed){
                            axiosSecure.patch(`/riders?id=${id}&email=${email}`, {action: 'Remove'})
                                .then(res=>{
                                    if (res.data.modifiedCount > 0){
                                        refetch()
                                        Swal.fire({
                                            title: "Removed!",
                                            text: "This Rider Has Been Removed By Admin",
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
        <div className='mx-10 bg-white p-5 rounded-2xl'>
            <h2 className='text-4xl font-bold mt-5'>Manage Riders</h2>
            <div className='overflow-hidden rounded-2xl mt-10'>
                <table className='w-full table table-auto'>
                    <thead>
                        <tr className='bg-gray-200 text-[16px] h-15 text-black rounded-t-2xl'>
                            <td className='font-semibold p-2'></td>
                            <td className='font-semibold p-2'>Name</td>
                            <td className='font-semibold p-2'>Email</td>
                            <td className='font-semibold p-2'>Status</td>
                            <td className='font-semibold p-2'>District</td>
                            <td className='font-semibold p-2 text-center'>Action</td>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {
                        riders?.map((rider, index)=>
                            <tr className={index % 2 == 0 ? 'bg-white' : 'bg-gray-200'}>
                                <td className='pl-5'>{index+1}</td>
                                <td className='p-2'>{rider.riderName}</td>
                                <td className='p-2'>{rider.riderEmail}</td>
                                <td className={`p-2 capitalize
                                ${rider.status === 'pending' && 'text-yellow-500'} 
                                ${rider.status === 'Approved' && 'text-green-500'}
                                ${rider.status === 'Rejected' && 'text-red-500'}
                                ${rider.status === 'Removed' && 'text-red-700'}
                                `}>{rider.status}</td>
                                <td className='p-2'>{rider.riderDistrict}</td> 
                                <td className="text-center">
                                {
                                    rider.status === 'pending' &&
                                    <div className="flex justify-center items-center gap-3">
                                        <button onClick={()=>handleApproval(rider._id, rider.riderEmail)} className="btn btn-xs btn-success">
                                        ✔
                                        </button>
                                        <button onClick={()=>handleReject(rider._id)} className="btn btn-xs btn-error">
                                        ✖
                                        </button>
                                    </div>
                                }
                                {
                                    rider.status === 'Approved' && 
                                    <button onClick={()=>handleRemove(rider._id, rider.riderEmail)} className='btn btn-error'><MdPersonRemove></MdPersonRemove></button>
                                }
                                {
                                    rider.status === 'Removed' &&
                                    <button className='btn btn-success' onClick={()=>handleApproval(rider._id, rider.riderEmail)}><FaUserCheck></FaUserCheck></button>
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

export default ApproveRiders;