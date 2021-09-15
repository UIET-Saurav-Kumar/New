
import PaymentForm from "./shop-payment-form"
import ShopProfileCard from "@components/profile/profile-card"
import ShopProductFeed from "@components/product/feed-shop"
import MobileNavigation from "@components/layout/mobile-navigation"
import { useWindowSize } from "@utils/use-window-size"
import { useTranslation } from "next-i18next";
import FilterBar from "@components/common/filter-bar"


export default function ShopMobileView({data}) {
    const { width } = useWindowSize() ;
    const { t } = useTranslation("common") ;


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
                <FilterBar/>

               <div className='mx-4'> 
               { data && <ShopProductFeed shopId={data.id} /> }
               </div> 
        </div>
        {width < 1022 && <MobileNavigation />}
        </>
    )
}
