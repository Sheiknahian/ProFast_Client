import React, { use } from 'react';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const CompletedTasks = () => {
    const {user} = use(AuthContext);
    const axiosSecure = useAxiosSecure()
    const {refetch, data: tasks = []} = useQuery({
        queryKey: ['completed-tasks', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider/${user.email}?deliveryStatus=parcel-delivered`)
            if(res.status === 200){
                return res.data;
            }
        }
    })
    // console.log(tasks);
    return (
        <div className='bg-white min-h-screen rounded-2xl mx-10 p-5'>
            <h2 className='text-4xl font-bold mt-5'>Your Completed Task: {tasks?.length}</h2>
            <div className='overflow-x-hidden rounded-2xl mt-10'>
                <table className='table table-fixed'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th></th>
                            <th>Parcel Name</th>
                            <th>Delivery Status</th>
                            <th>Cost</th>
                            <th>Payout</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        tasks?.map((task, index) => 
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                            <td>{index+1}</td>
                            <td>{task.parcelName}</td>
                            <td className='capitalize text-green-500'>{task.deliveryStatus}</td>
                            <td>${task.price}</td>
                            <td>
                                ${task.deliveryFee}
                            </td>
                            <td>
                                <button className='btn btn-success'>Cash Out</button>
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

export default CompletedTasks;