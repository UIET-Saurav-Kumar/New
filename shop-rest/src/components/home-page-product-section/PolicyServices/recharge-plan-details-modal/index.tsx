import React from 'react'

export default function RechargePlanDetails({operatorName,circleName})  {

  return (

    <div className='flex space-y-6 flex-col  rounded-md  w-80 p-5  h-full bg-white'>

        <div className=' space-y-8 flex flex-col w-full'>
            <span className='text-gray-800 font-semibold text-lg'>
             Confirm Recharge
            </span>

            <div className='space-y-4 text-xs font-light flex flex-col text-gray-600'>
                <span className='flex items-center justify-between'>
                    <p className=''>
                        Mobile Number
                    </p>
                    <p>
                       {'phoneNumber'}
                    </p>
 
                </span>
                <span className='flex items-center justify-between'>
                    <p className=''>
                        Operator/Circle
                    </p>
                    <p>
                       {'operatorName'} | {circleName}
                    </p>
                </span>
                <span className='flex items-center justify-between'>
                    <p className=''>
                        Plan
                    </p>
                    <p>
                       {'operatorName'} | {'plan?.group_name'}
                    </p>
                </span>
                <span className='flex items-center justify-between'>
                    <p className=''>
                        Validity
                    </p>
                    <p>
                       {'plan?.validity'}
                    </p>
                </span>
                <span className='flex flex-col font-light'>
                    <p className=''>
                        Plan description
                    </p>
                    <p>
                       {'plan?.description'}
                    </p>
                </span>
                <span className='flex items-center justify-between font-light  '>
                    <p className=''>
                        Amount
                    </p>
                    <p>
                    ₹{'plan?.price'}
                    </p>
                </span>
            </div>

        </div>

        <div className='w-full p-4 font-sans text-gray-800 rounded flex items-center justify-between bg-gray-200'>
                <span className=' '>
                    Total Amount
                </span>
                <span className=''>
                ₹{'plan?.price'}
                </span>
        </div>

        {/* <div className=''>
             Pay Now
        </div> */}

        <button className='bg-blue-500 px-6 rounded p-2 mx-auto text-white'>
                 Pay Now
        </button>

    </div>
  )
}
