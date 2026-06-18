import React, { use } from 'react';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import useRole from '../Hooks/useRole';
import { Navigate } from 'react-router';


const RiderRoute = ({children}) => {
    const {role, isLoading} = useRole()
    const {loading} = use(AuthContext)
    if(isLoading || loading){
        return(
            <div className='w-full flex min-h-screen items-start justify-center'><span className="loading loading-spinner loading-xl"></span></div>
        )
    }
    else if(role !== 'rider'){
        return <Navigate to={'/forbidden'}></Navigate>
    }
    return children
};

export default RiderRoute;