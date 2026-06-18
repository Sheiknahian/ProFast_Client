import React, { use } from 'react';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const {user} = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data: role = [], isLoading} = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/${user?.email}/role`);
            return res.data.role
        }
    })
    return {role, isLoading};
};

export default useRole;