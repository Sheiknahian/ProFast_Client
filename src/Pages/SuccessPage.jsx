import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const SuccessPage = () => {
    const [payment, setPayment] = useState({});
    const axiosSecure = useAxiosSecure()
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    // console.log(sessionId);
    const hasRun = useRef(false);

    useEffect(()=>{
        if (!sessionId) return;
        if (hasRun.current) return;
        hasRun.current = true;
        axiosSecure.patch(`/payment-success?sessionId=${sessionId}`)
            .then(res=>{
                setPayment(res.data)
                console.log(res.data);
            })
    }, [axiosSecure, sessionId])
    // console.log(payment);
    
    
    return (
        <div className='mx-10 bg-white min-h-screen p-5 flex justify-center items-center rounded-2xl'>
            <div className='shadow shadow-xl p-10 bg-gray-100 rounded-2xl'>
                <h2 className='text-4xl font-bold text-green-500'>Payment Successful!</h2>
                <div className='mt-10 flex gap-5'>
                    <p className='font-semibold w-26 text-gray-600'>Parcel Name</p>
                    <p className='font-semibold'>{payment.parcelName}</p>
                </div>
                <div className='mt-2 flex gap-5'>
                    <p className='font-semibold w-26 text-gray-600'>Sender Name</p>
                    <p className='font-semibold'>{payment.name}</p>
                </div>
                <div className='mt-2 flex gap-5'>
                    <p className='font-semibold w-26 text-gray-600'>Sender Email</p>
                    <p className='font-semibold'>{payment.email}</p>
                </div>
                <div className='mt-2 flex gap-5'>
                    <p className='font-semibold w-26 text-gray-600'>Paid Amount</p>
                    <p className='font-semibold'>${payment.amount}</p>
                </div>
                <div className='mt-2 flex gap-5'>
                    <p className='font-semibold w-26 text-gray-600'>Currency</p>
                    <p className='font-semibold'>{payment.currency}</p>
                </div>
                <div className='mt-2 flex gap-5'>
                    <p className='font-semibold w-26 text-gray-600'>Transaction Id</p>
                    <p className='font-semibold'>{payment.transactionId}</p>
                </div>
                <div className='mt-2 flex gap-5'>
                    <p className='font-semibold w-26 text-gray-600'>Tracking Id</p>
                    <p className='font-semibold'>{payment.trackingId}</p>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;