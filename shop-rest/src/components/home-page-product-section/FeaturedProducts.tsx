
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

    console.log('featured product',data)

    // data?.featureProducts?.data = []

    const typeId = [1,2,3,4,5,6,7,8,9,10,11,12]

    const productTypes =  data?.featureProducts.data.filter(function(product){
        return product.type_id == typeId ? product : '';
     })

     console.log(productTypes)


   const groceryArray =  data?.featureProducts.data.filter(function(product){
      return product.type_id == 1 ? product : '';
   })

   const bakeryArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 2 ? product : '';
})

const makeupArray =  data?.featureProducts.data.filter(function(product){
   return product.type_id == 3 ? product : '';
})

const bagsArray =  data?.featureProducts.data.filter(function(product){
   return product.type_id == 4 ? product : '';
})

const clothingArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 5 ? product : '';
 })

 const furnitureArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 6 ? product : '';
 })

 const salonspaArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 7 ? product : '';
 })

 const restrauntsArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 8 ? product : '';
 })

 const buffetArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 9 ? product : '';
 })

 const groceryoffersArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 10 ? product : '';
 })

 const fashionlifestyleArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 11 ? product : '';
 })

 const beveragesArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 18 ? product : '';
 })

   console.log('grocery Array',groceryArray);
   console.log('bakery Array',bakeryArray);
   console.log('makeup Array',makeupArray);
   console.log('bags Array',bagsArray);
   console.log('buffet Array',buffetArray);
   console.log('array length', groceryArray?.length)


    return (

        <>
            <div id='featured-products' className=' flex flex-col w-full mt-8 border-b rounded-t p-4 bg-gray-50 '>
                <div className='flex justify-between items-center '>

                    <h3 className='text-lg sm:text-lg md:text-lg xl:text-2xl font-semibold  p-2'> 
                        Featured Products 
                    </h3>

                    {/* <div className='flex space-x-16 lg:space-x-20 px-6'>

                                <span className='relative space-y-2 cursor-pointer items-center h-14 border p-3 flex flex-col'>
                                     <img id='icon-image' src='/fruits-and-vegetables.png' 
                                          className=' featured-product-icon rounded-full h-10 w-10 lg:w-34 object-cover sm:object-cover'/>
                                      <h1 className=' absolute bottom-0 text-gray-600 font-semibold w-28 text-center text-xs'>Grocery</h1>
                                </span>

                                <span className='relative space-y-2 cursor-pointer h-14 items-center flex flex-col'> 
                                   <img src='/restaurant.png' 
                                        className='featured-product-icon rounded-full h-10 w-10 lg:w-34 object-cover sm:object-cover'/> 
                                    <h1 className='text-center absolute bottom-0 text-gray-600 font-semibold w-28  text-xs'>Restraunts</h1> 
                                </span>

                                <span className='relative space-y-2 cursor-pointer h-14 items-center flex flex-col'> 
                                   <img src='/wardrobe.png' 
                                        className='featured-product-icon rounded-full h-10 w-10 lg:w-34 object-cover sm:object-cover'/>
                                    <h1 className='text-center absolute bottom-0 text-gray-600 font-semibold w-28  text-xs'>Clothing</h1> 
                                </span>

                                <span className='relative space-y-2 cursor-pointer h-14 items-center flex flex-col'>
                                     <img src='/weightlifting.png' 
                                          className='featured-product-icon rounded-full h-10 w-10 lg:w-34 object-cover sm:object-cover'/>
                                      <h1 className='text-center absolute bottom-0 text-gray-600 font-semibold w-28  text-xs'>Health & Fitness</h1> 
                                </span>

                                <span className='relative space-y-2 cursor-pointer h-14 items-center flex flex-col'>
                                    <img src='/pharmacy.png' 
                                        className='featured-product-icon rounded-full h-10 w-10 lg:w-34 object-cover sm:object-cover'/>
                                    <h1 className='text-center absolute bottom-0 text-gray-600 font-semibold w-28  text-xs'>Pharmacy</h1> 
                                </span>

                                <span className='relative space-y-2 cursor-pointer h-14 items-center flex flex-col'>
                                    <img src='/pedicure.png' 
                                        className='featured-product-icon rounded-full h-10 w-10 lg:w-34 object-cover sm:object-cover'/> 
                                    <h1 className='text-center absolute bottom-0 text-gray-600 font-semibold w-28  text-xs'>Salon & Spa</h1>
                                </span>

                                <span className='relative space-y-2 cursor-pointerh-14 items-center flex flex-col'>
                                     <img src='/food-and-drink.png' 
                                          className='featured-product-icon rounded-full h-10 w-10 lg:w-34 object-cover sm:object-cover'/> 
                                      <h1 className='text-center absolute bottom-0 text-gray-600 font-semibold w-28  text-xs'>Fruits & Vegetables</h1>
                                </span>
                                  
                    </div> */}
                    {/* <h3 className=' text-xs font-blue hover:underline cursor-pointer' > view all </h3> */}
                </div>
            </div>
            
            
            <div className={`${groceryArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                  <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                       Grocery
                  </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
                    
                        {groceryArray?.map((product :any) => (
                            <>    
                                <motion.div key={product.id}>
                                    {renderProductCard(product) }
                                </motion.div>
                            </> 
                        ))}

                    </div>
            </div> 
            
        
            <div className={`${bakeryArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                    Bakery
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
            

                    {bakeryArray?.map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                {renderProductCard(product) }
                            </motion.div>
                        </> 
                    ))}

                </div>
            </div> 

    
             <div className={`${salonspaArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                    Salon & Spa
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
            


                    {salonspaArray?.map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                {renderProductCard(product) }
                            </motion.div>
                        </> 
                    ))}

                </div>
            </div> 



            
          
             <div className={`${groceryoffersArray?.length ? 'block' : 'hidden'} flex flex-col`}>

                <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                    Grocery Offers
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
            


                    {groceryoffersArray?.map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                {renderProductCard(product) }
                            </motion.div>
                        </> 
                    ))}

                </div>
            </div> 
             
           
             <div className={`${clothingArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                    Clothing
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
            
                    {clothingArray?.map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                {renderProductCard(product) }
                            </motion.div>
                        </> 
                    ))}
                </div>
            </div> 
         
            
           
             <div className={`${furnitureArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                    Furniture
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
            


                    {furnitureArray?.map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                {renderProductCard(product) }
                            </motion.div>
                        </> 
                    ))}

                </div>
            </div>

            <div className={`${buffetArray?.length ? 'block' : 'hidden'} flex flex-col`}>
                <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                   Buffets
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">

                    {buffetArray?.map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                {renderProductCard(product) }
                            </motion.div>
                        </> 
                    ))}

                </div>
            </div> 

            
             <div className={`${fashionlifestyleArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                    Fashion & Lifestyle
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
            


                    {fashionlifestyleArray?.map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                {renderProductCard(product) }
                            </motion.div>
                        </> 
                    ))}

                </div>
            </div> 

           
            <div className={`${beveragesArray?.length  ? 'block' : 'hidden'} flex flex-col`}>
                <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                   Beverages
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">

                    {beveragesArray?.map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                {renderProductCard(product) }
                            </motion.div>
                        </> 
                    ))}

                </div>
            </div>



          <div className={`${restrauntsArray?.length  ? 'block' : 'hidden'} flex flex-col`}>
                <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl text-gray-800 font-semibold  p-2'> 
                   Restraunts & Takeaways
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">

                    {restrauntsArray?.map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                {renderProductCard(product) }
                            </motion.div>
                        </> 
                    ))}

                </div>
            </div> 


            <style jsx>{`
               #icon-image::after{
                   content: 'Grocery';
                   color: black;
               }
            `}</style>
            
       </>
    )
}


