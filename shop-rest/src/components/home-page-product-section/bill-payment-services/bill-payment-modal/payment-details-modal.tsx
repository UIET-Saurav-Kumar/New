import Button from '@components/ui/button';
import React from 'react';


export default function PaymentDetailsModal({data}:any) {
  

    console.log('data',data)

  return (

        <div style={{'width':'600px','height':'600px'}} 
        className='flex flex-col bg-white rounded  p-4'>

            <div className='flex items-start  justify-between'>
                <div className='text-sm space-y-2'>
                    <h2 className='font-semibold text-lg'>1 Bill found</h2>
                    {data?.para?.map((p:any)=>
                        <p className='font-light text-gray-600'><span>{p?.key1} - </span>{p?.para1}</p>
                    )}
                    <p className='font-light text-xs text-gray-600'>{data?.operator}</p>
                    <p className='font-light text-xs text-gray-600'>{data?.data?.accountHolderName}</p>

                </div>

                <div className='flex  '>

                    <img src='/bill-payment/bbps.png' className='h-20 w-20   object-contain'  />

                </div>
            </div>

            <div className='flex flex-col mt-10 mx-10 lg:mx-20'>

                <div className='flex flex-col space-y-4'>

                    <div className='flex items-center justify-between text-sm text-gray-700'>

                        <p className='text-sm text-gray-500 '>
                            Bill Date
                        </p>

                        <p className=' '>
                        {data?.data?.billDate.split("-").reverse().join("-")}
                        </p>

                    </div>

                    <div className='flex items-center justify-between text-sm text-gray-700'>

                        <p className='text-sm text-gray-500 '>
                            Due Date
                        </p>

                        <p className=' '>
                        {data?.data?.dueDate.split("-").reverse().join("-")}
                        </p>

                    </div>

                    <div className='flex items-center justify-between text-sm text-gray-700'>

                        <p className='text-sm text-gray-500 '>
                            Bill Amount
                        </p>

                        <p className=' '>
                        ₹{data?.data?.amount}.00
                        </p>

                    </div>

                </div>

                <div className='flex flex-col space-y-8 mt-10'>

                    <div className='flex items-center bg-gray-100 p-4 justify-between text-sm text-gray-700'>

                        <p className='text-sm text-gray-700 font-semibold '>
                            Total
                        </p>

                        <p className=' '>
                        ₹{data?.data?.amount}.00
                        </p>

                         

                    </div>

                    <Button className='w-60 mx-auto'>
                            Continue
                    </Button>

                </div>

            </div>
        

        </div>

  )
}
