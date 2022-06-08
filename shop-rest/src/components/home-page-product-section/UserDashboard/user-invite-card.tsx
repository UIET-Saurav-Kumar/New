import React from 'react'
import { useRouter } from "next/router";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUI } from "@contexts/ui.context";

export default function UserInviteCard() {
  const { openModal } = useModalAction();
  const router = useRouter();

  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  function getLink() {
		
    isAuthorize ? router.push('/user/invite') :
     openModal("REGISTER")

}

  return (

    <div className=' flex-1 flex-col hover:drop-shadow-2xl  lg:py-8 bg-white h-44 lg:h-full rounded-lg p-2 px-3'>
        
        <div className='flex items-start space-x-4  justify-evenly'>
          
          {/* <div className='w-20'> */}
          <div className='relative rounded-full px-2 pt-1 bg--800  '>
            <img src='/dashboard/add-friend.png' className='w-16 h-16 ' alt='money' />
            </div>
          {/* </div> */}

            <div className='flex flex-col w-auto md:w-36 xl:w-44 2xl:w-48 text-lg space-y-2 font-light text-gray-500'>
                <div className='flex flex-col h-28 space-y-1 '>
                    <h4 className='font-semibold text-lg sm:text-sm xl:text-lg 2xl:text-xl text-gray-800 '>
                          Invite Friends
                  </h4>
                  <span className='text-xs py-2 h-28 w-44  lg:w-auto text-gray-400'>
                      Get   <span className='font-semibold'>₹10 cashback </span>  
                        per user  registered with you  
                        and see your network
                        
                  </span>
                </div>

                <div className=''>
                  <button onClick={getLink} className=' font-semibold lg:mt-8
                            bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-600 hover:to-red-600
                             text-white text-lg px-5 lg:px-5 xl:px-7 py-1 lg:py-1 xl:py-2 rounded-lg'>
                      Invite
                  </button>
                </div>
            </div> 
                
        </div>

       
       

    </div>
  )
}