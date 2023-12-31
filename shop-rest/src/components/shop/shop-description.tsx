import { useTranslation } from "next-i18next";
import { isEmpty } from "lodash";
import { formatAddress } from "@utils/format-address";
import { getIcon } from "@utils/get-icon";
import * as socialIcons from "@components/icons/social";
import ReadMore from "@components/ui/truncate";
import Truncate from "@components/ui/truncate-scroll";
import { scroller, Element } from "react-scroll";
import { PhoneIcon } from "@heroicons/react/outline";
import Link from 'next/link';

export default function ShopDescription({data,adr,num,mapUrl} :any) {


    const { t } = useTranslation("common") ;

    return (
      
        <div className=' w-full inline-flex  bg-white space-x-6 justify-between xl:space-x-8 px-2 xl:px-16 mt-4 md:mt-1  ;
                         text-10px lg:text-sm pt-4 '>

             {/* Description */}
            <div className={` ${data ? 'flex flex-col  w-full text-left' : 'hidden'} `}>
                <span className="text-sm lg:text-lg text-heading font-semibold mb-2">
                      Our Story
                </span>

                {data?.description && (
                  
                    <p className="text-xs sm:text-sm font-md  font-light tracking-wide text-gray-600  mb-2 leading-relaxed">
                      <ReadMore character={70}>{data?.description}</ReadMore>
                    </p>
                )}
            </div>  

           {/* <div className="p-4 flex justify-evenly  space-x-5"> */}

              {/* Address */}
              <div className=" mb-7 h-auto last:mb-0 flex flex-col w-full text-left">
                 
                  <span className="text-sm lg:text-lg text-heading font-semibold mb-2">
                    {/* {t(" address")} */}
                    Address
                  </span>

                  
                  <span className="justify-between text-xs sm:text-sm font-light tracking-wide text-gray-600">
                      {data ? data?.settings?.location?.formattedAddress : adr}
                  </span>
                  <a target='_blank' href={mapUrl}><span className="font-semibold text-xs cursor-pointer active:text-blue-900 text-blue-700">Directions ↗</span></a>

                  <div className="sm:hidden mt-5 mb-0 last:mb-0 flex flex-col  w-full text-left">
                          <span className="text-sm md:text-lg text-heading font-semibold mb-2">
                            {t("Whatsapp/Call ")}
                          </span>

                          <span className=" flex items-end space-x-1 text-xs  md:text-lg font-light tracking-wide text-body">
                            {/* {data?.settings?.contact} */}
                             
                            <a className="flex items-center text-indigo-800 p-1 border-indigo-700 rounded border font-semibold no-underline cursor-pointer" href={`tel:${'77430-42380'}`}>
                            <PhoneIcon scale={0.88} className="h-6 w-6 scale-75 text-blue-900 "/> 
                             {/* 84279-90450 */}
                             Call us
                            </a>  
                          </span>
                  </div>

              </div>
              
              {/* Contact number */}
              <div className = "hidden mb-7 last:mb-0 sm:flex flex-col  w-full text-left">
                  <span className="text-sm md:text-sm lg:text-lg text-heading font-semibold mb-2">
                    {t("Whatsapp/Call to order")}
                  </span>

                  <span className = "flex items-end space-x-1 text-xs   md:text-lg font-light tracking-wide text-body">
                            {/* {data?.settings?.contact} */}
                            <a className="flex items-center text-sm text-indigo-800 p-2 border-indigo-700 rounded border font-semibold no-underline cursor-pointer" href={`tel:${'77430-42380'}`}>
                            <PhoneIcon scale={0.88} className="h-5 w-6 scale-75 text-blue-900 "/> 
                             {/* 84279-90450 */}
                             Call us
                            </a>  
                  </span>
              </div>

              {/* {data?.settings?.website && (

                <div className="flex items-left flex-col">

                    <span className="text-sm text-heading font-semibold mb-2">
                      {t("text-website")}
                    </span>

                    <div className = " " >

                      <div className="text-sm  w-36 -red-800  ">
                        {data?.settings?.website}
                      </div>

                      <div className=' '> 

                          <a
                            href={data?.settings?.website}
                            target="_blank"
                            className=" hidden 2xl:block text-md text-accent  bg-gray-100 rounded-md px-2 p-2  font-bold hover:text-accent-hover focus:outline-none focus:text-accent-hover"
                          >
                            {t("text-visit-site")}
                          </a>

                      </div>

                    </div>
                </div>
              )} */}

</div>
    )
}
