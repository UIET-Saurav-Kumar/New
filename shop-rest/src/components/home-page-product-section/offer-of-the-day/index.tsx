import React from 'react';
import Image from 'next/image';
import { useOfferQuery } from "@data/home/use-offer-query";



import { useRouter } from "next/router";
import { useFeatureProductQuery } from "@data/home/use-feature-product-query";
import { siteSettings } from "@settings/site.settings";
import { motion } from "framer-motion";
import { useLocation } from "@contexts/location/location.context";
import renderProductCard from "@components/product/home-product-card";
import Neon from '@components/product/product-card/neon';
import Neon2 from '@components/product/product-card/neon2';
import Link from 'next/link';

export default function OfferOfTheDay() {
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
       <div id='offer-of-the-day' className={`${data?.offers.data?.length  ? 'block' : 'hidden'} flex flex-col mt-8 border-b rounded-t shadow-lg  p-4 `}>
        <div className='flex justify-between items-center'>
            <h3 className='text-lg sm:text-lg md:text-lg xl:text-2xl  font-semibold  p-2  '> 
                Offers of the Day
            </h3>
            <Link href='/offer-of-the-day'><span className='text-sm lg:text-lg font-semibold text-green-700 hover:underline cursor-pointer'>
                See all
            </span></Link>
           
        </div>
        </div>

        <div className={`${data?.offers.data?.length  ? 'block' : 'hidden'} grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2`}>
                                      
                                 
           {/* // filter products with status publish */}
              {
              data?.offers.data.filter(product => product?.status === 'publish')
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                //displacy only 10 products
                .slice(0, 10)
              .map(product => (
                <motion.div key={product.id}>
                 <Neon2 product={product} />
                </motion.div>
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
