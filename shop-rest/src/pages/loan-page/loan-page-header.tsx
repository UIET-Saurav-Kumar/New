
import React from 'react';
import Logo from '@components/ui/logo'

export default function LoanPageHeader() {

    return (
       <>
            <div style={{ 
                    // objectFit: 'cover',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundColor:'#295939',
                    // backgroundImage: `url("https://o.remove.bg/downloads/7c9b17c4-7663-4a5c-a90d-340b2f535b4f/loan-background-removebg-preview.png")` 
                    // backgroundImage: `url("/loan-plant-bg.jpg")`
                    // https://image.freepik.com/free-vector/bank-loan-isometric-composition-with-icons-contract-credit-card-with-stationery-items-people-illustration_1284-62206.jpg
                  }}

                className='px-20 p-6 h-full bg-transparent flex items-center  justify-between'>

                <div className='flex'>
                    <Logo/>
                </div>

                <div className='hidden lg:flex text-white items-center space-x-6 justify-evenly'>
                    <h1>Any queries?</h1>
                    {/* <h1>87898-76292</h1> */}
                </div>
            </div>
       </>
    )
}
