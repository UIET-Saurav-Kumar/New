
import React from 'react';
import Image from 'next/image';


export default function MobileRecharge({view, width,height,label,click}:any) {

  console.log('clik',click);

  return (

    <div onClick={view}  className ={`${click ? 'border border-indigo-700 w-full cursor-pointer  shadow-lg rounded-lg text-center' : 'w-full cursor-pointer border rounded-lg text-center' }`}>
        
          <Image
            src='/bill-payment/mobile.jpeg' 
            layout='intrinsic'
            objectFit='contain'
            width={width}
            height={height}
          />

         <br></br>
         
        <span className={`${click ? 'underline font-semibold text-lg tracking-wide font-sans bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-600 to-blue-600 ' : null} text-sm text-gray-900`}>
          {label}
        </span>

    </div>

  )
}
