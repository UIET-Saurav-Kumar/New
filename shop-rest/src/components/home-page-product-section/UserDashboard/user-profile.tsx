
import { ArrowCircleRightIcon } from '@heroicons/react/outline';
import React from 'react';

export default function UserProfile() {

  return (

    <div className='flex flex-col rounded-xl shadow-3xl w-full  bg-white p-3'>
       
        {/* <div className=''> */}
               <div className='flex space-x-3 items-center border-b pb-3 '>
                   <span className='rounded-full w-10 h-10 border bg-red-400'></span>
                   <div className=''>
                       <h3 className='text-gray-600 text-xl font-light'>Hello <span className='text-gray-800 font-semibold'>vinender</span></h3>
                       <p className='text-md text-gray-400 font-light'>Welcome to Buylowcal Community</p>
                   </div>
                </div>
        {/* </div> */}

        <div className='flex flex-col w-full space-y-3'>
            <div className='space-y-8 text-center'>
                  <div className=' flex justify-around items-start space-y-3'>
                      <img src='/boy.png' className='h-16 w-16' alt='profile'/>
                      <p className='text-lg  font-semibold'>Vinender</p>
                  </div>
                  <div className='font-semibold text-xl'>Your Community</div>
            </div>

            <div className='flex space-y-3 flex-col'>
                    <div className='flex flex-col bg-magenta  text-white text-center rounded-lg p-3'>
                        <span className='font-bold text-3xl'>3000</span>
                        <p className='text-xl font-semibold'>Member Family</p>
                    </div>
                    <span className='flex items-center'>
                        <p className='text-sm font-light'>Explore Your Community</p>
                        <ArrowCircleRightIcon className='h-7 w-7'/>
                    </span>
            </div>
        </div>

    </div>
  )
}
