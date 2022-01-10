import React, { useEffect,useState } from 'react';
import { SearchIcon } from "@components/icons/search-icon";
import AsyncSelect from 'react-select/async';
import colourOptions from '@data/colourOptions';
import {fetchSearch} from '@data/search/use-search.query';
import { useRouter } from "next/router";
import { useLocation } from "@contexts/location/location.context";
import { useCreateLogMutation } from "@data/log/use-create-log.mutation";

export default function DropDown({getLoc}:{getLoc:any}){

  const [inputValue,setInputValue] = useState("");
  const router = useRouter();
  const {getLocation} =useLocation()
  const { mutate: createLog, isLoading: loading } = useCreateLogMutation();
  
  // useEffect(()=>{
  //   setInputValue(getSearch())
  // },[])

  const filterColors = (inputValue: string) => {
    return colourOptions.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  
  const loadOptions = async (inputValue:any, callback:any) => {

      var data = await fetchSearch(inputValue);      
      
      callback(data);
     
      return data;
  };


  function getSearch(){
    var value;
    if(router.query.text){
      var text=router.query.text as string;
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

    createLog({
      location:getLocation?.formattedAddress,
      search:text
    }, {
      onSuccess: (data: any) => {
        console.log(data)
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
    // clear()
    // setInputValue(e);
    changeRoute(e)
  }

    return (
        <div  className='flex w-full'>

          <div className='w-full shadow-md  relative'>
            
              <AsyncSelect
                  cacheOptions
                  // style={customStyles}
                  // defaultValue={inputValue.value}
                  loadOptions={loadOptions} 
                  // value={inputValue}
                  // defaultOptions={loadOptions}
                  // onInputChange={handleInputChange}
                  placeholder={ <div className='text-xs sm:text-sm md:text:md  lg:text-sm'> Restraunts | Salons | Groceries </div>}
                  onChange={optionSelected}
                 
                />
                  <SearchIcon className=" absolute right-3 top-3 lg:top-4  text-gray-400 w-4 h-4 me-2.5" />
          </div>
          
          <div>
              {/* <button onClick={clear} className="h-10 px-4 lg:h-12 xl:h-12 xl:px-8 flex items-center rounded-lg rounded-ts-none rounded-bs-none bg-accent 
                                                text-light font-semibold transition-colors duration-200 focus:outline-none hover:bg-accent-hover focus:bg-accent-hover">
                                                  
                  <SearchIcon className="w-4 h-4 me-2.5" />
              </button> */}
          </div>
        </div>
    );
}
