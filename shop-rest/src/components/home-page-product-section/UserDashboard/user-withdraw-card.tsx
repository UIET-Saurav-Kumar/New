import React from 'react'

export default function UserWithdrawCard() {

  return (

    <div className='flex-1 flex-col h-44 lg:h-full  hover:drop-shadow-2xl  
                    bg-white rounded-lg p-2 px-3'>
        
        <div className='flex items-start  space-x-4 justify-evenly'>
            
            {/* <div className='w-20'> */}
              <img src='/dashboard/money-withdrawal.png' className='w-16 h-16' alt='money' />
            {/* </div> */}
            
            <div className=' flex flex-col text-xl  font-light text-gray-500'>
            <div className='flex flex-col  h-28 space-y-1 '>
                <h4 className='font-semibold text-lg lg:text-xl xl:text-2xl text-gray-800 '>
                       Request Withdraw
                </h4>
                <span className='text-sm py-2 h-28 w-44 text-gray-400'>
                    Earn <span className='font-semibold'>FLAT 5% </span>  
                    cashback <br/> upto ₹50 per bill 
                </span>
                </div>

                <div className=''>
                  <button className=' font-semibold 
                            bg-gradient-to-r from-green-500 to-green-800
                             text-white  px-5 lg:px-7 py-1 lg:py-3 rounded-xl'>
                      Request
                  </button>
                </div>

            </div> 
            
                
        </div>

    </div>
  )
}
