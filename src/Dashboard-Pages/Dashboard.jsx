import React, { use } from 'react';
import useRole from '../Hooks/useRole';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import AdminDashboard from './AdminDashboard';
import RiderDashboard from './RiderDashboard';
import UserDashboard from './UserDashboard';


const Dashboard = () => {
    const {loading} = use(AuthContext);
    const {role, isLoading} = useRole();
    if(isLoading || loading){
        return <div className='w-full flex min-h-screen items-start justify-center'><span className="loading loading-spinner loading-xl"></span></div>
    }
    if(role === 'admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else if(role === 'rider'){
        return <RiderDashboard></RiderDashboard>
    }
    else{
        return <UserDashboard></UserDashboard>
    }
};

export default Dashboard;