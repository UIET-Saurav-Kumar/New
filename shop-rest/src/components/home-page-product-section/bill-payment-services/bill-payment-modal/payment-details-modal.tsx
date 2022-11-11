import React from 'react';


export default function PaymentDetailsModal({}) {


  return (

        <div style={{'width':'600px','height':'600px'}} 
        className='flex flex-col bg-white rounded  p-4'>

            <div className='flex items-center justify-between'>
                <div className='text-sm'>
                    <h2 className='font-semibold text-lg'>No Bills found</h2>
                    <p className='font-light text-gray-600'><span>Account No- </span>30586511</p>
                    <p className='font-light text-xs text-gray-600'>Punjab State Power Corporation Ltd (PSPCL)</p>
                </div>

                <div className=''>

                    <img src='/bill-payment/bbps.png' className='h-28 w-28 object-contain'  />

                </div>
            </div>
        

        </div>

  )
}
