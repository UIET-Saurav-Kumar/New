
import { ROUTES } from "@utils/routes";
import Link from 'next/link';
type ShopCardProps = {
    shop: any;
};
const RestrauntShopCard: React.FC<ShopCardProps> = ({ shop })=> {

    return (
        <Link href={`${ROUTES.SHOPS}/${shop.slug}`}>

            <div className='flex flex-col w-68 h-80 xs+:w-62 xs+:h-80 xs++:w-44 xs++:h-96 sm:w-36 sm:h-96  md:w-60 md:h-72  md+:w-56 md+:h-80 md++:w-64 md++:h-80 lg:w-54 lg:h-96 
                            lg+:w-52 lg+:h-80 xs+:h-72  xl:w-56 xl+:w-48 xl+:h-96 xl++:w-60 xl++:h-80  2xl:w-60 2xl:h-96 border rounded-xl
                        bg-white shadow-md p-3 mx-1 my-2   cursor-pointer' >

                <img  className=' h-1/2 xs+:h-1/2 sm:h-1/2 md:h-1/2  lg:h-1/2 w-full ' src = {shop?.logo?.thumbnail ?? "/product-placeholder.svg"} />

                    <div className='flex flex-col space-y-1 sm:space-y-2 md:space-y-3 2xl:space-y-3 
                                    justify-between h-52  -mt-5 md:h-24 2xl:h-42' >

                            <span className='flex items-center -py-6 justify-between mt-8'> 
                            <h4 className='font-semibold text-xs sm:text-xs md:text-sm  '> {shop?.name} </h4>
                            <h4 className='text-green-600 text-xs lg:text-md  font-bold'> Open </h4>
                            </span>

                                <h4 className='text-xs font-md'> Starting from: <span className= 'text-xs font-light text-gray-600' >₹{ shop.price ?? "10"}</span></h4>

                                <h5 className='font-md text:xs sm:text-xs xl:text-md '>  { shop.distance ?? "10km"}:
                                    <span className='font-light text-xs text-gray-600' > {shop?.address}  </span>  
                                </h5>

                                <h5 className='font-light text-xs' > Timing: <span className='text-xs font-light text-gray-600'> { shop.timing ?? "2pm"} </span></h5>

                                <button className='bg-yellow-500 text-xs lg:text-sm rounded-lg  py-1 px-1 text-white '> 
                                
                                    Products and offers

                                </button> 

                        </div>
                
            </div>
        </Link>
    )
}
export default RestrauntShopCard