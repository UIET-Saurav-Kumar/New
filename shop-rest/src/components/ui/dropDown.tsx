
import React, { useEffect,useState } from 'react';
import { SearchIcon } from "@components/icons/search-icon";
import AsyncSelect from 'react-select/async';
import colourOptions from '@data/colourOptions';
import {fetchSearch} from '@data/search/use-search.query';
import { useRouter } from "next/router";
import { useLocation } from "@contexts/location/location.context";
import { useCreateLogMutation } from "@data/log/use-create-log.mutation";
import  Creatable  from 'react-select';
 

export default function DropDown({getLoc}:{getLoc:any}) {

  const [inputValue,setInputValue] = useState("");
  const router = useRouter();
  const {getLocation} =useLocation()
  const { mutate: createLog, isLoading: loading } = useCreateLogMutation();
  
  // useEffect(()=>{
  //   setInputValue(getSearch())
  // },[])

  // console.log('inputvalue',inputValue)

  const filterColors = (inputValue: string) => {
    return colourOptions.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const customStyles = {
    control: (provided: any, state: { isFocused: any; }) => ({
      ...provided,
      border: '2px solid #ddd',
      borderRadius: '10px',
      boxShadow: state.isFocused ? '0 0 0 2px #aaa' : null,
      '&:hover': {
        border: '2px solid #aaa',
      },
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: '#ddd',
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      color: '#aaa',
    }),
    loadingIndicator: (provided: any) => ({
      ...provided,
      color: '#aaa',
    }),
  };
  
  
  const loadOptions = async (inputValue, callback) => {
     const data = await fetchSearch(inputValue);
     console.log('search data',data)
    let options = [];
    if (data.length > 0) {
       options = data?.map(item => ({ value: item.value, label: item.label, text_type: item?.type }));
    } else {
       options = [{ value: inputValue, label: inputValue, available:false }];
    }
    callback(options);

    console.log('search data opt',options)

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
    pathname="/shops";
    const { type, ...rest } = router.query;
    var text_type  = e?.text_type ? e?.text_type : 'shop';
    var searchText = `in ${getLocation?.formattedAddress}`
    var text =e?.value 

    var avail = e?.available;
    console.log('search data',e)
    setInputValue(e?.value);

    // alert('log')
    
    createLog({
      location:getLocation?.formattedAddress,
      search:text,
      type:'search_item'
    }, {
      onSuccess: (data: any) => {
        alert('data')
      },
    });

    router.push(
      {
          pathname,
          query: {text,text_type, avail },
      },
      {
          pathname,
          query: {text,text_type, avail},
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
    setInputValue(e);
    changeRoute(e)
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
    { value: 'Best Places Near me',  label: 'Best Places Near me',available:false },
    { value: 'Best Salons',  label: 'Top Salons ',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/1' } },
    { value: 'Best Hangout Places',  label: 'Best Places to Hangout',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/2' } },
    { value: 'Best Bars & Restraunts near me',  label: 'Best Bars & Restraunts near me',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/3' } },
    { value: 'Best deals on hotels',  label: 'Best Deals On Hotel',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/3' } },
    { value: 'Best travel destinations',  label: 'Best Travel Destinations',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/1' } },
  ];

   

    return (

        <div className=' w-full z-10 relative'>

          {/* <div className='w-full shadow-md  relative'> */}
            
              <AsyncSelect
                  cacheOptions
                  style={customStyles}
                  defaultValue={inputValue.value}
                  loadOptions={loadOptions} 
                  value={ inputValue }
                  defaultOptions={defaultOptions}
                  // onInputChange={handleInputChange}
                  placeholder={ <div className='text-xs sm:text-sm md:text:md  lg:text-sm'> Ask me anything... </div>}
                  onChange={optionSelected}
              />  
              <p className='absolute right-25 lg:right-30 top-3 lg:top-3.5 font-light text-xs lg:text-sm  w-4 h-4 me-2.5 whitespace-nowrap shadow-cyan-500/50 bg-clip-text text-blue-500 bg-gradient-to-r from-blue-700 via-purple-600 to-blue-600 '>
                AI Powered
              </p>
                  <SearchIcon className=" absolute right-3 top-3 lg:top-4  text-gray-400 w-4 h-4 me-2.5" />
          {/* </div> */}
          

        </div>
    );
}
