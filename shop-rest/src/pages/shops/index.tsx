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
import CartCounterButton from "@components/cart/cart-counter-button";




const ShopsPage = () => {
  
  const [filter, setFilter] = useState(false);
  const [sort , setSort] = useState(false);

  const { t } = useTranslation("common");
  const router = useRouter();
  const items = useTypesQuery();
  const {getLocation} =useLocation()

  const selectedMenu = items?.data?.types?.find((type: any) =>
    router.asPath.includes(type.slug)
  );

  const { data } = useShopsQuery({
    category:getCategory(),
    limit:3000000,
    location:((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any,
    is_active:1,
    // page:1,
    search:getSearch()
  });

  function getSearch():string{
    
    const { query } = useRouter();
    
    if(query.text){
      return query.text as string
    }
    return "";
  }

  function getCategory():string{
    const { query } = useRouter();
    if(query.category){
      return query.category as string
    }
    return "";
  }

  const [searchString, setSearchString] = useState(null);

  function getText():string{
    const { query } = useRouter();
    // setSearchString(query.text) as string;
    if(query.text){
       
      return query.text as string
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
  //       console.log(e)
  //     }
  //   }
  //   return value;
  // }

  function handleClick(path: string) {
    close();
    router.push(path);
  }

  const handleFilter = () => {
      setFilter(true);
  }

  const handleSort = () => {
        setSort(true)
  }

  const closeFilter = () => {
        setFilter(false);
  }

  const closeSort = () => {
      setSort(false);
  }
 
  // console.log('shops',data?.pages?.filter((shop: any) => shop?.is_active === 1))
  // console.log('shops name',data?.pages?.data?.map((shop: any) => shop))

  console.log('shop page data',data)

  return (

    <div className="w-full">

        <div className='flex justify-between mx-5 border-b p-3 bg-gray-100 mt-2'>
          <h3 className='font-semibold text-xs sm:text-sm md:text-sm lg:text-md 2xl:text-md'> Local shops near you </h3> 
        </div>
       
        {/* <div className='xl+:mx-0 mt-0 sm:flex lg:flex md:flex xl:flex 2xl:flex'> */}

          {/* <div className='py-4 px-4 grid w-full grid-cols-1 xs+:grid-cols-1 xs++:grid-cols-2 gap-4 sm:grid-cols-2 
                          md:grid-cols-2 md++:grid-cols-2 lg:grid-cols-3 lg+:grid-cols-3 xl:grid-cols-4 xl+:grid-cols-4
                          xl++:grid-cols-5 2xl:grid-cols-5  3xl:grid-cols-6 border-2 overflow-y-scroll h-screen overflow-x-hidden  bg-gray-100'> */}
            <div className=" lg:px-10  h-full w-full flex flex-col">
              {data?.pages?.map((page, idx) => {
                    return (
                      <Fragment key={idx}>
                        {page.data.filter((shop) => shop?.is_active === 1).map((shop: any) => (
                          <ShopCard2 text={getText()} category={getCategory()} shop={shop} shopId={shop?.id} key={shop.id} />
                        ))}
                      </Fragment>
                    );
              })}
            </div>
          
            {/* </div> */}

           {
            width < 1023 && 
              <MobileNavigation />
           }
          {
            width > 1023 &&
            <CartCounterButton/>
          }

    </div>
    
  );
};

ShopsPage.Layout = DefaultLayout;
// ShopsPage.Layout = ShopPageLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("settings", fetchSettings);
  await queryClient.prefetchInfiniteQuery(
    ["all-shop", { is_active: 1 }],
    fetchShops
  );


  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default ShopsPage;


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
