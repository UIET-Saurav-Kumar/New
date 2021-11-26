
import Image from "next/image";
import { MapPin } from "@components/icons/map-pin";
import { useTranslation } from "next-i18next";
import { formatAddress } from "@utils/format-address";
import { ROUTES } from "@utils/routes";
import Link from "./link";
import isEmpty from "lodash/isEmpty";

type ShopCardProps = {
  shop: any;
};

const TandoorShopCard: React.FC<ShopCardProps> = ({ shop }) => {

  const { t } = useTranslation();

  console.log('tandoor',shop)

  const isNew = false;

  return (

    <Link href={`${ROUTES.SHOPS}/${shop.slug}`}>
        {/* <div className='flex flex-col w-68 h-80 xs+:w-62 xs+:h-80 xs++:w-44 xs++:h-96 sm:w-36 sm:h-96  md:w-60 md:h-72  md+:w-56 md+:h-96 md++:w-64 md++:h-96 lg:w-54 lg:h-96 
              lg+:w-52 lg+:h-96 xs+:h-500  xl:w-58 xl+:w-52 xl+:h-800 xl++:w-60 xl++:h-96  2xl:w-96 2xl:h-96 border rounded-xl
              bg-white shadow-md p-6 py-6 mx-1 my-2  cursor-pointer' > */}


        <div className='grid grid-cols-1 border place-items-center sm:grid-cols-1 p-4 sm:place-items-center md:space-y-0 h-full md:w-full w-full 
                       justify-between shadow-md hover:shadow-xl hover:border-blue-300 lg:space-y-2 rounded-lg bg-gray-50 lg:w-auto '>

            <div className=' w-44  md:w-48 px-10 lg:w-full'>
                  <img  className='h-full sm:h-full md:h-full lg:h-full w-full' 
                        src={shop?.logo?.thumbnail ?? "/product-placeholder.svg"} />
            </div> 

            <div className='flex  flex-col space-y-0 mt-0 md:mt-4 lg:mt-8
                            justify-evenly md:h-auto xl:h-auto 2xl:h-auto' >

                  <div className='flex justify-between items-center '> 
                      
                      <h4 className='font-md w-full font-md text-xs sm:text-sm  h-10 lg:text-lg 
                                      text-center mt-2 md:text-md font-semibold text-blue-800  rounded-lg  '> 
                         {shop?.name} 
                      </h4>
                      {/* <button className='bg-pink-700 text-xs lg:text-sm rounded-lg mb- mt-10 py-1 px-1 text-white '> 
                                  Products 
                      </button>  */}
                      {/* <h4 className='text-green-600 text-xs sm:text-sm lg:text-sm md:text-sm font-bold'> 
                          Open 
                      </h4> */}

                  </div>

                  {/* <div className='h-20'> 
                        <h5 className='text-sm font-semibold text-gray-800 flex items-center'>                 
                           <MapPin className=" w-3 h-3 md:w-6 md:h-6 me-1 text-green-600 flex-shrink-0" />
                           {shop?.address?.city}                     
                        </h5>
                  </div>  */}
                       
            </div>  
          
        </div>
      </Link>
  );
};

export default TandoorShopCard;
