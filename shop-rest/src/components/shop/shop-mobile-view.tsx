
import ShopProfileCard from "@components/profile/profile-card"
import ShopProductFeed from "@components/product/feed-shop"
import MobileNavigation from "@components/layout/mobile-navigation"
import { useWindowSize } from "@utils/use-window-size"
import { useTranslation } from "next-i18next";
import FilterBar from "@components/common/filter-bar"
import { useModalAction } from "@components/ui/modal/modal.context"
import { getIcon } from "@utils/get-icon";
import * as socialIcons from "@components/icons/social";
import ShopBanner from "./shop-banner";
import WebShopBanner from "./web-shop-banner";
import { formatAddress } from "@utils/format-address";
import ShopDescription from "./shop-description";
import OfferCards from "./offer-cards";
import SidebarMenu from "@components/ui/sidebar-menu";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import { useRouter } from "next/router";
import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
import Feed from "@components/product/feed";
import { useEffect } from "react";
import { HidingHeader } from "hiding-header-react";
import Layout from "@components/layout/layout";
import { useUI } from "@contexts/ui.context";



export default function ShopMobileView({data, mapUrl, shopData, pageURL, open,
  rating,
  totalRating,
  reviews,placePhotos}: any) {

    const { query } = useRouter();
    const { type } = query;

  const {
    data: categoryData,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    type: query.slug as string,
  });

  // function handleJoin() {
  //   return  openModal("OTP_REGISTER");
  // }

   
  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI(); 
  useEffect(() => {
   query.utm_source == 'shop_qr' ? (!isAuthorize ?  openModal("OTP_REGISTER") : null) : null;
    // data.slug !== 'chandigarh-grocery-store' ? window.scrollTo(0, 670) : window.scrollTo(0, 0)
 }, [isAuthorize]);

 // console.log('utm',query.utm_source);

  const categoryItem = () => {
    if (categoryData?.categories?.length) {
      return categoryData.categories[0];
    }
    return null;
  }

  // console.log('category data', categoryData?.categories.data.map(item => item.name))

    const { width } = useWindowSize() ;
    const { t } = useTranslation("common") ;

    const { openModal } = useModalAction();
    
    function handleCategories() {
    return openModal("SHOP_MOBILE_CATEGORIES");
    }

  function handlePayment() {
    return openModal("SHOP_PAYMENT_FORM");
   }

   function handleImage(){
    openModal('SHOP_IMAGE_POPOVER',{
      data:placePhotos
    })
  }

   const slug = ['chandigarh-grocery-store', 'kosmetics-india', 'retail-store'];
   
   function checkElement(){
    return slug?.some(el => data?.slug?.includes(el))
   }

    return (

      <>
        <div className='relative mt-4 flex flex-col'>

            <div className="fixed z-50 bottom-16 right-6 flex justify-center items-center">
                  <img src='/up-arrow.png' 
                      className="w-8 h-8" 
                      onClick={() => window.scrollTo(0, 0)} />
                            
            </div>

            <div className='px-2 w-full grid grid-cols-1 sm:flex'>

              { slug?.some(el => data.slug.includes(el)) ? null :
                (   <div className='hidden sm:block w-48 h-38 sm:h-72 sm:w-80 md:h-72 lg:w-96'> 
                    <ShopProfileCard  reviews={reviews} totalRating={totalRating} rating={rating} open={open} data={data} /> 
                   </div>)  }
                
              { !checkElement() && <div className='w-full flex-grow'>
                   <img alt={t("heading")} 
                        className='object-cover h-38 sm:h-72 rounded-lg xs+++:rounded-l-none md:h-72 lg:w-2/3 w-full'
                        src={query.slug !== 'kosmetics-india' ? data?.cover_image?.original! : '/kosmetics-shop-mob.jpg' ?? "/product-placeholder.svg"}
                   />
                </div>
              }

                {  slug.some(el => data.slug.includes(el)) ? null : 
                ( <div className='block sm:hidden'> 
                    <ShopProfileCard reviews={reviews} totalRating={totalRating} rating={rating} open={open} data={data}/> 
                </div>)  }
                
            </div>

            {  slug.some(el => data.slug.includes(el)) ? null : 
             (
              <div className='flex flex-col space-y-2'> 
             <div className="px-2">
              <ShopDescription mapUrl={mapUrl} data={data}/>
             </div>
                   <div className={`flex px-1 gap-3 w-full overflow-x-scroll`}>
                        
                        {placePhotos?.map((binaryImage, index) => {
                            return <img key={index} onClick={handleImage}
                            src={binaryImage?.url+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                            // src={`data:image/jpeg;base64,${Buffer.from(binaryImage).toString('base64')}`} 
                            className="h-44 rounded w-44 object-cover"/>
                          })}
                  </div>

             
              </div>
             )
                
            }

            {/* <div className=' flex flex-col p-3 border bg-white rounded-lg mt-4 w-full text-left'>
                <span className="text-lg text-heading font-semibold mb-2">
                      Description
                </span>

                {data?.description && (
                  
                        <p className="text-sm font-md  font-light tracking-wide text-gray-600  mb-2 leading-relaxed">
                          <ReadMore character={70}>{data?.description}</ReadMore>
                        </p>
                )}
            </div>   */}

            <div className='px-2'>
                {/* <WebShopBanner/> */}
                {/* <ShopBanner/> */}
            </div>

            {/* { data.slug !== 'chandigarh-grocery-store' ? 
                          ( <div className='flex w-full'> 
                                <WebShopBanner/>
                            </div>)
                            : null
                          } */}

            {/* <div className='px-2 flex'><OfferCards/></div> */}

              {/* <div className='mt-6 sm:mt-6 border '> <PaymentForm /></div>   */}
          { categoryData?.slug === 'Kosmetics-india'   ?   
             
                <>  <HidingHeader>
                                                                                                    
                        <CategoryDropdownSidebar/>
                                  
                    </HidingHeader>
              
              <div className='relative mt-2 flex flex-col'>                                   
                    <div className='relative top-0 flex flex-col'> 
                            {categoryData?.categories?.data?.length ? 
                            <> 
                            <div id='category-dropdown-sidebar'  
                                className='flex border bg-white  flex-col w-full'>  
                            {/* <CategoryDropdownSidebar/> */}
                                      {/* <CategoryDropdownSidebar/> */}
  
                                <h1 style={{top:'155px'}} id='product-heading' className="text-lg sticky  bg-gray-100  py-3 px-2  font-semibold text-gray-600 font-mono mt-5 transition-transform duration-75">  
                                  { query?.category?.replace(/\b\w/g, (l :any) => l.toUpperCase())   } Products
                                </h1> 
                            </div> </> : ' '  }
                            
                                {data &&
                                  <div id='product-feed' className="static  z-10 top-10 w-full">
 
                                   {/* <ShopProductFeed shopId={data.id} /> */}
                                    <Feed shopId={data.id}/>
                                    
                                </div>
                                //  :
                                //  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
                                //  {placePhotos?.map((binaryImage, index) => {
                                //      return <img key={index} onClick={handleImage}
                                //      src={binaryImage?.url+''+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                                //      // src={`data:image/jpeg;base64,${Buffer.from(binaryImage).toString('base64')}`} 
                                //      className="h-full w-full"/>
                                //    })}
                                //  </div>
                               }
                      </div>
              </div>

               </>  :
                <div className='relative mt-2 flex'> 
                  {categoryData?.categories?.data?.length ? 
                    <div className='flex  border bg-white h-screen top-0 sticky  flex-col w-auto'>   
                                <CategoryDropdownSidebar />
                              
                    </div>  
                    :'' } 
                    {categoryData?.categories?.data?.length  ?  <div className="flex flex-col w-5/6">
                       <h1 id='category-heading' style={{top:'0px'}} id='product-heading' 
                          className=" sticky border-t bg-white top-0  py-3 px-2 z-40 font-semibold text-gray-600 font-mono  text-sm sm:text-lg transition-transform duration-75">  
                          { query?.category?.replace(/\b\w/g, (l :any) => l.toUpperCase())   } Products
                      </h1>  
                      {data &&  
                      
                      <Feed shopData={data} shopId={data.id} /> 
                      
                                 }
                  </div> : (data &&
                  <Feed shopData={data} shopId={data.id} />  
                    
                                 ) }
               </div> 

          }

            {/* menu button */}
            {/* <span onClick={handleCategories} 
                  className ='fixed  z-1000 lg:hidden bottom-16 -right-2 sm:right-2
                              px-3 p-2 rounded-lg  text-white  
                              items-center space-x-2'> 
                <span className='flex flex-col items-center'>
                      <img src='/menu.png' 
                      className='h-14 w-14 opacity-80 active:opacity-100' /> 
                      <button className='text-gray-800 font-bold'>Categories</button>
                </span>  <
                    
            </span> */}
                    
            
        </div>
        {width < 1022 && <MobileNavigation />}
        </>
    )
}

ShopMobileView.Layout = Layout;




//old code

// import ShopProfileCard from "@components/profile/profile-card"
// import ShopProductFeed from "@components/product/feed-shop"
// import MobileNavigation from "@components/layout/mobile-navigation"
// import { useWindowSize } from "@utils/use-window-size"
// import { useTranslation } from "next-i18next";
// import FilterBar from "@components/common/filter-bar"
// import { useModalAction } from "@components/ui/modal/modal.context"
// import { getIcon } from "@utils/get-icon";
// import * as socialIcons from "@components/icons/social";
// import ShopBanner from "./shop-banner";
// import WebShopBanner from "./web-shop-banner";
// import { formatAddress } from "@utils/format-address";
// import ShopDescription from "./shop-description";
// import OfferCards from "./offer-cards";
// import SidebarMenu from "@components/ui/sidebar-menu";
// import { useCategoriesQuery } from "@data/category/use-categories.query";
// import { useRouter } from "next/router";
// import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
// import Feed from "@components/product/feed";
// import { useEffect } from "react";
// import { HidingHeader } from "hiding-header-react";
// import Layout from "@components/layout/layout";
// import ImageSlider from "./slider";
// import CoverImageSlider from "./cover-image-slider";
// import Image from "next/image";



// export default function ShopMobileView({data, shopData, shopCat}: any) {

//     const { query } = useRouter();
//     const { type } = query;

//   const {
//     data: categoryData,
//     isLoading: loading,
//     error,
//   } = useCategoriesQuery({
//     type: query.slug as string,
//   });

//   const {cover_image} = data;

//   useEffect(() => {
//     // data.slug !== 'chandigarh-grocery-store' ? window.scrollTo(0, 670) : window.scrollTo(0, 0)
//  }, []);

//   const categoryItem = () => {
//     if (categoryData?.categories?.length) {
//       return categoryData.categories[0];
//     }
//     return null;
//   }

//   // console.log('category data', categoryData?.categories.data.map(item => item.name))

//     const { width } = useWindowSize() ;
//     const { t } = useTranslation("common") ;

//     const { openModal } = useModalAction();
    
//     function handleCategories() {
//     return openModal("SHOP_MOBILE_CATEGORIES");
//     }

//   function handlePayment() {
//     return openModal("SHOP_PAYMENT_FORM");
//    }

//    const slug = ['chandigarh-grocery-store', 'kosmetics-india'];
  
//     return (

//       <>
//         <div className=' lg:hidden relative flex flex-col'>

//             <div className="fixed z-50 bottom-16 right-6 flex justify-center items-center">
//                 <Image quality='40'
//                   width={50}
//                   height={50}
//                   layout='fixed'
//                   objectFit='cover'
//                   src='/up-arrow.png' 
//                   // className="w-8 h-8" 
//                   onClick={() => window.scrollTo(0, 0)} />
//             </div>

//             <div className='px-2 w-full grid grid-cols-1 sm:flex'>

//               { slug?.some(el => data.slug.includes(el)) ? null :
//                 (   <div className='hidden sm:block w-2/5 h-38 sm:h-72 sm:w-80 md:h-72'> 
//                       <ShopProfileCard reviews={reviews} totalRating={totalRating} rating={rating} open={open} data={data} /> 
//                     </div>)  }
                
//                 <div className = 'block lg:hidden w-full   border'>
//                     { cover_image?.length > 1 ?
//                         <div className = 'h-44 sm:h-72 rounded-lg xs+++:rounded-l-none md:h-72 w-full'>  
//                         {/*  <Image quality='40'Slider data={cover_image} /> */}
//                             <CoverImageSlider key={cover_image} data={cover_image} />
//                         </div>
//                                  :  
//                           <div className="block lg:hidden w-full h-full">
//                             { slug?.some(el => query?.slug.includes(el))  ?
//                              <Image quality='20'
//                              priority={true}
//                              width={640}
//                              height={313}
//                              layout='intrinsic'
//                              objectFit='cover'
//                              alt={t("heading")} 
//                                // className='object-fill h-full sm:h-72 rounded-lg xs+++:rounded-l-none md:h-72   w-full'
//                              src={query.slug === 'kosmetics-india' ? '/kosmetics-shop-mob.jpg' : '/grocery-mobile.jpg'}
//                            /> :

//                            cover_image.length == 1 ?  
                             
//                               <Image quality='20'
//                               priority={true}
//                               width={1280}
//                               height={314}
//                               layout='intrinsic'
//                               objectFit='fill'
//                               alt={t("heading")} 
//                               // className='object-fill h-full sm:h-72 rounded-lg xs+++:rounded-l-none md:h-72   w-full'
//                               src={ data?.cover_image[0].thumbnail }
//                           /> 
//                           // <img className='object-fill h-full sm:h-72 rounded-lg xs+++:rounded-l-none md:h-72   w-full' src=' data?.cover_image[0].thumbnail'/>
//                           :
//                           cover_image.length == 0 && 
//                           shopCat?.includes('Cosmetics') &&           <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_cosmetics.jpg'}   className='object-fill h-full w-full' /> ||
//                           shopCat?.includes('Groceries') &&           <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_groceries.jpg'}   className='object-fill h-full w-full' /> ||
//                           shopCat?.includes('Salon & Spa') &&         <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_salon.webp'}   className='object-fill h-full w-full' /> ||
//                           shopCat?.includes('Vegetables & Fruits') && <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_fruits.jpg'}   className='object-fill h-full w-full' /> ||
//                           shopCat?.includes('Pharmacy') &&            <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_pharmacy.jpg'}   className='object-fill h-full w-full' /> ||
//                           shopCat?.includes('Fashion Lifestyle') &&   <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_fashion.webp'}   className='object-fill h-full w-full' /> ||
//                           shopCat?.includes('Electronics') &&         <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_electronics.jpg'}   className='object-fill h-full w-full' /> ||
//                           shopCat?.includes('Health Products') &&     <Image priority={true} quality='40' layout="intrinsic" width={1457} height={314} src={'/shop_cover_images/coverimage_cosmetics'}   className='object-fill h-full w-full' /> 

//                            }
//                         </div>
//                     }
                  
//                 </div>

//                 {  slug.some(el => data.slug.includes(el)) ? null : 
//                 ( <div className='block sm:hidden h-48'> 
//                     <ShopProfileCard reviews={reviews} totalRating={totalRating} rating={rating} open={open} data={data}/> 
//                 </div>)  }
                
//             </div>

//             {  slug.some(el => data.slug.includes(el)) ? null : 
//              (<div className="px-2"><ShopDescription data={data}/>
//              </div>)
                
//             }

          
          
//           { categoryData?.slug === 'Kosmetics-india'   ?   
             
//                 <>  <HidingHeader>
                                                                                                    
//                         <CategoryDropdownSidebar/>
                                  
//                     </HidingHeader>
              
//               <div className='relative mt-2 flex flex-col'>                                   
//                     <div className='relative top-0 flex flex-col'> 
//                             {categoryData?.categories?.data?.length ? 
//                             <> 
//                             <div id='category-dropdown-sidebar'  
//                                 className='flex border bg-white  flex-col w-full'>  
//                             {/* <CategoryDropdownSidebar/> */}
//                                       {/* <CategoryDropdownSidebar/> */}
  
//                                 <h1 style={{top:'155px'}} id='product-heading' className="text-lg sticky  bg-gray-100  py-3 px-2  font-semibold text-gray-600 font-mono mt-5 transition-transform duration-75">  
//                                   { query?.category?.replace(/\b\w/g, (l :any) => l.toUpperCase())   } Products
//                                 </h1> 
//                             </div> </> : ' '  }
//                                 <div id='product-feed' className="static  z-10 top-10 w-full">{data && 
//                                 // <ShopProductFeed shopId={data.id} />
//                                     <Feed shopId={data.id}/>
//                                 }</div>
//                       </div>
//               </div>

//                </>  :
//                 <div className='relative mt-2 flex'> 
//                   {categoryData?.categories?.data?.length ? 
//                     <div className='flex  border bg-white h-screen top-14 sticky  flex-col w-auto'>   
//                                 <CategoryDropdownSidebar />
                              
//                     </div>  :'' } 
//                     {categoryData?.categories?.data?.length  ?  <div className="flex flex-col w-5/6">
//                        <h1 id='category-heading' style={{top:'56px'}} id='product-heading' 
//                           className=" sticky border-t bg-white  py-3 px-2 z-50 font-semibold text-gray-600 font-mono  text-sm sm:text-lg transition-transform duration-75">  
//                           { query?.category?.replace(/\b\w/g, (l :any) => l.toUpperCase())   } Products
//                       </h1>  
//                       {data && <Feed shopData={data} shopId={data.id} />}
//                   </div> : <Feed shopData={data} shopId={data.id} /> }
//                </div> 

//           }

           
                    
            
//         </div>
//         {width < 1022 && <MobileNavigation />}
//         </>
//     )
// }

// ShopMobileView.Layout = Layout;
