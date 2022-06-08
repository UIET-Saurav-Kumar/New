import React from 'react'
import { useRouter } from "next/router";
import { useModalAction } from "@components/ui/modal/modal.context";

export default function UserWithdrawnAmount({withdrawnAmount,isAuthorize}:any) {
 
  const { openModal } = useModalAction();
  const router = useRouter();

  function getLink() {
		
    isAuthorize ? router.push('/user/withdraws') :
     openModal("REGISTER")

}
  return (

    <div className='relative flex-1 flex-col  hover:drop-shadow-2xl  lg:py-8  bg-white h-44 lg:h-full  justify-center rounded-xl p-2 px-3'>
       
        <div className='flex items-start h-full  align-center space-x-4 justify-evenly'>

        <div className='relative rounded-full px-2  bg-blue-200 w-16 h-16 '>
           <img src='/dashboard/withdrawal.png' className='w-12 h-12' alt='money' />
        </div>
            
            <div className='text-xl w-auto  md:w-36 xl:w-40 2xl:w-48  font-light text-gray-500'>
                <h4 className='font-semibold text-lg sm:text-sm xl:text-lg 2xl:text-xl text-gray-800 '>
                        Withdrawn Amount
                </h4>
                <p className='text-lg sm:text-sm  lg:text-xl xl:text-2xl mt-4 font-light text-gray-600'>
                  {isAuthorize ? withdrawnAmount : '₹' + ' ' + '0.00'} 
                </p>
                <div className='flex flex-col h-28 space-y-1 '>
                    {/* <h4 className='font-semibold text-lg sm:text-sm  xl:text-2xl text-gray-800 '>
                          Invite Friends
                  </h4> */}
                  <span className='tracking-wide text-xs py-2 h-28 w-44 lg:w-auto text-gray-400'>
                       Amount transfered to your bank account 
                    
                        
                  </span>
                  <div className=''>
                 <button onClick={getLink} className=' font-semibold  bottom-2 absolute
                            bg-gradient-to-r from-gray-600 to-blue-500 hover:from-gray-500 hover:to-blue-700
                             text-white text-lg px-5 lg:px-4 xl:px-7 py-1 lg:py-1 xl:py-2 rounded-lg'>
                      Check
                  </button> 
                </div>
                </div>
                
            </div> 
                
        </div>
    </div>
  )
}