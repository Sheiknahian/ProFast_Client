import React, { use } from 'react';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

const Tracking = () => {
    const {trackingId} = useParams()
    const {user} = use(AuthContext);
    const axiosSecure = useAxiosSecure()
    const {refetch, data: trackings = []} = useQuery({
        queryKey: ['assigned-work', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/trackings/${trackingId}?email=${user?.email}`)
            return res.data
        }
    })
    const formatDateTime = (date) => {
        return new Date(date).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        });
    };
    // console.log(trackings);
    return (
        <div className='min-h-screen bg-white rounded-2xl mx-10 p-5 flex flex-col justify-center items-center '>
            <h2 className='text-4xl font-bold'>Tracking Your Parcel</h2>
            <ul className="timeline">
            {
                trackings?.map((log, index) => 
                    <li key={index}>
                    {
                        index !== 0 &&
                        <hr className='bg-green-500'/>
                    }
                        <div className="timeline-start">{formatDateTime(log.trackingAt)}</div>
                        <div className="timeline-middle text-green-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                            />
                        </svg>
                        </div>
                        <div className="timeline-end timeline-box bg-white capitalize">
                            {log.status.split('-').join(' ')}
                        </div>
                    {
                        index !== 5 &&
                        <hr className='bg-green-500'/>
                    }
                    </li>
                )
            }
            </ul>
        </div>
    );
};

export default Tracking;