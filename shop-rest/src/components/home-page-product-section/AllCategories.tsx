
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
        limit: 16 as number
    });



	function getLink(category:String){
		var pathname="/"+router.locale+"/shops?category="+category.replace("&","-");
		// const { type, ...rest } = query;
		// var text=(query.text)?query.text:"";

		return pathname;
		// +"?text="+text;
	}

	
	return (

        <div className='mt-0 md:mt-28 lg:mt-36'>

          <div id='all-categories' className='categories-page -mt-28 xs+:-mt-28 sm:-mt-44 xl:mt-60 2xl:mt-96 border-b bg-gray-50 rounded-t'>
	    	<h3 className='text-lg sm:text-lg md:text-lg xl:text-2xl  font-semibold  p-2' > Shop by Category  </h3>
		  </div>

	    <div className='all-categories grid grid-cols-2 sm+:grid-cols-2 
	                	md:grid-cols-4 lg:grid-cols-6 lg+:grid-cols-6    
                        2xl:grid-cols-5 mt-0  h-full gap-2 lg:gap-6 p-4  bg-gray-100'>

    
		  {data?.categories?.data.map( (category,_idx) => (
			  
				<Link className="categories-link" 
				      key={_idx} href={getLink(category.name)}>
			       
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
