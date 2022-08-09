
import React from 'react';

import { womenImg } from '../salon-products';
import { menImg } from '../salon-products';
import { useRouter } from "next/router";

export default function SalonProductsCategories({btn, btn2}) {

    const router = useRouter();

    function handleCategory(img) {

      const { pathname , query } = router;

      // const slug = ['chandigarh-grocery-store', 'kosmetics-india'];
  
      const navigate = () =>
      window.scrollTo(0, img.offsetTop - 100);
  
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

        <div className='flex bg-gray-50 py-0 lg:py-0 mt-0  border-b border-1  border-gray-100 lg:mt-9'>

            <div className ={` ${btn ? 'block' : 'hidden'} flex lg:justify-around  space-x-7 mx-1 scrollbar-hide overflow-x-scroll w-full mt-2 items-center`}>
                { menImg.map(img => 
                    <div onClick={(() => handleCategory(img))} className='flex cursor-pointer w-full flex-col'>
                            <img src={img.icon} className='w-10 h-10 object-cover lg:w-10 lg:h-10 mx-auto rounded'/>
                            <div className='text-10px lg:text-sm text-gray-800 font-semibold w-16 h-10 text-center mx-auto whitespace-normal'>
                                {img.name}
                            </div>
                    </div>
                        ) 
                }
            </div>

           
            <div className ={` ${btn2 ? 'block' : 'hidden'} flex lg:justify-around  space-x-7 mx-1 scrollbar-hide overflow-x-scroll w-full mt-2 items-center`}>
                { womenImg.map(img => 
                    <div onClick={(() => handleCategory(img))} className='flex cursor-pointer w-full flex-col'>
                            <img src={img.icon} className='w-10 h-10 object-cover lg:w-10 lg:h-10 mx-auto rounded'/>
                            <div className='text-10px lg:text-sm text-gray-800 font-semibold w-16 h-10 text-center mx-auto whitespace-normal'>
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
