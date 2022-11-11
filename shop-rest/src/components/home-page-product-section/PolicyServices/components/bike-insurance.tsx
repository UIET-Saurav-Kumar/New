
import React from 'react';
import Image from 'next/image';
import  Link from 'next/link'
import { ROUTES } from "@utils/routes";

const inputFields = [

  'Name of Owner:',
 ' Vehicle Number:',
  'Date of Expiry of previous insurance:',
  'Insured Value (IDV):',
  
  ]


export default function BikeInsurance({view,click,width,height,label,...props } :any) {

  return (

    <Link href='/bike-insurance'>

       <div onClick={view}  
            className = {`${click ? 'border border-indigo-700 w-full cursor-pointer  shadow-lg rounded-lg text-center' : 'w-full cursor-pointer border rounded-lg text-center'  }
                         ${props.cn }`} >
        
          <Image 
            priority={true}   
            src='/insurance/biker.png' 
            layout='intrinsic'
            objectFit='contain'
            width={width}
            height={height}
            // className='shadow-2xl'
          />

        <br></br>

        <span className={`${click ? 'underline font-sans font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-600 to-blue-600 ' : null} text-sm text-gray-900`}>
          {label}
        </span>

      </div>
    </Link>

  )
}
