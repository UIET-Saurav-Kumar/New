import React from 'react'

export default function ProductDescriptionModal({data}:any) {
    console.log('data',data)
  return (

    <div className='h-screen w-screen p-4 lg:w-full lg:h-full lg:p-4 lg:py-20 bg-white'> 

    {/* <Element> */}
    <p className='whitespace-pre-line mt-60 lg:ml-20 lg:mt-10 text-gray-900 leading-7 text-sm lg:text-lg'>{data}</p> 
    {/* </Element>  */}
    
    </div>
  )
}
