import React from 'react'
import { useRouter } from "next/router";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUI } from "@contexts/ui.context";
import Image from 'next/image';

export default function UserUploadInvoiceCard() {

  const { openModal } = useModalAction();
  const router = useRouter();

  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  function getLink() {
		
    isAuthorize ? router.push('/user/upload-invoice/upload-form') :
     openModal("REGISTER")

}

  return (
      
    <div className=' flex-1 flex-col border hover:drop-shadow-2xl  lg:py-8 bg-white h-44 lg:h-full  rounded-lg p-2 px-3'>
        
        <div className='flex items-start space-x-4 h-full justify-evenly'>
        
        <div className='relative rounded-full pl-2 pt-2 bg-indigo-100 w-16 h-16 '>
            <Image src='/dashboard/photo.png' layout='fill' className='w-12 h-12' alt='money' />
          </div>
            <div className='flex flex-col text-lg w-auto md:w-36 xl:w-40 2xl:w-44 lg:text-2xl space-y-2 font-light text-gray-500'>
              <div className='flex flex-col h-28 space-y-2 '>
                  <h4 className='font-semibold text-lg sm:text-sm xl:text-lg  2xl:text-xl text-gray-800 '>
                          Upload Invoice
                  </h4>
                  <span className='text-xs h-28  w-44 md:w-auto text-gray-400'>
                      Upload Invoice/Bill and get  <span className='font-semibold'>5% </span>  
                      cashback <br/> upto ₹50 per bill 
                  </span>
              </div> 
              <div className=''>
                  <button onClick={getLink} className=' font-semibold text-lg lg:mt-8
                            bg-gradient-to-r from-green-500 to-blue-800 hover:from-green-700 hover:to-blue-900
                             text-white  px-5 lg:px-3 xl:px-7 py-1 lg:py-1 xl:py-2 rounded-lg'>
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
