import React from 'react'

export default function UserCurrentBalance({currentBalance,isAuthorize}:any) {

  return (

    <div className='flex-1 flex-col hover:drop-shadow-2xl bg-white h-44 lg:h-full rounded-lg p-2 px-3'>
        <div className='flex items-start space-x-4 justify-evenly'>
           
            <img src='/dashboard/wallet.png' className='w-16 h-16' alt='money' />
            
            <div className='flex flex-col text-sm lg:text-xl  font-light text-gray-500'>
                <h4 className='font-semibold text-lg sm:text-sm xl:text-2xl text-gray-800 '>
                    Current Balance
                </h4>
                <p className='text-lg lg:text-xl xl:text-2xl text-gray-700 mt-4 font-light'>
                {isAuthorize ? currentBalance : '₹' + ' ' + '0.00'} 
                </p>
                <span className='text-xs py-2 h-28  text-gray-400'>
                          Available amount that you can    <br/>
                            can withdraw any time. <br/>
                          With <span className='font-semibold'> No service charges.</span> 
                </span>
            </div> 
                
        </div>
    </div>
  )
}
