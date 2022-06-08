
import { ArrowCircleRightIcon } from '@heroicons/react/outline';
import React from 'react';
import { useRouter } from "next/router";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUI } from "@contexts/ui.context";


export default function UserProfile({data}:any) {

    const { openModal } = useModalAction();
    const router = useRouter();
  
    const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();
  
    function getLink() {
          
      isAuthorize ? router.push('/user/referral-network') :
       openModal("REGISTER")
  
  }

  return (

        <div className='flex flex-col justify-evenly rounded-xl lg:h-110 xl:space-y-4 2xl:py-5 shadow-3xl w-full  bg-gradient-to-r from-red-50   to-blue-50 drop-shadow-2xl p-6  sm:p-3'>
        
            {/* <div className=''> */}
            <div className='flex space-x-3 items-center border-b pb-3 '>
                {/* <span className='rounded-full w-10 h-10 border bg-red-400'></span> */}
                <div className=''>
                    <h3 className='text-gray-600 text-xl font-light'>Hey, <span className='text-gray-800 font-semibold'>
                        {data ? data?.name.split(' ')[0] : 'Guest'}
                    </span></h3>
                    <p className='text-md text-gray-400 font-light'>Welcome to Buylowcal Community</p>
                </div>
            </div>
            {/* </div> */}

            <div className='flex flex-col 2xl:space-y-8 w-full space-y-3'>
                <div className='space-y-8 text-center'>
                    <div className=' flex justify-around items-start mt-2 space-y-3'>
                        <img src={data ? data?.profile?.avatar?.thumbnail : '/boy.png'} className='h-16 w-16 border rounded-full' alt='profile'/>
                        <p className='text-lg  font-semibold'>{!!data ? data?.name : 'Guest'}</p>
                    </div>
                    <div className='font-semibold text-xl'>Our Community</div>
                </div>

                <div className='flex space-y-8 flex-col'>
                        <div className='flex flex-col bg-gradient-to-l from-magenta to-blue-500  text-white text-center rounded-lg p-3'>
                            <span className='font-bold text-3xl'>30,000</span>
                            <p className='text-xl font-semibold'>Member Family</p>
                        </div>
                        <span onClick={getLink}  className='cursor-pointer flex items-center'>
                            <p className='text-sm hover:text-indigo-600 font-light'>Explore Your Community</p>
                            <ArrowCircleRightIcon className='h-7 w-7 ml-1 '/>
                        </span>
                </div>
            </div>

        </div>
  )
}
