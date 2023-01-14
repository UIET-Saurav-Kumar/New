
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
import OfferCard from '@components/product/product-card/offer-card';
import { useBrandOfferQuery } from '@data/home/use-brand-offer-query';


export default function BrandOffers() {

    const { query } = useRouter();
    const { type } = query;
    const {getLocation} =useLocation();

    const {
        data,
        isLoading: loading,
        error,
    } = useBrandOfferQuery({
        limit: 10 as number,
        // is_brand_offer: 1,
        search:"",
        location : ((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any
    });

    console.log('brand_offers', data?.brand_offers.data?.data?.filter((product:any) => product?.status === 'publish'));

    // console.log('filter brand offers', data?.brand_offers?.data?.data?.map(item => item.shop.name))

 
    return (

        <>
            <div id='brand-offer' className={`${data?.brand_offers?.data?.data?.length  ? 'block' : 'hidden'} flex flex-col  border-b rounded-t shadow-lg  p-4 `}>
                <div className='flex justify-between items-center'>
                    <h3 className='text-lg sm:text-lg md:text-lg xl:text-2xl  font-semibold'> 
                        In store offers
                    </h3>
                    <Link href='/top-brands-walkin-store-offers'><span className='text-sm lg:text-lg font-semibold text-green-700 hover:underline cursor-pointer'>
                        See all 
                    </span></Link>
                </div>
            </div>

            <div className={`${data?.brand_offers?.data?.data?.length  ? 'block' : 'hidden'} relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2`}>
                 {data?.brand_offers.data?.data?.filter((product:any) => product?.status === 'publish' 
                 || product?.is_featured === 1 
                 || product?.is_offer == 1
                 )
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    // .slice(0, 30)
                    .map(product => (
                    <motion.div key={product.id}>
                      <OfferCard product={product} productSlug={product.slug} />
                    </motion.div>
                    ))}
                {/* <Link href='/top-brands-walkin-store-offers'><span className='absolute right-0 bottom-0 h-10  font-semibold text-blue-600 cursor-pointer hover:text-blue-700'>see more>> </span></Link>  */}
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
