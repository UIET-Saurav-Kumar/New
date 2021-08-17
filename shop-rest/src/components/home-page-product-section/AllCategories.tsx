
import Link from 'next/link';
import { useCategoriesQuery } from "@data/home/use-categories-query";
import { useRouter } from "next/router";



const AllCategories = () => {

	const router = useRouter();
	const { query } = useRouter();
    const { type } = query;
    
    const {
        data,
        isLoading: loading,
        error,
    } = useCategoriesQuery({
        type: type as string,
        limit: 10 as number
    });



	function getLink(category:String){
		var pathname="/"+router.locale+"/shops?category="+category.replace("&","-");
		// const { type, ...rest } = query;
		// var text=(query.text)?query.text:"";

		return pathname;
		// +"?text="+text;
	}


	return (
        <>
    <div id='all-categories' className='categories-page -mt-10 xs+:mt-2 sm:mt-2 xl:mt-16 border-b bg-gray-50 rounded-t'>
		<h3 className=' text-xs sm:text-md md:text-md xl:text-lg  font-semibold  p-2' > Shop by Category  </h3>
		</div>

	    <div className='all-categories grid grid-cols-2 sm+:grid-cols-3  
	                	md:grid-cols-3 lg:grid-cols-4 lg+:grid-cols-4  lg:gap-2  gap-2
                        lg:place-items-center 2xl:gap-2 2xl:grid-cols-4 
                        my-4 px-2 md:p-4 lg:px-4 xl:p-4 p-2 mt-0  bg-gray-100 '>

									
    
		  { data?.categories?.data.map( (category,_idx) => (
			  
				<Link className="categories-link" 
				       key={_idx} href={getLink(category.name)}>
			       
				   <div className='flex justify-between items-center h-24 max-w-30 md:max-w-96 md:h-30 lg:max-w-600 lg:h-40 xl+:w-30 2xl:h-48  lg+:max-w-600 lg+:h-44 xl+:max-w-600 xl++:h-48 xl++:max-w-500 2xl:max-w-500 3xl:max-w-800 xl:justify-center 2xl:items-center border p-4 md:p-2 
								  bg-white rounded-md md:px-3 lg:px-1 px-0 cursor-pointer hover:border-gray-400 ' 
						 key={category.id} >

						<img className='rounded-full w-10 h-10 xs++:w-16 xs++:h-16 xs+++:w-20 xs+++:h-20 sm:w-20 sm:h-20 first-line: md:w-16 md:h-16 ml-2  lg:w-28 lg:h-28 lg+:w-28 lg+:h-28 xl+:w-32 xl+:h-32 xl++:w-32 xl++:h-32 2xl:w-32 2xl:h-32 object-contain'  
						     src={category?.image.thumbnail} 
							 style={{objectFit:"cover"}} 
							 layout='fixed' />   

						<div className='flex flex-col justify-center w-20 md-w-24 lg:w-32 xl:w-58 xl:h-52 2xl:w-64 2xl:h-40 space-y-1 px-1 md:px-3 lg:px-4 2xl:px-4 '>
							<h3 className='font-semibold text-10px  md:text-md lg:text-md 2xl:text-lg '> 
							    {category.name}
							</h3>
						</div>
				
					</div>
				
				</Link>
		  ))}
		  
			
		</div>
		
	
    
</>
	)
}

export default AllCategories;
