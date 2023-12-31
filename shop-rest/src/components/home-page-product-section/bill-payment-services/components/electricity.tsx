import Image from 'next/image'
import React from 'react'

export default function Bills({ view,click,width,height,label}:any) {

  return (

    <div onClick={view}  className ={`${click ? 'border border-indigo-700 w-full cursor-pointer  shadow-lg rounded-lg text-center' : 'w-full cursor-pointer border rounded-lg text-center' }`}>

        <Image priority={true} src='/bill-payment/light.jpeg' 
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
