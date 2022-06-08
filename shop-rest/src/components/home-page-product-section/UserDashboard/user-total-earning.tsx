import CartCounterButton from '@components/cart/cart-counter-button'
import { CaretDown } from '@components/icons/caret-down'
import { CaretUp } from '@components/icons/caret-up'
import { ArrowNarrowUpIcon } from '@heroicons/react/outline'
import React from 'react'
import { useRouter } from "next/router";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUI } from "@contexts/ui.context";

export default function UserTotalEarning({totalEarnings}:any) {

  
  function relDiff(a, b) {
    return  100 * Math.abs( ( a - b ) / ( (a+b)/2 ) );
   }
   // example
   relDiff(11240, 11192)
   const { openModal } = useModalAction();
  const router = useRouter();

  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  function getLink() {
		
    isAuthorize ? router.push('/user/wallet') :
     openModal("REGISTER")

}

  return (

    <div className='relative flex-1 flex-col hover:drop-shadow-2xl w-full  bg-white h-44 lg:h-full  rounded-lg p-2 px-3'>

        <div className='flex items-start space-x-4  justify-evenly'>
            
            <img src='/dashboard/rupee.png' className='w-16 h-16' alt='money' />
            
            <div className='text-xl font-light text-gray-500'>
                <div className='flex flex-col'>
                    <h4 className='font-semibold text-lg md:text-sm  xl:text-2xl text-gray-800 '>
                          Total Earning
                    </h4>
                    <p className='flex items-center text-lg  xl:text-2xl mt-4 font-light text-gray-600'>
                          {isAuthorize ? totalEarnings : '₹' + ' ' + '0.00'} 
                          {/* <CaretUp className='h-4 w-4 ml-1 text-green-500'/> */}
                          
                          {/* <span className='text-xs  ml-1 text-green-700'>4%</span> */}
                    </p>
                    {/* <p className='flex items-center space-x-4 mt-3 text-xs font-light text-gray-400'>
                  last month <span className='ml-2 font-semibold text-xs text-gray-400'> ₹3,023.00</span>  
                </p> */}
                </div>
                <div className='flex items-center space-x-3 '>

<p className=' items-center space-x-2 text-sm font-light text-gray-500'>
  <span className='text-2xl mr-1'>🎉</span>Get<span className=' font-semibold text- '> FLAT 5%</span> <br/>
  <span className='pl-4'>on every order</span>
     {/* <span> cashback on every order your place</span> */}
</p>

{/* <span className='flex items-center text-gray-600 space-x-4 text-sm font-light '>₹ 3073.00
        <sup className='flex items-center'><CaretUp className='h-3 w-3 ml-1 text-green-400'/>
          <span className='flex items-center text-sm  ml-1 text-green-400'>
            2%
          </span>
        </sup>
</span> */}

</div>
            </div> 
                
        </div>

        <div className='flex flex-col items-center  justify-center space-x-5 mt-4  w-full'>
        {/* <p className='flex items-center space-x-4 text-sm font-light text-gray-500'>
                  Compared to last month <span className='ml-2 font-light text-gray-400'> ₹30223</span>  
                </p> */}
          <div className='flex items-center space-x-3'>
             {/* <div className='flex items-center space-x-3 '>

                <p className='flex items-center space-x-4 text-sm font-light text-gray-500'>
                  <span className='text-2xl'>🎉</span><span className=' font-semibold text-lg '> FLAT 5%</span> 
                     <span> cashback on every order your place</span>
                </p> */}

                {/* <span className='flex items-center text-gray-600 space-x-4 text-sm font-light '>₹ 3073.00
                        <sup className='flex items-center'><CaretUp className='h-3 w-3 ml-1 text-green-400'/>
                          <span className='flex items-center text-sm  ml-1 text-green-400'>
                            2%
                          </span>
                        </sup>
                </span> */}

              {/* </div> */}
          </div>

          <button onClick={getLink} className=' left-12 lg:left-6 xl:left-16 bottom-2 absolute bg-gradient-to-r from-blue-300 to-blue-600 px-3 
          hover:from-blue-500 hover:to-blue-800
                     text-white font-semibold lg:px-4 xl:px-7 py-1 lg:py-2 xl:py-2 rounded-lg shadow-md'>
            View
          </button>
                {/* <img src='/increase.png' 
                     className='  mt-2 w-8 h-8' 
                     alt='money' /> */}
        </div>
       

    </div>
  )
}
