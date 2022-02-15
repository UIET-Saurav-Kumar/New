
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
import Avatar from 'react-avatar';
import OfferCards from "./offer-cards";
import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
import { useRouter } from "next/router";
import RelatedProducts from "@components/product/product-details/related-products";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import { fetchShopSeo } from "@data/shop/use-shop.query";
import Feed from "@components/product/feed";
import { useEffect } from "react";
import { scroller, Element } from "react-scroll";



const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);
const imageCheck = (logo: any , record:any, imgsize:any, imgDim:any, classname: string) => {
  console.log('logo',logo)
  let check = false;
  let splitLength = logo?.split("/").length;
  let lastSplit = logo?.split("/")[splitLength - 1];
  if (lastSplit != "") {
    check = true;
  }
  return (check ? <Image src={logo} alt={record?.name}  width={1500} height={200} className={classname} />:<Avatar name={record?.name} size={imgsize} round={imgDim}  />);
}

const ShopPage = ({ data }: any) => {
  const router = useRouter();
  const { pathname, query } = router;

  // useEffect(() => {
  //  // scroll to product feed when user searches for a product
  //   if (query.search) {
  //     scroller.scrollTo("product-feed", {
  //       duration: 500,
  //       delay: 100,
  //       smooth: true,
  //       offset: -100,
  //     })
  //   }
  // }, [query.text, query.category]);


  
  const { t } = useTranslation("common") ;
  const { width } = useWindowSize() ;

  const { openModal } = useModalAction();

  function handleCategories() {
    return openModal("SHOP_MOBILE_CATEGORIES");
  }

  function handlePayment() {
    return openModal("SHOP_PAYMENT_FORM");
  }

  // useeffect  window.scrollTo(0, 1000)
  useEffect(() => {
    window.scrollTo(0, 1110);
  }, []);


  const {
    data : categoryData,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    type: query.slug as string,
  });
  const seoFunction = async(data:any) => {

    const seoData = await fetchShopSeo(data.slug)

  };

  //after searching scroll down to the product section
  const scrollToProduct = () => {
    const element = document.getElementById("product-feed");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  seoFunction(data);
  return (

    <>

          <div className="bg-white lg:bg-gray-100 hidden lg:flex flex-col md:flex-row md:justify-between  
                            md:items-start md:p-8" >

                    <div className='hidden  p-3 lg:flex w-full flex-col '>

                      {/* <div className="hidden lg:space-x-5 xl:space-x-10  lg:flex justify-between "> */}

                          

                          <div className='flex flex-col overflow-y-scroll space-y-4 w-full'>  

                              <div className='flex w-full h-80 border'> 

                                  <div className='h-full w-96'>  
                                    <ShopProfileCard data={data} />
                                  </div>
                                  
                                  <div className='flex  w-full'>
                                    {imageCheck(data?.cover_image?.original, data, '317', false,'h-full w-full object-fill')}
                                  </div>
            
                              </div>
                            
                           
                            <div className='flex w-full'> 
                                <WebShopBanner/>
                            </div>

                              {/* <div className='w-full mt-7'> */}
                                <ShopDescription data = {data}/>
                              {/* </div> */}

                              <OfferCards/>

                          </div>

                          <div className='  relative top-0 flex flex-col  '> 
                          {categoryData?.categories?.data?.length ? 
                          <> 
                          <div style={{top:'85px'}} className='flex z-50 sticky mt-5 border bg-white   flex-col w-full'>   
                                    <CategoryDropdownSidebar/>
                              

                              <h1 style={{top:'155px'}} id='product-heading' className="text-lg sticky border-t bg-white  py-3 px-2 z-50 font-semibold text-gray-600 font-mono mt-5 transition-transform duration-75">  
                                { query?.category?.replace(/\b\w/g, (l :any) => l.toUpperCase())   } Products
                              </h1> 
                          </div> </> : ' '  }
                              <div  className="static  z-10 top-10 w-full">{data && 
                              // <ShopProductFeed shopId={data.id} />
                              <Feed shopId={data.id}/>
                              }</div>
                        </div> 


                       {/* </div> */}
                         
                         {/* bottom corner button */}
                           

                           {/* <div onClick={handleCategories} 
                                className =' fixed  z-1000  bottom-16 -right-2 sm:right-2
                                   px-3 p-2 rounded-lg  text-white  
                                   items-center space-x-2 '> 

                                <button className='flex flex-col items-center'>
                                  <img src='/menu.png' 
                                      className='h-14 w-14 opacity-80 active:opacity-100' /> 
                                  <p className='text-gray-900 font-bold'> Categories </p>
                                </button>
                           </div> */}

          </div>

           

      
      
      {width > 1023 && <CartCounterButton />}

    </div>
      <div className='block lg:hidden w-screen'>

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
