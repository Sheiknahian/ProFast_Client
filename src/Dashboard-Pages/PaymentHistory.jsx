import React, { use } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Context/Auth-Context/AuthContext';

const PaymentHistory = () => {
    const {user} = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data: histories = [], isLoading} = useQuery({
        queryKey: ['myPaymentHistory', user?.email],
        queryFn: async () => {
            // console.log(user?.email);
            const res = await axiosSecure.get(`/payment-history?email=${user?.email}`)
            return res.data
        }
    })
    console.log(histories);

    const formatDateTime = (date) => {
        return new Date(date).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        });
    };

    if(isLoading){
        return <div className='w-full flex min-h-screen items-start justify-center'><span className="loading loading-spinner loading-xl"></span></div>
    }
    return (
        <div className='bg-white rounded-2xl p-10 mx-10 min-h-screen'>
            <h2 className='text-4xl font-bold mb-10'>Payment History</h2>
            <div className='overflow-hidden rounded-2xl'>
                <table className='w-full table'>
                    <thead>
                        <tr className='bg-gray-200 text-[16px] h-15 text-black rounded-t-2xl'>
                            <td className='p-2'>Parcel Name</td>
                            <td className='p-2'>Recipient Info</td>
                            <td className='p-2'>Transaction Id</td>
                            <td className='p-2'>Paid Time</td>
                            <td className='p-2'>Payment Cost</td>
                            <td className='p-2'>Action</td>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {
                        histories?.map((history, index)=>
                            <tr className={index % 2 == 0 ? 'bg-white' : 'bg-gray-200'}>
                                <td className='p-2 pl-none'>{history.parcelName}</td>
                                <td className='p-2'>{history.senderName} <br /> {history.email}</td>
                                <td className='p-2'>{history.transactionId}</td>
                                <td className='p-2'>{formatDateTime(history.paidAt)}</td>
                                <td className='p-2'>${history.amount} ({history.paymentStatus})</td> 
                                <td className={`btn mt-3 rounded-xl bg-gray-200 hover:text-black btn-ghost 
                                    ${index % 2 == 1 && 'bg-white'}`}>View</td>
                            </tr>)
                    } 
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;