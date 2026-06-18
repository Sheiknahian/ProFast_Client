import React, { use, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import Swal from 'sweetalert2';

const AssignedWork = () => {
    const {user} = use(AuthContext);
    const [selectedStatus, setSelectedStatus] = useState({})
    const axiosSecure = useAxiosSecure()
    
    const {refetch, data: assigns = []} = useQuery({
        queryKey: ['assigned-work', user?.email, setSelectedStatus],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider/${user.email}`)
            if(res.status === 200){
                return res.data;
            }
        }
    })
    console.log(assigns);
    const deliveryFee = (price, senderDistrict, recieverDistrict) => {
        if(senderDistrict === recieverDistrict){
            return price * 0.6;
        }
        else return price * 0.8;
    }
    const handleActions = async (parcel, status) => {
        setSelectedStatus(status)
        const statusInfo = {
            deliveryStatus: status,
            trackingId: parcel.trackingId,
            riderEmail: parcel.riderEmail,
            senderEmail: parcel.senderContact,
            ...(status === 'parcel-delivered' && {deliveryFee: deliveryFee(parcel.price, parcel.senderWireHouse, parcel.recieverWireHouse)})
        }
        const res = await axiosSecure.patch(`/parcel/rider/${parcel._id}/status-update`, statusInfo)
        console.log(res.status);
        
        if(res.status === 200){
            refetch();
            Swal.fire({
                title: "Status Updated!",
                text: `Delivery status changed to ${status} successfully.`,
                icon: "success"
            });   
        }
        
    }
    
    return (
        <div className='min-h-screen bg-white rounded-2xl mx-10 p-5'>
            <h2 className='text-4xl font-bold mt-5'>Your Assigned Work: {assigns?.length}</h2>
            <div className='overflow-x-hidden rounded-2xl mt-10'>
                <table className='table'>
                    <thead>
                        <tr className='text-black bg-gray-200'>
                            <th></th>
                            <th>Parcel Name</th>
                            <th>Delivery Status</th>
                            <th>Rider Action</th>
                            <th>Other Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        assigns?.map((assign, index)=>
                            <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                                <td>{index+1}</td>
                                <td>{assign.parcelName}</td>
                                <td className='capitalize'>{assign.deliveryStatus.split('-').join(' ')}</td>
                                <td>
                                {
                                    assign.deliveryStatus !== 'in-transit' ?
                                    <>
                                    <button onClick={()=>handleActions(assign, 'rider-accepted')} className={`btn btn-success mr-2
                                        ${assign.deliveryStatus === 'rider-accepted' && 'hidden'}`}>Accept</button>
                                    <button onClick={()=>handleActions(assign, 'rider-rejected')} className='btn btn-warning'>Reject</button>
                                    </>
                                    :
                                    <p className='text-green-500'>Rider Accepted</p>
                                }
                                </td>
                                <td>
                                    <button disabled={assign.deliveryStatus !== 'rider-accepted'} onClick={()=>handleActions(assign, 'in-transit')} className={`btn btn-primary ${assign.deliveryStatus === 'in-transit' && 'hidden'}`}>Mark as pickup</button>
                                    <button onClick={()=>handleActions(assign, 'parcel-delivered')} className={`btn btn-success ml-2 ${assign.deliveryStatus !== 'in-transit' && 'hidden'}`}>Mark as delivered</button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedWork;