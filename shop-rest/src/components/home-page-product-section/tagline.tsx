import Image from 'next/image'
import React from 'react'

export default function Tagline() {
    
  return (

    <div className='w-full mt-4 flex justify-center'>
        <Image 
        height={50}
        width={731}
        layout='intrinsic'
        objectFit='cover'
        priority={true}
        src='/tagline.png' 
        className='mx-auto'
        />
    </div>
  )
}
