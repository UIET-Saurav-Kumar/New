
import Image from "next/image";
import ShopProductFeed from "@components/product/feed-shop";
import { fetchShop } from "@data/shop/use-shop.query";
import { useTranslation } from "next-i18next";
import { useWindowSize } from "@utils/use-window-size";
import ShopProfileCard from "@components/profile/profile-card";
import dynamic from "next/dynamic";
import url from "@utils/api/server_url";
import { GetStaticPathsContext, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { QueryClient } from "react-query";
import { fetchProducts } from "@data/product/use-products.query";
import { fetchSettings } from "@data/settings/use-settings.query";
import { dehydrate } from "react-query/hydration";
import ShopCategoryCard from "@components/category/shop-category-card";
import Navbar from "@components/layout/navbar/navbar";
import ShopPaymentForm from "./shop-payment-form";
import ShopDescription from "./shop-description";
import ShopMobileView from "./shop-mobile-view";
import ShopBanner from "./shop-banner";
import WebShopBanner from "./web-shop-banner";
import { useModalAction } from "@components/ui/modal/modal.context"
import CategoryCard from "@components/ui/category-card";
import AllCategories from "@components/home-page-product-section/AllCategories";

import Layout from "@components/layout/layout";


const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);

const ShopPage = ({ data }: any) => {
  
  const { t } = useTranslation("common") ;

  const { width } = useWindowSize() ;

  const { openModal } = useModalAction();

  function handleCategories() {
    return openModal("SHOP_MOBILE_CATEGORIES");
  }

  function handlePayment() {
    return openModal("SHOP_PAYMENT_FORM");
  }

  return (

    <>
       {/* <Navbar label='' /> */}

          <div className="bg-white lg:bg-gray-100 hidden lg:flex flex-col md:flex-row md:justify-between  
                            md:items-start md:p-8" >

                    <div className='hidden  p-3 lg:flex w-full flex-col '>

                      <div className="hidden lg:space-x-5 xl:space-x-10  lg:flex justify-between ">

                          {/* <div className=' sticky top-24 overflow-hidden lg:w-1/2 xl:w-1/4 flex h-full flex-col'>
                            <ShopPaymentForm />
                            <ShopCategoryCard data={data} className="" />
                          </div> */}

                            {/* <Image
                              alt={t("heading")}
                              src={data?.cover_image?.original! ?? "/product-placeholder.svg"}
                              height={400}
                              width={1200}
                              // layout="fill"
                              objectFit="fill"
                            /> */}

                          <div className='flex flex-col overflow-y-scroll  w-full'>  

                              <div className='flex  h-80 border'> 

                                  <div className='h-full w-96'>  
                                    <ShopProfileCard data={data} />
                                  </div>
                                  
                                 <div className='flex w-full'>
                                    <img
                                    alt={t("heading")}
                                    src={data?.cover_image?.original! ?? "/product-placeholder.svg"}
                                    className='object-fill  h-full w-full rounded-lg  '
                                    // layout="fill"
                                    // objectFit="contain"
                                  />
                                   </div>
            
                              </div>
                            
                           
                               <WebShopBanner/>

                               <ShopDescription data = {data} />

                            { data && <ShopProductFeed shopId={data.id} /> }

                          </div>

                       </div>
                         
                         {/* bottom corner button */}
                           

                           <div onClick={handleCategories} 
                                className ='fixed  z-1000 lg:block hidden bottom-16 -right-2 sm:right-2
                                   px-3 p-2 rounded-lg  text-white  
                                   items-center space-x-2'> 

                                <button className='flex flex-col items-center'>
                                  <img src='/menu.png' 
                                      className='h-14 w-14 opacity-80 active:opacity-100' /> 
                                  <p className='text-gray-900 font-bold'> Categories </p>
                                </button>
                          </div>

          </div>

      
      {width > 1023 && <CartCounterButton />}

    </div>
    <div className='block lg:hidden w-full'>

        <ShopMobileView data={data}/>
        

      </div>
    </>
  );
};

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  
  const { data } = await fetch(
    `${url}/all-shop?is_active=1`
  ).then((res) => res.json());
  
  const paths = data?.flatMap((shop: any) =>
    locales?.map((locale) => ({ params: { slug: shop.slug }, locale }))
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: "blocking" };
}
// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("settings", fetchSettings);

  try {
    const shop = await fetchShop(params!.slug as string);
    await queryClient.prefetchInfiniteQuery(
      ["products", { shop_id: shop?.id }],
      fetchProducts
    );

    return {
      props: {
        data: shop,
        ...(await serverSideTranslations(locale!, ["common"])),
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 120,
    };

  } catch (error) {
    return {
      notFound: false,
    };
  }
};

ShopPage.Layout = Layout;
export default ShopPage;
