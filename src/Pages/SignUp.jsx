import React, { use, useRef } from 'react';
import { ImgContext } from '../Context/Image-Context/ImgContext';
import { Link, Navigate } from 'react-router';
import { useForm } from "react-hook-form";
import { AuthContext } from '../Context/Auth-Context/AuthContext';
import { router } from '../Routes/Routes';
import axios from 'axios'



const SignUp = () => {
    const {authImg, uploadImg} = use(ImgContext)
    const {registerWithEmail, registerWithGoogle, updatedProfile} = use(AuthContext)
    const fileRef = useRef(null)

    
    const {register, handleSubmit, formState:{errors}} = useForm()
    const handleRegisterSubmit = (data) => {
        console.log(data);
        const userName = data.name

        registerWithEmail(data.email, data.pass)
            .then(()=>{
                alert('Create account successfully!')
                const profileImg = data.image[0];
                const formData = new FormData();
                formData.append('image', profileImg);

                const imgApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_KEY}`
                
                if(profileImg){    
                    axios.post(imgApiUrl, formData)
                    .then(res=>{
                            const imgURl = res.data.data.url;
                            const user = {
                                email: data.email,
                                name: userName,
                                imgURL: imgURl
                            }
                            axios.post('https://profast-server-36l8.onrender.com/users', user)
                            
                            const newProfile = {
                                displayName: userName,
                                photoURL: imgURl
                            }
                            updatedProfile(newProfile)
                            router.navigate('/')
                        })
                }
                else if(!profileImg){
                    const user = {
                        email: data.email,
                        name: userName,
                        imgURL: null
                    }
                    axios.post('https://profast-server-36l8.onrender.com/users', user)
                    
                    const newProfile = {
                        displayName: userName,
                    }
                    updatedProfile(newProfile)
                    router.navigate('/')
                }
            })
    }
    const handleGoogleRegister = () => {
        registerWithGoogle()
            .then(()=>{
                alert('Google login successfully!')
                router.navigate('/')
            })
    }
    return (
        <div className='flex justify-center gap-20 items-center'>
            <div className='flex justify-center items-center'>
                <div className='bg-white p-10'>
                    <h3 className='text-3xl font-bold'>Create an Account</h3>
                    <p className='mt-2 font-semibold'>Register with ProFast</p>
                    <form onSubmit={handleSubmit(handleRegisterSubmit)}>
                        <div className='my-4'>
                            <img onClick={()=>fileRef.current?.click()} className='cursor-pointer' src={uploadImg} alt="" />
                            <input {...register('image')} ref={(e) => {register("image").ref(e); 
                                fileRef.current = e; }} hidden type="file" />
                        </div>
                        <p className='font-semibold'>Name</p>
                        <input {...register('name', {required: true})} placeholder='Enter Your Name' className='mt-1 p-2 border border-gray-300 w-100 h-10 rounded' type="text" />
                        {errors.name?.type === 'required' && <p className='text-red-500'>Name required</p>}

                        <p className='mt-5 font-semibold'>Email</p>
                        <input {...register('email', {required: true})} placeholder='Enter Your Email' className='mt-1 p-2 border border-gray-300 w-100 h-10 rounded' type="email" />
                        {errors.email?.type === 'required' && <p className='text-red-500'>Eamil required</p>}

                        <p className='mt-5 font-semibold'>Password</p>
                        <input {...register('pass', {required: true})} placeholder='Enter Your Password' className='mt-1 p-2 border border-gray-300 w-100 h-10 rounded' type="password" />
                        {errors.pass?.type === 'required' && <p className='text-red-500'>Password required</p>}

                        <br />

                        <input className='w-100 h-10 mt-6 btn bg-[#CAEB66] text-black font-semibold px-6 border-[#CAEB66] text-lg shadow-none' value={'Register'} type="submit" />
                    </form>

                    <p className='mt-2 mb-5'>Already Have An Account? <Link to={'/login'}><span className='text-[#CAEB66] font-bold'>Login Now</span></Link></p>
                    <div className='divider'>OR</div>
                    <button onClick={handleGoogleRegister} className="btn bg-white text-black shadow-none w-100 border-gray-300">
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

export default SignUp;