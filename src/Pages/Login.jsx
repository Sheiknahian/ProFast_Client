import React, { use } from 'react';
import { data, Link } from 'react-router';
import { ImgContext } from '../Context/Image-Context/ImgContext';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import { router } from '../Routes/Routes';

const Login = () => {
    const {authImg} = use(ImgContext)
    const {register, handleSubmit, formState:{errors}} = useForm()
    const {handleLoginVerify, registerWithGoogle} = use(AuthContext)

    const handleLoginSubmit = (data) => {
        const email = data.email;
        const pass = data.pass;
        handleLoginVerify(email, pass)
            .then(()=>{
                alert('Login successfully!')
                router.navigate('/')
            })
    }
    const handleGoogleLogin = () => {
        registerWithGoogle()
            .then(()=>{
                alert('Google login successfully!')
                router.navigate('/')
            });
    }
    return (
        <div className='flex justify-center gap-20 items-center'>
            <div className='flex justify-center items-center'>
                <div className='bg-white p-10'>
                    <h3 className='text-3xl font-bold'>Welcome Back</h3>
                    <p className='mt-2 font-semibold'>Login With ProFast</p>
                    <form onSubmit={handleSubmit(handleLoginSubmit)}>
                        <p className='mt-5 font-semibold'>Email</p>
                        <input {...register('email', {required: true})} placeholder='Enter Your Email' className='mt-1 p-2 border border-gray-300 w-100 h-10 rounded' type="email" />
                        {errors.email?.type === 'required' && <p className='text-red-500'>Eamil required</p>}

                        <p className='mt-5 font-semibold'>Password</p>
                        <input {...register('pass', {required: true})} placeholder='Enter Your Password' className='mt-1 p-2 border border-gray-300 w-100 h-10 rounded' type="password" />
                        {errors.pass?.type === 'required' && <p className='text-red-500'>Password required</p>}
                        
                        <Link to={'/forgetpass'}>
                            <p className='text-[#03373D] underline 
                            cursor-pointer my-2'>Forget Password?</p>
                        </Link>

                        <input className='w-100 mt-3 h-10 btn bg-[#CAEB66] text-black font-semibold px-6 border-[#CAEB66] text-lg shadow-none' value={'Login'} type="submit" />
                    </form>

                    <p className='mt-2 mb-5'>Don't have an account? <Link to={'/signup'}><span className='text-[#CAEB66] font-bold'>Register</span></Link></p>
                    <div className='divider'>OR</div>
                    <button onClick={handleGoogleLogin} className="btn bg-white text-black shadow-none w-100 border-gray-300">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </div>
            </div>
            <div>
                <img src={authImg} alt="" />
            </div>
        </div>
    );
};

export default Login;