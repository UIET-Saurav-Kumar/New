import React from 'react'

export default function UserInviteCard() {

  return (

    <div className=' flex-1 flex-col hover:drop-shadow-2xl  bg-white h-44 lg:h-full rounded-lg p-2 px-3'>
        
        <div className='flex items-start space-x-4 justify-evenly'>
          
          {/* <div className='w-20'> */}
            <img src='/dashboard/invitation.png' className='w-16 h-16' alt='money' />
          {/* </div> */}

            <div className='flex flex-col text-lg space-y-2 font-light text-gray-500'>
                <div className='flex flex-col h-28 space-y-1 '>
                    <h4 className='font-semibold text-lg lg:text-xl xl:text-2xl text-gray-800 '>
                          Invite Friends
                  </h4>
                  <span className='text-sm py-2 h-28 w-44 lg:w-auto text-gray-400'>
                      Get   <span className='font-semibold'>₹10 cashback </span>  
                        per user <br/> registered with you and <br/>
                        
                  </span>
                </div>

                <div className=''>
                  <button className=' font-semibold 
                            bg-gradient-to-r from-red-500 to-yellow-500
                             text-white  px-5 lg:px-7 py-1 lg:py-3 rounded-xl'>
                      Invite
                  </button>
                </div>
            </div> 
                
        </div>

       
       

    </div>
  )
}
