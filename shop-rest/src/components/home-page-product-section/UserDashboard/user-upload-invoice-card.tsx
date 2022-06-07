import React from 'react'

export default function UserUploadInvoiceCard() {

  return (
      
    <div className=' flex-1 flex-col border hover:drop-shadow-2xl  bg-white h-44 lg:h-full  rounded-lg p-2 px-3'>
        
        <div className='flex items-start space-x-4 h-full justify-evenly'>
        
          <div className='w-20'>
            <img src='/dashboard/photo.png' className='w-16 h-16' alt='money' />
          </div>
            <div className='flex flex-col text-lg lg:text-2xl space-y-2 font-light text-gray-500'>
              <div className='flex flex-col h-28 space-y-1 '>
                  <h4 className='font-semibold text-lg lg:text-xl xl:text-2xl text-gray-800 '>
                          Upload Invoice
                  </h4>
                  <span className='text-sm h-28 text-gray-400'>
                      Upload Invoice/Bill and get <br/> <span className='font-semibold'>5% </span>  
                      cashback <br/> upto ₹50 per bill 
                  </span>
              </div> 
              <div className=''>
                  <button className=' font-semibold 
                            bg-gradient-to-r from-green-500 to-blue-800
                             text-white  px-5 lg:px-7 py-1 lg:py-3 rounded-xl'>
                      Upload
                  </button>
                </div>
            </div>
               
                
        </div>

     

        {/* <p className='absolute bottom-0 text-blue-600 text-sm left-5 '>
          Terms & Conditions</p> */}
    </div>
  )
}
