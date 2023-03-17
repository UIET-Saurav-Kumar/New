import { useLocation } from "@contexts/location/location.context";
import { useCategoriesQuery } from "@data/home/use-categories-query";
import { useShopsQuery } from "@data/shop/use-search-shop-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';


export default function SearchHistory({props}:any) {

    const searchHistory = JSON.parse(
        window.localStorage.getItem("searchHistory") || "[]"
      );

      const router = useRouter();
	const { query } = useRouter();
    const { type } = query;

    const {getLocation} = useLocation();

    const   filteredHistory = searchHistory?.length ? 
      searchHistory.reduce((acc, curr) => {
        if (!acc.some((item) => item.label === curr.label)) {
          acc.push(curr);
        }
        return acc;
      }, []).map((item) => ({ label: item.label, value: item?.value, available: item?.available, text_type: item?.text_type })) 
      : defaultHistory

      const [shopCategory, setShopCategory] = useState('');

      useEffect(()=>{
            
      },[shopCategory])


      const { data: shopData } = useShopsQuery({
        category:'Salon+-+Spa',
        // limit:3000000,
        location:((getLocation?.formattedAddress)?JSON.stringify(getLocation):null ) as any,
        is_active:1,
        // page:1,
        // search:getSearch()
      });

      console.log('shopData',shopData)

      

      const {
        data,
        isLoading: loading,
        error,
    } = useCategoriesQuery({
        type: type as string,
        limit: 16 as number
    });

    const allCat = data?.categories?.data;

    
      
    function matchCategory() {
        const shopKeyword = ['shops', 'shops', 'brands', 'brand', 'outlet'];
        const productKeyword = ['products', 'product', 'items', 'item'];
        const allCategories = data?.categories?.data.map((m)=>m?.name);
      
        const uniqueLabels = filteredHistory.reduce((acc, obj) => {
          if (!acc.includes(obj.label)) {
            acc.push(obj.label);
          }
          return acc;
        }, []);
      
        return allCat?.flatMap(cat => {
          return uniqueLabels
            .filter((label:any) => {
              const words = label?.toLowerCase().split(' ');
              return words.some((word:any) => {
                return word?.includes(cat?.name?.toLowerCase()) ||
                (  shopKeyword?.includes(word) &&
                  productKeyword?.includes(word))
              });
            })
            .map((label:any) => {
              const matchedKeywords = label?.toLowerCase().match(new RegExp(`(${shopKeyword.join('|')}|${productKeyword.join('|')})`, 'g')) || [];
              return {
                category: cat?.name,
                search_text: label,
                matchedKeywords: matchedKeywords
              };
            });
        });
      }
      
      
      
    console.log('search history',filteredHistory, data?.categories?.data, matchCategory());


  return (

        <div className='w-full my-4 space-y-2'>

          <p className='text-lg font-semibold text-gray-900'>
            Your Recent searches
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 overflow-x-scroll  gap-4 lg:space-y-0 p-4 lg:space-x-2 w-full'>

            { 
              matchCategory()?.map((category)=>  
                <>
                    <div className=" shadow-300 border   h-full">  

                        <p className="text-gray-600 font-semibold text-center w-full">
                            {category?.search_text}
                        </p>

                        <div className="grid grid-cols-2 p-2 shadow-300   gap-2 h-full">
                            
                            <div className=' rounded'>
                             <img className="" src='/gym.jpg'/>
                             <span className=" text-gray-700 font-light  text-center p-2">{category?.category}</span>
                            </div>

                            <div className='   rounded'>
                             <img className="" src='/gym.jpg'/>
                             <span className=" text-gray-700 font-light  text-center p-2">{category?.category}</span>
                            </div>

                            <div className='   rounded'>
                             <img className="" src='/gym.jpg'/>
                             <span className=" text-gray-700 font-light  text-center p-2">{category?.category}</span>
                            </div>

                            <div className='   rounded'>
                             <img className="" src='/gym.jpg'/>
                             <span className=" text-gray-700 font-light  text-center p-2">{category?.category}</span>
                            </div>

                        </div>

                    </div>

                </>
            )}


          </div>
  

        </div>

  )
}
