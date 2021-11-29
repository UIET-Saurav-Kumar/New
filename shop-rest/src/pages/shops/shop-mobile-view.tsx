
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
import { isEmpty } from "lodash";
import { formatAddress } from "@utils/format-address";
import ReadMore from "@components/ui/truncate";
import ShopDescription from "./shop-description";
import OfferCards from "./offer-cards";


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

        <div className=' px-2 mt-4  flex  flex-col'>

            <div className='w-full grid grid-cols-1 sm:flex'>

                <div className='hidden sm:block w-48 h-38 sm:h-72 sm:w-80 md:h-72 lg:w-96'> 
                    <ShopProfileCard data={data} /> 
                </div>
                
                <div className='w-full flex-grow'>
                   <img alt={t("heading")} 
                        className='object-cover h-38 sm:h-72 rounded-lg xs+++:rounded-l-none md:h-72 lg:w-2/3 w-full'
                        src={data?.cover_image?.original! ?? "/product-placeholder.svg"}
                   />
                   
                </div>

                <div className='block  sm:hidden '> 
                    <ShopProfileCard data={data} /> 
                </div>
                
                
            </div>

            <ShopDescription data={data}/>

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

            <div className=''>
                <WebShopBanner/>
                {/* <ShopBanner/> */}
            </div>

            <div className=' flex'><OfferCards/></div>

              {/* <div className='mt-6 sm:mt-6 border '> <PaymentForm /></div>   */}
              
               <div className='mx-0 mt-2 '> 
                  { data && <ShopProductFeed shopId={data.id} /> }
               </div> 


            {/* menu button */}

                <span onClick={handleCategories} 
                      className ='fixed  z-1000 lg:hidden bottom-16 -right-2 sm:right-2
                                   px-3 p-2 rounded-lg  text-white  
                                    items-center space-x-2'> 

                   
                    <span className='flex flex-col items-center'>
                         <img src='/menu.png' 
                          className='h-14 w-14 opacity-80 active:opacity-100' /> 
                          <button className='text-gray-800 font-bold'> Categories </button>
                     </span>
                        
                </span>
                    
            
        </div>
        {width < 1022 && <MobileNavigation />}
        </>
    )
}
