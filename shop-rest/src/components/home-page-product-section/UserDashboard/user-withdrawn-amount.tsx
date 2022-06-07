import React from 'react'

export default function UserWithdrawnAmount() {
  return (

    <div className='flex-1 flex-col hover:drop-shadow-2xl    bg-white h-44 lg:h-full  justify-center rounded-lg p-2 px-3'>
        <div className='flex items-start h-full  align-center space-x-4 justify-evenly'>
            <img src='/dashboard/withdrawal.png' className='w-16 h-16' alt='money' />
            
            <div className='text-xl  font-light text-gray-500'>
                <h4 className='font-semibold text-lg lg:text-xl xl:text-2xl text-gray-800 '>
                        Withdrawn Amount
                </h4>
                <p className='text-lg lg:text-xl xl:text-2xl mt-4 font-light text-gray-600'> ₹ 4000.00</p>
            </div> 
                
        </div>
    </div>
  )
}
