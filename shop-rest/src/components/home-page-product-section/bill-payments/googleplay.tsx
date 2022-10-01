
import React from 'react';
import Image from 'next/image';


export default function GooglePlay({click,view,width,height,label}:any) {

  console.log('dth view',view);

  return (

        <div onClick={view}  className ='w-full cursor-pointer border rounded-lg text-center'>
            
            <Image  src='/bill-payment/googleplay.jpeg' 
              layout='intrinsic'
              objectFit='contain'
              width={width}
              height={height}
              className=''
            />

            <br></br>

            <span className={`${click ? 'underline border font-sans font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-600 to-blue-600 ' : null} text-sm text-gray-900 `}>
              {label}
            </span>

        </div>

  )
}
