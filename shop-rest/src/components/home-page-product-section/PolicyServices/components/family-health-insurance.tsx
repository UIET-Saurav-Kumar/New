import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FamilyHealthInsurance({view,click,width,height,label,...props}:any) {

  return (

    <Link href='/family-health-insurance'>
    <div onClick={view}  
    className ={`text-center active:border-gray-400 w-full cursor-pointer border rounded-lg text-center' } ${props?.cn}`}>
        
           <Image priority={true} src='/insurance/family.png' 
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
    </Link>

  )
}
