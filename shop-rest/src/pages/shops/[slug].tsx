
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
import { HidingHeader } from 'hiding-header-react'
import { useState } from "react";
import { getReview } from '@utils/get-review';


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

  function openReviewModal() {
    openModal('REVIEW_RATING', {
      shop_id: data.id,
      name: data?.name,
      my_review: getReview(data),
      shop_review: data?.review,
    });
  }


  // useEffect(() => {
  
  //   if (query.search) {
  //     scroller.scrollTo("product-feed", {
  //       duration: 500,
  //       delay: 100,
  //       smooth: true,
  //       offset: -100,
  //     })
  //   }
  // }, [query.text, query.category]);

  const [pageURL, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(window.location.href)
  }, []);
  
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
    pageURL.includes('chandigarhgrocerystore') ? window.scrollTo(0, 670) : window.scrollTo(0, 0)
  }, []);

  // var ProductFeed = document.getElementById("product-feed");

  // console.log('offset value', ProductFeed?.offsetTop)


  const {
    data : categoryData,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    type: query.slug as string,
  });

  const seoFunction = async(data:any) => {

    const seoData = await fetchShopSeo(data?.slug)

  };

  const scrollToProduct = () => {
    const element = document.getElementById("product-feed");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  console.log('shop data',data)

  console.log('shop slug is', data?.slug?.includes('chandigarhgrocerystore' ,'kosmetics-india'))
  seoFunction(data);

  const slug = ['chandigarhgrocerystore', 'kosmetics-india'];
  

  return (

    <>

              <div className="bg-white lg:bg-gray-100 hidden lg:flex flex-col md:flex-row md:justify-between  
                                md:items-start ">

                    <div className='flex w-full  lg:flex flex-col'>

                      {/* <div className="hidden lg:space-x-5 xl:space-x-10  lg:flex justify-between "> */}

                          <div className = 'hidden lg:flex flex-col overflow-y-scroll space-y-4  w-full'>  

                              <div className='flex w-full mt-10 h-80 border'> 

                                { slug?.some(el => data?.slug?.includes(el)) ? null :
                                    ( <div className='h-full w-96'>  
                                         <ShopProfileCard data={data} />
                                      </div> )  }
                                    
                                    { slug?.some(el => data?.slug?.includes(el)) ? null :
                                    ( <div className='flex w-full  '>
                                      {imageCheck(data?.cover_image?.original, data, '317', false,'h-full w-full object-fill')}
                                    </div> )  }
                   
                              </div> 
           
                            
                              {/*                                 
                                { data.slug !== 'chandigarhgrocerystore' ? 
                                ( <div className='flex w-full'> 
                                      <WebShopBanner/>
                                  </div>)
                                  : null
                                } */}

                                  { slug?.some(el => data?.slug?.includes(el)) ? null :
                                  //  (<div className='w-full mt-7'> 
                                      (<ShopDescription data = {data}/>
                                    // </div>
                                    )
                                 
                                  }

                                    {/* <OfferCards/> */}
                          </div>

                            <div className='lg:hidden px-2  w-full grid grid-cols-1 sm:flex'>

                              { slug?.some(el => data?.slug?.includes(el))  ? 
                                 null : ( <div className='hidden sm:block w-48 h-38 sm:h-72 sm:w-80 md:h-72 lg:w-96'> 
                                          <ShopProfileCard data={data} /> 
                                      </div>)  }

                                     
                                  
                                  {/* <div className='w-full flex-grow'>
                                    <img alt={t("heading")} 
                                          className='object-cover h-38 sm:h-72 rounded-lg xs+++:rounded-l-none md:h-72 lg:w-2/3 w-full'
                                          src={data?.cover_image?.original! ?? "/product-placeholder.svg"}
                                    />
                                  </div> */}

                                  { slug?.some(el => data?.slug?.includes(el)) ? null
                                 : ( <div className='block sm:hidden'> 
                                      <ShopProfileCard data={data}/> 
                                  </div> )  }

                                          
                            </div>

                            { data?.slug == 'chandigarhgrocerystore' ? ( 
                             <div className="w-full -mt-80 object-contain">
                                    <img src='/grocery-web.jpg' className="object-contain" />
                             </div> ) : null }

                             { data?.slug == 'kosmetics-india' ? ( 
                             <div className="w-full -mt-80 object-contain">
                                    <img src='/kosmetics.jpg' className="object-contain" />
                             </div> ) : null }

                          <HidingHeader>
                                                                               
                              <CategoryDropdownSidebar data={data} />
                                         
                          </HidingHeader> 

                          <div className='relative top-0 flex flex-col'> 
                              { categoryData?.categories?.data?.length ? 
                              <> 
                                <div id='category-dropdown-sidebar'  
                                    className='flex border bg-white flex-col w-full'>
   
                                    <h1 style={{top:'155px'}} id='product-heading' className="text-lg sticky  bg-gray-100  py-3 px-2  font-semibold text-gray-600 font-mono mt-5 transition-transform duration-75">  
                                      { query?.category?.replace(/\b\w/g, (l :any) => l.toUpperCase())   } Products
                                    </h1> 
                                  
                                </div> 
                              </> : ' '  }
                                <div id='product-feed' className="static  z-10 top-10 w-full">{data && 
                                // <ShopProductFeed shopId={data.id} />
                              <>  <button
                                onClick={openReviewModal}
                                className="cursor-pointer text-sm font-semibold text-body transition-colors hover:text-accent"
                              >
                                {getReview(data)
                                  ? t('Update Review')
                                  : t('text-write-review')}
                              </button>
                                    <Feed shopId={data.id} />
                                    </>
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
