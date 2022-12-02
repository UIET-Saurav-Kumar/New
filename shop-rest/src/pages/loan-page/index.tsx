
import Header from '@components/home-page-header';
import React from 'react';
import LoanPageHeader from './loan-page-header';
import Select from '@components/ui/select/select';
import { CheckMark } from '@components/icons/checkmark';
import { CheckMarkCircle } from '@components/icons/checkmark-circle';
import router from 'next/router';

import Logo from '@components/ui/logo'
import Footer from '@components/footer/Footer';

export default function LoanPage() {


    const options = [
        { value: 'less than 2 lac', label: 'less than 2 lac' },
        { value: 'less than 5 lac', label: 'less than 5 lac' },
        { value: 'less than 8 lac', label: 'less than 8 lac' },
        { value: 'less than 10 lac', label: 'less than 10 lac'}
    ]

    
    return (
         <div className='bg-gray-100'>

         <div className='bg-black'><img src='/11.jpg' 
         className='relative w-full opacity-30 lg:opacity-40 h-screen  object-cover'/></div>
               
                <div className='absolute bg-transparent top-0 h-screen w-full'>

                    <div className='flex items-center justify-between w-screen top-0'>
                        <div className='px-20 p-6 h-full bg-transparent flex items-center  justify-between'>

                            <div className='flex'>
                                <Logo/>
                            </div>

                            <div className=' right-0 hidden lg:flex  text-white items-center space-x-6 justify-evenly'>
                                {/* <h1>Any queries?</h1> */}
                                {/* <h1>87898-76292</h1> */}
                            </div>
                        </div>
                    </div> 

                        {/* <img className='' src='/loan-bg-trans.png'/> */}
                    
            <div className='lg:px-20 font  px-4 top-20 place-items-center  gap-y-8 grid grid-cols-1 lg:flex lg:justify-between pt-20 '>
              
               <div className=' flex flex-col -mt-16 items-center space-y-10'>
                 <h1 className='text-3xl md:text-4xl lg:text-5xl text-white text-center lg:text-start font-extrabold'>
                     Get Funds for all your businesses
                 </h1>
                <p className='text-lg text-center text-gray-300'>
                    We help small vendors to raise funds for their business
                    Unleash the potential of your business 
                </p>
                <div className='flex flex-col space-y-3 lg:space-y-6'>
                    <span className=' flex items-center font-Pacifico text-gray-200 space-x-4 text-lg md:text-lg lg:text-xl'><img src='/tick-mark.png' className=' h-6 md:h-8 text-green-800'/><h1 className=''>Collateral-free loan up to ₹1 Crore</h1></span>
                    <span className=' flex items-center font-Pacifico text-gray-200 space-x-4 text-lg md:text-lg lg:text-xl'><img src='/tick-mark.png' className=' h-6 md:h-8 text-green-800'/><h1 className=''>18-36 month repayment period</h1></span>
                    <span className=' flex items-center font-Pacifico text-gray-200 space-x-4 text-lg md:text-lg lg:text-xl'><img src='/tick-mark.png' className=' h-6 md:h-8 text-green-800'/><h1 className=''>Minimum documents</h1></span>
                    <span className=' flex items-center font-Pacifico text-gray-200 space-x-4 text-lg md:text-lg lg:text-xl'><img src='/tick-mark.png' className=' h-6 md:h-8 text-green-800'/><h1 className=''>Interest rate as low as 1% per month</h1></span>
                    <span className=' flex items-center font-Pacifico text-gray-200 space-x-4 text-lg md:text-lg lg:text-xl'><img src='/tick-mark.png' className=' h-6 md:h-8 text-green-800'/><h1 className=''>Instant disbursal in 48 hours</h1></span>
                    <span className=' flex items-center font-Pacifico text-gray-200 space-x-4 text-lg md:text-lg lg:text-xl'><img src='/tick-mark.png' className=' h-6 md:h-8 text-green-800'/><h1 className=''>No Processing Fee</h1></span>
                </div>
            </div>


                <form>
                    <div style={{marginTop:''}} 
                         className='flex flex-col space-y-2  md:space-y-2 px-8 py-1 sm:py-3 md:py-3 
                                  bg-white border rounded-lg w-auto xs+:w-400 h-auto  sm:w-500 lg:w-400'>
                             
                            <h1 className='font-semibold text-gray-600 text-center border-b 
                                           border-gray-500 pb-5 border-dotted text-xl'>
                                Check your eligibility
                            </h1>
                            
                            <p className='text-gray-900 text-md'>Annual Turnover</p>
                            <Select  options={options} label={options}/>
                            {/* <input className='w-full h-12  pl-8 rounded-lg border border-gray-400 bg-gray-100'
                                    placeholder='valid mobile number' type='text'/> */}

                            <p className='text-gray-900 text-md'>Name</p>
                            <input className='w-full active:border-2 h-12 pl-8 rounded-lg border border-gray-400 bg-gray-50'
                                    required placeholder='' type='text'/>

                            <p className='text-gray-900 text-md'>Mobile Number</p>
                            <input className='w-full h-12  pl-8 rounded-lg border border-gray-400 bg-gray-50'
                                  required  placeholder='' type='text'/>

                            <p className='text-gray-900 text-md'>E-mail</p>
                            <input className='w-full h-12  pl-8 rounded-lg border border-gray-400 bg-gray-50'
                                  required  placeholder='' type='text' />
                                    
                            <button 
                                    className='rounded-xl bg-blue-800  text-white w-auto md:w-2/3 flex mx-auto items-center justify-center p-4 font-bold tracking-wide'>
                                Check Eligibility
                            </button>
                    </div>
                </form>
                    
            </div>
                    
        </div>

        <div id='loan-page'  
             className='loan-page px-6 sm:px-16 md:px-10 gap-y-4 grid grid-cols-1 
                        sm:grid-cols-2 lg:grid-cols-3 bg-gray-100  pt-96 pb-10  
                        lg:pt-20 place-items-center mt-44 xs+:mt-0 sm:mt-0 gap-x-8'>

            <div className='space-y-5 py-3 flex flex-col rounded-lg w-auto h-auto sm:h-96 md:h-80 lg:h-96 xl:h-80 px-8  bg-gray-50'>
                <img src='/rupee.png' className='h-16 object-contain'/>
                 <h1 className='text-center text-xl font-md font-Pacifico tracking-widest'>INR 2 lakh to INR 50 lakh loans</h1>
                 <p className=' text-center text-gray-800 tracking-wider font-mono'>Be it cash-flow management or expansion, apply for a loan amount in accordance with your business needs.</p>
            </div>

            <div className='space-y-5 py-3 flex flex-col rounded-lg w-auto h-auto sm:h-96 md:h-80 lg:h-96 xl:h-80 px-8  bg-gray-50 '>
                <img src='/fast-time.png' className='h-16 object-contain'/>
                 <h1 className='text-center text-xl font-md font-Pacifico tracking-widest'>No collateral and quick process</h1>
                 <p className=' text-center text-gray-800 tracking-wider font-mono'>If approved, get your loan within three working days of completing all documentation. Apply with no collateral through a quick online application.</p>
            </div>

            <div className='space-y-5  py-3 flex flex-col rounded-lg w-auto h-auto sm:h-96 md:h-80 lg:h-96 xl:h-80 px-8  bg-gray-50 '>
                <img src='/customer-service.png' className='h-16 object-contain'/>
                 <h1 className='text-center text-xl font-md font-Pacifico tracking-widest'>Quick support</h1>
                 <p className=' text-center text-gray-800 tracking-wider font-mono'>Get application confirmation within one working day of applying and understand the status of your application easily by calling a dedicated customer support line</p>
            </div>

        </div>

        <div className='flex flex-col space-y-8 lg:space-y-16 text-center mt-10 lg:flex lg:items-center py-16 bg-indigo-100 lg:justify-evenly'>
            <h1 className='text-gray-800 text-2xl md:text-2xl lg:text-3xl font-bold'>
                We'll serve your all needs
            </h1>
            <div className='grid grid-cols-1  sm:grid-cols-2 md:gap-x-10 md:grid-cols-4'>
            <div className='space-y-5 py-3 flex flex-col rounded-lg w-auto h-auto px-8 '>
                <img src='/online-store.png' className=' h-16 object-contain'/>
                 <h1 className='text-center text-lg sm:text-xl font-md font-Pacifico tracking-widest'> Expanding  outlets</h1>
                 
            </div>

            <div className='space-y-5 py-3 flex flex-col rounded-lg w-auto h-auto   '>
                <img src='/social-media(1).png' className='h-16 object-contain'/>
                 <h1 className='text-center text-lg sm:text-xl font-md font-Pacifico tracking-widest'> Digital Marketing</h1>
            </div>

            <div className='space-y-5  py-3 flex flex-col rounded-lg w-auto h-auto   '>
                <img src='/discount-badge.png' className='h-16 object-contain'/>
                 <h1 className='text-center text-lg sm:text-xl font-md font-Pacifico tracking-widest'>Offers and schemes</h1>
                 
            </div>

            <div className='space-y-5  py-3 flex flex-col rounded-lg w-auto h-auto   '>
                <img src='/working.png' className='h-16 text-center object-contain'/>
                 <h1 className='text-center text-lg sm:text-xl font-md font-Pacifico tracking-widest'>Working Capital</h1>
                 
            </div>
            </div>

        </div>
        <Footer/>

      
            </div>
    )
}
