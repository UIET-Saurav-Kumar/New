
import { useRouter } from "next/router";
import { useFeatureProductQuery } from "@data/home/use-feature-product-query";
import { siteSettings } from "@settings/site.settings";
import { motion } from "framer-motion";
import { useLocation } from "@contexts/location/location.context";
import renderProductCard from "@components/product/home-product-card";
import { useEffect } from "react";

export default function featuredProducts({}) {

    const { query } = useRouter();
    const { type } = query;
    const {getLocation} =useLocation()
    
    const {
        data,
        isLoading: loading,
        error,
    } = useFeatureProductQuery({
        limit: 10 as number,
        search:"",
        location : ((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any
    });

    useEffect(()=>{
        console.log(getLocation?.formattedAddress,"from featured products")
    })

    return (

        <>

        <div id='featured-products' className=' flex flex-col mt-8 border-b rounded-t p-4 bg-gray-50 '>
            <div className='flex justify-between '>
                <h3 className='font-semibold text-xs sm:text-md md:text-md xl:text-lg  '> 
                    Featured Products 
                </h3>
                <h3 className=' text-xs font-blue hover:underline cursor-pointer' > view all </h3>
            </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
                     
                                     
                {data?.featureProducts.data?.map((product) => (

                    <>    
                        <motion.div key={product.id}>
                            {renderProductCard(product)}
                        </motion.div>
                    </> 
                ))}

            </div>
       </>
    )
}


