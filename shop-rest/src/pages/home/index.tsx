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
<<<<<<< HEAD
const ProductFeedLoader = dynamic(
  () => import("@components/ui/loaders/product-feed-loader")
);
=======
>>>>>>> cdc5232ff82bd8c8aac5f8d781042a9877105a09


const ProductFeedLoader = dynamic(
  () => import("@components/ui/loaders/product-feed-loader")
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

<<<<<<< HEAD
  const { width } = useWindowSize();
  const { query } = useRouter();
  const {getLocation} =useLocation()
  const {
    data,
    isLoading: loading,
    error,
  } = useShopAvailabilityQuery({
    limit: 16 as number,
    search:"",
    location : ((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any
  });
  useEffect(() => {
  if (query.text || query.category) {
      scroller.scrollTo("grid", {
      smooth: true,
      offset: -110,
      });
  }
  }, [query.text, query.category]);
=======
const { width } = useWindowSize();
const { query } = useRouter();
const {getLocation} =useLocation()


const {
  data,
  isLoading: loading,
  error,
} = useShopAvailabilityQuery({
  limit: 16 as number,
  search:"",
  location : ((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any
});
>>>>>>> cdc5232ff82bd8c8aac5f8d781042a9877105a09

    return (
        <>
<<<<<<< HEAD
        {loading ? (
=======

    {loading ? (
>>>>>>> cdc5232ff82bd8c8aac5f8d781042a9877105a09
          <ProductFeedLoader limit={3} />
        ) : (
        <div className='lg:px-10 md:px-7'>
          {
            (data?.ShopAvailability?.data?.check==0)?
            (<StayTuned/>):
            (
              <>
                <ImageSlider/>
                <AllCategories/>
                <FeaturedShops />
                <AmazonShops />
                <ProductGrid/>
                <FeaturedProducts/>
              </>
            )
          } 
<<<<<<< HEAD
        </div>
        )
=======
            
            
        </div>
    )
>>>>>>> cdc5232ff82bd8c8aac5f8d781042a9877105a09
       }
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

home.Layout = DefaultLayout;
