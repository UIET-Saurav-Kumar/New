
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


export default function ShopMobileView({data}) {

    const { width } = useWindowSize() ;
    const { t } = useTranslation("common") ;

    const { openModal } = useModalAction();
    
     function handleCategories() {
    return openModal("SHOP_MOBILE_CATEGORIES");
  }

  function handlePayment() {
    return openModal("SHOP_PAYMENT_FORM");
  }
  

    return (

        <>

        <div className=' px-6 mt-4  flex flex-col'>

            <div className='w-full grid grid-cols-1   xs+++:flex'>

                <div className='hidden xs+++:block w-48'> 
                    <ShopProfileCard data={data} /> 
                </div>
                
                <div className='w-full flex-grow'>
                   <img alt={t("heading")} 
                        className='object-cover h-36  sm:h-60 md:h-72 w-full'
                        src={data?.cover_image?.original! ?? "/product-placeholder.svg"}
                   />
                </div>

                <div className='block  xs+++:hidden'> 
                    <ShopProfileCard data={data} /> 
                </div>

                
            </div>

            <div className=''>
                <WebShopBanner/>
                {/* <ShopBanner/> */}
            </div>

              {/* <div className='mt-6 sm:mt-6 border '> <PaymentForm /></div>   */}
              
               <div className='mx-4 '> 
                  { data && <ShopProductFeed shopId={data.id} /> }
               </div> 



            {/* menu button */}

                <span onClick={handlePayment} 
                      className='fixed  z-1000 lg:hidden bottom-16 -left-2 sm:left-2
                                 px-3 p-2 rounded-lg  text-white  
                                 flex items-center space-x-2'> 

                        <img src='/pay.png' 
                             className='h-14 w-14 opacity-80 active:opacity-100' />
                        <button >
                            
                        </button>

                </span>

                <span onClick={handleCategories} 
                      className=' fixed  z-1000 lg:hidden bottom-16 -right-2 sm:right-2
                                  px-3 p-2 rounded-lg  text-white  
                                  flex items-center space-x-2'> 

                       <img src='/menu.png' 
                            className='h-14 w-14 opacity-80 active:opacity-100' />
                       <button >
                         
                       </button>

                </span>
            
        </div>
        {width < 1022 && <MobileNavigation />}
        </>
    )
}
