import React, { use } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { ImgContext } from '../Context/Image-Context/ImgContext';
import { TbCheck, TbPackage, TbTruckDelivery } from 'react-icons/tb';
import { BsCashCoin } from "react-icons/bs";
import { Area, AreaChart, CartesianGrid, Cell, Legend, Line, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
};
const statsConfig = [
  {
    status: "rider-assigned",
    title: "Assigned Parcels",
    icon: <TbPackage className='text-5xl'/>
  },
  {
    status: "in-transit",
    title: "In Transit",
    icon: <TbTruckDelivery className='text-5xl'/>
  },
  {
    status: "parcel-delivered",
    title: "Delivered",
    icon: <TbCheck className='text-5xl'/>
  }
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#fe00dc", "#8B5CF6", "#EF4444"];

const statusColors = {
  'parcel-created': 'badge bg-gray-400',
  'parcel-confirmed': 'badge badge-info',
  'rider-assigned': 'badge badge-primary',
  'rider-accepted': 'badge badge-accent',
  'rider-rejected': 'badge badge-error',
  'in-transit': 'badge badge-warning',
  'parcel-delivered': 'badge badge-success',
};
const RiderDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = use(AuthContext);
    const {data: stats = [], isLoading} = useQuery({
        queryKey: ['stat', 'status', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/rider/stats/status/${user?.email}`)
            return res.data
        }
    })
    // console.log(stats);
    const statData = statsConfig.map(item=>({
        ...item,
        count: stats.find(stat=> stat._id === item.status)?.count || 0
    }))
    // console.log(statData);
    
    const {data: feeInfo = []} = useQuery({
        queryKey: ['stat', 'revenue', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/rider/stats/revenue/${user?.email}`)
            return res.data
        }
    })
    // console.log(feeInfo);
    
    const {data: graphData = []} = useQuery({
        queryKey: ['riderGraphData', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels/riderDashboard/revenue?email=${user?.email}`)
            return res.data
        }
    })
    console.log(graphData);
    const pieData = stats.map(stat => ({
        name: stat._id.split('-').join(' '),
        value: stat.count
    }));

    const {data: activities = []} = useQuery({
        queryKey: ['riderActivities', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels/riderDashboard/activities?email=${user?.email}`)
            return res.data
        }
    })
    console.log(user);
    
    // console.log(activities);
    if(isLoading){
        return <div className='w-full flex min-h-screen items-start justify-center'><span className="loading loading-spinner loading-xl"></span></div>
    }
    return (
        <div className='mx-10'>
            <div className='grid grid-cols-4 gap-10'>
            {
                statData?.map((stat, index)=>
                    <div key={index} className='bg-[linear-gradient(135deg,#84cc16_0%,#a3e635_60%,#f7fee7_100%)] p-5 rounded-2xl flex items-center justify-around text-white font-bold transition-transform hover:scale-[1.02] duration-200 shadow'>
                        <div>
                            <p className='text-3xl'>{stat.count}</p>
                            <p className='capitalize'>{stat.title}</p>
                        </div>
                        {/* <img className='w-15' src={bookingIcon} alt="" />
                         */}
                        {stat.icon}
                    </div>
                )
            }
                <div className='bg-[linear-gradient(135deg,#84cc16_0%,#a3e635_60%,#f7fee7_100%)] p-5 rounded-2xl flex items-center justify-around text-white font-bold transition-transform hover:scale-[1.02] duration-200 shadow'>
                    <div>
                        <p className='text-3xl'>${feeInfo?.[0]?.fee}</p>
                        <p className='capitalize'>Total Earning</p>
                    </div>
                    <BsCashCoin className='text-5xl'></BsCashCoin>
                </div>
            </div>
            <div className='mt-10 rounded-2xl grid grid-cols-4 gap-5'>
                <div className='col-span-3 bg-white p-5 rounded-2xl shadow-xl'>
                    <h3 className='text-2xl font-bold my-5'>Overall Statistics</h3>
                    <AreaChart width='full' height={300} data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month"/>
                        <YAxis tickFormatter={(value) => `$${value}`}/>

                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="none"
                            fill="url(#colorRevenue)"
                        />
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="50%" stopColor="#aedd22" stopOpacity={1}/>
                                <stop offset="100%" stopColor="#aedd22" stopOpacity={0.2}/>
                            </linearGradient>
                        </defs>
                        <ResponsiveContainer width="100%" height="100%"></ResponsiveContainer>
                        <Line type={'monotone'} stroke="#a8da12" dataKey={'revenue'}/>
                    </AreaChart>
                </div>
                <div className="col-span-1 bg-white rounded-2xl flex flex-col items-center shadow-xl">
                    <h3 className="pt-10 text-2xl text-center font-bold">
                        Parcel Delivery
                    </h3>
                    <div className="flex justify-center items-center h-[260px] w-full">
                        <PieChart width={250} height={250}>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            isAnimationActive={true}
                        >
                            {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                        </PieChart>
                    </div>

                    </div>
            </div>
            <div className='bg-white mt-10 rounded-2xl p-5'>
                <h3 className='text-2xl font-bold'>Recent Activities</h3>
                <div className='overflow-hidden rounded-2xl mt-5'>
                    <table className='table'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th></th>
                                <th>Parcel</th>
                                <th>Customer</th>
                                <th>Tracking At</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            activities?.map((task, index)=>
                            <tr className={index%2===0 ? 'bg-white' : 'bg-gray-200'}>
                                <td>{index+1}</td>
                                <td>{task.parcel.parcelName}</td>
                                <td>
                                    {task.parcel.senderName} <br />
                                    {task.email}
                                </td>
                                <td>{formatDateTime(task.trackingAt)}</td>
                                <td className='capitalize'>
                                    <div className={statusColors[task.status]}>
                                        {task.status.split('-').join(' ')}
                                    </div>
                                </td>
                            </tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RiderDashboard;