import React, { use } from 'react';
import useRole from '../Hooks/useRole';
import { Navigate } from 'react-router';
import { AuthContext } from '../Context/Auth-Context/AuthContext';

const AdminRoute = ({children}) => {
    const {role, isLoading} = useRole()
    const {loading} = use(AuthContext)
    if(isLoading || loading){
        return(
            <div className='w-full flex min-h-screen items-start justify-center'><span className="loading loading-spinner loading-xl"></span></div>
        )
    }
    else if(role !== 'admin'){
        return <Navigate to={'/forbidden'}></Navigate>
    }
    return children
};

export default AdminRoute;