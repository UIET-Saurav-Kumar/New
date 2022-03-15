
import React from 'react';

import { womenImg } from '../salon-products';
import { menImg } from '../salon-products';
import { useRouter } from "next/router";

export default function SalonProductsCategories({btn, btn2}) {

    const router = useRouter();

    function handleCategory(img) {

      const { pathname , query } = router;
  
      const navigate = () =>
      
        // { width < 976 ?
        //   ( slug?.some(el => pageURL.includes(el)) ?   window.scrollTo(0, 150) : 
        //   window.scrollTo(0, 620) ) : 
        //   ( slug?.some(el => pageURL.includes(el)) ?   window.scrollTo(0, 570) :
        //   window.scrollTo(0, 550) )
        // };
  
        router.push(
          {
            pathname,
            query: { ...query, category: img.slug, text: null },
          },
          undefined,
          {
            scroll: false,
          }
          
        );
        navigate()
    }

    function goBack() {
      router.back();
    }




  return (

    <>

        <div className='flex bg-gray-50 py-0 lg:py-4 mt-0 lg:mt-10'>

            <div className ={` ${btn ? 'block' : 'hidden'} flex lg:justify-around  space-x-7 mx-1 scrollbar-hide overflow-x-scroll w-full mt-2 items-center`}>
                { menImg.map(img => 
                    <div onClick={(() => handleCategory(img))} className='flex cursor-pointer w-full flex-col'>
                            <img src={img.icon} className='w-10 h-10 object-cover lg:w-16 lg:h-16 mx-auto rounded'/>
                            <div className='text-10px lg:text-sm text-gray-800 font-semibold w-16 text-center mx-auto whitespace-normal'>
                                {img.name}
                            </div>
                    </div>
                        ) 
                }
            </div>

           
            <div className ={` ${btn2 ? 'block' : 'hidden'} flex lg:justify-around  space-x-10 mx-2 scrollbar-hide overflow-x-scroll w-full mt-2 items-center`}>
                { womenImg.map(img => 
                    <div onClick={(() => handleCategory(img))} className='flex cursor-pointer w-full flex-col'>
                            <img src={img.icon} className='w-10 h-10 object-cover lg:w-16 lg:h-16 mx-auto rounded'/>
                            <div className='text-xs lg:text-sm text-gray-800 font-semibold w-16 text-center mx-auto whitespace-normal'>
                                {img.name}
                            </div>
                    </div>
                        ) 
                }
            </div>

        </div>

    </>

  )
}
