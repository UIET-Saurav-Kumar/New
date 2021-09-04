
import Link from 'next/link';
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useFeatureShopQuery } from "@data/home/use-feature-shop-query";
import { useLocation } from "@contexts/location/location.context";

export default function FeaturesShops({ }) {


    const { query } = useRouter();
    const { type } = query;
    const router = useRouter();
    const {getLocation} =useLocation()

    const {
        data,
        isLoading: loading,
        error,
    } = useFeatureShopQuery({
        limit: 16 as number,
        search:"",
        location : ((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any
    });

    function getLink(){
		var pathname="/"+router.locale+"/shops/"
		const { type, ...rest } = query;
		var text=(query.text)?query.text:"";

		return pathname+"?text="+text;
	}

        return (

            <>

                <div id='featured-shops' className=' flex flex-col mt-8 border-b rounded-t pb-4 bg-gray-50'>
    
                    <div className='flex justify-between  p-2 px-4'>
    
                        <h3 className='font-bold text-xs sm:text-md md:text-md xl:text-xl  '>
                            Featured Local Shops Nearby
                        </h3>

                        <Link href={getLink()}>
                            <h3 className='font-blue text-sm sm:text-sm md:text-md 2xl:text-md  hover:underline cursor-pointer font-light text-blue-600 ' > view all </h3>
                        </Link>
    
                    </div>

                </div>
    
                <div className=' grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 lg:gap-2  gap-2
                                            lg:place-items-center 2xl:gap-2 2xl:grid-cols-4
                                            mt-0 px-2 lg:px-4 bg-gray-100 p-4' >
    
    
                        {data?.featureShops.data?.map((shop, _idx) => (
                            <Link href={`${ROUTES.SHOPS}/${shop.slug}`} key={_idx}>
                                <div  className='flex justify-evenly lg:justify-evenly items-center h-32 w-full  md:h-34  lg:h-40 2xl:h-48  xl:justify-evenly 
                                     2xl:items-center border p-4 md:p-2  bg-white rounded-md px-0 cursor-pointer hover:border-gray-400'>
                                   
                                          {/* <img className='rounded-0 w-10 h-10 xs+:w-16 xs+:h-16 xs++:w-20 xs++:h-20 sm:w-28 
                                                          sm:h-24 md:w-20 lg:w-28 lg:h-32 2xl:w-38 2xl:h-38'  */}
                                                          <img className='  w-16 h-16 xs++:w-16 xs++:h-16 xs+++:w-20 xs+++:h-20 sm:w-20 sm:h-20 
                                                                md:w-16 md:h-16 ml-2  lg:w-28 lg:h-28 lg+:w-28 lg+:h-28 xl+:w-32 xl+:h-32 xl++:w-32 
                                                                xl++:h-32 2xl:w-32 2xl:h-32 object-contain'  
                                                               src={shop.logo?.thumbnail}
                                                               style={{ objectFit: "contain" }} />
        
                                    <div className='flex flex-col justify-center w-20 sm+:ml-0 md-w-24 lg:w-38 2xl:w-64 2xl:h-40 space-y-1 px-2 md:px-3 lg:px-4 2xl:px-4'>
                                        <h3 className='font-semibold text-10px  md:text-md lg:text-sm 2xl:text-lg  '> {shop.name}</h3>
                                        <h3 className='font-light text-10px sm:text-xs md:text-md lg:text-md 2xl:text-md ' >   {shop?.address?.city} </h3>
                                    </div>
    
                                </div>
                            </Link>
                        ))}
                    </div>
    
              </>

        )
}
