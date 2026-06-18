import React, { use } from 'react';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext)
    if(loading){
        return(
            <div className='w-full pt-10 flex min-h-screen items-start justify-center'><span className="loading loading-spinner loading-xl"></span></div>
        )
    }
    else if(!user){
        return <Navigate to={'/login'}></Navigate>
    }
    return children
};

export default PrivateRoute;