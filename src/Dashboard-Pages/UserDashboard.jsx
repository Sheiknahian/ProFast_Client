import React, { use, useState } from 'react';
import { ImgContext } from '../Context/Image-Context/ImgContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { TbTruckDelivery } from "react-icons/tb";
import { Area, AreaChart, CartesianGrid, Cell, Legend, Line, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import NoDataFound from './NoDataFound';

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
const statusColors = {
  'parcel-created': 'badge bg-gray-400 border-none',
  'parcel-confirmed': 'badge badge-info border-none',
  'rider-assigned': 'badge badge-primary border-none',
  'rider-accepted': 'badge badge-accent border-none',
  'rider-rejected': 'badge badge-error border-none',
  'in-transit': 'badge badge-warning border-none',
  'parcel-delivered': 'badge badge-success border-none',
};
const stepOrder = [
  "parcel-created",
  "parcel-confirmed",
  "rider-assigned",
  "rider-accepted",
  "in-transit",
  "parcel-delivered"
];

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
const UserDashboard = () => {
    const [trackingData, setTrackingData] = useState({})
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(null)
    const [search, setSearch] = useState('')
    const {user} = use(AuthContext)
    const [latestStatus, setLatestStatus] = useState(null)
    const {bookingIcon} = use(ImgContext)
    const currentIndex = stepOrder.indexOf(latestStatus);
    const axiosSecure = useAxiosSecure()
    
    const {data: totalStats = [], isLoading} = useQuery({
        queryKey: ['statData', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels/deliveryStatus/stat?email=${user?.email}`)
            return res.data
        }
    })
    console.log(user);
    
    const stats = statsConfig.map(config=>{
        const found = totalStats.find(stat => stat._id === config.status)
        return {
            ...config,
            count: found ? found.count : 0
        }
    })

    const pieData = totalStats.map(stat => ({
        name: stat._id.split('-').join(' '),
        value: stat.count
    }));
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#fe00dc", "#8B5CF6", "#EF4444"];
    
    const {data: graphDatas = []} = useQuery({
        queryKey: ['userGraphData', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels/userDashboard/myParcels?email=${user?.email}`)
            return res.data
        }
    })
    
    const chartData = last30Days.map(date => {        
        const found = graphDatas.find(d => Number(d._id) === Number(date));
        return {
            parcels: found ? Number(found.count) : 0,
            date
        };
    });

    const {data: trackingId = []} = useQuery({
        queryKey: ['trackingId', user?.email, search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/trackingId/${user?.email}?search=${search}`)
            return res.data
        }
    })

    const handleOnChange = async (id, latest) => {
        if (trackingData[id]) return;
        setLatestStatus(latest)
        setTrackingData(null)
        setLoading(true);
        try {
            const res = await axiosSecure.get(`/trackingDetails/${id}?email=${user?.email}`);
            setTrackingData(res.data[0]);
        } finally {
            setLoading(false);
        }
    };
    
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
                    stats?.map((stat, index)=>
                        <div key={index} className='bg-[linear-gradient(135deg,#84cc16_0%,#a3e635_60%,#f7fee7_100%)] p-5 rounded-2xl flex items-center justify-around text-white font-bold transition-transform hover:scale-[1.02] duration-200 shadow'>
                            <div>
                                <p className='text-3xl'>{stat.count}</p>
                                <p className='capitalize'>{stat.status}</p>
                            </div>
                            <img className='w-15' src={bookingIcon} alt="" />
                        </div>
                    )
                }
                </div>

            </div>
            <div className='mt-10 rounded-2xl grid grid-cols-4 gap-5'>
                <div className='col-span-3 bg-white p-5 rounded-2xl shadow-xl'>
                    <h3 className='text-2xl font-bold my-5'>Delveries In Last 30 Days</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="date" />
                            <YAxis />

                            <Tooltip />

                            <Area
                            type="monotone"
                            dataKey="parcels"
                            stroke="none"
                            fill="url(#colorRevenue)"
                            />

                            <Line
                            type="monotone"
                            dataKey="parcels"
                            stroke="#a8da12"
                            />

                            <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="50%" stopColor="#aedd22" stopOpacity={1} />
                                <stop offset="100%" stopColor="#aedd22" stopOpacity={0.2} />
                            </linearGradient>
                            </defs>
                        </AreaChart>
                    </ResponsiveContainer>
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
                <div className='flex justify-between'>
                    <h3 className='text-2xl font-bold'>Shipping list details</h3>
                    <form>
                        <label className="input bg-white border-black">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                                >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input type="search" onChange={(e)=>setSearch(e.target.value)} required placeholder="Search Tracking ID" />
                        </label>
                    </form>
                </div>
                <div className='mt-10 flex flex-col gap-5'>
                {
                    trackingId.length === 0 ?
                    <NoDataFound></NoDataFound>
                    :
                    trackingId.map(id => 
                        <div key={id._id} tabIndex={0} className={`collapse collapse-arrow border border-1 border-gray-300
                            ${isOpen === id._id ? 'collapse-open' : 'collapse-close'}
                            ${isOpen === id._id ? 'bg-gray-200' : ''}
                        `}>
                            <input
                                type="checkbox"
                                checked={isOpen === id._id}
                                onChange={(e) => {
                                    setIsOpen(e.target.checked ? id._id : null);
                                    isOpen !== id._id && handleOnChange(id._id, id.latestStatus)
                                }}
                            />
                            <div className="collapse-title font-semibold flex justify-between items-center">
                                <div className='flex items-center gap-2'>
                                    <div className={`border border-1 border-gray-400 rounded p-2 text-lg text-gray-700 ${isOpen && 'bg-white'}`}>
                                        <TbTruckDelivery></TbTruckDelivery>
                                    </div>
                                    <p className='text-gray-700'>Tracking ID</p>
                                    <div className="divider lg:divider-horizontal bg-gray-400 w-[1px]"></div>
                                    <p>{id._id}</p>
                                </div>
                                <div>
                                    <p className={`capitalize p-3 rounded-full font-normal ${statusColors[id.latestStatus]}`}>{id.latestStatus.split('-').join(' ')}</p>
                                </div>
                            </div>
                            <div className={`collapse-content text-sm bg-white
                            ${isOpen === id._id ? 'm-5 p-5 rounded-2xl' : ''}`}>
                                {
                                loading ? <p className='loading loading-spinner '></p>
                                :
                               <div>
                                    <div>
                                        <div className='flex justify-between font-semibold'>
                                            <p className='text-gray-700'>Parcel Name</p>
                                            <p>{trackingData?.parcel?.parcelName}</p>
                                        </div>
                                        <div className='flex justify-between font-semibold'>
                                            <p className='text-gray-700'>Sender Adsress</p>
                                            <p>{trackingData?.parcel?.senderAdress}, {trackingData?.parcel?.senderWireHouse}</p>
                                        </div>
                                        <div className='flex justify-between font-semibold'>
                                            <p className='text-gray-700'>Receiver Adsress</p>
                                            <p>{trackingData?.parcel?.receiverAdress}, {trackingData?.parcel?.receiverWireHouse}</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-center mt-5'>
                                        <ul className="steps w-9/10 mx-auto">
                                        { 
                                            stepOrder.map((step, index) => 
                                            <li key={index} data-content={index <= currentIndex ? '✓' : '●'} className={`step 
                                            ${index <= currentIndex ? 'step-success' : ''}`}>
                                                <p className='capitalize'>{step.split('-').join(' ')}</p>
                                                <p className='text-[11px] opacity-70'>
                                                    {trackingData?.trackings?.[index] ? formatDateTime(trackingData?.trackings?.[index]?.trackingAt) : 'Pending'}
                                                </p>
                                            </li>)
                                        }
                                        </ul>
                                    </div>
                               </div>
                                }
                            </div>
                        </div>)
                }
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;