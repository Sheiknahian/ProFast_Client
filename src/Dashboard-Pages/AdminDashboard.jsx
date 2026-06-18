import React, { use } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Area, AreaChart, CartesianGrid, Cell, Legend, Line, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ImgContext } from '../Context/Image-Context/ImgContext';
import { FaRegUser } from 'react-icons/fa';
import { BsCashCoin } from "react-icons/bs";
import { AuthContext } from '../Context/Auth-Context/AuthContext';


const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
};
const last30Days = [...Array(30)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.getDate()
});

const statsConfig = [
  {
    status: "parcel-confirmed",
    title: "Parcel Confirmed",
  },
  {
    status: "in-transit",
    title: "In Transit",
  },
  {
    status: "parcel-delivered",
    title: "Delivered",
  }
];

const AdminDashboard = () => {
    const {delivery, bookingIcon} = use(ImgContext)
    const {user} = use(AuthContext)
    const axiosSecure = useAxiosSecure()


    const {data: totalStats = [], isLoading} = useQuery({
        queryKey: ['statData', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels/deliveryStatus/stat?email=${user?.email}`)
            return res.data
        }
    })
    // console.log(totalStats);
    
    const statData = statsConfig.map(config=>({
        ...config,
        count: totalStats.find(stat => stat._id === config.status)?.count || 0
    }))

    const pieData = totalStats.map(stat => ({
        name: stat._id.split('-').join(' '),
        value: stat.count
    }));
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#fe00dc", "#8B5CF6", "#EF4444"];
    
    const {data: graphDatas = []} = useQuery({
        queryKey: ['graphData'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/payments/price/totalReveue?email=${user?.email}`)
            return res.data
        }
    })
    // console.log(graphDatas);

    
    const chartData = last30Days.map(date=>{
        const found = graphDatas.find(data => Number(data._id) === date)
        return {
            date,
            revenue: found ? found.revenue : 0
        }
    })
    // console.log(chartData);
    
    
    const { data: userCount = 0 } = useQuery({
        queryKey: ['userCount'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/count?email=${user?.email}`);
            return res.data.count;
        }
    });

    const { data: riderCount = 0 } = useQuery({
        queryKey: ['riderCount'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders/count?email=${user?.email}`);
            return res.data.count;
        }
    });
    
    const { data: parcels = []} = useQuery({
        queryKey: ['parcel', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`)
            return res.data
        }
    })
    // console.log(parcels);
    if(isLoading){
        return <div className='w-full flex min-h-screen items-start justify-center'><span className="loading loading-spinner loading-xl"></span></div>
    }
    return (
        <div className='min-h-screen mx-10'>
            <div>
                <div className="grid grid-cols-4 gap-10">
                    <div className='bg-[linear-gradient(135deg,#84cc16_0%,#a3e635_60%,#f7fee7_100%)] p-5 rounded-2xl flex items-center justify-around text-white font-bold transition-transform hover:scale-[1.02] duration-200 shadow'>
                        <div>
                            <p className='text-3xl'>{totalStats.reduce((acc, item) => acc + item.count, 0)}</p>
                            <p>Total Parcel</p>
                        </div>
                        <img className='w-15' src={bookingIcon} alt="" />
                    </div>
                {
                    statData?.map(stat=>
                        <div className='bg-[linear-gradient(135deg,#84cc16_0%,#a3e635_60%,#f7fee7_100%)] p-5 rounded-2xl flex items-center justify-around text-white font-bold transition-transform hover:scale-[1.02] duration-200 shadow'>
                            <div>
                                <p className='text-3xl'>{stat.count}</p>
                                <p>{stat.title}</p>
                            </div>
                            <img className='w-15' src={bookingIcon} alt="" />
                        </div>
                    )
                }
                </div>

                <div className='grid grid-cols-3 mt-5 gap-12'>
                    <div className='bg-[linear-gradient(135deg,#84cc16_0%,#a3e635_60%,#f7fee7_100%)] p-5 rounded-2xl flex items-center justify-around text-white font-bold transition-transform hover:scale-[1.02] duration-200 shadow'>
                        <div>
                            <p className='text-3xl'>{userCount}</p>
                            <p>Users</p>
                        </div>
                        <FaRegUser className='text-4xl text-indigo-900'></FaRegUser>
                    </div>
                    <div className='bg-[linear-gradient(135deg,#84cc16_0%,#a3e635_60%,#f7fee7_100%)] p-5 rounded-2xl flex items-center justify-around text-white font-bold transition-transform hover:scale-[1.02] duration-200 shadow'>
                        <div>
                            <p className='text-3xl'>{riderCount}</p>
                            <p>Riders</p>
                        </div>
                        <img className='w-15' src={delivery} alt="" />
                    </div>
                    <div className='bg-[linear-gradient(135deg,#84cc16_0%,#a3e635_60%,#f7fee7_100%)] p-5 rounded-2xl flex items-center justify-around text-white font-bold transition-transform hover:scale-[1.02] duration-200 shadow'>
                        <div>
                            <p className='text-3xl'>${graphDatas.reduce((acc, item) => acc + item.revenue, 0)}</p>
                            <p>Total Revenue</p>
                        </div>
                        <BsCashCoin className='text-4xl text-indigo-900'></BsCashCoin>
                    </div>
                </div>
            </div>
            <div className='mt-10 rounded-2xl grid grid-cols-4 gap-5'>
                <div className='col-span-3 bg-white p-5 rounded-2xl shadow-xl'>
                    <h3 className='text-2xl font-bold my-5'>Revenues In Last 30 Days</h3>
                    <AreaChart width='full' height={300} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="date"/>
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
            <div className='bg-white rounded-2xl p-5 mt-10'>
                <h3 className='text-2xl font-bold'>Recent Orders</h3>
                <div className='overflow-hidden rounded-2xl mt-5'>
                    <table className='table table-auto'>
                        <thead>
                            <tr className='bg-gray-200 text-black'>
                                <th></th>
                                <th>Tracking Id</th>
                                <th>Client</th>
                                <th>Status</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            parcels?.map((parcel, index) =>
                                <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                                    <td>{index+1}</td>
                                    <td>{parcel.trackingId}</td>
                                    <td>
                                        <p>{parcel.senderName}</p>
                                        <p>{parcel.senderContact}</p>
                                    </td>
                                    <td className='capitalize'>
                                        {parcel.deliveryStatus.split('-').join(' ')}
                                    </td>
                                    <td>{parcel.price}</td>
                                    <td>{formatDateTime(parcel.createdAt)}</td>
                                </tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;