
import { useRouter } from "next/router";
import { useFeatureProductQuery } from "@data/home/use-feature-product-query";
import { siteSettings } from "@settings/site.settings";
import { motion } from "framer-motion";
import { useLocation } from "@contexts/location/location.context";
import renderProductCard from "@components/product/home-product-card";
import { useEffect } from "react";
import Neon from "@components/product/product-card/neon";
import Neon2 from "@components/product/product-card/neon2";

export default function FeaturedProducts({}) {

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

     console.log('feature product',data)


    // data?.featureProducts?.data = []

    const types = {
        cosmetics : {
            title:"Cosmetics",
            id:1,
        },
        groceries : {
            title:"Groceries",
            id:2,
        },
        pharmacy : {
            title:"Pharmacy",
            id:3,
        },
        salon_spa : {
            title:"Salon & Spa",
            id:4,
        },
        veggies : {
            title:"Vegetables & Fruits",
            id:5,
        },
        restaurants : {
            title:"Restaurants",
            id:6,
        },
        fashionlifestyle : {
            title:"Fashion & Lifestyle",
            id:7,
        },
        takeaways : {
            title:"Takeaways",
            id:8,
        },
        gym_health : {
            title:"Gym & Health Products",
            id:12,
        },
        electrical : {
            title:"Electrical & Electronics",
            id:13,
        },
        dairy : {
            title:"Dairy & Meat",
            id:16,
        },
        services : {
            title:"Services",
            id:19,
        },
    }

    // const typeId = [1,2,3,4,5,6,7,8,9,10,11,14,15,16,18,19,20,21,22]

       
   const groceryArray =  data?.featureProducts.data.filter(function(product){
      return product.type_id == 1 ? product : null;
   })

   const bakeryArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 2 ? product : null;
})

const makeupArray =  data?.featureProducts.data.filter(function(product){
   return product.type_id == 3 ? product : null;
})

const bagsArray =  data?.featureProducts.data.filter(function(product){
   return product.type_id == 4 ? product : null;
})

const clothingArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 5 ? product : null;
 })

 const furnitureArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 6 ? product : null;
 })

 const salonspaArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 7 ? product : null;
 })

 const restrauntsArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 8 ? product : null;
 })

 const buffetArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 9 ? product : null;
 })

 const groceryoffersArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 10 ? product : null;
 })

 const fashionlifestyleArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 11 ? product : null;
 })

 const hotelsresortsArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 14 ? product : null;
 })

 const fruitsvegetablesArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 15 ? product : null;
 })

 const pharmacyArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 16 ? product : null;
 })

 const beveragesArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 18 ? product : null;
 })

 const healthproductsArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 19 ? product : null;
 })

 const dairyfarmArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 20 ? product : null;
 })

 const meatArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 21 ? product : null;
 })

 const electronicsArray =  data?.featureProducts.data.filter(function(product){
    return product.type_id == 22 ? product : null;
 })

 const arrays = [
    {
        name:'groceryArray',
        title:'Grocery',
    },
    {
        name:'bakeryArray',
        title:'Bakery',
    },
    {
        name:'makeupArray',
        title:'Makeup',
    },
    {
        name:'bagsArray',
        title:'Bags',
    },
    {
        name:'clothingArray',
        title:'Clothing',
    },
    {
        name:'furnitureArray',
        title:'Furniture',
    },
    {
        name:'salonspaArray',
        title:'Salon & Spa',
    },
    {
        name:'restrauntsArray',
        title:'Restaurants',
    },
    {
        name:'buffetArray',
        title:'Buffet',
    },
    {
        name:'groceryoffersArray',
        title:'Grocery Offers',
    },
    {
        name:'fashionlifestyleArray',
        title:'Fashion & Lifestyle',
    },
    {
        name:'hotelsresortsArray',
        title:'Hotels & Resorts',
    },
    {
        name:'fruitsvegetablesArray',
        title:'Fruits & Vegetables',
    },
    {
        name:'pharmacyArray',
        title:'Pharmacy',
    },
    {
        name:'beveragesArray',
        title:'Beverages',
    },
    {
        name:'healthproductsArray',
        title:'Health Products',
    },
    {
        name:'dairyfarmArray',
        title:'Dairy & Farm',
    },
    {
        name:'meatArray',
        title:'Meat',
    },
    {
        name:'electronicsArray',
        title:'Electronics',
    },
    
]



    return (

        <div className={`${data?.featureProducts.data?.length  ? 'block' : 'hidden'}`}>
            <div id='featured-products' className=' flex flex-col w-full mt-8 border-b rounded-t p-4 bg-gray-50 '>
                <div className='flex justify-between items-center '>

                    <h3 className='text-lg sm:text-lg md:text-lg xl:text-2xl font-semibold  p-2'> 
                        Featured Products 
                    </h3>

                    
                </div>
            </div>
            
             <div className={`${salonspaArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                    Salon & Spa
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
            


                    { salonspaArray?.filter(product => product?.status === 'publish').map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                 <Neon2 product={product} />
                            </motion.div>
                        </> 
                    ))}

                </div>
            </div> 
            
            <div className={`${groceryArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                  <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                       Grocery
                  </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
                    
                        {groceryArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                            <>    
                                <motion.div key={product.id}>
                                     <Neon2 product={product} />
                                </motion.div>
                            </> 
                        ))}

                    </div>
            </div> 
            
             <div className={`${fruitsvegetablesArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                  <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                       Fruits & Vegetables
                  </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
                    
                        {fruitsvegetablesArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                            <>    
                                <motion.div key={product.id}>
                                     <Neon2 product={product} />
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

                    {beveragesArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                 <Neon2 product={product} />
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
            


                    {fashionlifestyleArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                 <Neon2 product={product} />
                            </motion.div>
                        </> 
                    ))}

                </div>
            </div> 
            
           

            <div className={`${electronicsArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                  <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                       Electrical Appliances
                  </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
                    
                        {electronicsArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                            <>    
                                <motion.div key={product.id}>
                                     <Neon2 product={product} />
                                </motion.div>
                            </> 
                        ))}

                    </div>
            </div> 

            <div className={`${meatArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                  <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                       Fresh Meat
                  </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
                    
                        {meatArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                            <>    
                                <motion.div key={product.id}>
                                     <Neon2 product={product} />
                                </motion.div>
                            </> 
                        ))}

                    </div>
            </div> 

            <div className={`${dairyfarmArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                  <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                       Dairy & Farm
                  </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
                    
                        {dairyfarmArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                            <>    
                                <motion.div key={product.id}>
                                     <Neon2 product={product} />
                                </motion.div>
                            </> 
                        ))}

                    </div>
            </div> 

            <div className={`${healthproductsArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                  <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                       Health Products
                  </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
                    
                        {healthproductsArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                            <>    
                                <motion.div key={product.id}>
                                     <Neon2 product={product} />
                                </motion.div>
                            </> 
                        ))}

                    </div>
            </div> 

            <div className={`${pharmacyArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                  <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                       Pharmacy & Medicines
                  </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
                    
                        {pharmacyArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                            <>    
                                <motion.div key={product.id}>
                                     <Neon2 product={product} />
                                </motion.div>
                            </> 
                        ))}

                    </div>
            </div> 

           

            <div className={`${hotelsresortsArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                  <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                       Hotel & Resorts
                  </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
                    
                        {hotelsresortsArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                            <>    
                                <motion.div key={product.id}>
                                     <Neon2 product={product} />
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
            

                    {bakeryArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                 <Neon2 product={product} />
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
            
                    {groceryoffersArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                 <Neon2 product={product} />
                            </motion.div>
                        </> 
                    ))}
enoeo
                </div>
            </div> 
             
           
            <div className={`${clothingArray?.length  ? 'block' : 'hidden'} flex flex-col`}>

                <h3 className='text-lg sm:text-lg md:text-lg xl:text-xl  font-semibold  p-2'> 
                    Clothing
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 bg-gray-100 p-4 gap-2">
            
                    {clothingArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                 <Neon2 product={product} />
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
            


                    {furnitureArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                 <Neon2 product={product} />
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

                    {buffetArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                 <Neon2 product={product} />
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

                    {restrauntsArray?.filter(product=> product?.status === 'publish').map((product :any) => (
                        <>    
                            <motion.div key={product.id}>
                                 <Neon2 product={product} />
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
            
       </div>
    )
}


