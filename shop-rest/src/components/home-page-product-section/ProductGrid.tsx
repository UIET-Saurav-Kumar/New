import React from 'react';
import Image from 'next/image';
import { useOfferQuery } from "@data/home/use-offer-query";



import { useRouter } from "next/router";
import { useFeatureProductQuery } from "@data/home/use-feature-product-query";
import { siteSettings } from "@settings/site.settings";
import { motion } from "framer-motion";
import { useLocation } from "@contexts/location/location.context";
import renderProductCard from "@components/product/home-product-card";

export default function ProductGrid() {
    const { query } = useRouter();
    const { type } = query;
    const {getLocation} =useLocation()

    const {
        data,
        isLoading: loading,
        error,
    } = useOfferQuery({
        limit: 10 as number,
        search:"",
        location : ((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any
    });


    return (
      <>
       <div id='offer-of-the-day' className=' flex flex-col mt-8 border-b rounded-t shadow-lg bg-gray-50 p-4  '>
        <div className='flex justify-between '>
            <h3 className='font-bold text-xs sm:text-md md:text-md  xl:text-xl  '> 
                Offers of the Day
            </h3>
            <h3 className='font-blue hover:underline cursor-pointer' > view all </h3>
        </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
                                      
                                 
            {data?.offers.data?.map((product) => (

                <>    
                    <motion.div key={product.id}>
                        {renderProductCard(product)}
                    </motion.div>
                </> 
            ))}

        </div>
   </>

        
    )
}

// customerId,
// app_logo,
// app_name(
//      Feed banners(
//         Listed Categories,
//         Featured shops near by, Get major discount on major e-stores,offers of the day,
//         featured products
//     )
//     categoryimage withId and name
// )	
