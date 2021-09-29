

import ShopProfileCard from "@components/profile/profile-card"
import ShopProductFeed from "@components/product/feed-shop"
import MobileNavigation from "@components/layout/mobile-navigation"
import { useWindowSize } from "@utils/use-window-size"
import { useTranslation } from "next-i18next";
import FilterBar from "@components/common/filter-bar"
import { useModalAction } from "@components/ui/modal/modal.context"
import { getIcon } from "@utils/get-icon";
import * as socialIcons from "@components/icons/social";




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

        <div className=' px-6 mt-0  flex flex-col'>

            <div className='w-full grid grid-cols-1  sm:flex'>

                <div className='hidden sm:block w-48'> 
                    <ShopProfileCard data={data} /> 
                </div>
                
                <div className='w-full flex-grow'>
                   <img alt={t("heading")} 
                        className='object-fill h-60 md:h-72 w-full'
                        src={data?.cover_image?.original! ?? "/product-placeholder.svg"}
                   />
                </div>

                <div className='block sm:hidden'> 
                    <ShopProfileCard data={data} /> 
                </div>
                
                
                <div className='block sm:hidden  mt-0 '>
                    <div className="flex items-center w-full  justify-end p-2 mt-3">
                        {data?.settings?.socials.map((item: any, index: number) => (
                        <a
                            key={index}
                            href={item?.url}
                            target="_blank"
                            className={`text-muted focus:outline-none me-6 last:me-0 transition-colors duration-300 hover:${item.hoverClass}`}
                        >
                            {getIcon({
                            iconList: socialIcons,
                            iconName: item?.icon,
                            className: "lg:w-8 lg:h-8 w-6 h-6 opacity-50 ",
                            })}
                        </a>
                        ))}
                    </div>
                </div>

            </div>

              
              
               <div className='mx-4'> 
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
