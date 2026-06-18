import React, { use } from 'react';
import useRole from '../Hooks/useRole';
import { Navigate } from 'react-router';
import { AuthContext } from '../Context/Auth-Context/AuthContext';

const UserRoute = ({children}) => {
    const {role, isLoading} = useRole()
    const {loading} = use(AuthContext)
    if(isLoading || loading){
        return <div className='w-full flex min-h-screen items-start justify-center'><span className="loading loading-spinner loading-xl"></span></div>
    }
    if(role !== 'user'){
        return <Navigate to={'/dashboard'}></Navigate>
    }
    return children
};

export default UserRoute;