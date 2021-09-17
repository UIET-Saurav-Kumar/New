
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
    
     function handleCategories() {
    return openModal("SHOP_MOBILE_CATEGORIES");
  }
  const { openModal } = useModalAction();


    return (
        <>
        <div className=' px-6 mt-0 flex flex-col'>

            <div className='w-full flex'>
               <ShopProfileCard data={data} /> 
               <img alt={t("heading")} 
                    className='object-fill h-60 md:h-72 w-full'
                    src={data?.cover_image?.original! ?? "/product-placeholder.svg"}
                />
            </div>

                <PaymentForm />
              

               <div className='mx-4'> 
               { data && <ShopProductFeed shopId={data.id} /> }
               </div> 
            
                <button onClick={handleCategories} 
                        className='fixed block z-1000 lg:hidden bottom-16 right-4 
                                   px-4 p-2 rounded-lg bg-black text-white '>
                     Menu
                </button>
            
        </div>
        {width < 1022 && <MobileNavigation />}
        </>
    )
}
