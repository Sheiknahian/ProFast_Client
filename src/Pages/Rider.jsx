import React, { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImgContext } from '../Context/Image-Context/ImgContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import Swal from 'sweetalert2';

const Rider = () => {
    const {register, handleSubmit} = useForm()
    const {agent} = use(ImgContext)
    const {user} = use(AuthContext)
    const [locs, setLocs] = useState([])
    const [riderDisable, setRiderDisable] = useState(true)
    const [riderRegions, setRiderRegions] = useState([])
    const axiosSecure = useAxiosSecure()
    useEffect(()=>{
            fetch('/public/Data/districts.json').then(res=>res.json()).then(data=>setLocs(data))
        }, [setLocs])
    
    const handleChangeRegion = (e, type) => {
        const selectedRegion = e.target.value;
        console.log(selectedRegion);
        const filterRegion = locs.filter(loc=>loc.region === selectedRegion);
        if (type === 'rider') {
            setRiderDisable(false);
            setRiderRegions(filterRegion)
        }
    }

    const handleRiderInfo = async (data) => {
        const res = await axiosSecure.post(`/riders?${user?.email}`, data)
        if(res.status === 200){
            Swal.fire({
                title: "Requested!",
                text: "Your rider request is pending",
                icon: "success"
            });
        }
        console.log(res);
    } 
    return (
        <div className='bg-white min-h-screen mx-10 rounded-2xl p-10'>
            <div>
                <h2 className='text-4xl font-bold'>Be A Rider</h2>
                <p className='text-gray-600 mt-5 w-150'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='grid grid-cols-2 gap-30'>
                <form onSubmit={handleSubmit(handleRiderInfo)} className='mt-15'>
                    <h3 className='text-2xl font-bold'>Tell Us About Yourself</h3>
                    <div className='mt-5'>
                        <p className='font-semibold'>Your Name</p>
                        <input {...register('riderName', {required: true})} defaultValue={user?.displayName} placeholder='Your Name' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' type="text" />
                    </div>
                    <div className='mt-5'>
                        <p className='font-semibold'>Driving License Number</p>
                        <input {...register('licenseNumber', {required: true})} placeholder='Your Driving License Number' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' type="text" />
                    </div>
                    <div className='mt-5'>
                        <p className='font-semibold'>Your Email</p>
                        <input {...register('riderEmail', {required: true})} defaultValue={user?.email} placeholder='Your Email' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' type="text" />
                    </div>
                    <div className='mt-5'>
                        <p className='font-semibold'>Your Region</p>
                        <select {...register('riderRegion', {required: true, onChange:(e)=> handleChangeRegion(e, 'rider')},)} className='mt-1 p-2 border border-gray-300 w-full h-10 rounded'>
                            <option disabled selected>Select Sender Region</option>
                            {
                                [...new Set(locs?.map(loc=>loc.region))].map((l, i)=><option key={i}>{l}</option>)
                            }
                        </select>
                    </div>
                    <div className='mt-5'>
                        <p className='font-semibold'>Your District</p>
                        <select disabled={riderDisable} {...register('riderDistrict', {required: true})} className='mt-1 p-2 border border-gray-300 w-full h-10 rounded'>
                            <option disabled selected>Select Wire House</option>
                            {
                                riderRegions?.map(region=><option>{region?.district}</option>)
                            }
                        </select>
                    </div>
                    <div className='mt-5'>
                        <p className='font-semibold'>NID No</p>
                        <input {...register('nidNumber', {required: true})} placeholder='Your NID No.' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' type="text" />
                    </div>
                    <div className='mt-5'>
                        <p className='font-semibold'>Phone Number</p>
                        <input {...register('contact', {required: true})} placeholder='Your Phone No' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' type="text" />
                    </div>
                    <div className='mt-5'>
                        <p className='font-semibold'>Bike Brand Model and Year</p>
                        <input {...register('bikeInfo', {required: true})} placeholder='Your Parcel Name' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' type="text" />
                    </div>
                    <div className='mt-5'>
                        <p className='font-semibold'>Bike Registration Number</p>
                        <input {...register('bikeRegNumber', {required: true})} placeholder='Your Parcel Name' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' type="text" />
                    </div>
                    <div className='mt-5'>
                        <p className='font-semibold'>Tell Us About Yoursel</p>
                        <input {...register('about', {required: true})} placeholder='Something about yourself' className='mt-1 p-2 border border-gray-300 w-full h-10 rounded' type="text" />
                    </div>

                    <div>
                        <input className='w-full mt-10 h-10 btn bg-[#CAEB66] text-black font-semibold px-6 border-[#CAEB66] text-[16px] shadow-none' value={'Submit'} type="submit" />
                    </div>
                </form>
                <div>
                    <img src={agent} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Rider;