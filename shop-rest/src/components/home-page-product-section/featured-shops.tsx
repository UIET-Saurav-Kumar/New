
import Link from 'next/link';
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useFeatureShopQuery } from "@data/home/use-feature-shop-query";
import { useLocation } from "@contexts/location/location.context";
import Avatar from 'react-avatar';
import Image from 'next/image';

export default function FeaturedShops({ }) {


    const { query } = useRouter();
    const { type } = query;
    const router = useRouter();
    const {getLocation} =useLocation()

    const imageCheck = (logo: any , record:any, imgsize:any, imgDim:any, classname: string) => {
        console.log(logo)
        let check = false;
        let splitLength = logo?.split("/").length;
        let lastSplit = logo?.split("/")[splitLength - 1];
        if (lastSplit != "") {
          check = true;
        }
        return (check ? <img src={logo} alt={record?.name} style={{ objectFit: "contain" }} className={classname} />:<Avatar name={record?.name} size={imgsize} round={imgDim}  />);
      }

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

            <div className={`${data?.featureShops.data?.length  ? 'block' : 'hidden'}`}>

                <div id='featured-shops' className=' flex flex-col mt-8 border-b rounded-t pb-4'>
    
                    <div className='flex justify-between items-center p-2 px-4'>
    
                        <h3 className='text-lg sm:text-lg md:text-lg xl:text-2xl  font-semibold  p-2  '>
                            Trending Local Shops Nearby
                        </h3>

                        <Link href={getLink()}>
                            <h3 className='font-blue text-sm sm:text-sm md:text-md 2xl:text-md  hover:underline cursor-pointer font-light text-blue-600 ' > view all </h3>
                        </Link>
    
                    </div>

                </div>
    
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:gap-2  gap-2
                                lg:place-items-center 2xl:gap-5 2xl:grid-cols-5
                                mt-0 px-2 lg:px-4 p-4'>
    
    
                        {data?.featureShops.data?.map((shop, _idx) => (
                            <Link href={`${ROUTES.SHOPS}/${shop.slug}`} key={_idx}>
                                <div  className='flex flex-col justify-evenly lg:justify-evenly items-center h-44 w-full  md:h-44  lg:h-64 2xl:h-96  xl:justify-evenly 
                                        hover:-translate-y-1 hover:scale-95 duration-200 2xl:items-center border-2   p-4 md:p-2 shadow-lg  bg-white rounded-sm px-0 
                                        cursor-pointer transition duration-800 hover:ease-out hover:border-magenta'>
                                   
                                          {/* <img className='rounded-0 w-10 h-10 xs+:w-16 xs+:h-16 xs++:w-20 xs++:h-20 sm:w-28 
                                                          sm:h-24 md:w-20 lg:w-28 lg:h-32 2xl:w-38 2xl:h-38'  */}
                                                     
                                        {shop?.logo ? 
                                          <Image  lazyBoundary='50px'  loading='eager' quality='40' src={shop?.logo?.thumbnail} 
                                        alt={shop?.name}
                                        width={200}
                                        height={200}
                                        layout="intrinsic"
                                        priority={true}
                                        objectFit="contain"

                                        //className='w-20 h-20  sm:w-20 sm:h-20 md:w-16 md:h-16  lg:w-28 lg:h-28 lg+:w-28 lg+:h-28 xl+:w-32 xl+:h-32 xl++:w-48 xl++:h-48 2xl:w-44 2xl:h-44 object-contain'
                                        
                                        /> : 
                                        imageCheck(shop.logo?.thumbnail, shop, '130', false,'group-hover:-translate-y-1 hover:scale-110 duration-200 w-20 h-20  sm:w-20 sm:h-20 md:w-16 md:h-16  lg:w-28 lg:h-28 lg+:w-28 lg+:h-28 xl+:w-32 xl+:h-32 xl++:w-48 xl++:h-48 2xl:w-44 2xl:h-44 object-contain')}
        
                                    <div className='flex flex-col text-center justify-center w-full space-y-1 px-2 md:px-3 lg:px-4 2xl:px-4'>
                                        <h3 className='font-semibold text-sm  md:text-md lg:text-sm 2xl:text-lg text-gray-700   '> {shop?.name}</h3>
                                        <h3 className='font-light text-10px sm:text-xs md:text-md lg:text-md 2xl:text-md text-gray-700'>   {shop?.address?.city} </h3>
                                    </div>
    
                                </div>
                            </Link>
                        ))}
                </div>
    
              </div>

        )
}
