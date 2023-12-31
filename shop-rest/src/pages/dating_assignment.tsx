

import { useEffect, useRef, useState } from "react";
import DefaultLayout from "@components/layout/default-layout";
import { useWindowSize } from "@utils/use-window-size";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { scroller, Element } from "react-scroll";
import ImageSlider from '@components/home-page-image-slider/ImageSlider';
import AllCategories from '@components/home-page-product-section/AllCategories';
import FeaturedShops from '@components/home-page-product-section/featured-shops';
import FeaturedProducts from '@components/home-page-product-section/featured-products';
import OfferOfTheDay from '@components/home-page-product-section/offer-of-the-day';
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
import { fetchBrandOfferQuery } from "@data/home/use-brand-offer-query";
import MobileNavigation from "@components/layout/mobile-navigation";
import StayTuned from '@components/no-shop-msg/stay-tuned'
import { useShopAvailabilityQuery } from "@data/home/use-shop-availability-query";
import { useLocation } from "@contexts/location/location.context";
import Tandoor from "@components/home-page-product-section/banners";
import InvoiceBanner from "@components/home-page-product-section/invoice-banner";
import HomePageBanner from "@components/home-page-product-section/tree-plantation-banner";
import RedBullBanner from "@components/home-page-product-section/home-page-banner";
import UserDashboard from "@components/home-page-product-section/UserDashboard";
import Tagline from "@components/home-page-product-section/tagline";
import ProgressBox from "../../components/profile/progress-box/progress-box";
import Link from "next/link";
import router from "next/router";
import ElanteBanner from "@components/home-page-product-section/elante-banner";
import BrandOffers from "@components/home-page-product-section/brand-offers";
import Head from "next/head";
import useIntersectionObserver from "@components/product/useIntersectionObserver";
import BillPayment from "@components/home-page-product-section/bill-payment-services/components";
import PolicyServices from "@components/home-page-product-section/PolicyServices/components";
 import CompleteProfile from "@components/profile/complete-profile";
import Banners from "@components/home-page-product-section/banners";
import Banners2 from "@components/home-page-product-section/banners2";
import Banners3 from "@components/home-page-product-section/banners3";
import Spinner from "@components/ui/loaders/spinner/spinner";
import SearchHistory from "@components/home-page-product-section/search-history";
import { useCreateLogMutation } from "@data/log/use-create-log.mutation";
import UsersCards from "@components/home-page-product-section/user-cards/user-cards-list";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useUpdateCustomerMutation } from "@data/customer/use-update-customer.mutation";
import TopBanners from "@components/home-page-product-section/top-banners";
import Passion from "@components/home-page-product-section/passions";
 

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

    await queryClient.prefetchQuery(
      ["brand-offers", { type: params?.type }],
      fetchBrandOfferQuery,
      {
        staleTime: 60 * 1000,
      }
  ) 
  
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

  const loadMoreRef = useRef();

  const { query } = useRouter();

  const {getLocation} =useLocation();

  const {
    mutate: createLog,
    isLoading: is_loading,
  } = useCreateLogMutation();

  const { mutate: updateProfile } =
  useUpdateCustomerMutation();


  const [scrollPosition, setScrollPosition] = useState(0);
  const {data:userData} = useCustomerQuery();
  
  const userId =  userData?.me?.id;

  console.log('index ', userId);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    const updateProfileAndLog = async () => {
      try {
        await updateProfile(
          {
            id: userData?.me?.id,
            current_location: getLocation,
          },
          {
            onSuccess: (data) => {
              console.log("Location updated Successfully!! ");
            },
            onError: (error) => {
              console.log("Location updateerror:");
              // You can display an error message to the user here.
            },
          }
        );
  
        createLog(
          {
            location: getLocation?.formattedAddress,
            product: "visited",
            type: "search_item",
          },
          {
            onSuccess: (data: any) => {
              // // console.log(data)
            },
          }
        );
      } catch (error) {
        console.log("Error:", error);
      }
    };
  
    updateProfileAndLog();
  
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [userData]);
  


const {
  data,
  isLoading: loading,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
  error,
} = useShopAvailabilityQuery({
  limit: 16 as number,
  search:"",
  location : ((getLocation?.formattedAddress) ? JSON.stringify(getLocation):null ) as any
});



useIntersectionObserver({
  target: loadMoreRef,
  onIntersect: fetchNextPage,
  enabled: hasNextPage,
})


    return (

      <> 
      
      <Head>
      <meta name="msvalidate.01" content="1A1026D1B7AF52339B69AA95E6DFE95C" />
      <title>Shop Save Earn From Nearest Local Brands and Shops with Buylowcal.com</title>
      <meta name="description" content= 'Buy and Earn from Nearest Local Shops | Groceries | Fruits | Vegetables | Salon | Takeaways | Restaurants | Mobile Recharge'/>
      <link rel="canonical" href='https://buylowcal.com'/>
      
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(
      {
        // organization schema 
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Buylowcal",
        "url": "https://buylowcal.com",
        "sameAs": [
          "https://www.facebook.com/buylowcal",
          "https://twitter.com/buylowcal",
          "https://www.instagram.com/buylowcal",
          "https://www.youtube.com/channel/UCs0jYR_99h5GKs0cvRZSg-A",
          "https://www.linkedin.com/company/buylowcal",
          // "https://www.pinterest.com/buylowcal",
          // "https://www.snapchat.com/add/buylowcal",
          "https://www.google.com/search?q=buylowcal&rlz=1C1CHBF_enIN831IN831&oq=buylowcal&aqs=chrome..69i57j0l7.8981j0j7&sourceid=chrome&ie=UTF-8",
          
        ],
        "logo": "https://buylowcal.com/buylowcal-old.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Lowcal Ventures Pvt Ltd Plot No: 130 | Phase-1 | Industrial Area | Chandigarh",
          "addressLocality": "Phase-1 | Industrial Area | Chandigarh",
          "addressRegion": "Chandigarh",
          "postalCode": "	160002",
          "addressCountry": "India"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91 77430 42380",
            "contactType": "customer service"
          }
        ]
      }
      )}} />

      </Head>

        <div className="h-full">

            <div className="fixed z-50 bottom-16 right-10 lg:bottom-10 lg:right-10 flex justify-center items-center">
                    {/* <img src='/up-arrow.png' className="w-12 h-12" onClick={() => window.scrollTo(0, 0)} />  */}
                    <img src='/rocket.png' className={`${scrollPosition > 250 ? 'visible transition-transform duration-150' : 'hidden'} w-12 h-12`} onClick={() => window.scrollTo(0, 0)} /> 
            </div>

        {loading ? (
         <div className="absolute top-0 left-0  h-screen bg-black opacity-80   z-40 w-full">
           {/* <img src='/preloader/cir.gif' className='sticky top-1/2 left-1/2 right- object-contain '/> */}
           {/* <iframe className="mx-auto mt-1/2 h-full " src="https://giphy.com/embed/3ohs7TrCSp7c8ZrxBe" width="80" height="80" frameBorder="0" class="giphy-embed" allowFullScreen>
             </iframe> */}
             <Spinner className="z-50"/>
             
         </div>
        ) : (
        <div className='lg:px-10 md:px-7 h-full'>
          {
            (data?.ShopAvailability?.data?.check==0) ?
            (<StayTuned/>) :
            (
              <div className="relative w-full">

                <CompleteProfile/>
                
                {/* <Tagline/> */}
                <TopBanners/>
                
                {/* <UserDashboard/> */}

                <UsersCards/>
                <Passion/>
                <Banners2/>
                {/* <SearchHistory/> */}
                {/* <BillPayment/> */}
                {/* <PolicyServices/>*/}
                {/* <FeaturedShops /> */}

                {/* <ElanteBanner/>
                <RedBullBanner/>
                <AllCategories/>
                <Banners/>
                <OfferOfTheDay/>
                <Banners3/>
                <BrandOffers/> */}
                {/* <HomePageBanner /> */}
                 
                {/* <FeaturedProducts/> */}
                
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
        <div ref={loadMoreRef} className={`${!hasNextPage ? "hidden" : ""}`}>
                  {
                    (isFetchingNextPage)
                    &&
                    (
                      <>
 
                        <img src="/preloader/cir.gif" 
                             className="w-full mt-10 mx-auto" 
                             style={{width:"10px",height:"10px"}}/>
                      </>
                    ) 
                  }
        </div>
          
        </div>
        </>
    )
    
}
 

home.Layout =  DefaultLayout;
