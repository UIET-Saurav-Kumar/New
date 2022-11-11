import React from 'react';
import Image from 'next/image';

export default function GuranteedReturns({view,click,width,height,label,...props}:any) {

  return (

    <div onClick={view} 
    className ={`text-center active:border-gray-400 w-full cursor-pointer border rounded-lg text-center' } ${props?.cn}`}>
        
           <Image priority={true} src='/insurance/returns.png' 
            layout='intrinsic'
            objectFit='contain'
            width={width}
            height={height}
           />

<br></br>
        <span className={`${click ? 'underline font-sans font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-600 to-blue-600 ' : null} text-sm text-gray-900`}>
          {label}
        </span>

    </div>

  )
}
