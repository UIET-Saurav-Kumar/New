
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
import { fetchProducts } from "@data/product/use-products.query";
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

const imageCheck = (logo: any , record:any, imgsize:any, imgDim:any, classname: string) => {
  // console.log('logo',logo)
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
  const { openModal } = useModalAction();

 
  const [placeId, setPlaceId] = useState([]);

  const [reviews, setReviews] = useState([]);

  const [placePhotos, setPlacePhotos] = useState([]);

  const [totalRating, setTotalRating] = useState('');

  const [open , setOpen] = useState('');

  const [rating, setRating] = useState('');

  function openReviewModal() {
    openModal('REVIEW_RATING', {
      shop_id: data.id,
      name: data?.name,
      my_review: getReview(data),
      shop_review: data?.review,
    });
  }

  console.log('shop data',data)


  console.log('utm', query.utm_campaign);

  const[element, setElement] = useState(false);

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
   
  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();
  
  // function handleJoin() {
  //   return  openModal("OTP_REGISTER");
  // }

  const utmquery = query?.utm_campaign;

  const { mutate: createLog} = useCreateLogMutation();

  const [pageURL, setPageUrl] = useState('');

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
        console.log(data)
      },
    });

    checkUtm(query.utm_source, query.utm_campaign,query.shop_id)
    setPageUrl(window.location.href);
    // query.utm_source == 'shop_qr' ? (!isAuthorize ?  openModal("OTP_REGISTER") : null) : null;
  },  [query.utm_campaign ]);
  
  const { t } = useTranslation("common");

  const { width } = useWindowSize();

  function handleCategories() {
    return openModal("SHOP_MOBILE_CATEGORIES");
  }

  function handlePayment() {
    return openModal("SHOP_PAYMENT_FORM");
  }

  const slug = ['chandigarh-grocery-store', 'kosmetics-india'];

  function checkElement(){
    return slug?.some(el => data?.slug?.includes(el))
 }

  // useeffect  window.scrollTo(0, 1000)
  useEffect(() => {

    // pageURL.includes('?utm_source') ? (!isAuthorize ? handleJoin() : null) : null;

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

  const scrollDirection = useScrollDirection();

  // var ProductFeed = document.getElementById("product-feed");

  // // console.log('offset value', ProductFeed?.offsetTop)


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

  // // console.log('shop slug is', data?.slug?.includes('chandigarhgrocerystore' ,'kosmetics-india'))
  seoFunction(data);


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

  // // console.log('shop data',metaData)

  console.log('lat', data?.settings?.location?.lng)

  const shop_name = data?.name;
 

function handleApiPhotos(data) {
  setPlacePhotos(data)
}

function handleRating(data) {
  setRating(data);
}

function handleOpen(data) {
  setOpen(data);
}

function handleReviews(data) {
  setReviews(data);
}

function handleTotalRating(data) {
  setTotalRating(data);
}
 
  console.log('placePhotos',placePhotos,reviews);

  function handleImage(data){
    console.log('modal data',data)
    openModal('SHOP_IMAGE_POPOVER',{
      data:placePhotos
    })
  }

  console.log('schema',reviews);
  const basePath = 'https://buylowcal.com/shops/' 

  console.log('s data',data)

  const user_lat = getLocation?.lat;
  const user_lng = getLocation?.lng;

  const shop_lat = data?.settings?.location?.lat;
  const shop_lng = data?.settings?.location?.lng;

  const map_url = `https://www.google.com/maps/dir/?api=1&destination=${shop_lat},${shop_lng}&travelmode=driving&dir_action=navigate&origin=${user_lat},${user_lng}`;
   console.log('map',map_url);
  

  return (

    <>

        <Head>

          <title>{(data.name?data.name:'')+' '+', Best Discounts and Offers Only Through BuyLowcal.com'}</title>
          <meta name="description" content={(data?.description?data?.description:'')+' '+' Best '+shopCategory+' deals, offers, discounts and cash backs only through buylowcal.com'} />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="canonical" href={`https://buylowcal.com/shops/${data?.slug}`}/>
          
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(
            {
              "@context": "http://schema.org",
              "@type": "Store",
              "name": data?.name,
              "description": data?.description,
              "image": data?.cover_image?.original,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": data?.settings?.location?.formattedAddress,
                "addressLocality": data?.settings?.location?.sector,
                "addressRegion": data?.settings?.location?.state,
                "postalCode": data?.settings?.location?.zip,
                "addressCountry": data?.settings?.location?.country
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": data?.settings?.location?.lat,
                "longitude": data?.settings?.location?.lng
              },
              "url": basePath+data?.slug,
              "telephone": data?.settings?.contact,
              "review": reviews?.length ?
              reviews?.map((review:any) => ({
                "@type": "Review",
                "author": review?.author_name,
                "datePublished": review?.relative_time_description,
                "description": review?.text,
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": review?.rating,
                }
              })) :  {
                "@type": "Review",
              "author": 'Gaurav',
              "datePublished": '1 month ago',
              "description": 'Best Product and Services',
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": '4.5',
              }
            },
              
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": (reviews?.length && reviews?.reduce((acc, review) => acc + review?.rating, 0) / reviews?.length).toFixed(1) ,
                "reviewCount": reviews.length ? reviews?.length : '4.5'
              }
            }
            )
          }
        }
          />

          
        </Head>

                <div className="relative bg-white lg:bg-gray-100 hidden lg:flex flex-col
                                md:flex-row md:justify-between md:items-start">

 
                        <div className="fixed z-50 bottom-10 right-10 flex justify-center items-center">
                          <img src='/up-arrow.png' className="w-12 h-12" onClick={() => window.scrollTo(0, 0)} /> 
                        </div>

                        

                    <div className='flex w-full lg:flex flex-col'>

 
                          <div className = 'hidden lg:flex flex-col overflow-y-scroll space-y-4  w-full'>  

                            <div className={`${checkElement() ? 'h-0' : 'h-80'} flex w-full mt-10 border`}> 

                              { checkElement() ? null 
                                :
                                ( <div className='h-full w-96'>  
                                    <ShopProfileCard reviews={reviews} totalRating={totalRating} rating={rating} open={open} data={data} />
                                  </div> )  }
                                
                                { slug?.some(el => data?.slug?.includes(el)) ? (
                                  data?.slug == 'chandigarh-grocery-store' ?
                                <Image src='/grocery.jpg' objectFit='cover' layout='intrinsic' 
                                width={1851} height={320} />
                                : data?.slug == 'kosmetics-india' ?
                                <Image src='/kosmetics.jpg' objectFit='cover' layout='intrinsic' 
                                width={1851} height={320} /> : null
                                )
                                :
                                ( <div className='flex w-full  '>
                                  {imageCheck(data?.cover_image?.original, data, '317', false,'h-full w-full object-fill')}
                                </div> )  }

                            </div> 

                            <div className={`${!checkElement() ? 'hidden' : 'w-full h-full border'}`}>
                                {
                                data?.slug == 'chandigarh-grocery-store' ?
                                  <Image src='/grocery-web.jpg' className="" priority={true} layout="intrinsic" height={570} width={1826} objectFit="fill"  />
                                : data?.slug == 'kosmetics-india' ?
                                <Image src='/kosmetics.jpg' objectFit='fill' layout='intrinsic' 
                                      width={1826} height={570} /> : null
                                }
                            </div>

                           

                                  { slug?.some(el => data?.slug?.includes(el)) ? null :
                                       (<ShopDescription mapUrl={map_url} data = {data}/>
                                     )
                                 
                                  }

                                   
                          </div>

                            <div className = 'lg:hidden px-2  w-full grid grid-cols-1 sm:flex'>

                              { slug?.some(el => data?.slug?.includes(el))  ? 
                                 null : ( <div className='hidden sm:block w-48 h-38 sm:h-72 sm:w-80 md:h-72 lg:w-96'> 
                                         <ShopProfileCard reviews={reviews} totalRating={totalRating} rating={rating} open={open} data={data}   /> 
                                      </div>)  }
                  
                                

                                  { slug?.some(el => data?.slug?.includes(el)) ? null
                                 : ( <div className='block sm:hidden'> 
                                      <ShopProfileCard reviews={reviews} totalRating={totalRating} rating={rating} open={open} data={data}/> 
                                  </div> )
                              }
 
                            </div>

                           
                          <div className='flex flex-col space-y-2'> 
                            <div className={` sticky ${ scrollDirection === "down" ? "-top-32" : "top-0"}   transition-all duration-300 sticky z-30 bg-white top-0`}>                                              
                                <CategoryDropdownSidebar data={data} />
                            </div>
                            <div className="">
                              <div className={`flex  gap-3 w-full px-2 overflow-x-scroll`}>
                                    <PlacePhotos handleImage={handleImage}  
                                               showImages = {true}
                                               showLogoImg = {false}
                                               data={data} shopName={data?.name} 
                                               handlePhotos={handleApiPhotos}
                                               handleRating={handleRating}
                                               handleTotalRating={handleTotalRating}
                                               handleOpen={handleOpen}
                                               handleReviews={handleReviews} />
                                     
                              </div>
                            </div>
                          </div>
                          {/* </HidingHeader>  */}

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
      <div className='block lg:hidden w-full'>

          <ShopMobileView mapUrl={map_url} reviews={reviews} totalRating={totalRating} rating={rating} open={open}
           pageURL={pageURL} shopData={data} data={data} placePhotos={placePhotos}/>

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

ShopPage.Layout =  DefaultLayout;
export default ShopPage;


