import { useEffect } from "react";
import DefaultLayout from "@components/layout/default-layout";
import { useWindowSize } from "@utils/use-window-size";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { scroller, Element } from "react-scroll";
import ImageSlider from '@components/home-page-image-slider/ImageSlider';
import FilterBar from '@components/common/filter-bar';
import ProductFeed from "@components/product/feed";
import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
import AllCategories from '@components/home-page-product-section/AllCategories';
import FeaturedShops from '@components/home-page-product-section/FeaturedShops';
import FeaturedStores from '@components/home-page-product-section/FeaturedStores';
import FeaturedProducts from '@components/home-page-product-section/FeaturedProducts';
import ProductGrid from '@components/home-page-product-section/ProductGrid';
import AmazonShops  from '@components/home-page-product-section/AmazonShops'
import dynamic from "next/dynamic";
import Footer from '@components/footer/Footer';
import { GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { fetchFeatureProduct } from "@data/home/use-feature-product-query";
import { fetchSettings } from "@data/settings/use-settings.query";
import { fetchCategories } from "@data/home/use-categories-query";
import { fetchFeatureShop } from "@data/home/use-feature-shop-query";
import { fetchFeatureStore } from "@data/home/use-feature-e-store";
import { fetchOfferQuery } from "@data/home/use-offer-query";


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

useEffect(() => {
if (query.text || query.category) {
    scroller.scrollTo("grid", {
    smooth: true,
    offset: -110,
    });
}
}, [query.text, query.category]);
    return (
        <>
    {/* { query.text ?
        <Element name="grid" className="flex flex-1 border-t border-solid border-gray-200 border-opacity-70">
            <CategoryDropdownSidebar />
            <main className="flex-1">
                <ProductFeed />
            </main>
        </Element> : */}
    

        <div className='lg:px-10 md:px-7'>
            <ImageSlider/>
            
            <AllCategories/>
            <FeaturedShops />
            
            <AmazonShops />
            <ProductGrid/>
            <FeaturedProducts/>
            
            
        </div>
    {/*  } */}
        {width > 1023 && 
            <CartCounterButton />
        }
        </>
    )
}

home.Layout = DefaultLayout;
