
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



export default function ShopMobileView({data, shopData}: any) {

    const { query } = useRouter();
    const { type } = query;

  const {
    data: categoryData,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    type: query.slug as string,
  });

  useEffect(() => {
    // data.slug !== 'chandigarhgrocerystore' ? window.scrollTo(0, 670) : window.scrollTo(0, 0)
 }, []);

  const categoryItem = () => {
    if (categoryData?.categories?.length) {
      return categoryData.categories[0];
    }
    return null;
  }

  console.log('category data', categoryData?.categories.data.map(item => item.name))

    const { width } = useWindowSize() ;
    const { t } = useTranslation("common") ;

    const { openModal } = useModalAction();
    
    function handleCategories() {
    return openModal("SHOP_MOBILE_CATEGORIES");
    }

  function handlePayment() {
    return openModal("SHOP_PAYMENT_FORM");
   }

   const slug = ['chandigarhgrocerystore', 'kosmetics-india'];
  
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
                    <ShopProfileCard data={data} /> 
                   </div>)  }
                
                <div className='w-full flex-grow'>
                   <img alt={t("heading")} 
                        className='object-cover h-38 sm:h-72 rounded-lg xs+++:rounded-l-none md:h-72 lg:w-2/3 w-full'
                        src={query.slug !== 'kosmetics-india' ? data?.cover_image?.original! : '/kosmetics-shop-mob.jpg' ?? "/product-placeholder.svg"}
                   />
                </div>

                {  slug.some(el => data.slug.includes(el)) ? null : 
                ( <div className='block sm:hidden'> 
                    <ShopProfileCard data={data}/> 
                </div>)  }
                
            </div>

            {  slug.some(el => data.slug.includes(el)) ? null : 
             (<div className="px-2"><ShopDescription data={data}/>
             </div>)
                
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

            {/* { data.slug !== 'chandigarhgrocerystore' ? 
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
                                    <div id='product-feed' className="static  z-10 top-10 w-full">{data && 
                                    // <ShopProductFeed shopId={data.id} />
                                        <Feed shopId={data.id}/>
                                    }</div>
                          </div>

                </div>

               </>  :
                <div className='relative mt-2 flex'> 
                  {categoryData?.categories?.data?.length ? 
                    <div className='flex  border bg-white h-screen top-14 sticky  flex-col w-auto'>   
                                <CategoryDropdownSidebar />
                              
                    </div>  :'' } 
                    {categoryData?.categories?.data?.length  ?  <div className="flex flex-col w-5/6">
                       <h1 id='category-heading' style={{top:'56px'}} id='product-heading' 
                          className=" sticky border-t bg-white  py-3 px-2 z-50 font-semibold text-gray-600 font-mono  text-sm sm:text-lg transition-transform duration-75">  
                          { query?.category?.replace(/\b\w/g, (l :any) => l.toUpperCase())   } Products
                      </h1>  
                      {data && <Feed shopData={data} shopId={data.id} />}
                  </div> : <Feed shopData={data} shopId={data.id} /> }
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
