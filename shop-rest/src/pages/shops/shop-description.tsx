import { useTranslation } from "next-i18next";
import { isEmpty } from "lodash";
import { formatAddress } from "@utils/format-address";
import { getIcon } from "@utils/get-icon";
import * as socialIcons from "@components/icons/social";




export default function ShopDescription({data}) {

    const { t } = useTranslation("common") ;

    return (
      
        <div className=' hidden lg:inline-flex  bg-white justify-between xl:space-x-8 px-2 xl:px-16 mt-1  ;
                         text-10px lg:text-sm pt-4 '>

            <div className=' flex flex-col  '>

                <span className="text-lg text-heading font-semibold mb-2">
                      Description
                </span>

                { data?.description && (
                  
                        <p className="text-lg font-md font-serif tracking-widest text-gray-600 w-24 lg:w-72 lg+:80 xl:w-96 xl+:96 mb-2 leading-relaxed">
                          {data?.description}
                        </p>
                )}

            </div>  

{/* <div className="p-4 flex justify-evenly  space-x-5"> */}


 <div className="mb-7 last:mb-0 flex flex-col">

     <span className="text-lg text-heading font-semibold mb-2">
       {t("text-address")}
     </span>

     <span className="text-lg font-serif tracking-widest text-gray-600 w-28 xl:w-52">

         {!isEmpty(formatAddress(data?.address))
       ? formatAddress(data?.address)
       : t("common:text-no-address")}

     </span>

 </div>

 <div className="mb-7 last:mb-0 flex flex-col">

     <span className="text-lg text-heading font-semibold mb-2">
       {t("Whatsapp/Call to order")}
     </span>

     <span className="text-lg font-serif tracking-widest text-body">
       {data?.settings?.contact
         ? t("77430-42380")
         : t("77430-42380")}
     </span>
     
      

     {/* <div className='flex 2xl:hidden '> 

         <a
             href={data?.settings?.website}
             target="_blank"
             className="text-md text-accent border bg-gray-100 rounded-md px-2 p-2 mt-4 
             font-bold hover:text-accent-hover focus:outline-none focus:text-accent-hover"
           >
             {t("text-visit-site")}
         </a>
     </div> */}

 </div>

 {data?.settings?.website && (

   <div className="flex items-center flex-col">

       {/* <span className="text-sm text-heading font-semibold mb-2">
         {t("text-website")}
       </span> */}

       <div className = " " >

         {/* <div className="text-sm border w-36 border-red-800  ">
           {data?.settings?.website}
         </div> */}

         {/* <div className=' '> 

             <a
               href={data?.settings?.website}
               target="_blank"
               className=" hidden 2xl:block text-md text-accent border bg-gray-100 rounded-md px-2 p-2  font-bold hover:text-accent-hover focus:outline-none focus:text-accent-hover"
             >
               {t("text-visit-site")}
             </a>

         </div> */}

       </div>
   </div>
 )}

</div>
    )
}
