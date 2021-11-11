
import Header from '@components/home-page-header';
import React from 'react';
import LoanPageHeader from './loan-page-header';
import Select from '@components/ui/select/select';
import { CheckMark } from '@components/icons/checkmark';
import { CheckMarkCircle } from '@components/icons/checkmark-circle';
import router from 'next/router';

export default function LoanPage() {

    const options = [
        { value: 'less than 2 lac', label: 'less than 2 lac' },
        { value: 'less than 5 lac', label: 'less than 5 lac' },
        { value: 'less than 8 lac', label: 'less than 8 lac' },
        { value: 'less than 10 lac', label: 'less than 10 lac'}
    ]

    return (
         <>
            <LoanPageHeader/>
            
                <div style={{ 
                    objectFit: 'cover',
                    backgroundImage: `url("https://loans.flexiloans.com/resources/assets/web_background.svg")` 
                }} className='bg-yellow-50 h-screen w-screen'>
                    
            <div className='grid grid-cols-1 lg:flex pt-20 justify-evenly'>
               <div className=' flex flex-col space-y-10'>
                 <h1 className='text-5xl text-gray-600 font-extrabold'>
                   Get Funds for all your businesses
                    </h1>
                    <p className='text-lg text-center text-gray-500'>
                        We help small vendors to raise funds for their business
                        Unleash the potential of your business 
                    </p>
                    <div className='flex flex-col  space-y-7'>
                        <span className=' flex items-center font-semibold text-gray-700 space-x-4 text-lg'><img src='/tick-mark.png' className='h-8 text-green-800'/><h1 className=''>Collateral-free loan up to ₹1 Crore</h1></span>
                        <span className=' flex items-center font-semibold text-gray-700 space-x-4 text-lg'><img src='/tick-mark.png' className='h-8 text-green-800'/><h1 className=''>18-36 month repayment period</h1></span>
                        <span className=' flex items-center font-semibold text-gray-700 space-x-4 text-lg'><img src='/tick-mark.png' className='h-8 text-green-800'/><h1 className=''>Minimum documents</h1></span>
                        <span className=' flex items-center font-semibold text-gray-700 space-x-4 text-lg'><img src='/tick-mark.png' className='h-8 text-green-800'/><h1 className=''>Interest rate as low as 1% per month</h1></span>
                        <span className=' flex items-center font-semibold text-gray-700 space-x-4 text-lg'><img src='/tick-mark.png' className='h-8 text-green-800'/><h1 className=''>Instant disbursal in 48 hours</h1></span>
                        <span className=' flex items-center font-semibold text-gray-700 space-x-4 text-lg'><img src='/tick-mark.png' className='h-8 text-green-800'/><h1 className=''>No Processing Fee</h1></span>
                    </div>
                </div>


                <form>
                    <div style={{height:''}} 
                         className='flex flex-col space-y-4 px-8 py-8 bg-white border rounded-lg w-500'>
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
                                    placeholder='' type='text'/>

                            <p className='text-gray-900 text-md'>Mobile Number</p>
                            <input className='w-full h-12  pl-8 rounded-lg border border-gray-400 bg-gray-50'
                                    placeholder='' type='text'/>

                            <p className='text-gray-900 text-md'>E-mail</p>
                            <input className='w-full h-12  pl-8 rounded-lg border border-gray-400 bg-gray-50'
                                    placeholder='' type='text' />
                                    
                            <button 
                                    className='rounded-xl bg-blue-800  text-white w-2/3 flex mx-auto items-center justify-center p-4 font-bold tracking-wide'>
                                Check Eligibility
                            </button>
                    </div>
                </form>
                    
            </div>
                    
        </div>
            </>
    )
}
