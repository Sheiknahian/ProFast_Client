import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { router } from '../Routes/Routes';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router';


const ForgetPass = () => {
    const {register, handleSubmit, formState:{errors}} = useForm()
    const {forgetPass, user} = use(AuthContext)

    const handleForgetPass = (data) => {
        const email = data.email;
        forgetPass(email)
            .then(()=>{
                alert('Reset Email Sent!');
                !user && router.navigate('/login')
            })
    }
    return (
        <div className='flex flex-col items-center justify-center mt-20'>
            <form onSubmit={handleSubmit(handleForgetPass)}>
                <input {...register('email', {required: true})} placeholder='Enter Your Email' className='mt-1 p-2 border border-gray-300 w-100 h-10 rounded' type="email" />
                {errors.email?.type === 'required' && <p className='text-red-500'>Eamil required</p>}
                <br />
                <input className='w-100 mt-3 h-10 btn bg-[#CAEB66] text-black font-semibold px-6 border-[#CAEB66] shadow-none' value={'Verify Email'} type="submit" />
            </form>
        {
            user ?
                <Link to={'/dashboard'}>
                    <button className='btn bg-[#CAEB66] border-none shadow-none flex items-center text-black mt-10'>
                        <IoMdArrowRoundBack className='text-lg'></IoMdArrowRoundBack>
                        <p>Back to dashboard</p>
                    </button>
                </Link>
                :
                <Link to={'/login'}>
                    <button className='btn bg-[#CAEB66] border-none shadow-none flex items-center text-black mt-10'>
                        <IoMdArrowRoundBack className='text-lg'></IoMdArrowRoundBack>
                        <p>Back to login</p>
                    </button>
                </Link>
        }
        </div>
    );
};

export default ForgetPass;