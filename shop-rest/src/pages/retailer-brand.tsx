
import Image from "next/image";
import Head from 'next/head'
import ShopProductFeed from "@components/product/feed-shop";
import { fetchShop } from "@data/shop/use-shop.query";
import { useTranslation } from "next-i18next";
import { useWindowSize } from "@utils/use-window-size";
import ShopProfileCard from "@components/profile/profile-card";
import dynamic from "next/dynamic";
import url from "@utils/api/server_url";
import { GetStaticPathsContext, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useMutation, useQueryClient, enabled, QueryClient } from 'react-query'
import { fetchProducts, useProductsQuery } from "@data/product/use-products.query";
import { fetchSettings } from "@data/settings/use-settings.query";
import { dehydrate } from "react-query/hydration";
import ShopCategoryCard from "@components/category/shop-category-card";
import Navbar from "@components/layout/navbar/navbar";
import ShopPaymentForm from "@components/shop/shop-payment-form";
import ShopDescription from "@components/shop/shop-description";
import ShopMobileView from "@components/shop/shop-mobile-view";
// import ShopBanner from "./shop-banner";
import WebShopBanner from "@components/shop/web-shop-banner";
import { useModalAction } from "@components/ui/modal/modal.context"
import CategoryCard from "@components/ui/category-card";
import AllCategories from "@components/home-page-product-section/AllCategories";
import Layout from "@components/layout/layout";
import Avatar from 'react-avatar';
import OfferCards from "@components/shop/offer-cards";
import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
import { useRouter } from "next/router";
import RelatedProducts from "@components/product/product-details/related-products";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import { fetchShopSeo } from "@data/shop/use-shop.query";
import Feed from "@components/product/feed";
import { useEffect } from "react";
import { scroller, Element } from "react-scroll";
import { HidingHeader } from 'hiding-header-react'
import { useState } from "react";
import { getReview } from '@utils/get-review';
// import DocumentMeta from 'react-document-meta';
import Seo from "@components/ui/seo";
import ShopLayout from "@components/layout/shop-layout";
import { useUI } from "@contexts/ui.context";
import { parseContextCookie } from "@utils/parse-cookie";
import { useCreateLogMutation } from "@data/log/use-create-log.mutation";
import { nuseLocation } from "react-use";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from '@utils/api/http'
import { toast } from 'react-toastify';
 import PlacePhotos from "@components/shop/google-maps-places-api/place-photos";
import DefaultLayout from "@components/layout/default-layout";
import { useLocation } from "@contexts/location/location.context";


const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);

 

const RetailBrand = ({ data }: any) => {

  const router = useRouter();

  const {query } = router;
 
  console.log('shop data',data);

  console.log('utm', query.utm_campaign);
 
  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();
  
  const { mutate: createLog} = useCreateLogMutation();

  const [pageURL, setPageUrl] = useState('');

  const {
    // isFetching: loading,
    // isFetchingNextPage,
    // fetchNextPage,
    // hasNextPage,
    // isError,
    data:products_data,
    // error,
  } = useProductsQuery({
    shop_id: 4900,
    // type: query.type as string,
    // text: text as string,
    // category:  category as string,
  },
  {
    enabled: Boolean(4900),
  });

  function checkUtm(utm_source,utm_campaign,shop_id) {
    
     utm_source == 'shop_qr' ? isAuthorize ?
    router.push('/shops/'+  utm_campaign) :
    router.push('/register?utm_source=shop_qr&utm_campaign='+utm_campaign+'&shop_id='+shop_id) 
    : null
  }

  const { getLocation } = useLocation();

  useEffect(() => {
    query.utm_source == 'shop_qr' && 
    createLog({
      location:getLocation?.formattedAddress,
      shop:data,
      type:'shop-visited'
    }, {
      onSuccess: (data: any) => {
        console.log(data);
      },
    });

    checkUtm(query.utm_source, query.utm_campaign,query.shop_id)
    setPageUrl(window.location.href);
    // query.utm_source == 'shop_qr' ? (!isAuthorize ?  openModal("OTP_REGISTER") : null) : null;
  },  [query.utm_campaign ]);
  
 
  const { width } = useWindowSize();
  
   useEffect(() => {
     pageURL.includes('chandigarhgrocerystore') ? window.scrollTo(0, 670) : window.scrollTo(0, 0)

  }, []);


  const[shopCategory, setShopCategory] = useState('');

  function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState(null);
     
    useEffect(() => {
       
      getShopCategory();
      let lastScrollY = typeof window !== "undefined" ?  window.pageYOffset : '';
  
      const updateScrollDirection = () => {
        const scrollY = window.pageYOffset;
        const direction = scrollY > lastScrollY ? "down" : "up";
        if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
          setScrollDirection(direction);
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
      };
      window.addEventListener("scroll", updateScrollDirection); // add event listener
      return () => {
        window.removeEventListener("scroll", updateScrollDirection); // clean up
      }
    }, [scrollDirection]);
  
    return scrollDirection;
  };

  const {
    data : categoryData,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    type: query.slug as string,
  });
 

  const getShopCategory = () => {

     setShopCategory(data?.shop_categories?.replace(/[{":,0123456789}]/g,'').slice(5,-3))
  }

  console.log('lat', data?.settings?.location?.lng);
 

  return (

     <>

                <div className="relative bg-white lg:bg-gray-100 hidden lg:flex flex-col
                                md:flex-row md:justify-between md:items-start">

 
                    <div className="fixed z-50 bottom-10 right-10 flex justify-center items-center">
                      <img src='/up-arrow.png' className="w-12 h-12" onClick={() => window.scrollTo(0, 0)} /> 
                    </div>

                    <div className='flex w-full lg:flex flex-col'>
 
                          <div className='relative top-0 flex flex-col'> 

                              {categoryData?.categories?.data?.length ? 
                                <> 
                                  <div id='category-dropdown-sidebar'  
                                      className='flex border bg-white flex-col w-full'>
    
                                      <h1 style={{top:'155px'}} id='product-heading' className="text-lg sticky  bg-gray-100  py-3 px-2  font-semibold text-gray-600 font-mono mt-5 transition-transform duration-75">  
                                        { query?.category?.replace(/\b\w/g, (l :any) => l.toUpperCase())   } Products
                                      </h1> 
                                    
                                  </div> 
                                </> : ' '  
                              }
                                 <div id='product-feed' className="static z-10 top-10 w-full">
                                  {data && 
                                     <Feed shopData={data} shopId={data.id} />
                                  }
                                </div> 
                                 
                          </div> 

                    </div>

      
                 {width > 1023 && <CartCounterButton />}

                 </div>
        {/* <div className='block lg:hidden w-full'>

          <ShopMobileView mapUrl={map_url} reviews={reviews} totalRating={totalRating} rating={rating} open={open}
           pageURL={pageURL} shopData={data} data={data} placePhotos={placePhotos}/>

         </div> */}
      {/* </DocumentMeta> */}
     
    </>
    
  );
   
};



// export const getServerSideProps: GetServerSideProps = async (context: any) => {
//   const cookies = parseContextCookie(context?.req?.headers?.cookie);
//   if (!cookies?.auth_token) {
//     return { redirect: { destination: "/", permanent: false } };
//   }
//   return {
//     props: {
//       ...(await serverSideTranslations(context.locale, ["common", "forms"])),
//     },
//   };
// };

// RetailBrand.Layout =  DefaultLayout;

export default RetailBrand;


