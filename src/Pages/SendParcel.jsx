import React, { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Context/Auth-Context/AuthContext'
import { Navigate } from 'react-router';

const SendParcel = () => {
    const {register, handleSubmit, reset} = useForm()
    const {user} = use(AuthContext)
    const [locs, setLocs] = useState([])
    const [senderDisable, setSenderDisable] = useState(true)
    const [receiverDisable, setReceiverDisable] = useState(true)
    const [sernderRegions, setSenderRegions] = useState([])
    const [receiverRegions, setReceiverRegions] = useState([])
    const axiosSecure = useAxiosSecure()
    useEffect(()=>{
        fetch('/Data/districts.json').then(res=>res.json()).then(data=>setLocs(data))
    }, [setLocs])
    // console.log(user);
    
    const handleParcelSubmit = (data) => {
        console.log(data);
        let price;
        if(data.condition === 'Document'){
            if(data.senderWireHouse === data.receiverWireHouse){
                price = 60;
            }
            else{
                price = 80;
            }
        }
        else{
            if(data.parcelWeight < 3){
                if(data.senderWireHouse === data.receiverWireHouse){
                    price = 110;
                }
                else{
                    price = 150
                }
            }
            else{
                if(data.senderWireHouse === data.receiverWireHouse){                    
                    price = 110 + (data.parcelWeight-3)*40
                }
                else{
                    price = (110 + (data.parcelWeight-3)*40)+40;
                }
            }
        }
        // console.log(price);
        data.price = price;
        data.isPaid = false;

        Swal.fire({
            title: "Are you sure?",
            text: `You need to pay ${price}tk`,
            showCancelButton: true,
            confirmButtonColor: "rgb(51, 221, 51)",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Confirm"
        }).then((result) => {

            if (result.isConfirmed) {
                data.status = 'Pending';
                axiosSecure.post('/parcels', data)
                    .then(res=>console.log(res))
                
                Swal.fire({
                    title: "Confirmed Your Parcel",
                    text: "Your parcel has been requested.",
                    icon: "success"
                });
                reset();
            }
        });
    }
    const handleChangeRegion = (e, type) => {
        const selectedRegion = e.target.value;
        // console.log(selectedRegion);
        const filterRegion = locs.filter(loc=>loc.region === selectedRegion);
        if (type === 'sender') {
            setSenderDisable(false);
            setSenderRegions(filterRegion)
        }
        else if(type === 'receiver') {
            setReceiverDisable(false);
            setReceiverRegions(filterRegion);
        }
    }
    return (
        <div className='mx-10 bg-white rounded-2xl p-10'>
            <div>
                <h2 className='font-bold text-4xl'>Send A Parcel</h2>
            </div>
            <div className='bg-gray-300 h-[2px] my-10'></div>
            <div>
                <h4 className='font-bold text-2xl'>Enter your parcel details</h4>
                <div className='flex gap-10 mt-5'>
                    <div className='flex gap-2 items-center'>
                        <input type="radio" {...register('condition')} value={'Document'} className="radio radio-primary radio-sm"/>
                        <p className='font-semibold'>Document</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="radio" {...register('condition')} value={'Not-Document'} className="radio radio-primary radio-sm"/>
                        <p className='font-semibold'>Not-Document</p>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <form onSubmit={handleSubmit(handleParcelSubmit)}>
                        <div className='mt-10 grid grid-cols-2 gap-10'>
                            
                            <div className='grid grid-cols-2 gap-5'>
                                <div className='col-span-2'>
                                    <p className='font-semibold'>Parcel Name</p>
                                    <input {...register('parcelName', {required: true})} placeholder='Your Parcel Name' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' type="text" />
                                </div>
                                
                                <h3 className='col-span-2 mt-6 mb-2 text-lg font-semibold'>Seller Details</h3>

                                <div>
                                    <p className='font-semibold'>Sender Name</p>
                                    <input {...register('senderName', {required: true})} placeholder='Sender Name' className='p-2 mt-1 border border-gray-300 w-full h-10 rounded' type="text" defaultValue={user?.displayName}/>
                                </div>

                                <div>
                                    <p className='font-semibold'>Adress</p>
                                    <input {...register('senderAdress', {required: true})} placeholder='Your Adress' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' type="text" />
                                </div>

                                <div>
                                    <p className='font-semibold'>Sender Region</p>
                                    <select {...register('senderRegion', {required: true, onChange:(e)=> handleChangeRegion(e, 'sender')},)} className='mt-1 p-2 border border-gray-300 w-full h-10 rounded'>
                                        <option disabled selected>Select Sender Region</option>
                                        {
                                            [...new Set(locs?.map(loc=>loc.region))].map(l=><option>{l}</option>)
                                        }
                                    </select>
                                </div>

                                <div>
                                    <p className='font-semibold'>Pick Up Wire House</p>
                                    <select disabled={senderDisable} {...register('senderWireHouse', {required: true})} className='mt-1 p-2 border border-gray-300 w-full h-10 rounded'>
                                        <option disabled selected>Select Wire House</option>
                                        {
                                            sernderRegions?.map(region=><option>{region?.district}</option>)
                                        }
                                    </select>
                                </div>
                               
                               
                                <div className='col-span-2'>
                                    <p className='font-semibold'>Sender Email</p>
                                    <input {...register('senderContact', {required: true})} placeholder='Your Contact No' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' defaultValue={user?.email} type="email" />
                                </div>
                               
                               
                                <div className='col-span-2'>
                                    <p className='font-semibold'>Pickup Instruction</p>
                                    <input {...register('pickupInstruct', {required: true})} placeholder='Pickup Instruction' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' type="text" />
                                </div>
                               
                            </div>
                            
                            <div className='grid grid-cols-2 gap-5'>
                                <div className='col-span-2'>
                                    <p className='font-semibold'>Parcel Weight (KG)</p>
                                    <input {...register('parcelWeight', {required: true})} placeholder='Your Parcel Weight (KG)' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' type="number" />
                                </div>
                                
                                <h3 className='col-span-2 mt-6 mb-2 text-lg font-semibold'>Receiver Details</h3>

                                <div>
                                    <p className='font-semibold'>Receiver Name</p>
                                    <input {...register('receiverName', {required: true})} placeholder='Receiver Name' className='p-2 mt-1 border border-gray-300 w-full h-10 rounded' type="text" />
                                </div>

                                <div>
                                    <p className='font-semibold'>Adress</p>
                                    <input {...register('receiverAdress', {required: true})} placeholder='Receiver Adress' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' type="text" />
                                </div>

                                <div>
                                    <p className='font-semibold'>Receiver Region</p>
                                    <select {...register('receiverRegion', {required: true, 
                                    onChange: (e) => handleChangeRegion(e, 'receiver')})} placeholder='Receiver Region' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded'>
                                        <option disabled selected>Select Receiver Region</option>
                                        {
                                            [...new Set(locs?.map(loc=>loc.region))].map(l=><option>{l}</option>)
                                        }
                                    </select>
                                </div>
                               
                                <div>
                                    <p className='font-semibold'>Delivery Wire House</p>
                                    <select disabled={receiverDisable} {...register('receiverWireHouse', {required: true})} placeholder='Receiver Wire House' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded'>
                                        <option disabled selected>Select Wire House</option>
                                        {
                                            receiverRegions?.map(region=><option>{region?.district}</option>)
                                        }
                                    </select>
                                </div>
                               
                               
                                <div className='col-span-2'>
                                    <p className='font-semibold'>Receiver Email</p>
                                    <input {...register('receiverContact', {required: true})} placeholder='Receiver Contact No' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' type="email" />
                                </div>
                               
                               
                                <div className='col-span-2'>
                                    <p className='font-semibold'>Delivery Instruction</p>
                                    <input {...register('deliveryInstruct', {required: true})} placeholder='Delivery Instruction' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' type="text" />
                                </div>
                               
                            </div>

                        </div>
                        
                        <div>
                            <input className='w-100 mt-10 h-10 btn bg-[#CAEB66] text-black font-semibold px-6 border-[#CAEB66] text-[16px] shadow-none' value={'Proceed To Confirm Booking'} type="submit" />
                        </div>
                    </form>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default SendParcel;