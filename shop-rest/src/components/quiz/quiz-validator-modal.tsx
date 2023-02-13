import React from 'react'

export default function QuizValidatorModal() {


  return (



    <div className='flex flex-col justify-center items-center h-screen w-screen text-center lg:h-96 lg:w-96 bg-white'>

        <div className='lg:mt-60 flex flex-col space-y-4 mx-auto'>
            <span className='font-bold text-green-500 text-2xl'>
                Thank You
            </span>
            <span className='text-gray-800 font-semibold text-lg'>
                You have already participated in this contest
            </span>
            <span className=''>
                Stay tuned for more contest 
            </span>
        </div>
    </div>
  )
}
