
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
                                <div id='product-feed' className="static z-10 top-10 w-full">
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





// old code
// import Image from "next/image";
// import Head from 'next/head'
// import ShopProductFeed from "@components/product/feed-shop";
// import { fetchShop } from "@data/shop/use-shop.query";
// import { useTranslation } from "next-i18next";
// import { useWindowSize } from "@utils/use-window-size";
// import ShopProfileCard from "@components/profile/profile-card";
// import dynamic from "next/dynamic";
// import url from "@utils/api/server_url";
// import { GetStaticPathsContext, GetStaticProps } from "next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { QueryClient } from "react-query";
// import { fetchProducts } from "@data/product/use-products.query";
// import { fetchSettings } from "@data/settings/use-settings.query";
// import { dehydrate } from "react-query/hydration";
// import ShopCategoryCard from "@components/category/shop-category-card";
// import Navbar from "@components/layout/navbar/navbar";
// import ShopPaymentForm from "./shop-payment-form";
// import ShopDescription from "./shop-description";
// import ShopMobileView from "./shop-mobile-view";
// import ShopBanner from "./shop-banner";
// import WebShopBanner from "./web-shop-banner";
// import { useModalAction } from "@components/ui/modal/modal.context"
// import CategoryCard from "@components/ui/category-card";
// import AllCategories from "@components/home-page-product-section/AllCategories";
// import Layout from "@components/layout/layout";
// import Avatar from 'react-avatar';
// import OfferCards from "./offer-cards";
// import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
// import { useRouter } from "next/router";
// import RelatedProducts from "@components/product/product-details/related-products";
// import { useCategoriesQuery } from "@data/category/use-categories.query";
// import { fetchShopSeo } from "@data/shop/use-shop.query";
// import Feed from "@components/product/feed";
// import { useEffect } from "react";
// import { scroller, Element } from "react-scroll";
// import { HidingHeader } from 'hiding-header-react'
// import { useState } from "react";
// import { getReview } from '@utils/get-review';
// // import DocumentMeta from 'react-document-meta';
// import Seo from "@components/ui/seo";
// import ShopLayout from "@components/layout/shop-layout";
// import PromotionSlider from "@components/slider/promotion-slider";
// import CoverImageSlider from "./cover-image-slider";
// import ImageSlider from "./slider";
// import { Logo } from "@components/";


// const CartCounterButton = dynamic(
//   () => import("@components/cart/cart-counter-button"),
//   { ssr: false }
// );

// const imageCheck = (logo: any , record:any, imgsize:any, imgDim:any, classname: string) => {
//   console.log('logo',logo)
//   let check = false;
//   let splitLength = logo?.split("/").length;
//   let lastSplit = logo?.split("/")[splitLength - 1];
//   if (lastSplit != "") {
//     check = true;
//   }
//   return (check ?    < Image        quality='40' src={logo} alt={record?.name}  width={1500} height={200} className={classname} />:<Avatar name={record?.name} size={imgsize} round={imgDim}  />);
// }

// const ShopPage = ({ data }: any) => {
//   const router = useRouter();
//   const { pathname, query } = router;

//   function openReviewModal() {
//     openModal('REVIEW_RATING', {
//       shop_id: data.id,
//       name: data?.name,
//       my_review: getReview(data),
//       shop_review: data?.review,
//     });
//   }

//   const {cover_image} = data;

//   console.log('shopdata',data);


//   // useEffect(() => {
  
//   //   if (query.search) {
//   //     scroller.scrollTo("product-feed", {
//   //       duration: 500,
//   //       delay: 100,
//   //       smooth: true,
//   //       offset: -100,
//   //     })
//   //   }
//   // }, [query.text, query.category]);

//   const [pageURL, setPageUrl] = useState('');

//   useEffect(() => {
//     setPageUrl(window.location.href)
//   }, []);
  
//   const { t } = useTranslation("common");

//   const { width } = useWindowSize();

//   const { openModal } = useModalAction();

//   function handleCategories() {
//     return openModal("SHOP_MOBILE_CATEGORIES");
//   }

//   function handlePayment() {
//     return openModal("SHOP_PAYMENT_FORM");
//   }

//   // useeffect  window.scrollTo(0, 1000)
//   useEffect(() => {
//     pageURL.includes('chandigarh-grocery-store') ? window.scrollTo(0, 670) : window.scrollTo(0, 0)
//   }, []);
//   const[shopCategory, setShopCategory] = useState('');

//   function useScrollDirection() {
//     const [scrollDirection, setScrollDirection] = useState(null);
     
  
//     useEffect(() => {
      
//       getShopCategory()
//       let lastScrollY = typeof window !== "undefined" ?  window.pageYOffset : '';
  
//       const updateScrollDirection = () => {
//         const scrollY = window.pageYOffset;
//         const direction = scrollY > lastScrollY ? "down" : "up";
//         if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
//           setScrollDirection(direction);
//         }
//         lastScrollY = scrollY > 0 ? scrollY : 0;
//       };
//       window.addEventListener("scroll", updateScrollDirection); // add event listener
//       return () => {
//         window.removeEventListener("scroll", updateScrollDirection); // clean up
//       }
//     }, [scrollDirection]);
  
//     return scrollDirection;
//   };

//   const scrollDirection = useScrollDirection();

//   // var ProductFeed = document.getElementById("product-feed");

//   // console.log('offset value', ProductFeed?.offsetTop)


//   const {
//     data : categoryData,
//     isLoading: loading,
//     error,
//   } = useCategoriesQuery({
//     type: query.slug as string,
//   });

//   const seoFunction = async(data:any) => {

//     const seoData = await fetchShopSeo(data?.slug)

//   };

//   const scrollToProduct = () => {
//     const element = document.getElementById("product-feed");
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // console.log('shop slug is', data?.slug?.includes('chandigarh-grocery-store' ,'kosmetics-india'))
//   seoFunction(data);

//   const slug = ['chandigarh-grocery-store', 'kosmetics-india'];

//   const  getShopCategory = () => {
//      setShopCategory(data?.shop_categories?.replace(/[{":,0123456789}]/g,'').slice(5,-3))
//   }

//   //array of default cover image based on shop category 
// //  let Groceries =  'https://cdn2.f-cdn.com/contestentries/1025096/23455837/591a930567cb5_thumb900.jpg';
// //  let Salon_Spa = 'https://d19seqargx6mmp.cloudfront.net/product-images/s_5474.jpg';
// //  let Cosmetics = 'https://static.vecteezy.com/system/resources/thumbnails/002/607/628/small/3d-realistic-red-lipstick-pencil-golden-ring-on-red-silk-design-template-of-fashion-cosmetics-product-for-ads-flyer-banner-or-magazine-background-iillustration-free-vector.jpg';
// //  let Electronics = 'https://static.vecteezy.com/system/resources/thumbnails/004/617/319/small/electronics-word-concepts-banner-manufacture-maintenance-and-repair-of-household-appliances-presentation-website-isolated-lettering-typography-idea-with-linear-icons-outline-illustration-vector.jpg';
// //  let Fashion_Lifestyle = 'https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/606817aa422ae_json_image_1617434538.webp';
// //  let fruits = 'https://t3.ftcdn.net/jpg/01/63/13/30/360_F_163133061_TlMOMqgxAvBuwzLAjxOQ8v1FQ3OexfRG.jpg'
// //  let pharmacy = 'https://img.freepik.com/premium-vector/online-pharmacy-banner-with-medication-shelf-smartphone-buying-blue_313242-582.jpg?w=2000';
// //  let health = 'https://www.abhinavayu.com/wp-content/uploads/2017/11/banner-inner-5.png';
      


//   // const metaData = {
//   //   title: data?.slug,
//   //   description: data?.description,
//   //   canonical: pageURL,
//   //   meta: {
//   //     charset: 'utf-8',
//   //     name: {
//   //       keywords: shopCategory
//   //     }
//   //   }
//   // };

//   // console.log('shop data',metaData)

//   console.log('coverimage',data?.cover_image);

//   const shopCat = data?.shop_categories?.replace(/[{":,0123456789}]/g,'').slice(5,-3);

//   // const shopName = data?.name;

//   // console.log('shopsdata',shopCat);
//   // console.log('coverimage',data?.cover_image ? 'true' : 'false');
 
//   return (
//     <>
//         <Head>
//           {shopCat == 'Cosmetics' &&  <title>Get Best Deals on Cosmetic Products | #1 Cosmetic store in Chandigarh </title> }
//           {shopCat == 'Groceries' && <title>  Best Grocery Store in Tricity | Get exclusive Offer Now</title> }
//           {shopCat == 'Pharmacy' &&   <title> Get Upto 30% off on Pharmacy With Buylowcal | Shop Now  </title> }
//           {shopCat == ' Vegetables & Fruits' &&  <title>  Save Your Time & Money | Buy Veggies Fruits  with Buylowcal  </title> }
//           {shopCat == 'Restaurants' &&  <title> Get Best Deals on Restaurants Now | Connect your local restaurant with Buylowcal </title> }
//           {shopCat == 'Fashion, Lifestyle & Furnishings' &&   <title>  Buylowcal | shop Now Lifestyle & Home Items & Get 20% off </title> }
//           {shopCat == 'Gym & Health Products' && <title>  Get 100% pure Gym & Health product & Get A chance to win exciting offers</title> }
//             {/* <title>{shopCat == 'Groceries' && ' ' }</title>
//             <title>{shopCat == 'Groceries' && ' ' }</title>
//             <title>{shopCat == 'Groceries' && ' ' }</title> */}

//           {shopCat == 'Cosmetics' &&  <meta name="description" content= 'Get Amazing deals on ladies cosmetic products in Chandigarh tricity| Buy Now with Buylowcal '  /> }
//           {shopCat == 'Groceries' && <meta name="description" content= 'Grab The Best deal and  Offers on Grocery items | Buy Now With Buylowcal' /> }
//           {shopCat == 'Pharmacy' &&  <meta name="description" content='Prescriptions may be refilled and transferred online, or you can find a CVS Pharmacy near you with Buylowcal  Online shopping, Extra Care offers, Clinic locations, and more.' /> }
//           {shopCat == ' Vegetables & Fruits' && <meta name="description" content= 'Acquire the best deal on purchasing Veggies & Fruits with Buylowcal And Get 20 % off On purchasing'  /> }
//           {shopCat == 'Restaurants' &&  <meta name="description" content='Find the best restaurants near you with buylowcal & Get exclusive offer on every restaurant'  /> }
//           {shopCat == 'Fashion, Lifestyle & Furnishings' &&  <meta name="description" content='Get Amazing Deals on Lifestyle & home Items & get 20 % off on every item '  /> }
//           {shopCat == 'Gym & Health Products' &&  <meta name="description" content='Get 100% pure Gym &Health product & Get A chance to win exciting offers' /> }

//             <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//             <script
//                 type="application/ld+json"
//                 dangerouslySetInnerHTML={{ __html: JSON.stringify(
//                 {
//                   // local business schema 
//                   "@context": "https://schema.org",
//                   "@type": "LocalBusiness",
//                   "name": data?.name,
//                   "image": [
//                     {
//                       "@type": "CoverImage",
//                       "url": data?.cover_image?.thumbnail ? data?.cover_image?.thumbnail : '',
//                       "width": 600,
//                       "height": 600,
//                     },
//                     {
//                       "@type": "Logo",
//                       "url": data?.logo?.thumbnail ? data?.logo?.thumbnail : '',
//                     }
//                   ],
//                   "url": pageURL,
//                   "telephone": data?.settings?.contact,
//                   "address": {
//                     "@type": "PostalAddress",
//                     "streetAddress": data?.address?.street_address,
//                     "addressLocality": data?.address?.city,
//                     "addressRegion": data?.address?.city,
//                     "postalCode": data?.address?.street_address?.split(',')[data?.address?.street_address.split(',').length -1],
//                     "addressCountry": "addressCountry",
//                   },
//                   "geo": {
//                     "@type": "GeoCoordinates",
//                     "latitude": data?.settings?.location?.lat,
//                     "longitude": data?.settings?.location?.lng,
//                   },
//                   "openingHoursSpecification": [
//                     {
//                       "@type": "OpeningHoursSpecification",
//                       "dayOfWeek": [
//                         "Monday",
//                         "Tuesday",
//                         "Wednesday",
//                         "Thursday",
//                         "Friday",
//                         "Saturday",
//                         "Sunday",
//                       ],
//                       "opens": "09:00",
//                       "closes": "17:00",
//                     },
//                   ],
//                   "sameAs": [
//                     "https://www.facebook.com/buylowcal",
//                     "https://twitter.com/buylowcal",
//                     "https://www.instagram.com/buylowcal",
//                     "https://www.youtube.com/buylowcal",
//                   ],
//                 }
//                 )}}
//               />

//         </Head>

//             <div className="relative bg-white lg:bg-gray-100 hidden   lg:flex flex-col
//                             md:flex-row md:justify-between md:items-start">

//                       {/* // button to scroll to the top of the page when user has scrolled way down */}
//                       <div className="fixed z-50 bottom-10 right-10 flex justify-center items-center">
//                         <Image 
//                           quality='1'
//                           alt="scroll to top"
//                           width={50}
//                           height={50}
//                           layout="fixed"
//                           objectFit="contain"
//                           src='/up-arrow.png' 
//                           // className="w-12 h-12" 
//                           onClick={() => window.scrollTo(0, 0)} /> 
//                       </div>

//                       {/* <div className="fixed z-50 bottom-10 right-10 flex justify-center items-center">
//                         <button onClick={() => scrollToProduct()} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full">
//                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.914 9.914L10 7.828V16H8V7.828l-2.086 2.086L4.586 9.914l8.486-8.486z"/></svg>
//                         </button>
//                       </div> */}

//                     <div className='flex w-full  lg:flex flex-col'>

//                       {/* <div className="hidden lg:space-x-5 xl:space-x-10  lg:flex justify-between "> */}

//                           <div className ='hidden lg:flex flex-col overflow-y-scroll space-y-4  w-full'>  

//                               <div className='flex w-full  mt-10 h-80 px-3 border-3 '> 

//                                 { slug?.some(el => data?.slug?.includes(el)) ? null :
//                                     ( <div className='h-full w-2/7'>  
//                                          <ShopProfileCard data={data} />
//                                       </div> )  }
                                    
//                                     { slug?.some(el => data?.slug?.includes(el)) ? null :
//                                     (
//                                     <div className='w-4/5 h-full'>
//                                       {cover_image?.length > 1 ?
//                                          <div className='w-full h-full'>  
//                                          {/*    <Image quality='40'Slider data={cover_image} /> */}
//                                             <CoverImageSlider key={cover_image} data={cover_image} />
//                                          </div>
//                                            :  
//                                        <div className="w-full h-full"> 
//                                           { Array.isArray(cover_image) ?  
//                                           // cover_image?.map((img:any) =>
//                                           <Image 
//                                             quality='40' 
//                                             src={cover_image.thumbnail} 
//                                             alt="cover image"
//                                             layout="intrinsic"
//                                             width={1457}
//                                             height={314}
//                                             objectFit="cover"
//                                             // className='object-fill h-full w-full'
//                                           />
//                                           :
//                                           // imageCheck(data?.cover_image?.thumbnail, data, '317', false,'h-full w-full object-cover')
//                                           // <img src={data.logo.thumbnail} alt="cover image" className='object-fill h-full w-full' />
                                           
//                                           cover_image.length == 0 && 
//                                           shopCat?.includes('Cosmetics') &&           <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_cosmetics.jpg'}   className='object-fill h-full w-full' /> ||
//                                           shopCat?.includes('Groceries') &&           <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_groceries.jpg'}   className='object-fill h-full w-full' /> ||
//                                           shopCat?.includes('Salon & Spa') &&         <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_salon.webp'}   className='object-fill h-full w-full' /> ||
//                                           shopCat?.includes('Vegetables & Fruits') && <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_fruits.jpg'}   className='object-fill h-full w-full' /> ||
//                                           shopCat?.includes('Pharmacy') &&            <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_pharmacy.jpg'}   className='object-fill h-full w-full' /> ||
//                                           shopCat?.includes('Fashion Lifestyle') &&   <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_fashion.webp'}   className='object-fill h-full w-full' /> ||
//                                           shopCat?.includes('Electronics') &&         <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_electronics.jpg'}   className='object-fill h-full w-full' /> ||
//                                           shopCat?.includes('Health Products') &&     <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_cosmetics'}   className='object-fill h-full w-full' /> 
//                                           // imageCheck(data?.cover_image?.original, data, '317', false,'h-full w-full object-cover')
                                           
//                                       }
//                                        </div>
//                                         }  
//                                     </div> 
//                                     )  
//                                     }
//                               </div> 
           
                            
//                               {/*                                 
//                                 { data.slug !== 'chandigarh-grocery-store' ? 
//                                 ( <div className='flex w-full'> 
//                                       <WebShopBanner/>
//                                   </div>)
//                                   : null
//                                 } */}

//                                   { slug?.some(el => data?.slug?.includes(el)) ? null :
//                                   //  (<div className='w-full mt-7'> 
//                                       (<ShopDescription data = {data}/>
//                                     // </div>
//                                     )
                                 
//                                   }

//                                     {/* <OfferCards/> */}
//                           </div>

//                             <div className='lg:hidden px-2  w-full grid grid-cols-1 sm:flex'>

//                               { slug?.some(el => data?.slug?.includes(el))  ? 
//                                  null : ( <div className='hidden sm:block w-48 h-38 sm:h-72 sm:w-80 md:h-72 lg:w-96'> 
//                                           <ShopProfileCard data={data} /> 
//                                       </div>)  }
                  
//                                   {/* <div className='w-full flex-grow'>
//                                     <img alt={t("heading")} 
//                                           className='object-cover h-38 sm:h-72 rounded-lg xs+++:rounded-l-none md:h-72 lg:w-2/3 w-full'
//                                           src={data?.cover_image?.original! ?? "/product-placeholder.svg"}
//                                     />
//                                   </div> */}

//                               { slug?.some(el => data?.slug?.includes(el)) ? null
//                               : ( <div className='block sm:hidden'> 
//                                   <ShopProfileCard data={data}/> 
//                               </div> )  }

                                          
//                             </div>

//                             { data?.slug == 'chandigarh-grocery-store' ? ( 
//                              <div className="hidden lg:block w-full -mt-80 ">
//                                   <Image quality='40'
//                                     width={1826}
//                                     height={570}
//                                     layout="intrinsic"
//                                     objectFit="cover"
//                                     src='/grocery-web.jpg' 
//                                     className=" " />
//                              </div> ) : null }

//                              { data?.slug == 'kosmetics-india' ? ( 
//                              <div className="hidden lg:block w-full -mt-80 ">
//                                   <Image quality='40'
//                                     width={1826}
//                                     height={570}
//                                     layout="intrinsic"
//                                     objectFit="cover" 
//                                     src='/kosmetics.jpg' className=" " />
//                              </div> ) : null }

//                           {/* <HidingHeader> */}
//                           <div className={` sticky ${ scrollDirection === "down" ? "-top-32" : "top-0"}   transition-all duration-300 sticky z-50 bg-white top-0`}>                                              
//                               <CategoryDropdownSidebar data={data} />
//                           </div>

//                           {/* </HidingHeader>  */}
//                           <div className='relative top-0 flex flex-col'> 
//                               { categoryData?.categories?.data?.length ? 
//                                 <> 
//                                   <div id='category-dropdown-sidebar'  
//                                        className='flex border bg-white flex-col w-full'>
    
//                                       <h1 style={{top:'155px'}} id='product-heading' className="text-lg sticky  bg-gray-100  py-3 px-2  font-semibold text-gray-600 font-mono mt-5 transition-transform duration-75">  
//                                         { query?.category?.replace(/\b\w/g, (l :any) => l.toUpperCase())   } Products
//                                       </h1> 
                                    
//                                   </div> 
//                                 </> : ' '  
//                               }
//                                 <div id='product-feed' className="static  z-10 top-10 w-full">
//                                   {data && 
//                                     // <ShopProductFeed shopId={data.id} />
//                                     <Feed shopData={data} shopId={data.id} />
//                                 }</div>
//                           </div> 


//                        {/* </div> */}
                         
//                          {/* bottom corner button */}
                           

//                            {/* <div onClick={handleCategories} 
//                                 className =' fixed  z-1000  bottom-16 -right-2 sm:right-2
//                                    px-3 p-2 rounded-lg  text-white  
//                                    items-center space-x-2 '> 

//                                 <button className='flex flex-col items-center'>
//                                   <img src='/menu.png' 
//                                       className='h-14 w-14 opacity-80 active:opacity-100' /> 
//                                   <p className='text-gray-900 font-bold'> Categories </p>
//                                 </button>
//                            </div> */}

//           </div>

      
//       {width > 1023 && <CartCounterButton />}

//     </div>
//       <div className='block lg:hidden w-full'>

//           <ShopMobileView shopCat={shopCat} shopData={data} data={data}/>

//       </div>
//       {/* </DocumentMeta> */}
//     </>
//   );
// };

// export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  
//   const { data } = await fetch(
//     `${url}/all-shop?is_active=1`
//   ).then((res) => res.json());
  
//   const paths = data?.flatMap((shop: any) =>
//     locales?.map((locale) => ({ params: { slug: shop.slug }, locale }))
//   );

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: "blocking" };
  
// }
// // This also gets called at build time
// export const getStaticProps: GetStaticProps = async ({ params, locale }) => {

//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery("settings", fetchSettings);

//   try {
//     const shop = await fetchShop(params!.slug as string);
//     await queryClient.prefetchInfiniteQuery(
//       ["products", { shop_id: shop?.id }],
//       fetchProducts
//     );

//     return {
//       props: {
//         data: shop,
//         //...(await serverSideTranslations(locale!, ["common"])),
//         dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//       },
//       revalidate: 120,
//     };

//   } catch (error) {
//     return {
//       notFound: false,
//     };
//   }
// };

// ShopPage.Layout = ShopLayout;
// export default ShopPage;





