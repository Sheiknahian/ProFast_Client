import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Payment = () => {
    const { id } = useParams()
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    console.log(id);
    const {data: parcel=[]} = useQuery({
        queryKey: ['myParcel', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels/${id}?email=${user?.email}`)
            return res.data;
        }
    })
    console.log(parcel);
    const handlePayment = async () => {
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
    return (
        <div className='mx-10'>
            <p>Parcel Name: {parcel.parcelName}</p>
            <p>Pay your amount: {parcel.price}</p>
            <button onClick={handlePayment} className="btn btn-primary shadow-none mt-5">Pay Now</button>
        </div>
    );
};

export default Payment;