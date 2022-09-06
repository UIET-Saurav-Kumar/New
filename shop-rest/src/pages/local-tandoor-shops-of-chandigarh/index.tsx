
import ShopCard from "@components/ui/shop-card";
import ShopCard2 from "@components/ui/shop-card2";

import DefaultLayout from "@components/layout/default-layout";
import * as typeIcon from "@components/icons/type";
import { fetchShops, useShopsQuery } from "@data/shop/use-search-shop-query";
import cn from "classnames";
import RestrauntShopCard from '@components/category/restraunt-shop-card'
import ShopPageLayout from "@components/layout/shop-layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Fragment, useEffect } from "react";
import { GetStaticProps } from "next";
import { fetchSettings } from "@data/settings/use-settings.query";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import { getIcon } from "@utils/get-icon";
import { useTypesQuery } from "@data/type/use-types.query";
import React, { useState } from "react";
import Footer from '@components/footer/Footer';
import { useLocation } from "@contexts/location/location.context";
import MobileNavigation from "@components/layout/mobile-navigation";
import { useWindowSize } from "@utils/use-window-size";

import Image from "next/image";
import Logo  from "@components/ui/logo";
import TandoorShopCard from "@components/ui/tandoor-shop-card";
import JoinButton from "@components/layout/navbar/join-button";
import MobileJoinButton from "@components/layout/navbar/mobile-join-button";
import { useFeatureProductQuery } from "@data/home/use-feature-product-query";
import { motion } from "framer-motion";
import renderProductCard from "@components/product/home-product-card";
import Layout from "@components/layout/layout";
import Head from "next/head";


const TandoorsPage = () => {
  const {getLocation} =useLocation()

  
  const [filter, setFilter] = useState(false);
  const [sort , setSort] = useState(false);

  const { t } = useTranslation("common");
  const router = useRouter();
  const items = useTypesQuery();


  const selectedMenu = items?.data?.types?.find((type: any) =>
    router.asPath.includes(type.slug)
  );

  const { data } = useShopsQuery({
    category:getCategory(),
    limit:30,
    location:((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any,
    is_active:1,
    search:getSearch()
  });

  function getSearch():string {
    const { query } = useRouter();
    if(query.text){
      return query.text as string
    }
    return "";
  }

  function getCategory():string {
    const { query } = useRouter();
    
    if(query.category){
      return query.category as string
    }
    return "";
  }

  const { width } = useWindowSize();

  // function getSearch(){
  //   var value:any=(window.localStorage.getItem('search'))?window.localStorage.getItem('search'):"";

  //   if(window.localStorage.getItem('search')){

  //     try{
  //       value=JSON.parse(value).value.replaceAll("&","-");
  //     }catch(e){
  //       // console.log(e)
  //     }
  //   }
  //   return value;
  // }
  function getLink(category:String){
		var pathname="/"+router.locale+"/shops?category="+category.replace("&","-");
		// const { type, ...rest } = query;
		// var text=(query.text)?query.text:"";

		return pathname;
		// +"?text="+text;
	}
  
  const { query } = useRouter();
  const { type } = query;
  
  const {
      data: featureData,
      isLoading: loading,
      error,
  } = useFeatureProductQuery({
      limit: 10 as number,
      search:"",
      location : ((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any
  });


  const type_id = [1,2,3,4,5,6,7,8,9,10,11,14,15,16,18,19,20,21,22]

  const tandoorArray =  data?.pages[0].data.filter(function(product){
    return product.type_id == 20 ? product : '';
  })

 // console.log('feature tandooor data',featureData?.featureProducts.data);

 // console.log('tandoorArray',tandoorArray);

  return (
  <>

  <Head>
  <link rel="canonical" href={`https://buylowcal.com/local-tabdoor-shops-of-chandigarh`}/>

  </Head>

       
    <div className='bg-gray-50'>
        <div  className="container-fluid mt-0 border-10  border-red-200 ">
              
              <div className='flex w-full'> 
                  <img 
                     src='/new-tandoor.jpg' 
                     className='relative bg-transparent md:h-96 sm:block 
                       object-contain sm:object-cover  lg:object-cover mr-60 lg:h-full '
                     />
              </div>

                  <div className=''> 
                  {/* <img 
                      src='/tandoor-crop.jpg' 
                      className='relative block bg-transparent opacity-60 sm:hidden object-cover mr-60 h-96 lg:h-full '
                  /> */}
                  </div>


                         

                         {/* <div className='absolute w-full top-1/2 h-auto left-8'>
                            <div className='w-full flex justify-center items-center'>
                                <h1 className=' text-white font-bold text-4xl'>Delicious tandoor</h1> 
                            </div>
                         </div> */}
                       {/* <img src='https://image1.jdomni.in/banner/11032021/82/28/2C/C0C8547B132EC0F092A638CBF4_1615449847664.png?output-format=webp' className='object-contain'/> */}
        </div>

        {/* <ChachaSlider/> */}

       {/* <div className=' grid grid-cols-1 lg:flex lg:items-center justify-evenly w-full pt-0 bg-gray-50 h-96  p-4'> */}
          <h3 className=' tandoor-heading text-center text-lg lg:text-2xl mt-6 p-4 font-semibold w-full '>Discover the Tandoor Recipes</h3>
          <div className='w-full  flex justify-center space-x-2 items-center'>
              {/* <img src='tandoor-food.png' className='w-24 h-full object-cover'/>
              <img src='tandoor-food.png' className='w-24 h-full object-cover'/>
              <img src='tandoor-food.png' className='w-24 h-full object-cover'/>
              <img src='tandoor-food.png' className='w-24 h-full object-cover'/>
              <img src='tandoor-food.png' className='w-24 h-full object-cover'/>
              <img src='tandoor-food.png' className='w-24 h-full object-cover'/> */}
              <img src='/bhola.png' className='flex md:w-11/12 lg:mx-0 h-full w-full items-center object-contain'/>
              {/* <img src='https://demo.ovathemes.com/fable/restaurant/wp-content/uploads/2016/03/a15.jpg' className='h-1/2 w-1/2 object-contain'/> */}
              {/* <img src='tandoor-food.png' className='w-24 h-full object-cover'/> */}
          </div>

           {/* <div className='flex w-1/2 space-y-8 px-48 text-center items-center mt-2 flex-col'>
              <h1 className='font-extrabold text-red-400 font-mono text-3xl'> Discover   </h1>
                  <h2 className='text-3xl  font-bold font-mono'> Best Recipes </h2>
                  <p className='text-sm w-full font-sans text-center border tracking-widest text-gray-500'>
                      
              </p>
           </div> */}

       {/* </div> */}

        <div className='w-full flex flex-col sm:grid-cols-2 p-2  lg:p-5'>
          
          <div className='w-full h-full flex'>
              
              <img src='/tandoor-food.jpg' className='object-cover md:object-contain'/>
              
          </div>

          <div className='z-100 py-0 px-4 grid w-full grid-cols-1 xs+:grid-cols-1 xs++:grid-cols-2 gap-3 sm:grid-cols-3 
                            md:grid-cols-3 md++:grid-cols-3 lg:grid-cols-3 lg+:grid-cols-3 xl:grid-cols-4 xl+:grid-cols-4
                            xl++:grid-cols-5 2xl:grid-cols-5  3xl:grid-cols-6  overflow-y-scroll h-full overflow-x-hidden'>
                  {tandoorArray?.map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                {renderProductCard(product) }
                            </motion.div>
                        </> 
                    ))}
          </div>

          {/* <div className='grid grid-cols-1 mt-2 border-gray-200 border-b-2  md:grid-cols-2 place-items-center p-2 lg:p-5'> */}
          <div className='w-full h-full mt-0 flex'>
              
              <img src='/tandoor-food2.jpg' className='object-cover md:object-contain'/>
              
          </div>
                {/* <img 
                src='/tandoor-food.png'
                className='object-contain hidden md:block h-64 w-64 md:h-64 md:w-64 lg:h-96 lg:w-full'/> */}
            </div>

            
        {/* </div> */}

       
        <div className=' w-full h-full flex flex-col '>
            <div className='w-full flex items-center text-center p-4 lg:p-10'> 
                <h1 className='mx-auto w-full font-semibold text-gray-80 text-lg lg:text-2xl font-cursive'>
                    Local Tandoors Shops
                </h1>
                {/* <Link href={getLink('Tandoors+of+Chandigarh')}><p className='w-28 text-blue-600 hover:underline hover:cursor-pointer'>View All</p></Link> */}
            </div>
              {/* <div className='flex overflow-x-visible items-center justify-evenly'> */}
                <div className='z-100 py-0 px-4 grid w-full grid-cols-2 xs+:grid-cols-2 xs++:grid-cols-2 gap-3 sm:grid-cols-2 
                                md:grid-cols-3 md++:grid-cols-3 lg:grid-cols-3 lg+:grid-cols-3 xl:grid-cols-4 xl+:grid-cols-4
                                xl++:grid-cols-5 2xl:grid-cols-5  3xl:grid-cols-6  overflow-y-scroll h-full overflow-x-hidden'>
                      {data?.pages?.map((page, idx) => {
                          return (
                          <Fragment key={idx}>
                              {page?.data?.filter((itm) => itm?.slug?.includes('tandoor') ).map((shop) => (
                              <TandoorShopCard shop={shop} key={shop.id} />
                              ))}
                          </Fragment>
                          );
                      })}
                </div>
        </div>

        {/* <div className=' w-full h-full sm:flex md:flex-col shadow-lg'>

            <div className='w-full text-center p-10'> 
                <h1 className='mx-auto w-full font-semibold text-gray-800 text-2xl font-cursive'>
                    For You
                </h1>
            </div>

             <div className={`${tandoorArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                   
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                      2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
            
                      {tandoorArray?.map((product :any) => (
                          <>    
                              <motion.div key={product.id}>
                                  {renderProductCard(product) }
                              </motion.div>
                          </> 
                      ))}

                </div>
            </div> 

        </div> */}

     

  {
    width < 1023 && 
        <MobileNavigation />
  }
       
    </div>
    </>
  );
};

// TandoorsPage.Layout = DefaultLayout;
// TandoorsPage.Layout = ShopPageLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("settings", fetchSettings);
  await queryClient.prefetchInfiniteQuery(
    ["all-shop", { is_active: 1 }],
    fetchShops
  );


  return {
    props: {
     // ...(await serverSideTranslations(locale!, ["common"])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

TandoorsPage.Layout = Layout;
export default TandoorsPage;


{/* <div className="flex items-center mx-auto w-full max-w-6xl space-x-6 h-20 md:h-24 px-5 overflow-x-auto">
        {items?.data?.types?.map(({ id, name, slug, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleClick(`/${slug}`)}
            className={cn(
              "flex items-center flex-shrink-0 bg-gray-100 text-sm font-semibold px-6 h-12 rounded-3xl border border-gray-200 text-heading focus:outline-none",
              {
                "!border-gray-900": selectedMenu,
              }
            )}
          >
            {icon && (
              <span className="flex w-5 h-5 items-center justify-center">
                {getIcon({
                  iconList: typeIcon,
                  iconName: icon,
                  className: "max-h-full max-w-full",
                })}
              </span>
            )}
            <span className="ms-2">{name}</span>
          </button>
        ))}
      </div>
      <div className="bg-light min-h-screen ">
        <div className="w-full max-w-6xl mx-auto flex flex-col p-8">
          <div className="pt-12">
            <h3 className="text-2xl text-heading font-bold mb-8">
              {t("text-all-shops")}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.pages?.map((page, idx) => {
                return (
                  <Fragment key={idx}>
                    {page.data.map((shop) => (
                      <ShopCard shop={shop} key={shop.id} />
                    ))}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div> */}

     