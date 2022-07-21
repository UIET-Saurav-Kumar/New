
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
import Helium from '@components/product/product-card/helium';
import CartCounterButton from '@components/cart/cart-counter-button';
import { useWindowDimensions } from '@components/common/search';
import { fetchShops, useShopsQuery } from "@data/shop/use-search-shop-query";
import ShopCard2 from '@components/ui/shop-card2';

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

      <CartCounterButton />

    
export default function SalonPage() {

  const {width} = useWindowDimensions();

    const {getLocation} = useLocation()
    const router = useRouter();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);



    // console.log('offer data', data)

    // console.log( 'category',data?.offers.data.map(product => {
    //     return product?.shop?.shop_categories.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','')}
    // ));

        const { query } = useRouter();
        const [searchTerm, setSearchTerm] = useState("");
        const [category, setCategory] = useState("");
        const [page, setPage] = useState(1);
        const [orderBy, setOrder] = useState("created_at");
        const [type, setType] = useState("");

//   const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

        // const {
        //     data: salonProducts,
        //     isLoading: fetching,
        //     errors,
        //   } = useAllProductsQuery({
        //       limit: 90000,
        //       page,
        //       type,
        //       category,
        //       text: query?.text as string,
        //   });


          const {
              data,
              isLoading: loading,
              error,
          } = useOfferQuery({
              limit: 20 as number,
              search:"",
              location : ((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any
          }); 

          
          function handleSearch({ searchText }: { searchText: string }) {
            setSearchTerm(searchText);
            setPage(1);
          }

          // function shopCategory(){
          //   var cat =  salonProducts?.products.data.filter(product => product.status === 'publish'   && product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','') == 'Salon  Spa') 
          //   return cat
          // }

          // function catSlug() {
          //   var slug =  salonProducts?.products.data.map( product => product.slug) 
          //   return slug
          // }

          // console.log('salon category', shopCategory());

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

          const { data: shopData } = useShopsQuery({
            category:'Salon+-+Spa',
            limit:3000000,
            location:((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any,
            is_active:1,
            // page:1,
            search:getSearch()
          });

          function getCategory():string{
              return 'Salon & Spa' as string; 
          }

          function getSearch():string{
    
            const { query } = useRouter();
            
            if(query.text){
              return query.text as string
            }
            return "";
          }

          console.log('shop-data', shopData);

          // console.log('salon category products',salonProducts?.products.data.filter(product => product?.categories.map( cat => cat.name === 'Services')   )  )
            
          // console.log('salonProduct',salonProducts?.products.data.filter(product => product?.status === 'publish' && product?.categories?.name === 'Hair Spa'  )  )


  return (

   //salon page design 

  //  <>
  //  {fetching && !data?.pages?.length ? (
  //    <img src='/'
  //    className="object-contain mx-auto" />
  // ) : (

      <>

    <div className='bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 h-full border bg-white w-full'>
      
        {/* <div className='w-full h-full'>
            <picture className="w-full h-full" >
                  <source media="(max-width: 1023px)" style={{objectFit:'cover'}} srcset="/mob-salon-banner.jpeg"/>
                  <source media="(min-width: 1024px)" style={{objectFit:'contain'}} srcset="/salon-banner.jpg"/>
                  <img src="/ad-banner.jpg" style={{height:'100%', width:'100%'}} alt="Top Salon Services on Buylowcal"/>
              </picture>
        </div> */}

        {/* <div className='flex items-center overflow-y-scroll w-full h-auto'>
                    {shopData?.pages?.map((page, idx) => {
                      return (
                        <Fragment key={idx}>
                          {page.data.filter((shop) => shop.is_active === 1).map((shop: any) => (
                            <ShopCard2 shop={shop} key={shop.id} />
                          ))}
                        </Fragment>
                      );
                      })}
          </div> */}

          <h3 className='text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-medium text-2xl lg:text-3xl text-gray-900 font-serif ml-4 lg:ml-8 mt-10 lg:mt-10 tracking-normal'>Featured Products</h3>

            <div className={`${data?.offers.data?.length  ? 'block' : 'hidden'} text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
               grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-5 bg-gray-50 mt-3 p-2 lg:p-6 gap-2`}>
              {/* {fetching && !data?.pages?.length ? (
                        <ProductFeedLoader limit={5} />
                      ) : ( */}
                
                    {
                      data?.offers.data.filter(product => product.status === 'publish' && product.is_featured === 1 && product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','') ==='Salon  Spa' ).map(offer => (
                      
                        <motion.div key={offer.id}>
                          <Helium product={offer}/>
                        </motion.div>
                        ))
                    }
               
                      {/* )} */}
            </div>

        

        <div className='flex flex-col lg:px-4 mt-0 lg:mt-10 py-4'>

            <h4 className='text-xl flex items-center justify-between lg:text-3xl font-serif text-gray-900 font-medium ml-2 lg:ml-4 py-4 tracking-normal'>
              Top Salons Near You <Link href='/shops?category=Salon+-+Spa'><span className='text-blue-800 cursor-pointer hover-underline text-sm '>view all</span></Link>
            </h4>
            <PromotionSlider/>
        </div>



        <h3 className='font-medium text-2xl font-serif lg:text-3xl text-gray-900 py-4 ml-2 lg:ml-8  lg:mt-10 tracking-normal'>Women</h3>

            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 placeitems-center items-center scrollbar-hide w-full px-2 lg:px-8 overflow-x-scroll gap-3 '>        
            {/* // map over womenImg and display images */}
                  {womenImg.map(img => (
                    <div  key={img?.id} onClick={ () => handleCategory(img)} className='flex cursor-pointer placeitems-center gap-3 items-center justify-around '>
                          <img src={img?.src} className ='w-full h-full object-cover' />
                    </div>
                  ))}

            </div>  

        <h3 className='font-medium text-2xl lg:text-3xl font-serif text-gray-900 ml-2 lg:ml-8 py-4 lg:mt-10 tracking-normal'>Men</h3>

            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7  placeitems-center items-center scrollbar-hide w-full px-2 lg:px-8 overflow-x-scroll gap-3'>
              {/* // map over womenImg and display images */}
                {menImg.map(img => (
                    <div onClick={ () => handleCategory(img)}  key={img?.id} className='flex cursor-pointer items-center justify-around space-x-4'>
                        <img src={img?.src} className='w-full  h-full object-cover' />
                    </div>
                ))}
            </div> 

          


        {/* <h3 className='font-medium text-2xl lg:text-3xl text-gray-900 font-serif  ml-4 lg:ml-8  mt-3 tracking-normal'>Offer of the day</h3>

            <div className={`${data?.offers.data?.length  ? 'block' : 'hidden'} grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-50 mt-3 p-2 lg:p-6 gap-2`}>
               {fetching && !data?.pages?.length ? (
                      <ProductFeedLoader limit={5} />
                    ) : (
                 <>
                      {
                          // filter products with price high to low
                          data?.offers?.data
                          // .map(product => (
                          .filter(product => product.status === 'publish' && product.is_offer === 1 && product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','') =='Salon  Spa' ).map(product => (
                          // salonProducts?.products.data.filter(product => product.status === 'publish' && product.is_offer === 1 && product.is_featured === 1 && product?.shop?.shop_categories?.replace(/[^a-zA-Z ]/g, "").replace('name', '').replace('id','') =='Salon  Spa' ) .map(product => (
                                  <motion.div key={product.id}>
                                  <Helium product={product}/>
                                  </motion.div>
                                  ))
                      }
                 </>
                    )}
            </div> */}

            

    </div>

    { width > 768 ? (
      <CartCounterButton/>)
      : null
      }

    </>
        //             )}
        // </>
     

    
    

  )

}

SalonPage.Layout = Layout;
