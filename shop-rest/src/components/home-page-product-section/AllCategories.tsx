
import Link from 'next/link';
import { useCategoriesQuery } from "@data/home/use-categories-query";
import { useRouter } from "next/router";
import { useLocation } from "@contexts/location/location.context";



const AllCategories = () => {

	const router = useRouter();
	const { query } = useRouter();
    const { type } = query;
	const {getLocation} =useLocation()
    
    const {
        data,
        isLoading: loading,
        error,
    } = useCategoriesQuery({
        type: type as string,
        limit: 16 as number
    });

	const address =   getLocation?.formattedAddress || "chandigarh";

	function location(){
        return address?.includes('Mohali') || address?.includes('Chandigarh') || address.includes('Panchkula') ;
    }



	function getLink(category:String){

		var pathname="/"+router.locale+"/shops?category="+category.replace("&","-");

		return pathname;
		
	}


	function getLinkGrocery(){

		var pathname="/shops/chandigarh-grocery-store";
		
		return pathname;
		
	}

	//getLinkSalonSpa
	function getLinkSalonSpa(){

		var pathname="/salon";

		return pathname;
	}


	// console.log('categories',data?.categories?.data)

	
	return (

        <div className='mt-0 md:mt-8 lg:mt-10'>

          <div id='all-categories' className='categories-page mt-8 xs+:mt-8 sm:mt-8 xl:mt-10 2xl:mt-96 border-b bg-gray-50 rounded-t'>
	    	<h3 className='text-lg sm:text-lg md:text-lg xl:text-2xl  font-semibold  p-2' > Shop by Category  </h3>
		  </div>

	    <div className='all-categories grid grid-cols-3 sm+:grid-cols-3 
	                	md:grid-cols-4 lg:grid-cols-6 lg+:grid-cols-6    
                        2xl:grid-cols-5 mt-0  h-full gap-2 lg:gap-6 p-4  bg-gray-100'>

    
			{data?.categories?.data.map( (category,_idx) => (
				
					<Link className="categories-link" 
						key={_idx} href={category.name === 'Groceries' && location() ?  getLinkGrocery()    : category?.name === 'Salon & Spa' && location() ? getLinkSalonSpa() :  getLink(category.name)}>
					
						<div className='rounded flex flex-col w-full  cursor-pointer  border-gray-200 
										hover:border-gray-400  items-center'
							key={category.id} >

								<img className=' w-full h-full object-cover'  

									src={category?.image.thumbnail} 
								/>   
						</div>
					
					</Link>
			))}
		  
			
		</div>
		
	
    
</div>
	)
}

export default AllCategories;
