import React from 'react'
import { useRouter } from "next/router";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUI } from "@contexts/ui.context";


export default function UserWithdrawCard({currentBalance}:any) {
  const { openModal } = useModalAction();
  const router = useRouter();

  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  function getLink() {
		
    isAuthorize ? router.push('/user/withdraws/create') :
     openModal("REGISTER")

}
  return (

    <div className='flex-1 flex-col h-44 lg:h-full  hover:drop-shadow-2xl  
                    bg-white rounded-lg p-2 px-3'>
        
        <div className='flex items-start  space-x-4 justify-evenly'>
            
            {/* <div className='w-20'> */}
              <img src='/dashboard/money-withdrawal.png' className='w-16 h-16' alt='money' />
            {/* </div> */}
            
            <div className=' flex flex-col text-xl  font-light text-gray-500'>
                <div className='flex flex-col  h-28 w-44 md:w-auto space-y-1 '>
                      <h4 className='font-semibold text-lg sm:text-sm   xl:text-2xl text-gray-800 '>
                            Request Withdraw
                      </h4>
                      <span className='text-xs py-2 h-28  text-gray-400'>
                          Get instant amount in your bank account <br/>
                          With <span className='font-semibold'>zero commission</span> charges<br/>
                          Available : <span className='font-semibold text-lg '>{isAuthorize ? currentBalance : '₹' + ' ' + '0.00'}</span>
                      </span>
                  </div>

                  <div className=''>
                    <button onClick={getLink} className=' font-semibold drop-shadow-lg
                              bg-gradient-to-r from-green-400 to-green-800 hover:from-green-600 hover:to-green-600 
                              text-white  text-lg px-3 lg:px-3 xl:px-7 py-1 lg:py-1 xl:py-2 rounded-lg'>
                        Request
                    </button>
                  </div>
            </div> 
            
                
        </div>

    </div>
  )
}
