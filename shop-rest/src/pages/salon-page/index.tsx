
import React from 'react';
import { useOfferQuery } from "@data/home/use-offer-query";
import { useLocation } from "@contexts/location/location.context";
import { motion } from "framer-motion";
import renderProductCard from "@components/product/home-product-card";
import PromotionSlider from '@components/common/promotion-slider';
import { useProductsQuery } from "@data/product/use-products.query";
import { useRouter } from "next/router";
import { Fragment, useRef } from "react";
import dynamic from "next/dynamic";
import { useAllProductsQuery } from "@data/product/products.query";
import { useState } from "react";
import product from '../../components/repositories/product';
import Layout from '@components/layout/layout';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SalonCard from '@components/product/product-card/salon-card';
import Link from 'next/link';
import { ROUTES } from "@utils/routes";
import Neon from '@components/product/product-card/neon';
import Neon2 from '@components/product/product-card/neon2';
import { useEffect } from "react";


  const ProductFeedLoader = dynamic(
    () => import("@components/ui/loaders/product-feed-loader")
  );


 export  const womenImg = [
        {
            id : "1",
            src : '/salon/1.jpg',
            slug: 'menicure-pedicure'
        },
        {
            id : "2",
            src : '/salon/2.jpg',
            slug: 'hair-treatment'
        },
        {
            id : "3",
            src : '/salon/3.jpg',
            slug: 'facial',
        },
        {
            id : "4",
            src : '/salon/4.jpg',
            slug: 'waxing',
        },
        {
            id : "5",
            src : '/salon/5.jpg',
            slug: 'women-hair-service'
        },
        {
            id : "6",
            src : '/salon/6.jpg',
            slug: 'makeup'
        },
        {
            id : "7",
            src : '/salon/7.jpg',
            slug: 'spa'
        },
       
  ]

 export  const menImg = [
        {
            id : "8",
            src : '/salon/8.jpg',
            slug: 'menicure-pedicure'
        },
        {
              id : "9",
              src : '/salon/9.jpg',
              slug: 'mens-grooming'
        },
        {
            id : "10",
            src : '/salon/10.jpg',
            slug: 'facial'
        },
        {
            id : "11",
            src : '/salon/11.jpg',
            slug: 'hair-spa'
        },
        {
            id : "12",
            src : '/salon/12.jpg',
            slug: 'mens-grooming'
        },
        {
            id : "13",
            src : '/salon/13.jpg',
            slug: 'shave'
        },
        {
            id : "14",
            src : '/salon/14.jpg',
            slug: 'massage'
        },
    ]
    

    export const getStaticProps = async ({ locale }: any) => {
        return {
          props: {
            ...(await serverSideTranslations(locale, ["common"])),
          },
        };
      };

    
export default function SalonPage() {

    const {getLocation} = useLocation()
    const router = useRouter();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);


    const {
        data,
        isLoading: loading,
        error,
    } = useOfferQuery({
        limit: 10 as number,
        search:"",
        location : ((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any
    }); 

    console.log('offer data', data)

    console.log( 'category',data?.offers.data.map(product => {
        return product?.shop?.shop_categories.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','')}
    ));

        const { query } = useRouter();
        const [searchTerm, setSearchTerm] = useState("");
        const [category, setCategory] = useState("");
        const [page, setPage] = useState(1);
        const [orderBy, setOrder] = useState("created_at");
        const [type, setType] = useState("");

//   const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

        const {
            data: salonProducts,
            isLoading: fetching,
            errors,
          } = useAllProductsQuery({
              limit: 90000,
              page,
              type,
              category,
              text: query?.text as string,
          });

          function handleSearch({ searchText }: { searchText: string }) {
            setSearchTerm(searchText);
            setPage(1);
          }

          function shopCategory(){
            var cat =  salonProducts?.products.data.filter(product => product.status === 'publish'   && product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','') == 'Salon  Spa') 
            return cat
          }

          function catSlug() {
            var slug =  salonProducts?.products.data.map( product => product.slug) 
            return slug
          }

          console.log('salon category', shopCategory());

          //handleCategory arrow function
          function  handleCategory(img: any) {
            const { pathname, query } = router;
            // const { pathname, query } = router;
        
            const navigate = () => {
            
            // setOpen(false);
            //    displaySidebar && closeSidebar();
            
            //    { width < 976 ?
            //     ( shop_slug?.some(el => pageURL.includes(el)) ?   window.scrollTo(0, 150) : 
            //      window.scrollTo(0, 620) ) : 
            //      ( shop_slug?.some(el => pageURL.includes(el)) ?   window.scrollTo(0, 570) :
            //      window.scrollTo(0, 550) )
            //   };
            
              router.push(
                {
                  pathname : '/salon-products',
                  query: { ...query, category: img?.slug , text:  null },
                },
                undefined,
                {
                  scroll: false,
                }
              );
              
            }
            navigate();
          }

          const [btn, setBtn] = useState(true);
          const [btn2, setBtn2] = useState(false);
      
          function showMen() {
              setBtn(true);
              setBtn2(false);
          }
      
          function showWomen() {
              setBtn(false);
              setBtn2(true);
          }

        // console.log('salon products',salonProducts?.products.data);
          
          console.log('salonProduct', salonProducts?.products.data.filter(product => product?.status === 'publish' && product?.categories?.name === 'Hair Spa'  )  )


  return (

   //salon page design 

  //  <>
  //  {fetching && !data?.pages?.length ? (
  //    <img src='/not-found.png'
  //    className="object-contain mx-auto" />
  // ) : (

      <>

    <div className='h-full border bg-white w-full'>
      
        <div className='w-full h-full'>
            <img  
            // src='https://thesalonbusiness.com/wp-content/uploads/square-online-store-example-salon-website-1024x732.png'
            src='/salon-banner.jpeg'
            className='w-full h-full object-cover' />
        </div>

        <div className='flex flex-col lg:px-4 py-4'>
            <h4 className='text-2xl font-semibold ml-4 lg:ml-4 py-4 tracking-widest'>Top Brands</h4>
            <PromotionSlider/>
        </div>

        <h3 className='font-semibold text-2xl py-4 ml-4  lg:mt-10 tracking-wide'>WOMEN</h3>

            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 placeitems-center items-center w-full overflow-x-scroll gap-3 '>        
            {/* // map over womenImg and display images */}
                  {womenImg.map(img => (
                    <div  key={img?.id} onClick={ () => handleCategory(img)} className='flex cursor-pointer placeitems-center gap-3 items-center justify-around '>
                          <img src={img?.src} className ='w-full h-full object-cover' />
                    </div>
                  ))}

            </div>  

        <h3 className='font-semibold text-2xl ml-4 py-4 lg:mt-10 tracking-wide'>MEN</h3>

            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 placeitems-center items-center w-full overflow-x-scroll gap-3'>
              {/* // map over womenImg and display images */}
                {menImg.map(img => (
                    <div onClick={ () => handleCategory(img)}  key={img?.id} className='flex cursor-pointer items-center justify-around space-x-4'>
                        <img src={img?.src} className='w-full h-full object-cover' />
                    </div>
                ))}
            </div> 

         <h3 className='font-semibold text-2xl ml-4 mt-10 lg:mt-10 tracking-wide'>Featured Products</h3>

            <div className={`${data?.offers.data?.length  ? 'block' : 'hidden'} grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-50 p-4`}>
              {fetching && !data?.pages?.length ? (
                        <ProductFeedLoader limit={5} />
                      ) : (
                <>
                    {
                      //filter products with status publish and whose shop category is Salon & Spa
                      salonProducts?.products.data.filter(product => product.status === 'publish' && product.is_featured === 1 && product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','') =='Salon  Spa' ) .map(product => (
                              <motion.div key={product.id}>
                                <Neon2 product={product}/>
                              </motion.div>
                              ))
                    }
                </>
                      )}
            </div>


        <h3 className='font-semibold text-2xl ml-4   mt-10 tracking-wide'>OFFER OF THE DAY</h3>

            <div className={`${data?.offers.data?.length  ? 'block' : 'hidden'} grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-50 mt-10 p-4 gap-2`}>
               {fetching && !data?.pages?.length ? (
                      <ProductFeedLoader limit={5} />
                    ) : (
                 <>
                      {
                          // filter products with price high to low
                          salonProducts?.products.data.filter(product => product.status === 'publish' && product.is_featured === 1 && product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','') =='Salon  Spa' ) .sort((a, b) => b.price - a.price).map(product => (
                          // salonProducts?.products.data.filter(product => product.status === 'publish' && product.is_offer === 1 && product.is_featured === 1 && product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','') =='Salon  Spa' ) .map(product => (
                                  <motion.div key={product.id}>
                                  <Neon2 product={product}/>
                                  </motion.div>
                                  ))
                      }
                 </>
                    )}
            </div>

            <div className={`${data?.offers.data?.length  ? 'block' : 'hidden'} grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-50 mt-10 p-4 gap-2`}>
               {fetching && !data?.pages?.length ? (
                      <ProductFeedLoader limit={5} />
                    ) : (
                 <>
                    {
                        //filter products whose categories array contain category hair spa
                        salonProducts?.products.data.filter(product => product.status === 'publish' && product.is_offer === 1 && product.is_featured === 1 && product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','') =='Hair Spa' ) .map(product => (
                                <motion.div key={product.id}>
                                 <Neon2 product={product}/>
                                </motion.div>
                                ))
                    }
                 </>
                    )}
            </div>

        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-1">
            {loading && !data?.pages?.length ? (
            <ProductFeedLoader limit={3} />
            ) : (
            <>
                {
                    //filter products with status publish and whose shop category is Salon & Spa
                    salonProducts?.products.data.filter(product => product?.status === 'publish' && product?.shop?.shop_categories.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','') === 'Salon  Spa'  ).map(product => (
                        <motion.div key={product.id}>
                        {renderProductCard(product)}
                        </motion.div>
                        ))

                }
            </>
            )}
        </div> */}
        

    </div>

    </>
        //             )}
        // </>
     

    
    

  )

}

SalonPage.Layout = Layout;