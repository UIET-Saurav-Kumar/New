
import PaymentForm from "./shop-payment-form"
import ShopProfileCard from "@components/profile/profile-card"
import ShopProductFeed from "@components/product/feed-shop"
import MobileNavigation from "@components/layout/mobile-navigation"
import { useWindowSize } from "@utils/use-window-size"
import { useTranslation } from "next-i18next";
import FilterBar from "@components/common/filter-bar"
import { useModalAction } from "@components/ui/modal/modal.context"


export default function ShopMobileView({data}) {

    const { width } = useWindowSize() ;
    const { t } = useTranslation("common") ;

    const { openModal } = useModalAction();
    
     function handleCategories() {
    return openModal("SHOP_MOBILE_CATEGORIES");
  }
  


    return (

        <>

        <div className=' px-6 mt-0  flex flex-col'>

            <div className='w-full grid grid-cols-1 xs+:grid-cols-2  xs+:flex sm:flex'>

                <div className='hidden xs+:block w-48'> 
                    <ShopProfileCard data={data} /> 
                </div>
                
                <div className='w-full flex-grow'>
                   <img alt={t("heading")} 
                        className='object-fill h-60 md:h-72 w-full'
                        src={data?.cover_image?.original! ?? "/product-placeholder.svg"}
                   />
                </div>

                <div className='block xs+:hidden'> 
                    <ShopProfileCard data={data} /> 
                </div>

            </div>

              <div className='-mt-20 xs+:mt-0'> <PaymentForm /></div>  
              
               <div className='mx-4'> 
                  { data && <ShopProductFeed shopId={data.id} /> }
               </div> 

            {/* menu button */}
                <span onClick={handleCategories} 
                      className=' fixed  z-1000 lg:hidden bottom-16 right-4 
                                  px-3 p-2 rounded-lg bg-black text-white  
                                  flex items-center space-x-2'> 

                       <img src='/list.png' 
                            className='h-5 w-5' />
                       <button >
                         Menu
                       </button>

                </span>
            
        </div>
        {width < 1022 && <MobileNavigation />}
        </>
    )
}
