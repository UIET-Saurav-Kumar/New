
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
// import DocumentMeta from 'react-document-meta';
import Seo from "@components/ui/seo";
import ShopLayout from "@components/layout/shop-layout";


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
  const[shopCategory, setShopCategory] = useState('');

  function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState(null);
     
  
    useEffect(() => {
      
      getShopCategory()
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

  const scrollDirection = useScrollDirection();

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

  // console.log('shop slug is', data?.slug?.includes('chandigarhgrocerystore' ,'kosmetics-india'))
  seoFunction(data);

  const slug = ['chandigarhgrocerystore', 'kosmetics-india'];

  const  getShopCategory = () => {

     setShopCategory(data?.shop_categories?.replace(/[{":,0123456789}]/g,'').slice(5,-3))
  }

  // const metaData = {
  //   title: data?.slug,
  //   description: data?.description,
  //   canonical: pageURL,
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: shopCategory
  //     }
  //   }
  // };

  // console.log('shop data',metaData)

  console.log('data',data);
  

  return (

    <>

        <Head>
          <title>{(data.name?data.name:'')+' '+(data.address.city?data.address.city+" "+data.address.street_address:'')+', Best Discounts and Offers Only Through BuyLowcal.com'}</title>
          <meta name="description" content={(data.name?data.name:'')+' '+(data.address.city?data.address.city+" "+data.address.street_address:'')+' Best '+shopCategory+' deals, offers, discounts and cash backs only through buylowcal.com'} />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

            <div className="relative bg-white lg:bg-gray-100 hidden lg:flex flex-col
                            md:flex-row md:justify-between md:items-start">

                                  {/* // button to scroll to the top of the page when user has scrolled way down */}
                                  <div className="fixed z-50 bottom-10 right-10 flex justify-center items-center">
                                    <img src='/up-arrow.png' className="w-12 h-12" onClick={() => window.scrollTo(0, 0)} /> 
                                  </div>

                                  {/* <div className="fixed z-50 bottom-10 right-10 flex justify-center items-center">
                                    <button onClick={() => scrollToProduct()} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full">
                                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.914 9.914L10 7.828V16H8V7.828l-2.086 2.086L4.586 9.914l8.486-8.486z"/></svg>
                                    </button>
                                  </div> */}

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

                          {/* <HidingHeader> */}
                          <div className={` sticky ${ scrollDirection === "down" ? "-top-32" : "top-0"}   transition-all duration-300 sticky z-50 bg-white top-0`}>                                              
                              <CategoryDropdownSidebar data={data} />
                          </div>
                          {/* </HidingHeader>  */}

                          <div className='relative top-0 flex flex-col'> 

                              { categoryData?.categories?.data?.length ? 
                                <> 
                                  <div id='category-dropdown-sidebar'  
                                      className='flex border bg-white flex-col w-full'>
    
                                      <h1 style={{top:'155px'}} id='product-heading' className="text-lg sticky  bg-gray-100  py-3 px-2  font-semibold text-gray-600 font-mono mt-5 transition-transform duration-75">  
                                        { query?.category?.replace(/\b\w/g, (l :any) => l.toUpperCase())   } Products
                                      </h1> 
                                    
                                  </div> 
                                </> : ' '  
                              }
                                <div id='product-feed' className="static  z-10 top-10 w-full">
                                  {data && 
                                // <ShopProductFeed shopId={data.id} />
                                    <Feed shopData={data} shopId={data.id} />
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
      <div className='block lg:hidden w-full'>

          <ShopMobileView shopData={data} data={data}/>

      </div>
      {/* </DocumentMeta> */}
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

ShopPage.Layout = ShopLayout;
export default ShopPage;





// {
//   "id":3,
//   "owner_id":1,
//   "name":"Bags Shop",
//   "slug":"bags-shop",
//   "description":"The Bag shop is the best shop around the city. This is being run under the store owner and our aim is to provide quality product and hassle free customer service.",
//   "cover_image":{"id":"889","original":"https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/887/Untitled-1-%281%29.jpg","thumbnail":"https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/887/conversions/Untitled-1-%281%29-thumbnail.jpg"},
//   "logo":{"id":"888","original":"https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/886/Backpack.png","thumbnail":"https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/886/conversions/Backpack-thumbnail.jpg"},
//   "is_active":1,
//   "address":{"zip":"35203","city":"Michigan","state":"Alabama","country":"USA","street_address":"1740 Bedford Street"},
//   "settings":{"contact":"01920192102","socials":[{"url":"https://www.facebook.com/","icon":"FacebookIcon"},{"url":"https://www.instagram.com/","icon":"InstagramIcon"}],"website":"https://redq.io/","location":{"lat":28.6673631,"lng":77.2973812,"zip":"110032","city":"Delhi","state":"DL","country":"India","formattedAddress":"Bazaar St, Vishwas Nagar, Shahdara, Delhi, 110032, India"}},"shop_categories":"[{\"name\":\"salon & spa\",\"id\":5},{\"name\":\"Groceries\",\"id\":3},{\"name\":\"Fruits\",\"id\":2},{\"name\":\"Pharmacy\",\"id\":4}]","is_featured":1,"commission":null,"commission_type":null,"gst_number":null,"fssai_number":null,"tan_number":null,"pan_number":null,"gst_certificate":null,"fssai_certificate":null,"cancelled_cheque":null,"delivery_status":1,"free_delivery_order_value":"50","delivery_charges":"100","created_at":"2021-06-27T03:47:23.000000Z","updated_at":"2022-01-09T10:20:40.000000Z","orders_count":43,"products_count":57,"categories":[],"owner":{"id":1,"name":"Store Owner","email":"store_owner@demo.com","phone_number":"917436874843","email_verified_at":null,"created_at":"2021-06-27T04:13:00.000000Z","updated_at":"2021-06-27T04:13:00.000000Z","is_active":1,"shop_id":null,"invited_by":null,"code":null},"shop_category":null}