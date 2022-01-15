
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

const cities = //create object of major  indian cities with lat, lng and city name
    [
        {
            city: "Chandigarh",
            lat: 30.7333,
            lng: 76.7794
        },
        {
            city: "Mohali",
            lat: 30.7333,
            lng: 76.7794
        },
        {
            city: "Panchkula",
            lat: 30.7333,
            lng: 76.7794
        },
        {
            city: "Delhi",
            lat: 28.7041,
            lng: 77.1025
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
            city: "Chennai",
            lat: 13.0827,
            lng: 80.2707
        },

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
  const {getLocation} =useLocation()
  const [location, setLocation] = useState(false);
  const handleLocation = () => {
    setLocation(!location);
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
        if(!getLocation?.formattedAddress){
            setLocation(true);
            setHasLoction(false);
        }else{
            setHasLoction(true);
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
        handleLocation()
    }


  return (

    <header
      ref={navbarRef}
      className=" flex flex-col site-header-with-search h-14 md:h-16 lg:h-auto"
    >
      <nav
        className={cn(
          "w-full h-14 md:h-16 lg:h-22 py-5 px-4 lg:px-8 flex justify-between items-center  top-0 end-0 z-20 transition-transform duration-300",
          {
            "fixed bg-light lg:bg-transparent lg:absolute":
              !displayHeaderSearch && hasType,
            "is-sticky fixed bg-light shadow-sm":
              displayHeaderSearch || !hasType,
          }
        )}
      >
        {!displayMobileSearch ? (
          <div className="w-full flex space-x-6 items-center  justify-between">
             <Logo className="mx-auto  bg-black border  p-0 lg:mx-0" />
            {/* <Search label={t("text-search-label")} variant="minimal" /> */}
            <div className='hidden lg:flex focus-ring-2 justify-center
                                     lg:w-3/4 2xl:mx-auto lg:mx-auto 
                                    2xl:flex-1'>

                       <input onClick = {handleLocation} 
                              defaultValue = {getLocation?.formattedAddress}  
                              className ='hidden  lg:inline-flex shadow-md text-gray-500 lg:w-32 lg+:w-38 2xl:w-52 md:w-32 placeholder:text-gray-500  
                                          lg:w-42 rounded-lg text-sm rounded-l-lg rounded-r-none h-12 outline-none active:border-gray-400
                                          border-2 border-e-0  focus:border-accent pr-4  border-gray-400 pl-2 ' 
                              placeholder = 'Enter location' id='location_id' />
                       
                           <div className='hidden  lg:flex lg:w-3/5'>
                                <DropDown  getLoc={handleLocation} />
                           </div>

                    </div>
                    <div onClick = {handleLocation}  className='flex items-center w-full lg:hidden'>

                   <CaretDown className='w-4 cursor-pointer mr-2 text-gray-400 h-4 '/> 
                   <input 
                              defaultValue = {getLocation?.formattedAddress}  
                              className ='lg:hidden  block w-full text-gray-500 placeholder:text-gray-500  
                                           rounded-lg  border rounded-l-lg pl-4 h-6 sm:h-8 outline-none text-xs sm:text-sm
                                           border-e-0  focus:border-accent border-gray-300 pr-2 cursor-pointer hover:border-gray-400' 
                              placeholder = 'Enter location' id='location_id' />

                                </div>
                    <div className={` ${location ? 'fixed inset-0 bg-gray-900 bg-opacity-60 scroll-y-none w-auto  h-full' : ' '} `}></div>
                    <div style={{zIndex: 999999999}}  className={`absolute flex flex-col   z-100 inset-0 shadow-lg transform -pl-10 duration-200 ease-in 
                                    ${location ? ' translate-y-0 ' : '-translate-y-full' }  transform border-5 bg-gray-100 h-screen lg:h-screen  overflow-y-hidden overflow-hidden `}>
                                      
                                       <div className='  border-red-400 flex w-full'>
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
                                     style={{zIndex: 100}} className={`${(hasLocation)?"":"hidden"} absolute font-bold z-40 h-7 w-7 top-2 bg-gold  rounded-full right-2 2xl:top-5 text-gray-400 2xl:h-8  2xl:w-8 2xl:right-7 `}/>
                                {/* <h2 className=' font-md text-md sm:text-lg md:text-lg lg:text-lg 2xl:text-2xl '> Get best deals in your name </h2> */}

                            </div>
                            {/* <img src='/drop-down.jpg' className='relative   top-0 object-contain'/> */}
                            
                            <div id='location-input' style={{zIndex: 0}} className='absolute flex flex-col justify-center 
                                       w-full lg:w-full items-center pt-36 sm:pt-20 md:pt-4 lg:pt-0 space-y-6 ml-0 mx-3 
                                       sm:mx-16 md:ml-16 lg:ml-6 xl:ml-8 2xl:ml-10 lg:mt-80'> 
                                          
                                <div  style = {{zIndex: 1000}}  
                                      className='w-full'> 
                                    <GooglePlacesAutocomplete onChange = {changeLocation} 
                                                              address  = {getLocation?.formattedAddress} /> 
                                </div>
        
                                <div style={{zIndex: 1000}}  className='w-full'> 
                                     <GetCurrentLocation onChange = {changeLocation} />  
                                </div>
                                
                            </div>

                            <div className='hidden lg:flex justify-evenly items-center -mt-10'>
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
            <ul className="hidden lg:flex items-center flex-shrink-0 space-s-10">
              {isAuthorize ? (
                <li key="track-orders">
                  <Link
                    href={ROUTES.ORDERS}
                    className="font-semibold text-heading flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
                  >
                    {t("nav-menu-track-order")}
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
              
            </ul>

            {/* <h1>gfd</h1> */}
          <div className=' flex justify-end  ml-10 space-x-4'>  
             {isAuthorize ? (
                
                  <AuthorizedMenu />
                
              ) : (
               
                  <> <div className='block lg:hidden'><MobileJoinButton /></div>
                  <div className='hidden lg:block'><JoinButton /></div></>
                
              )} </div>
          </div>
        ) : (
          <>
            <Logo className="mx-auto border bg-black lg:mx-0" />
            {/* <ProductTypeMenu className="ms-10 me-auto hidden xl:block" /> */}
            <div className="block w-full">
              <div
                className={cn(
                  "w-full xl:w-11/12 2xl:w-10/12 mx-auto px-10 overflow-hidden",
                  {
                    hidden: !displayHeaderSearch && hasType,
                    flex: displayHeaderSearch || !hasType,
                  }
                )}
              >
                {/* <Search label={t("text-search-label")} variant="minimal" /> */}
                <DropDown/>
              </div>
            </div>
            <ul className="flex items-center flex-shrink-0 space-s-10">
              {isAuthorize ? (
                <li key="track-orders">
                  <Link
                    href={ROUTES.ORDERS}
                    className="font-semibold text-heading flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
                  >
                    {t("nav-menu-track-order")}
                  </Link>
                </li>
              ) : null}
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
              {isAuthorize ? (
                <li>
                  <AuthorizedMenu />
                </li>
              ) : (
                <li>
                  <JoinButton />
                </li>
              )}
            </ul>
          </>
        )}
      </nav>
      <DropDown/>
    </header>
    
    
  );
};

export default NavbarWithSearch;

