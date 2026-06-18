import React, { use } from 'react';
import { ImgContext } from '../Context/Image-Context/ImgContext';

const Features = () => {
    const {bookingIcon, service, amazon, casio, moonstar, 
        randstar, starPeople, star, tracking, delivery, 
        merchant, merchantBg} = use(ImgContext)
    return (
        <div className='mt-20 flex flex-col gap-20 mx-10'>
            <div className='w-9/10 mx-auto'>
                <div>
                    <h3 className='font-bold text-2xl'>How it Works</h3>
                </div>
                <div className='flex flex-col md:flex-row justify-center gap-5 mt-10'>
                    <div className='bg-white flex flex-col justify-center gap-5 p-5 aspect-square rounded-xl'>
                        <img className='w-16' src={bookingIcon} alt="" />
                        <div>
                            <h4 className='font-semibold text-lg'>Booking Pick & Drop</h4>
                            <p className='text-gray-700 mt-2'>From personal packages to business shipments — we deliver on time, every time.</p>
                        </div>
                    </div>
                    <div className='bg-white flex flex-col justify-center gap-5 p-5 aspect-square rounded-xl'>
                        <img className='w-16' src={bookingIcon} alt="" />
                        <div>
                            <h4 className='font-semibold text-lg'>Cash On Delivery</h4>
                            <p className='text-gray-700 mt-2'>From personal packages to business shipments — we deliver on time, every time.</p>
                        </div>
                    </div>
                    <div className='bg-white flex flex-col justify-center gap-5 p-5 aspect-square rounded-xl'>
                        <img className='w-16' src={bookingIcon} alt="" />
                        <div>
                            <h4 className='font-semibold text-lg'>Delivery Hub</h4>
                            <p className='text-gray-700 mt-2'>From personal packages to business shipments — we deliver on time, every time.</p>
                        </div>
                    </div>
                    <div className='bg-white flex flex-col justify-center gap-5 p-5 aspect-square rounded-xl'>
                        <img className='w-16' src={bookingIcon} alt="" />
                        <div>
                            <h4 className='font-semibold text-lg'>Booking SME & Corporate</h4>
                            <p className='text-gray-700 mt-2'>From personal packages to business shipments — we deliver on time, every time.</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='text-center bg-[#03373D] rounded-2xl flex flex-col items-center justify-center md:p-16'>
                <div className='px-5 pt-10 md:p-none text-white lg:w-200'>
                    <h2 className='font-bold text-2xl md:text-4xl'>Our Services</h2>
                    <p className='mt-2 md:w-75 text-sm md:text-md lg:w-full'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='p-5 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-5'>
                    <div className='flex flex-col items-center bg-white p-4 md:p-8 rounded-2xl gap-4'>
                        <div className='rounded-full p-4 bg-linear-to-b from-gray-200 to-white'>
                            <img src={service} className='w-10' alt="" />
                        </div>
                        <h4 className='text-2xl font-bold'>Express  & Standard Delivery</h4>
                        <p className='text-gray-700'>We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. </p>
                    </div>
                    <div className='flex flex-col items-center bg-[#CAEB66] p-4 md:p-8 rounded-2xl gap-4'>
                        <div className='rounded-full p-4 bg-linear-to-b from-gray-200 to-white'>
                            <img src={service} className='w-10' alt="" />
                        </div>
                        <h4 className='text-2xl font-bold'>Nationwide Delivery</h4>
                        <p className='text-gray-700'>We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.</p>
                    </div>
                    <div className='flex flex-col items-center bg-white p-4 md:p-8 rounded-2xl gap-4'>
                        <div className='rounded-full p-4 bg-linear-to-b from-gray-200 to-white'>
                            <img src={service} className='w-10' alt="" />
                        </div>
                        <h4 className='text-2xl font-bold'>Fulfillment Solution</h4>
                        <p className='text-gray-700'>We also offer customized service with inventory management support, online order processing, packaging, and after sales support.</p>
                    </div>
                    <div className='flex flex-col items-center bg-white p-4 md:p-8 rounded-2xl gap-4'>
                        <div className='rounded-full p-4 bg-linear-to-b from-gray-200 to-white'>
                            <img src={service} className='w-10' alt="" />
                        </div>
                        <h4 className='text-2xl font-bold'>Cash on Home Delivery</h4>
                        <p className='text-gray-700'>100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.</p>
                    </div>
                    <div className='flex flex-col items-center bg-white p-4 md:p-8 rounded-2xl gap-4'>
                        <div className='rounded-full p-4 bg-linear-to-b from-gray-200 to-white'>
                            <img src={service} className='w-10' alt="" />
                        </div>
                        <h4 className='text-2xl font-bold'>Corporate Service / Contract In Logistics</h4>
                        <p className='text-gray-700'>Customized corporate services which includes warehouse and inventory management support.</p>
                    </div>
                    <div className='flex flex-col items-center bg-white p-4 md:p-8 rounded-2xl gap-4'>
                        <div className='rounded-full p-4 bg-linear-to-b from-gray-200 to-white'>
                            <img src={service} className='w-10' alt="" />
                        </div>
                        <h4 className='text-2xl font-bold'>Parcel Return</h4>
                        <p className='text-gray-700'>Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.</p>
                    </div>
                    
                </div>
            </div>

            <div className='hidden lg:flex flex-col items-center'>
                <div>
                    <h3 className='font-bold text-2xl'>We've helped thousands of sales teams</h3>
                </div>
                <div className='mt-10 flex gap-15'>
                    <img src={casio} alt="" />
                    <img src={amazon} alt="" />
                    <img src={moonstar} alt="" />
                    <img src={star} alt="" />
                    <img src={randstar} alt="" />
                    <img src={starPeople} alt="" />
                </div>
            </div>

            <div className='w-9/10 mx-auto border-t-3 border-dotted border-gray-400'></div>

            <div className='w-9/10 mx-auto'>
                <div className='flex flex-col gap-10'>
                    <div className='flex flex-col md:flex-row items-center gap-10 bg-white p-5 md:p-10 rounded-2xl'>
                        <div>
                            <img src={tracking} alt="" />
                        </div>
                        <div className="w-full border-t-2 md:border-l-2 h-[1px] md:w-0 md:border-dotted border-gray-400 md:h-40 rounded-full"></div>
                        <div>
                            <h4 className='text-xl md:text-2xl text-[#03373D] font-bold'>Live Parcel Tracking</h4>
                            <p className='text-gray-700 mt-2 md:mt-5'>Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center gap-10 bg-white p-5 md:p-10 rounded-2xl'>
                        <div>
                            <img src={delivery} alt="" />
                        </div>
                        <div className="w-full border-t-2 md:border-l-2 h-[1px] md:w-0 md:border-dotted border-gray-400 md:h-40 rounded-full"></div>
                        <div>
                            <h4 className='text-xl md:text-2xl text-[#03373D] font-bold'>100% Safe Delivery</h4>
                            <p className='text-gray-700 mt-2 md:mt-5'>We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center gap-10 bg-white p-5 md:p-10 rounded-2xl'>
                        <div>
                            <img src={delivery} alt="" />
                        </div>
                        <div className="w-full border-t-2 md:border-l-2 h-[1px] md:w-0 md:border-dotted border-gray-400 md:h-40 rounded-full"></div>
                        <div>
                            <h4 className='text-xl md:text-2xl text-[#03373D] font-bold'>24/7 Call Center Support</h4>
                            <p className='text-gray-700 mt-2 md:mt-5'>We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className='w-9/10 mx-auto border-t-3 border-dotted border-gray-400'></div>

            <div style={{backgroundImage: `url('${merchantBg}')`}} className={`md:w-9/10 mx-auto bg-no-repeat bg-[#03373D] p-5 md:p-10 rounded-2xl 
            flex flex-col-reverse md:flex-row items-center`}>
                <div className='md:w-140'>
                    <div className='text-center md:text-start'>
                        <h3 className='text-[20px] md:text-3xl text-white font-bold'>Merchant and Customer Satisfaction is Our First Priority</h3>
                        <p className='text-gray-300 mt-5 font-thin'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                    </div>
                    <div className='mt-8 flex flex-col md:flex-row gap-4'>
                        <button className='btn bg-[#CAEB66] text-black font-semibold shadow-none border-[#CAEB66] rounded-full text-lg p-6'>Become a Merchant</button>
                        <button className='btn bg-[#03373D] text-[#CAEB66] font-semibold shadow-none border-[#CAEB66] rounded-full text-lg p-6'>Earn with Profast</button>
                    </div>
                </div>
                <div className='mb-5 md:mt-none'>
                    <img src={merchant} alt="" />
                </div>
            </div>

            
        </div>
    );
};

export default Features;