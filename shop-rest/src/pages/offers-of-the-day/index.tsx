import React, { useEffect, useRef } from 'react';
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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useIntersectionObserver from '@components/product/useIntersectionObserver';
import GlobalSearchLayout from '@components/layout/global-search-layout';
import Layout from '@components/layout/layout';
  

export const getStaticProps = async ({ locale }: any) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  };

export default function Offers() {

    const { query } = useRouter();
    const { type } = query;
    const {getLocation} =useLocation()
    const { width } = useWindowSize();
    const [category, setCategory] = React.useState('All');

    useEffect(() => {
      scrollTo(0, 0);
    }, []);
 

    const {
        data,
        isLoading: loading,
        error,
    } = useOfferQuery({
        limit: 10 as number,
        search:"",
        location : ((getLocation?.formattedAddress)?JSON.stringify(getLocation) : null ) as any
    });

    const offer_of_the_day = useRef();
    const [header, setHeader] = React.useState(false);

  // useIntersectionObserver({
  //       target: offer_of_the_day,
  //       onIntersect:  () => {
  //           setHeader(true);
  //           },
  //       enabled: header,
  // })

  console.log('offers',data)
  // filter and get shop categories of offers 
  
  const variable = 'Restrauntsname Takeawaysid';

  const shopCategories = data?.offers?.data.filter(product => product?.shop?.shop_categories?.length > 0).map(product => product?.shop.shop_categories.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','').replace(/Restrauntsname|Takeawaysid/g, '')
  ).filter((v, i, a) => a.indexOf(v) === i) 

  //remove name and id from variable
  const variable2 =() => {
    // desired result would be restraunt takeaways
    return variable.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','').replace(/Restrauntsname|Takeawaysid/g, '')
  }
    // return  variable.replace(/Restrauntsname|Takeawaysid/g, '');}
  console.log('variable2',variable2());


  console.log('shopCategories',(shopCategories))

    return (

      <div className='h-full'>

        <Head>
          <title>Offers of the Day</title>
          <meta name="description" content="Get Best Offers today 2022" />
          <meta name="keywords" content="Best deals today, Best salon deals in tricity, Best Offers, Offers of the Day, Offers of the Day 2022" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Salon" />
          <meta name="revised" content="Salon" />
          <meta name="generator" content="Salon" />
          <meta name="copyright" content="Salon" />
          <meta name="rating" content="General" />
          <meta name="expires" content="never" />
          <meta name="distribution" content="global" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="HandheldFriendly" content="true" />
          <meta name="MobileOptimized" content="320" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style " content="black" />
          <meta name="apple-mobile-web-app-title" content="Salon" />
        </Head>

       {/* <div id='offer-of-the-day' className={`${data?.offers.data?.length  ? 'block' : 'hidden'} flex flex-col mt-8 border-b rounded-t shadow-lg  p-4 `}> */}
        <div className='  shadow-xl bg-white flex justify-between px-2 items-center py-2 w-full'>
            <h3 className='text-md sm:text-lg p-4 whitespace-nowrap md:text-lg xl:text-2xl font-semibold '> 
                Offers of the Day
            </h3>
           
            <div className='flex items-center'>
                <select className='relative block appearance-none p-2 lg:p-3 text-xs bg-white border text-gray-500 border-gray-300 hover:border-gray-500  rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
                    <option disabled selected value="">Filter</option>
                    {/* <option  onClick={() => setCategory("All")} value="All">All</option> */}
                    {shopCategories?.map((category, index) => (
                        <option className='bg-white text-gray-500 text-sm'
                         onClick={() => setCategory(category)}
                         key={index} value={category}>{category}</option>
                    ))}
                </select>
                <div className='absolute right-2 pointer-events-none  pl-1'>
                    <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                </div>
            </div>
        </div>
        {/* // make the header stick to the top while the section is in view  */}
       
         
        {/* </div> */}
        

        <div className={`${data?.offers.data?.length  ? 'block' : 'hidden'} grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 mt-2 gap-2`}>             
           {/* // filter products with status publish */}
              {
                data?.offers.data.filter(product => product?.status === 'publish')
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                //also filter the data based on offer type selected 
                .filter(product => product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','').replace(/Restrauntsname|Takeawaysid/g, '') ===  category  || category == 'All')
                .map(product => (
                  <motion.div key={product.id}>
                  <Neon2 product={product} productSlug={product.slug} />
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
   </div>
    )
}

//Offers.Layout = Layout;

Offers.Layout = DefaultLayout;

// Offers.Layout = GlobalSearchLayout;

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


