
export default function WebShopBanner() {

    return (

        <div  className='no-scrollbar flex justify-between space-x-2 w-full h-34   mt-4  overflow-x-scroll'>

            <div className=' flex justify-center items-center rounded-lg space-x-16  lg:px-2 px-2 w-full h-28 lg:h-36 xl:h-42 bg-red-500 '>
                    <img src='/rupee.png' className='object-contain h-20 w-20 lg:h-28 lg:w-28'/>
                    <h1 className='lg:text-sm xl:text-xl font-semibold text-center w-52  text-white'>Additional Cash Earnings On Every Purchase</h1>
                    
            </div>

            <div className=' flex justify-center items-center rounded-lg space-x-16  lg:px-2 px-2 w-full h-28 lg:h-36 xl:h-42 bg-yellow-500 '>
                    <img src='/delivery.png' className='object-contain h-20 w-20 lg:h-28 lg:w-28'/>
                    <h1 className='lg:text-sm xl:text-xl font-semibold text-center w-52  text-white'>Fast Deliveries</h1>
            </div>

            <div className=' flex justify-center items-center rounded-lg space-x-16  lg:px-2 px-2 w-full h-28 lg:h-36 xl:h-42 bg-green-500 '>
                    <img src='/product.png' className='object-contain h-20 w-20 lg:h-28 lg:w-28'/>
                    <h1 className='lg:text-sm xl:text-xl font-semibold text-center w-52  text-white'> Quality Products & Assured Services </h1>
            </div>

            
            
        </div>
    )
}
