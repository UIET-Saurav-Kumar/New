
import React, { useEffect,useMemo,useState } from 'react';
import { SearchIcon } from "@components/icons/search-icon";
import AsyncSelect from 'react-select/async';
import colourOptions from '@data/colourOptions';
import {fetchSearch} from '@data/search/use-search.query';
import { useRouter } from "next/router";
import { useLocation } from "@contexts/location/location.context";
import { useCreateLogMutation } from "@data/log/use-create-log.mutation";
import  Creatable  from 'react-select';
import { useShopAvailabilityQuery } from '@data/home/use-shop-availability-query';
import { useCustomerQuery } from '@data/customer/use-customer.query';
import url from '@utils/api/server_url';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
 

export default function DropDown({ getLoc }: { getLoc: any }) {

  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const { getLocation } = useLocation();

  const {
    mutate: createLog,
    isLoading: loading,
  } = useCreateLogMutation();

  // const defaultOptions = [
  //   'Top Salons near you',
  //   'Best Hangout Places',
  //   'Best Restaurants near me',
  // ]

  const {
    data,
    // isLoading: loading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useShopAvailabilityQuery({
    limit: 16 as number,
    search:"",
    location : ((getLocation?.formattedAddress) ? JSON.stringify(getLocation):null ) as any
  });


  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: 200,
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'lightgray' : 'white',
      borderRadius: 10,
      border: state.isFocused ? 'none' : '1px solid black',
      boxShadow: state.isFocused ? '0 0 5px rgba(0, 0, 0, 0.5)' : 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'gray' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
  };

  const defaultOptions = [
    { value: 'Best shopping malls',  label: 'Best shopping malls',available:false },
    { value: 'Top-rated supermarkets near me',  label: 'Top-rated supermarkets near me ',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/1' } },
    { value: 'Good restaurants nearby',  label: 'Good restaurants nearbyt',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/2' } },
    { value: 'Nearest hospitals',  label: 'Nearest hospitals',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/3' } },
    { value: 'Closest pharmacies',  label: 'Best Deals On Hotel',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/3' } },
    { value: '"Recommended electronics stores ',  label: '"Recommended electronics stores ',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/1' } },
    { value: 'Top-rated pet stores ',  label: 'Top-rated pet stores ',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/1' } },
    { value: 'Nearest petrol pumps ',  label: 'Nearest petrol pumps ',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/1' } },

  ];

  const [searchHistory, setSearchHistory] = useState(defaultOptions);


  useEffect(() => {

    const defaultOptions = [
      { value: 'Best Places Near me',  label: 'Best Places Near me',available:false },
      { value: 'Best Salons',  label: 'Top Salons ',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/1' } },
      { value: 'Good restaurants nearby',  label: 'Good restaurants nearby',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/2' } },
      { value: 'Nearest hospitals',  label: 'Nearest hospitals',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/3' } },
      { value: 'Closest pharmacies',  label: 'Best Deals On Hotel',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/3' } },
      { value: 'Recommend electronics stores',  label: 'Recommended electronics stores',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/1' } },
      { value: 'Top-rated pet stores ',  label: 'Top-rated pet stores ',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/1' } },
      { value: 'Nearest petrol pumps ',  label: 'Nearest petrol pumps ',available:false , image: { avatar: true, src: 'https://placeimg.com/64/64/1' } },
    ];
    
    const history = JSON.parse(window.localStorage.getItem("searchHistory")) || defaultOptions; // get saved history or default options
    setSearchHistory(history);
  }, []);

  const [userLocation, setUserLocation] = useState('');

  const {data:customer} = useCustomerQuery();

  // const memoizedLocation = useMemo(async () => {
  //   const { data: response } = await http.get(
  //     `${url}/${API_ENDPOINTS.IP_LOCATION}`
  //   );
  //   return response;
  // }, []);
  
  // useEffect(()=>{
  //   const getIpLocation = async () => {
  //     const response = await memoizedLocation;
  //     setUserLocation(response?.city+","+response?.region_name);
  //   }
  //   getIpLocation();
  // },[customer?.me?.id, memoizedLocation]);

  const shop_check = data?.ShopAvailability?.data?.check;
  
  console.log('history',shop_check)

  const filterColors = (inputValue: string) => {
    return colourOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = async (inputValue, callback) => {
    const data = await fetchSearch(inputValue);
    console.log("search data", data);
    let options = [];
    if (data.length  > 0 && shop_check !=0) {
      options = data?.map((item) => ({
        value: item.value,
        label: item.label,
        text_type: item?.type,
      }));
    } else {
      options = [{ value: inputValue, label: inputValue, available: false }];
    }
     callback(options);

    console.log("search data opt", options);
  };
  

  function route(e: any = "") {
    var { pathname } = router;
    pathname = "/shops";
    const { type, ...rest } = router.query;
    var text_type = e?.text_type ? e?.text_type : "shop";
    var searchText = `in ${getLocation?.formattedAddress}`;
    var text = e?.value;

    var avail = e?.available;
    console.log("search data", e);
    setInputValue(e?.value);

    createLog(
      {
        location: getLocation?.formattedAddress,
        search: text,
        type: "search_item",
      },
      {
        onSuccess: (data: any) => {
          alert("data");
        },
      }
    );

    router.push(
      {
        pathname,
        query: { text, text_type, avail },
      },
      {
        pathname,
        query: { text, text_type, avail },
      }
    );
  }

  function hasLocation(): boolean {
    if (!getLocation?.formattedAddress) {
      return false;
    }
    return true;
  }

  function handleInputChange(newValue: string) {
    return newValue;
  }

  function clear() {
    window.localStorage.removeItem("search");
    setInputValue("");
    changeRoute();
  }

  function changeRoute(e: any = "") {
    if (!hasLocation()) {
      getLoc();
    } else {
      route(e);
    }
  }

  
  function optionSelected(e: any) {
    setInputValue(e);
    saveSearch(e); // save the search keyword to local storage
    changeRoute(e);
  }


  function saveSearch(e: any) { 

    console.log('savesearch',e)
    var { value, label,available, text_type } = e;

    if (value) {
      const searchHistory = JSON.parse(
        window.localStorage.getItem("searchHistory") || "[]"
      );

      if (!searchHistory.includes({value,label,available,text_type})) {
        searchHistory.unshift({value,label,available,text_type}); // add the new search keyword to the beginning of the array
        // if (searchHistory.length > 5) {
        //   searchHistory.pop(); // remove the oldest search keyword from the end of the array if the array has more than 5 elements
        // }
        window.localStorage.setItem(
          "searchHistory",
          JSON.stringify(searchHistory)
        );

      }
    }
  }

  const uniqueSearchhistory =()=>{
    
  } 


    return (

        <div className='w-full z-10 relative'>
            
              <AsyncSelect
                  cacheOptions
                  style={customStyles}
                  defaultValue={inputValue.value}
                  loadOptions={loadOptions} 
                  value={ inputValue }
                  defaultOptions={searchHistory?.length ? 
                    searchHistory.reduce((acc, curr) => {
                      if (!acc.some((item) => item.label === curr.label)) {
                        acc.push(curr);
                      }
                      return acc;
                    }, []).map((item) => ({ label: item.label, value: item?.value, available: item?.available, text_type: item?.text_type })) 
                    : defaultHistory
                  }
                  // onInputChange={handleInputChange}
                  placeholder={ <div className='text-xs sm:text-sm md:text:md  lg:text-sm'> Ask me anything... </div>}
                  onChange={optionSelected}
              />  

              <p  className='absolute right-25 lg:right-30 top-3 lg:top-3.5 font-light text-xs lg:text-sm  w-4 h-4 me-2.5 whitespace-nowrap shadow-cyan-500/50 bg-clip-text text-blue-500 bg-gradient-to-r from-blue-700 via-purple-600 to-blue-600 '>
                AI Powered
              </p>

              <SearchIcon className="absolute right-3 top-3 lg:top-4 text-gray-400 w-4 h-4 me-2.5" />
              {/* </div> */}

        </div>
    );
}
