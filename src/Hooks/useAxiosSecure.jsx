import React, { use, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/Auth-Context/AuthContext';

const axiosSecure = axios.create({
    baseURL: 'https://profast-server-36l8.onrender.com'
})
const useAxiosSecure = () => {
    const { user } = use(AuthContext)
    useEffect(()=>{
        const reqInterceptor = axiosSecure.interceptors.request.use((config)=>{
            config.headers.authentication = `Bearer ${user?.accessToken}`
            return config
        })

        const resInterceptor = axiosSecure.interceptors.response.use((response)=>{
            return response
        }, 
        (error)=>{
            console.log(error.message);
            
            return Promise.reject(error)
        })

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor)
            axiosSecure.interceptors.response.eject(resInterceptor)
        }
    }, [user])
    return axiosSecure;
};

export default useAxiosSecure;