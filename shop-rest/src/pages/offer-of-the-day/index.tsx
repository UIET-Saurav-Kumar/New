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
import DefaultLayout from '@components/layout/default-layout';
import Head from 'next/head';
import CartCounterButton from '@components/cart/cart-counter-button';
import MobileNavigation from '@components/layout/mobile-navigation';
import { useWindowSize } from 'react-use';

export default function Offers() {
    const { query } = useRouter();
    const { type } = query;
    const {getLocation} =useLocation()
    const { width } = useWindowSize();

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

      
      <Head>
        <title>Offers of the Day</title>
        <meta name="description" content="Get Best Offers available in chandigarh tri city" />
        <meta name="keywords" content="Offers of the Day" />
        <meta name="author" content="Chandigarh Tri City" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="1 days" />
        <meta name="language" content="English" />
        <meta name="geo.placename" content="Chandigarh Panchkula Mohali " />
        <meta name="geo.position" content="30.7333,76.7794" />
        <meta name="geo.region" content="India" />
        <meta name="ICBM" content="30.7333,76.7794" />
        <meta name="DC.title" content="Offers of the Day" />
        <meta name="DC.subject" content="Offers of the Day" />
        <meta name="DC.creator" content="Chandigarh Tri City" />
        <meta name="DC.description" content="Get Best Offers available in chandigarh tri city" />
        <meta name="DC.publisher" content="Chandigarh Tri City" />
        <meta name="DC.type" content="website" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content="https://www.buylowcal.com/offers-of-the-day" />
        <meta name="DC.language" content="en" />
        <meta name="DC.coverage" content="World" />
        <meta name="DC.rights" content="Copyright 2020 buylowcal" />
        <meta name="DC.relation" content="https://www.buylowcal.com/offers-of-the-day" />
        <meta name="DC.coverage" content="World" />
       
      </Head>
       {/* <div id='offer-of-the-day' className={`${data?.offers.data?.length  ? 'block' : 'hidden'} flex flex-col mt-8 border-b rounded-t shadow-lg  p-4 `}>
        <div className='flex justify-between items-center'>
            <h3 className='text-lg sm:text-lg md:text-lg xl:text-2xl  font-semibold  p-2  '> 
                Offers of the Day
            </h3>
            <Link href=''><span className='text-sm lg:text-lg font-semibold text-green-700 hover:underline cursor-pointer'>
                See all
            </span></Link>
           
        </div>
        </div> */}

        <div className={`${data?.offers.data?.length  ? 'block' : 'hidden'} grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2`}>
                                      
                                 
           {/* // filter products with status publish */}
              {
              data?.offers.data.filter(product => product?.status === 'publish')
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                //displacy only 10 products
                 
              .map(product => (
                <motion.div key={product.id}>
                 <Neon2 product={product} />
                </motion.div>
                ))}

        </div>

        {
          width > 1023 && 
          <CartCounterButton />
       }
        {
          width < 1023 && 
            <MobileNavigation />
        } 
   </>

        
    )
}

Offers.Layout = DefaultLayout;

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


// fast loading using ssr 
// export async function getStaticProps() {
//     const {getLocation} =useLocation()
//     const data = await useOfferQuery({
        
//         limit: 10 as number,
//         search:"",
//         location : ((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any
//     });
//     return {
//         props: {
//             data
//         },
//         refresh: 1
//     }
// }


