import React, { use, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/Auth-Context/AuthContext';

const AsignRiders = () => {
    const axiosSecure = useAxiosSecure()
    const [selectedParcel, setSelectedParcel] = useState([])
    const {user, loading} = use(AuthContext)
    const {refetch, data: parcels = [], isLoading} = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async() => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=parcel-confirmed')
            return res.data;
        }
    })
    const handleAssignRiders = (parcel) => {
        setSelectedParcel(parcel)
        document.getElementById('my_modal_1').showModal()
    }
    const {data: riders = []} = useQuery({
        queryKey: ['riders', selectedParcel.senderWireHouse,'available'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/riders?status=Approved&workStatus=available&district=${selectedParcel.senderWireHouse}&email=${user?.email}`)
            return res.data;
        }
    })
    // console.log(selectedParcel.senderContact);
    
    const handleAssign = async (riderId, riderName, riderEmail) => {
        const AssignInfo = {
            riderId: riderId,
            riderName: riderName,
            riderEmail: riderEmail,
            trackingId: selectedParcel.trackingId,
            senderEmail: selectedParcel.senderContact
        }
        document.getElementById('my_modal_1').close();
        Swal.fire({
            title: "Are you sure?",
            text: "Are you want to Assign This Rider?",
            showCancelButton: true,
            confirmButtonColor: "",
            cancelButtonColor: "#d33",
            confirmButtonText: "Assign"
        }).then( async(result) => {
                if (result.isConfirmed){
                    const res = await axiosSecure.patch(`/parcels/${selectedParcel._id}?email=${user?.email}`, AssignInfo)
                    if(res.status === 200){
                        await refetch()
                        Swal.fire({
                            title: "Assigned!",
                            text: "This Rider Request Has Been Assigned",
                            icon: "success"
                        });
                    }
                }})
    }
    // console.log(riders);
    if(isLoading || loading){
        return <div className='w-full flex min-h-screen items-start justify-center'><span className="loading loading-spinner loading-xl"></span></div>
    }
    return (
        <div className='bg-white min-h-screen rounded-2xl p-5 mx-10'>
            <h2 className='text-4xl font-bold mt-5'>Assign Riders: {parcels?.length}</h2>
            <div className='overflow-hidden rounded-2xl mt-10'>
                <table className='w-full table table-fixed'>
                    <thead>
                        <tr className='bg-gray-200 text-[16px] h-15 text-black rounded-t-2xl'>
                            <td></td>
                            <td className='p-2'>Name</td>
                            <td className='p-2'>Cost</td>
                            <td className='p-2'>Created At</td>
                            <td className='p-2'>Pickup District</td>
                            <td className='p-2'>Action</td>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {
                        parcels?.map((parcel, index)=>
                            <tr className={index % 2 == 0 ? 'bg-white' : 'bg-gray-200'}>
                                <td>{index + 1}</td>
                                <td className='p-2 pl-none'>{parcel.parcelName}</td>
                                <td className='p-2'>{parcel.price}</td>
                                <td className='p-2'>6 Jun, 2026</td>
                                <td className='p-2'>{parcel.senderWireHouse}</td>
                                <td className=''>
                                    <button onClick={()=>handleAssignRiders(parcel)} className='btn bg-[#CAEB66] text-black border-none rounded-xl font-sembold shadow-none'>Assign Rider</button>
                                </td>
                            </tr>)
                    } 
                    </tbody>
                </table>
            </div>
            <div>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box bg-white ">
                        
                        <div className="modal-action flex flex-col">
                            <h3 className='text-2xl font-bold'>Available Riders On This District: {riders?.length}</h3>
                            <div className='overflow-hidden rounded-2xl mt-5'>
                                <table className='table'>
                                    <thead>
                                        <tr className='text-black bg-gray-200'>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        riders?.map((rider, index) => 
                                        <tr className={index % 2 == 0 ? 'bg-white' : 'bg-gray-200'}>
                                            <td>{index+1}</td>
                                            <td>{rider.riderName}</td>
                                            <td>{rider.riderEmail}</td>
                                            <td>
                                                <button 
                                                onClick={()=>handleAssign(rider._id, rider.riderName, rider.riderEmail)} className='btn bg-[#CAEB66] text-black border-none rounded-xl font-sembold shadow-none'>Assign</button>
                                            </td>
                                        </tr>)
                                    }
                                    </tbody>
                                </table>
                            </div>
                            {/* <br /> */}
                            <form method="dialog" className='flex justify-end mt-5'>
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default AsignRiders;