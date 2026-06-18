import React, { use, useState } from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import Swal from 'sweetalert2';

const MyParcels = () => {
    const {user} = use(AuthContext)
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch, isLoading} = useQuery({
        queryKey: ['myParcels', user?.email],
        enabled: !!user?.email,
        queryFn: async() => {
            const res = await axiosSecure.get(`parcels?email=${user?.email}`);
            return Array.isArray(res.data) ? res.data : [];
        }
    })

    const handlePayment = async (parcel) => {
        const paymentInfo = {
            parcelName: parcel.parcelName,
            senderName: parcel.senderName,
            senderEmail: parcel.senderContact,
            price: parcel.price,
            parcelId: parcel._id,
            trackingId: parcel.trackingId
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(res.data);
        window.location.href = res.data?.url;
    }

    console.log("isArray:", Array.isArray(parcels));
    const handleDelete = (id, email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you want to delete this parcel request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
                if (result.isConfirmed){
                    axiosSecure.delete(`/parcels/${id}?email=${email}`)
                        .then(res=>{
                            if (res.data.deletedCount) {
                                refetch()
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your Parcel Request has been deleted.",
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
        <div>
            <div className='flex justify-between items-center mx-10'>
                <div>
                    <h3 className='font-bold text-2xl'>My Parcels Overview</h3>
                    <p>You can access all your data and information from anywhere. </p>
                </div>
                <div>       
                    <Link to={'/myParcels/sendparcel'}>
                        <button className='btn bg-[#CAEB66] text-black font-semibold shadow-none border-[#CAEB66] rounded-xl text-lg p-6'>Create A Parcel</button>
                    </Link>
                </div>
            </div>

            <div className='m-10 min-h-screen bg-white p-5 rounded-2xl'>
                <div className='overflow-hidden rounded-2xl'>
                <table className='w-full table table-zebra table-auto'>
                    <thead>
                        <tr className='bg-gray-200 text-[16px] h-15 text-black rounded-t-2xl'>
                            <th className='font-semibold p-2'>Count</th>
                            <th className='font-semibold p-2'>Name</th>
                            <th className='font-semibold p-2'>Tracking Id</th>
                            <th className='font-semibold p-2'>Price</th>
                            <th className='font-semibold p-2'>Delivery Status</th>
                            <th className='font-semibold p-2'>Payment Status</th>
                            <th className='font-semibold p-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {
                            Array.isArray(parcels) && parcels?.map((parcel, index)=>{
                                
                                return(
                                    <tr className={index % 2 == 0 ? 'bg-white' : 'bg-gray-200'} key={index}>
                                        <td>{index+1}</td>
                                        <td>{parcel.parcelName}</td>
                                        <td>{parcel.trackingId}</td>
                                        <td>{parcel.price}</td>
                                        <td className={`capitalize 
                                            ${parcel.deliveryStatus === 'parcel-delivered' && 'text-green-500'}`
                                            }>
                                            {parcel.deliveryStatus.split('-').join(' ')}
                                        </td>
                                        <td>
                                            {
                                            parcel.isPaid ?
                                                <span className='text-green-500 font-semibold'>Paid</span>
                                                :
                                                <button onClick={()=>handlePayment(parcel)} className='btn btn-primary shadow-none'>Pay</button>
                                            }
                                        </td>
                                        
                                        <td className='flex'>
                                            <button onClick={()=>handleDelete(parcel._id, parcel.senderContact)} className='btn btn-ghost hover:bg-red-400 hover:text-black text-lg'><MdDelete></MdDelete></button>
                                            <Link to={`/parcelDetails/${parcel._id}`}>
                                                <button className='btn btn-ghost hover:bg-blue-400 hover:text-black text-lg'><TiEdit></TiEdit></button>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};

export default MyParcels;