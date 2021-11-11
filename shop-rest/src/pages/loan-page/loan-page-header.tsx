import React from 'react';
import Logo from '@components/ui/logo'

export default function LoanPageHeader() {

    return (
       <>
        <div className='px-20 p-6 bg-opacity-60 flex items-center shadow-xl justify-between'>
            <div className=' flex'>
                <Logo/>
            </div>

            <div className='hidden lg:flex items-center space-x-6 justify-evenly'>
                <h1>Any queries</h1>
                <h1>8789876-292</h1>
                <h1>Any queries</h1>
                <h1>Any queries</h1>
            </div>
        </div>
       </>
    )
}
