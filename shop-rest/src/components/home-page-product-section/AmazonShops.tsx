


import Link from 'next/link';

import { siteSettings } from "@settings/site.settings";

// import { ArrowNext, ArrowPrev } from "@components/icons";
// import SwiperCore, { Navigation } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.css";

// import Truncate from "@components/ui/truncate-scroll";
// { title, swiperNext, swiperPrev }

export default function AmazonShops() {

    const truncate = (str:any, n:any) => {
           
        return str.length > n ? str.substring(0, n-1) + '...' : str;
    }

  


    return (  
        <div className='hidden'>

            <div id='ecommerce-store' className=' flex flex-col mt-8 border-b rounded-t pb-4 bg-gray-50'>

                <div className='flex justify-between  p-2 px-4'>
                    
                        <h3 className='text-lg sm:text-lg md:text-lg xl:text-2xl  font-semibold  p-2 '> 
                           Get Additional Discounts on Major E-Stores
                        </h3>

                        {/* <Link href='/restraunt-shop-page'> */}

                           {/* <h3 className='font-blue text-sm sm:text-sm md:text-md 2xl:text-md  hover:underline cursor-pointer font-light text-blue-600 ' >
                                view all 
                           </h3> */}

                        {/* </Link> */}

                </div>
                </div>
       
                <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-2 gap-2
                                      lg:place-items-center 2xl:gap-2 2xl:grid-cols-4
                                      mt-0 px-2 lg:px-4 bg-gray-100 p-4 ' >

                                         {/* <h2> Features Shops in Chandigarh</h2> */}
                                         
                               {siteSettings.amazonShops.map((products, _idx) => (

                                      <a href={products.href} target="_blank" 
                                         className=' font-light  text-xs  md:text-md lg:text-md 2xl:text-md '  key={_idx}>

                                            

                                                {/* <div className='flex justify-evenly items-center h-48  sm:h-52 lg:flex max-w-30 md:max-w-96 md:h-34 lg:max-w-600 lg:h-48 2xl:h-48  lg+:max-w-600 lg+:h-44 xl+:max-w-600 xl++:h-48 xl++:max-w-500 2xl:max-w-500 3xl:max-w-800 xl:justify-center 2xl:items-center border p-4 md:p-2 
								                                bg-white rounded-md md:px-3 lg:px-1 px-0 cursor-pointer hover:border-gray-400 '  */}
                                                                <div className=' rounded  w-auto h-48 md++:h-60 lg:w-56 lg:h-48 lg+:w-auto lg+:h-52 border border-gray-200 hover:border-gray-400 sm:max bg-white flex justify-evenly py-4 px-2  sm:px-16 md:px-8 
                                                                               lg:px-0 lg:justify-evenly xl:px-8 items-center '
						                                             key={products.label} 
                                                                >
               
                                                         {/* <img className='rounded-0 w-16 h-20 xs+:w-20 xs+:h-20 xs++:w-24 xs++:h-24 sm:w-24 
                                                                sm:h-24 md:w-20 lg:w-34 lg:h-32 xl+:w-36 2xl:w-38 2xl:h-38'  */}
                                                                <img className=' w-16 h-16 xs++:w-16 xs++:h-16 xs+++:w-20 xs+++:h-20 sm:w-20 sm:h-20 
                                                                                    md:w-28 md:h-28 ml-2  lg:w-36 lg:h-36 lg+:w-32 lg+:h-28 xl+:w-32 xl+:h-32 xl++:w-32 
                                                                                    xl++:h-32 2xl:w-32 2xl:h-32 object-fill '  
                                                                src ={products.image} />

                                                    <div className='flex flex-col justify-center w-20 md-w-24 lg:w-32 2xl:w-64 2xl:h-40 space-y-1 pl-2 md:pl-3 lg:pl-4 2xl:pl-4 '>
                                                        <h3 className='w-10 font-semibold text-10px  md:text-sm lg:text-sm 2xl:text-lg  '> {products.label} </h3>
                                                        <h3 className=' font-light text-gray-600 text-10px md:text-10px lg:text-10px 2xl:text-sm  ' > {truncate(`${products.offers}`,23)} additional cashback </h3>
                                                        <a href={products.href} target="_blank" className=' font-light text-blue-600 text-xs  md:text-md lg:text-md 2xl:text-10px ' > Shop Now</a>
                                                    </div>
                                        
                                            </div>
                                     </a>
                            ))}
                    </div>

               </div>
                   
    )
}
