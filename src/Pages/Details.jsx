import React, { use } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import { useQuery } from '@tanstack/react-query';

const Details = () => {
    const {id} = useParams()
    const {user} = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: parcel = {}, isLoading } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`parcels/${id}?email=${user?.email}`);
            return res.data
        }
    })
    console.log(parcel);
    if(isLoading){
        return <div className='w-full flex min-h-screen items-start justify-center'><span className="loading loading-spinner loading-xl"></span></div>
    }
    return (
        <div className='min-h-screen bg-white rounded-2xl mx-10 p-5'>
            <h2 className='text-4xl font-bold mt-5'>Parcel Details</h2>
            <div className='grid grid-cols-2 gap-5 mt-10'>
                <div className='bg-gray-200 p-5 rounded-2xl flex flex-col gap-2'>
                    <h3 className='text-3xl font-bold'>Sender Info</h3>
                    <div className='mt-2 flex'>
                        <p className='text-gray-500 font-semibold w-18'>Name</p>
                        <p className='font-semibold'>{parcel?.senderName}</p>
                    </div>
                    <div className='flex'>
                        <p className='text-gray-500 font-semibold w-18'>Email</p>
                        <p className='font-semibold'>{parcel?.senderContact}</p>
                    </div>
                    <div className='flex'>
                        <p className='text-gray-500 font-semibold w-18'>Region</p>
                        <p className='font-semibold'>{parcel?.senderRegion}</p>
                    </div>
                    <div className='flex'>
                        <p className='text-gray-500 font-semibold w-18'>District</p>
                        <p className='font-semibold'>{parcel?.senderWireHouse}</p>
                    </div>
                    <div className='flex'>
                        <p className='text-gray-500 font-semibold w-18'>Adress</p>
                        <p className='font-semibold'>{parcel?.senderAdress}</p>
                    </div>
                </div>

                <div className='bg-gray-200 p-5 rounded-2xl flex flex-col gap-2'>
                    <h3 className='text-3xl font-bold'>Receiver Info</h3>
                    <div className='mt-2 flex'>
                        <p className='text-gray-500 font-semibold w-18'>Name</p>
                        <p className='font-semibold'>{parcel?.receiverName}</p>
                    </div>
                    <div className='flex'>
                        <p className='text-gray-500 font-semibold w-18'>Email</p>
                        <p className='font-semibold'>{parcel?.receiverContact}</p>
                    </div>
                    <div className='flex'>
                        <p className='text-gray-500 font-semibold w-18'>Region</p>
                        <p className='font-semibold'>{parcel?.receiverRegion}</p>
                    </div>
                    <div className='flex'>
                        <p className='text-gray-500 font-semibold w-18'>District</p>
                        <p className='font-semibold'>{parcel?.receiverWireHouse}</p>
                    </div>
                    <div className='flex'>
                        <p className='text-gray-500 font-semibold w-18'>Adress</p>
                        <p className='font-semibold'>{parcel?.receiverAdress}</p>
                    </div>
                </div>

                <div className='bg-gray-200 p-5 rounded-2xl flex flex-col gap-2'>
                    <h3 className='text-3xl font-bold'>Parcel Info</h3>
                    <div className='mt-2 flex'>
                        <p className='text-gray-500 font-semibold w-40'>Title</p>
                        <p className='font-semibold'>{parcel?.parcelName}</p>
                    </div>
                    <div className='flex'>
                        <p className='text-gray-500 font-semibold w-40'>Type</p>
                        <p className='font-semibold'>{parcel?.condition}</p>
                    </div>
                    <div className='flex'>
                        <p className='text-gray-500 font-semibold w-40'>Weight</p>
                        <p className='font-semibold'>{parcel?.parcelWeight} Kg</p>
                    </div>
                    <div className='flex'>
                        <p className='text-gray-500 font-semibold w-40'>Charge</p>
                        <p className='font-semibold'>${parcel?.price}</p>
                    </div>
                    <div className='flex'>
                        <p className='text-gray-500 font-semibold w-40'>Status</p>
                        <p className='font-semibold'>{parcel?.deliveryStatus || 'N/A'}</p>
                    </div>
                    <div className='flex'>
                        <p className='text-gray-500 font-semibold w-40'>Pickup Intruction</p>
                        <p className='font-semibold'>N/A</p>
                    </div>
                    <div className='flex'>
                        <p className='text-gray-500 font-semibold w-40'>Delivery Intruction</p>
                        <p className='font-semibold'>N/A</p>
                    </div>
                    <div className='flex'>
                        <p className='text-gray-500 font-semibold w-40'>Tracking Id</p>
                        <p className='font-semibold'>{parcel?.trackingId}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;