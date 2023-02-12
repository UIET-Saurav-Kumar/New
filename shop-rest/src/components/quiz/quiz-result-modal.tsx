import React from 'react'

export default function QuizResultModal({data}:any) {

  console.log('result',data?.data?.right_answers)

  let right = data?.data?.right_answers;
  return (


    <div className='h-screen w-screen my-auto bg-white'>

    <div className="bg-white p-8 rounded-lg">
            <div className="flex items-center justify-center">
            {right == 5 ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18.707 5.293a1 1 0 00-1.414-1.414L8 13.586 4.707 10.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l10-10z" clipRule="evenodd" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6a1 1 0 012 0v6a1 1 0 11-2 0V6zm0 8a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" />
                </svg>
            )}
            </div>
            <h2 className="text-xl font-bold mt-4 text-center">{right == 5 ? 'Congratulations!' : 'Better Luck Next Time!'}</h2>
            <p className="text-gray-700 mt-4 text-center">{right == 5 ? 'You are eligible for lucky draw.' : 'Thank you for participating.'}</p>
        </div>
        </div>
  )
}
