

import { useRef } from "react";
import Link from "@components/ui/link";
import cn from "classnames";
import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site.settings";
import Logo from "@components/ui/logo";
import Search from "@components/common/search";
import JoinButton from "@components/layout/navbar/join-button";
import ProductTypeMenu from "@components/layout/navbar/product-type-menu";
import dynamic from "next/dynamic";
import { ROUTES } from "@utils/routes";
import { useTypesQuery } from "@data/type/use-types.query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import DropDown from "@components/ui/dropDown";
import { useEffect, useState } from 'react';
import { useLocation } from "@contexts/location/location.context";
import GooglePlacesAutocomplete from "@components/form/google-places-autocomplete";
import GetCurrentLocation from "@components/geoCode/get-current-location";
import { CaretDown } from "@components/icons/caret-down";
import MobileJoinButton from "./mobile-join-button";
import CityButton from "@components/geoCode/city-buttton";
import { useUpdateCustomerMutation } from "@data/customer/use-update-customer.mutation";
import { useCustomerQuery } from "@data/customer/use-customer.query";


const cities = //create object of major  indian cities with lat, lng and city name
[
  {
      city: "Chandigarh",
      lat: 30.7320,
      lng: 76.7726
  },
  
  {
      city: "Mohali",
      lat: 30.714274,
      lng: 76.722701
  },

  {
      city: "Panchkula",
      lat: 30.690112,
      lng: 76.847901
  },

  {
      city:'Shimla',
      lat: 31.1048,
      lng: 77.1734
  },

  {
      city: "Ambala",
      lat: 30.3643,
      lng: 76.7721
  },
  
  {
      city:'Amritsar',
      lat: 31.633,
      lng: 74.87
  },
  {
      city:'Jalandhar',
      lat: 31.32,
      lng: 75.57
  },
  {
      city:'Ludhiana',
      lat: 30.89,
      lng: 75.85
  },
  {
      city:'Jaipur',
      lat: 26.9124,
      lng: 75.7873
  },
  {
      city:'Kota',
      lat: 30.3,
      lng: 76.22
  },
  {
      city: "Delhi",
      lat: 28.7041,
      lng: 77.1025
  },
  {
      city:'Gurgaon',
      lat: 28.4600,
      lng: 77.0300
  },
  {
      city:'Patna',
      lat: 25.59,
      lng: 85.13
  },
  {
      city:'Gwalior',
      lat: 26.22,
      lng: 78.17
  },
  {
      city:'Guwahati',
      lat: 26.14,
      lng: 91.73
  },
  {
      city:'Ranchi',
      lat: 23.34,
      lng: 85.31,
  },
  {
      city:'Surat',
      lat: 21.17,
      lng: 72.83,
  },
  {
      city: 'Kanpur',
      lat: 26.44,
      lng: 80.33
  },
  {
      city: "Ahemdabad",
      lat: 23.0225,
      lng: 72.5714
  },
  {
      city: "Kolkata",
      lat: 22.5726,
      lng: 88.3639
  },
  {
      city: "Mumbai",
      lat: 19.0760,
      lng: 72.8777
  },
  {
      city:'Nashik',
      lat: 20.01,
      lng: 73.02
  },
  {
      city: "Bangalore",
      lat: 12.9716,
      lng: 77.5946
  },
  {
      city: "Hyderabad",
      lat: 17.3850,
      lng: 78.4867
  },
  {
      city:'Varanasi',
      lat: 25.3,
      lng: 82.97
  },
  {
      city:'Vadodara',
      lat: 22.31,
      lng: 73.19,
  },
  {
      city: "Chennai",
      lat: 13.0827,
      lng: 80.2707
  },
  {
      city:'Vishakhapatnam',
      lat: 17.68,
      lng: 83.22
  }
]


const AuthorizedMenu = dynamic(
  () => import("@components/layout/navbar/authorized-menu"),
  { ssr: false }
);

type DivElementRef = React.MutableRefObject<HTMLDivElement>;

const NavbarWithSearch = () => {

  const { t } = useTranslation("common");
  const { asPath } = useRouter();
  const { data } = useTypesQuery();
  const {getLocation} =useLocation();
  const [location, setLocation] = useState(false);
  const {data:userData} = useCustomerQuery();
  const { mutate: updateProfile } =
    useUpdateCustomerMutation();

  const handleLocation = async  (newLocation:string) => {
    setLocation(!location);
    await updateProfile(
      { 
        id: userData?.me?.id,
        current_location: {
          lat: newLocation?.lat,
          lng: newLocation?.lng,
          formattedAddress: newLocation?.formattedAddress,
        },
      },
      {
        onSuccess: (data) => {
          console.log("Location updated in ", newLocation?.formattedAddress);
        },
        onError: (error) => {
          console.log("Location updated error:");
          // You can display an error message to the user here.
        },
      }
    );
  }

  const router = useRouter();


  const slugs = data?.types?.map((item) => item.slug);
  const currentPath = asPath
    .substring(
      0,
      asPath.indexOf("?") === -1 ? asPath.length : asPath.indexOf("?")
    )
    .replace(/\//g, "");

  const hasType = slugs?.includes(currentPath);

  const navbarRef = useRef() as DivElementRef;
  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  // location prompt if user landed on any page without entering location

  useEffect(() => {
    if (getLocation?.formattedAddress === false) {
      handleLocation();
    }
  }, [getLocation]);

  const [click, setClick ] = useState(false);
  const [hasLocation, setHasLoction] = useState(false);
    
    const truncate = (txt:any, n:number) => {
      return  txt.length > 10 ? txt.substring(0, n) : txt
    }
    
   
    const closeNav = () => {
        setClick(!click)
    }

    const closeLocation = () => {
        setLocation(!location)
    }

    const openNav = () => {
        setClick(!click);
    }

    useEffect(()=>{
        if(!getLocation?.formattedAddress?.length){
            setLocation(true);
            setHasLoction(false);
        }else{
            setHasLoction(true);
            // setLocation(false);
        }
    },[])

    function changeLocation(data:any){
       
        var location=JSON.stringify(data);
        document.getElementById("location_id").value=data?.formattedAddress;
        setLocation(data?.formattedAddress);

        if(location){
            setHasLoction(true);
            // closeLocation(); 
        }
        var { query ,pathname} = router;
        var pathname="/"+router.locale+pathname
        
        router.push(
        {
            pathname,
            query: query,
        },
        {
            pathname,
            query: query,
        },
        );
        handleLocation(data)
    }


  return (

    <header
      // ref={navbarRef}
      className="flex flex-col bg-white    h-14 md:h-16 lg:h-auto"
    >
      <nav
        className=
          "w-full h-14 md:h-16 bg-white lg:h-22 py-5 px-4 lg:px-8 flex justify-evenly items-center  top-0 end-0 z-50 transition-transform duration-300 fixed   lg:bg-transparent lg:absolute"
        
      >
        {/* {!displayMobileSearch ? ( */}
          <div className="fixed top-0 w-full  flex space-x-6 items-center bg-white py-5 px-4 justify-evenly">
           <div className="w-28" > <Logo className="" /></div>
            {/* <Search label={t("text-search-label")} variant="minimal" /> */}
                <div className='hidden lg:flex items-center focus-ring-2 justify-evenly
                                lg:w-3/4 2xl:mx-auto lg:mx-auto 2xl:flex-1'>

                        <input onClick = {handleLocation} 
                               defaultValue = {getLocation?.formattedAddress}  
                               className =' shadow-md text-gray-500 bg-gray-50  placeholder:text-gray-500  
                                             rounded-lg text-sm rounded-l-lg rounded-r-none h-12 outline-none active:border-gray-400
                                           border-2 border-e-0  focus:border-accent   border-gray-400 pl-2 ' 
                               placeholder = 'Enter location' id='location_id' />
                        
                            {/* <div className='hidden  lg:flex lg:items-center lg:w-3/5'> */}
                            {/* <div style={{width:'450px'}} className="  w-full ">   */}
                                 <DropDown   />
                                      {/* </div> */}
                            {/* </div> */}

                 </div>

                      <div 
                        // onClick = {handleLocation}  
                        className='flex items-center w-full lg:hidden'>
                                      <input onClick = {handleLocation} 
                               defaultValue = {getLocation?.formattedAddress}  
                               className ='hidden lg:inline-flex shadow-md text-gray-500 bg-gray-50   placeholder:text-gray-500  
                                           rounded-lg text-sm rounded-l-lg rounded-r-none h-12 outline-none active:border-gray-400
                                           border-2 border-e-0  focus:border-accent    border-gray-400   ' 
                               placeholder = 'Enter location' id='location_id' />
                        
                            {/* <div className='hidden  lg:flex lg:items-center lg:w-3/5'> */}
                            {/* <div style={{width:'450px'}} className="  w-full ">   */}
                                 <DropDown   />

                      </div>

                    <div className={` ${location ? 'fixed inset-0 bg-gray-900 bg-opacity-60 scroll-y-none w-auto  h-full' : ' '} `}></div>
                    <div className={`absolute flex flex-col   z-50 inset-0 shadow-lg transform -pl-10 duration-200 ease-in 
                                    ${location ? ' translate-y-0 ' : '-translate-y-full' }  transform border-5 bg-gray-100 h-screen lg:h-screen  overflow-y-hidden overflow-hidden `}>
                                      
                                       <div className='border-red-400 flex w-full'>
                                           <div className='flex flex-col'>
                                               <h4 className='block lg:hidden text-2xl md:text-3xl lg:text-4xl mx-4 sm:mx-16 md:mx-16 mt-8 text-magenta font-heading font-semibold'>
                                                   Buy at lowest prices from nearest local shops
                                               </h4>
                                               <div className=''>
                                                   <p className=' lg:hidden flex mx-4  sm:mx-16 md:mx-16 mt-4 font-semibold items-center text-xs xs+:text-sm sm:text-sm text-gray-700'>| Groceries | Veggies & Fruits | Salon & Spa | Takeaways | Restaurants | Pharmacy |</p>
                                                   <p className=' lg:hidden flex mx-4 sm:mx-16 md:mx-16 mt-0 font-semibold items-center text-xs xs+:text-sm sm:text-sm text-gray-700'>| Cosmetics | Lifestyle & Home | Gym & Health | Electronics | Poultry & Farm | Services |</p>
                                               </div>
                                           </div>
                                           <img src='/drop-down.jpg' className='hidden lg:block md:relative object-fill md:object-contain'/>
                                       </div>

                                        {/* <HeaderMiddle/> */}
                            <div className='flex items-center justify-between mx-auto mt-20 '>

                                {/* <Logo className="mx-auto" /> */}
                                <img src="/icons/x.svg"  onClick = {closeLocation} 
                                      className={`${(hasLocation)?"":"hidden"} absolute font-bold z-40 h-7 w-7 top-2 bg-gold  rounded-full right-2 2xl:top-5 text-gray-400 2xl:h-8  2xl:w-8 2xl:right-7 cursor-pointer`}/>
                                {/* <h2 className=' font-md text-md sm:text-lg md:text-lg lg:text-lg 2xl:text-2xl '> Get best deals in your name </h2> */}

                            </div>
                            {/* <img src='/drop-down.jpg' className='relative   top-0 object-contain'/> */}
                            
                            <div id='location-input'  className='absolute z-50 flex flex-col justify-center 
                                       w-full lg:w-full items-center pt-36 sm:pt-20 md:pt-4 lg:pt-0 space-y-6 ml-0 mx-3 
                                       sm:mx-16 md:ml-16 lg:ml-6 xl:ml-8 2xl:ml-10 lg:mt-80'> 
                                          
                                <div  style = {{zIndex: 1000}}  
                                      className='w-full z-50'> 
                                    <GooglePlacesAutocomplete onChange = {changeLocation} 
                                                              address  = {getLocation?.formattedAddress} /> 
                                </div>
        
                                <div   className='z-50 justify-evenly w-full  '> 
                                     <div className=""><GetCurrentLocation onChange = {changeLocation} /></div>  
                                     <span className="text-xl mx-4"> | </span>
                                     <span className="text-center w-28 rounded text-lg z-40 font-semibold text-gray-900
                                      w-full mx-auto">  Select city  </span>
                                </div>

                                
                                
                            </div>

                             

                            <div className='hidden lg:grid lg:grid-cols-6 xl:grid-cols-7 gap-2 lg:justify-between items-center -mt-12 xl:-mt-22 2xl:-mt-24'>
                                
                                {cities.map((city, index) => (
                                    <CityButton onChange = {changeLocation} key={index} lat={city.lat} lng={city.lng} city={city.city} />
                                ))}

                            </div>

                            <div className='grid grid-cols-1 xs+:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:hidden justify-evenly gap-y-3 overflow-y-scroll py-3 items-center w-full place-items-center mt-20 xs+:mt-32 sm:mt-36'>
                                
                                {cities.map((city, index) => (
                                    <CityButton onChange = {changeLocation} key={index} lat={city.lat} lng={city.lng} city={city.city} />
                                ))}
                            </div>
                            
                        {/* <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opaname-80 w-full h-full" /> */}
                           

                </div> 
            {/* <ul className="hidden lg:flex items-center flex-shrink-0 space-s-10">
              {isAuthorize ? (
                <li key="track-orders">
                  <Link
                    href={ROUTES.ORDERS}
                    className="font-semibold text-heading flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
                  >
                    { 'Track Order'}
                  </Link>
                </li>
              ) : null
              }

              {siteSettings.headerLinks.map(({ href, label, icon }) => (
                <li key={`${href}${label}`}>
                  <Link
                    href={href}
                    className="font-semibold text-heading flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
                  >
                    {icon && <span className="me-2">{icon}</span>}
                    {t(label)}
                  </Link>
                </li>
              ))}
              
            </ul> */}

        
            <div className=' flex justify-end  ml-10 space-x-4'>  
              {
                  isAuthorize ? (
                      <AuthorizedMenu />
                  ) : (
                  <>
                    <div className='block lg:hidden'><MobileJoinButton /></div>
                    <div className='hidden lg:block'><JoinButton /></div>
                  </>
                    
                  )
                } 
            </div>
          </div>
        
      </nav>
      {/* <DropDown/> */}
    </header>
    
    
  );
};

export default NavbarWithSearch;

