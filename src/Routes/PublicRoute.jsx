import React, { use } from 'react';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import { Navigate } from 'react-router';


const PublicRoute = ({children}) => {
    const {user, loading} = use(AuthContext)
    if(loading){
        return(
            <div className='w-full flex min-h-screen items-start justify-center'><span className="loading loading-spinner loading-xl"></span></div>
        )
    }
    else if(user){
        console.log(user);
        
        return <Navigate to={'/dashboard'}></Navigate>
    }
    return children
};

export default PublicRoute;