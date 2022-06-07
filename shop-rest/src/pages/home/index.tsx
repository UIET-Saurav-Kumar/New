

import { useEffect } from "react";
import DefaultLayout from "@components/layout/default-layout";
import { useWindowSize } from "@utils/use-window-size";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { scroller, Element } from "react-scroll";
import ImageSlider from '@components/home-page-image-slider/ImageSlider';
import AllCategories from '@components/home-page-product-section/AllCategories';
import FeaturedShops from '@components/home-page-product-section/FeaturedShops';
import FeaturedProducts from '@components/home-page-product-section/FeaturedProducts';
import ProductGrid from '@components/home-page-product-section/ProductGrid';
import AmazonShops  from '@components/home-page-product-section/AmazonShops'
import dynamic from "next/dynamic";
import { GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { fetchFeatureProduct } from "@data/home/use-feature-product-query";
import { fetchSettings } from "@data/settings/use-settings.query";
import { fetchCategories } from "@data/home/use-categories-query";
import { fetchFeatureShop } from "@data/home/use-feature-shop-query";
import { fetchFeatureStore } from "@data/home/use-feature-e-store";
import { fetchOfferQuery } from "@data/home/use-offer-query";
import MobileNavigation from "@components/layout/mobile-navigation";
import StayTuned from '@components/no-shop-msg/stay-tuned'
import { useShopAvailabilityQuery } from "@data/home/use-shop-availability-query";
import { useLocation } from "@contexts/location/location.context";
import Tandoor from "@components/home-page-product-section/tandoor";
import InvoiceBanner from "@components/home-page-product-section/invoice-banner";
import HeaterBanner from "@components/home-page-product-section/heater-banner";
import RedBullBanner from "@components/home-page-product-section/red-bull-banner";
import UserDashboard from "@components/home-page-product-section/UserDashboard";



const ProductFeedLoader = dynamic(
  () => import("@components/ui/loaders/product-feed-loader"),
  { ssr: false }
);

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {

    const queryClient = new QueryClient();
    
    await queryClient.prefetchQuery("settings", fetchSettings);
  
    await queryClient.prefetchInfiniteQuery(
      ["featureProducts", { type: params?.type }],
      fetchFeatureProduct,
      {
        staleTime: 60 * 1000,
      }
    );

    await queryClient.prefetchQuery(
      ["categories", { type: params?.type }],
      fetchCategories,
      {
        staleTime: 60 * 1000,
      }
    );
    
    await queryClient.prefetchQuery(
        ["featureShops", { type: params?.type }],
        fetchFeatureShop,
        {
          staleTime: 60 * 1000,
        }
    );
    await queryClient.prefetchQuery(
        ["featureStores", { type: params?.type }],
        fetchFeatureStore,
        {
          staleTime: 60 * 1000,
        }
    );
    await queryClient.prefetchQuery(
        ["offers", { type: params?.type }],
        fetchOfferQuery,
        {
          staleTime: 60 * 1000,
        }
    );
  
    return {
      props: {
        ...(await serverSideTranslations(locale!, ["common"])),
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 120,
    };
  };

const CartCounterButton = dynamic(
    () => import("@components/cart/cart-counter-button"),
    { ssr: false }
  );

export default function home() {

const { width } = useWindowSize();
const { query } = useRouter();
const {getLocation} =useLocation()

useEffect(() => {
  
  window.scrollTo(0, 0);
}, []);


const {
  data,
  isLoading: loading,
  error,
} = useShopAvailabilityQuery({
  limit: 16 as number,
  search:"",
  location : ((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any
});

    return (
        <div className=" h-full">

          

    {loading ? (
         <div className="absolute top-0 left-0  h-screen bg-black opacity-80   z-50 w-full">
           {/* <img src='/preloader/cir.gif' className='sticky top-1/2 left-1/2 right- object-contain '/> */}
           {/* <iframe className="mx-auto mt-1/2 h-full " src="https://giphy.com/embed/3ohs7TrCSp7c8ZrxBe" width="80" height="80" frameBorder="0" class="giphy-embed" allowFullScreen>
             </iframe> */}
             
           </div>
        ) : (
        <div className='lg:px-10 md:px-7 h-full '>
          {
            (data?.ShopAvailability?.data?.check==0)?
            (<StayTuned/>):
            (
              <div className="relative w-full">
              
                {/* // animation on component load */}
                {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-75" /> */}
                
                {/* <ImageSlider/> */}
                {/* <img src='/user-dashboard.jpeg' className=" w-full h-full object-cover" /> */}
                <UserDashboard/>
                <RedBullBanner/>
                <AllCategories/>
                {/* <InvoiceBanner/> */}
                
                <Tandoor/>
                <ProductGrid/>
                <HeaterBanner/>
                <FeaturedShops />
                <FeaturedProducts/>
              </div>
            )
          } 
            
        </div>
    )
       }
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

home.Layout = DefaultLayout;
