import CartCounterButton from '@components/cart/cart-counter-button'
import { CaretDown } from '@components/icons/caret-down'
import { CaretUp } from '@components/icons/caret-up'
import { ArrowNarrowUpIcon } from '@heroicons/react/outline'
import React from 'react'

export default function UserTotalEarning() {

  return (

    <div className='flex-1 flex-col hover:drop-shadow-2xl w-full  bg-white h-44 lg:h-full  rounded-lg p-2 px-3'>

        <div className='flex items-start space-x-4  justify-evenly'>
            
            <img src='/dashboard/rupee.png' className='w-16 h-16' alt='money' />
            
            <div className='text-xl  font-light text-gray-500'>
                <div className='flex flex-col'>
                    <h4 className='font-semibold text-lg lg:text-xl xl:text-2xl text-gray-800 '>
                          Total Earning
                    </h4>
                    <p className='flex items-center text-lg lg:text-xl xl:text-2xl mt-4 font-light text-gray-600'>
                          ₹ 4000.00 <CaretUp className='h-4 w-4 ml-1 text-green-500'/>
                          
                          <span className='text-sm  ml-1 text-green-700'>4%</span>
                    </p>
                </div>
            </div> 
                
        </div>

        <div className='border text-center w-full'>
                <img src='/increase.png' 
                     className='ml-4 mt-2 w-8 h-8' 
                     alt='money' />
        </div>
       

    </div>
  )
}
