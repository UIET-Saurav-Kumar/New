
import React, { useEffect,useState } from 'react';
import { SearchIcon } from "@components/icons/search-icon";
import AsyncSelect from 'react-select/async';
import colourOptions from '@data/colourOptions';
import {fetchSearch} from '@data/search/use-search.query';
import { useRouter } from "next/router";
import { useLocation } from "@contexts/location/location.context";
import { useCreateLogMutation } from "@data/log/use-create-log.mutation";


export default function DropDown({getLoc}:{getLoc:any}) {

  const [inputValue,setInputValue] = useState("");
  const router = useRouter();
  const {getLocation} =useLocation()
  const { mutate: createLog, isLoading: loading } = useCreateLogMutation();
  
 

  const filterColors = (inputValue: string) => {
    return colourOptions.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  
  
  const loadOptions = async (inputValue:any, callback:any) => {

      var data = await fetchSearch(inputValue);      

    
      
      // callback(data);
     
      return data;

  };


  function getSearch(){
    var value;
    if(router.query.text){
      var text = router.query.text as string;
      value={
        label:text,
        value:text
      }
    }else{
      value={
        label:"",
        value:""
      }
    }

    return value;
  }

  function route(e:any=""){
    var {pathname}=router;
    pathname="/"+router.locale+"/shops";
    const { type, ...rest } = router.query;
    
    var text =e?.value
    setInputValue(e?.value)
    
    createLog({
      location:getLocation?.formattedAddress,
      search:text
    }, {
      onSuccess: (data: any) => {
        // console.log(data)
      },
    });

    router.push(
      {
          pathname,
          query: { ...rest,text },
      },
      {
          pathname,
          query: { ...rest,text},
      },
    );
  }
  
  function hasLocation():boolean{
    if(!getLocation?.formattedAddress){  
      return false
    }
    return true
  }

  function handleInputChange(newValue: string){
    return newValue;
  };

  function clear(){
      window.localStorage.removeItem("search");
      setInputValue("")
      changeRoute()
  }

  function changeRoute(e:any=""){
    if(!hasLocation()){
      getLoc();
    }else{
      route(e);
    }
  }

  function optionSelected(e:any){
    // clear();
    setInputValue(e);
    changeRoute(e);
  }

  //save the search keywords with corresponding image if its a shop to local storage
  function saveSearch(e:any){
    var {value}=e;
    if(value){
      window.localStorage.setItem("search",value);
    }
  }


  // some default options object with image
  const defaultOptions = [
    { value: 'Chandigarh+Home+Salon', label: 'Chandigarh Home Salon' },
    { value: 'Kosmetic+India', label: 'Kosmetic India', image: { avatar: true, src: 'https://placeimg.com/64/64/1' } },
    { value: 'Chandigarh+Grocery+Store', label: 'Chandigarh grocery store', image: { avatar: true, src: 'https://placeimg.com/64/64/2' } },
    { value: 'Beauzo+Salon', label: 'Beauzo Salon', image: { avatar: true, src: 'https://placeimg.com/64/64/3' } },
    { value: 'Salman+s+Makeover', label: 'Salman Makeover ', image: { avatar: true, src: 'https://placeimg.com/64/64/3' } },
    { value: 'Shri+Balaji+Fruits+And+Vegetables', label: 'Balaji Fruits & Vegetables', image: { avatar: true, src: 'https://placeimg.com/64/64/1' } },
  ];

   

    return (

        <div  className=' w-full z-10 relative'>

          {/* <div className='w-full shadow-md  relative'> */}
            
              <AsyncSelect
                  cacheOptions
                  // style={customStyles}
                  defaultValue={inputValue.value}
                  loadOptions={loadOptions} 
                  value={ inputValue }
                  defaultOptions={defaultOptions}
                  // onInputChange={handleInputChange}
                  placeholder={ <div className='text-xs sm:text-sm md:text:md  lg:text-sm'> Restaurants | Salons | Groceries </div>}
                  onChange={optionSelected}
              />
                  <SearchIcon className=" absolute right-3 top-3 lg:top-4  text-gray-400 w-4 h-4 me-2.5" />
          {/* </div> */}
          
        <div>
              {/* <button onClick={clear} className="h-10 px-4 lg:h-12 xl:h-12 xl:px-8 flex items-center rounded-lg rounded-ts-none rounded-bs-none bg-accent 
                                                text-light font-semibold transition-colors duration-200 focus:outline-none hover:bg-accent-hover focus:bg-accent-hover">
                                                  
                  <SearchIcon className="w-4 h-4 me-2.5" />
              </button> */}
          </div>
        </div>
    );
}
