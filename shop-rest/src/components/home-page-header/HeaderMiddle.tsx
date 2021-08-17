
// import './styles/globals.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {HeartIcon, ShoppingCartIcon, UserIcon, PhoneIcon, MenuIcon, XIcon, MapIcon} from '@heroicons/react/outline';
import SearchBox from "@components/ui/search-box";
import JoinButton from "@components/layout/navbar/join-button";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useUI } from "@contexts/ui.context";
import AuthorizedMenu from '@components/layout/navbar/authorized-menu';
import { siteSettings } from '@settings/site.settings';
import { CaretDown } from '@components/icons/caret-down';
import { MapPin } from '@components/icons/map-pin';
import DropDown from "@components/ui/dropDown"
import GooglePlacesAutocomplete from "@components/form/google-places-autocomplete";
import { useRouter } from "next/router";
import Logo from "@components/ui/logo";
import GetCurrentLocation from "@components/geoCode/get-current-location"
import { useLocation } from "@contexts/location/location.context";
import  DeskTopAutoComplete from "@components/form/desk-top-autocomplete";
import MobileJoinButton from '@components/layout/navbar/mobile-join-button';
import Truncate from '@components/ui/truncate-scroll';



export default function HeaderMiddle() {

    const truncate = (txt, n) => {
        txt.length > 10 ? txt.substring(0, n) : ''

    }

    const {getLocation} =useLocation()
    
    const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();
    
    const router = useRouter();

    const [click, setClick ] = useState(false);
    const [hasLocation, setHasLoction] = useState(false);
    const handleLocation = () => {
        setLocation(!location);
    }

    const [location, setLocation] = useState(false);
   
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
        console.log(data?.formattedAddress);
        document.getElementById("location_id").value=data?.formattedAddress;
        setLocation(data?.formattedAddress);

        if(location){
            setHasLoction(true);
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

        <div id='amazon-shops' 
        className='flex flex-col  shadow-md md:bg-white lg:bg-white'> 


       <div className=' relative z-30 px-4 flex  justify-evenly max-w-full pt-8 pb-6 '>
              

               {/* searchbar  */}
               <div className=' hidden lg:flex justify-around lg:justify-between p-0 lg:py-4 w-full px-4'>

                    <div className = ' hidden lg:block px-0 mx-0 p-0 m-0  ' >

                        <Logo className=" mx-0 px-0 " />       
                                          
                    </div>
                  
                   <div className=' flex  focus-ring-2 justify-center
                                     lg:w-3/4 2xl:mx-auto lg:mx-auto 
                                    2xl:flex-1' >


                {/* for location icon */}
                       {/* <span className='hidden lg:inline-flex relative rounded-l group-focus:border-accent-300 rounded-r-none rounded-md items-center '>  */}
                             {/* <MapPin className='absolute ml-2 text-gray-200 w-5 h-5' src='/gps.png'/> */}
                             {/* <input className=' border  h-12  border-gray-300 w-8 
                              border-r-0 rounded-lg rounded-r-none' defaultValue=''  /> */}
                       {/* </span> */}

                       <input onClick = {handleLocation} 
                              defaultValue = {getLocation?.formattedAddress}  
                              className ='hidden lg:inline-flex  text-gray-500 lg:w-32 lg+:w-38 2xl:w-52 md:w-32 placeholder:text-gray-500  
                                          lg:w-42 rounded-lg  border-l rounded-l-lg rounded-r-none h-12 outline-none 
                                          border border-e-0  focus:border-accent pr-4 border-gray-300 pl-2 ' 
                              placeholder = 'Enter location' id='location_id' />
                       
                           <div className='hidden  lg:flex lg:w-3/5   xl:h-0  
                                           focus:bg-accent-hover' >
                                <DropDown  getLoc={handleLocation} />
                           </div>

                    </div>

                           { isAuthorize ? 
                               <div className='hidden lg:inline-flex lg:ml-8 lg+:ml-0  xl:inline-flex  '>
                                 <AuthorizedMenu/>
                               </div>
                            : 
                               <div className=' hidden lg:inline-flex xl:inline-flex lg:ml-4 lg+:ml-0    '>
                                 <JoinButton/>
                               </div> 
                           }  

               </div>

               {/* Location screen */}
              <div className={` absolute flex flex-col  w-full z-1000 inset-0 shadow-lg transform ml-0 duration-200 ease-in 
                               ${location ? 'translate-y-0 ' : '-translate-y-full ' } transform border-5 h-screen lg:h-96 bg-gray-50  overflow-y-hidden overflow-hidden  `}>
                   <div className='flex items-center justify-between mx-auto mt-20 '>

                       {/* <Logo className="mx-auto" /> */}
                       <img src="/icons/x.svg"  onClick = {closeLocation} 
                            className={`${(hasLocation)?"":"hidden"} absolute font-bold z-40 h-6 w-6 top-2 right-2 2xl:top-20 text-gray-400 2xl:h-8 2xl:w-8 2xl:right-20 `}/>
                       <h2 className=' font-md text-md sm:text-lg md:text-lg lg:text-lg 2xl:text-2xl '> Get best deals in your city </h2>

                   </div>
                   
                   <GooglePlacesAutocomplete  onChange = {changeLocation} address={getLocation?.formattedAddress}/>
    
                   <GetCurrentLocation onChange = {changeLocation} />

              </div> 


               {isAuthorize ? (

                   <div className='flex justify-between  w-full  items-center  lg:hidden xl:hidden 2xl:hidden'>
                    <div className='block px-0  '>  <Logo className='mx-0  px-0'/> </div>
                       <div className='flex items-center space-x-4 md:space-x-10 lg:space-x-8'>
                               <span>  
                                   
                                   <h3 onClick={handleLocation}  
                                       className='flex text-black items-center text-xs lg:hidden  md:text-black mr-0 md:mr-0 md:text-md'>
           
                                           <CaretDown/> Chandigarh
           
                                   </h3> 
                                   </span>

                               <AuthorizedMenu  />
                       </div>

                   </div>
                       
                       ) : (
                           <div className='flex justify-between  w-full  items-center  lg:hidden xl:hidden 2xl:hidden'>
                    <div className='block px-0 -ml-10 sm:-ml-6  '>  <Logo className='mx-0  px-0'/> </div>
                       <div className='flex items-center space-x-4 sm:space-x-16 md:space-x-16 '>
                               <span>  
                                   
                                   <h3 onClick={handleLocation}  
                                       className='flex text-gray-600 items-center text-xs sm:text-sm md:text-md lg:hidden  
                                                md:text-gray-600 mr-0 md:mr-0 md:text-md'>
           
                                           <CaretDown className='text-gray-500 mr-2 w-5 h-5'/> 

                                            <button className='border text-gray-500  rounded-xl border-gray-400 p-1 px-2'>

                                                 {/* { truncate(` ${getLocation?.formattedAddress} `, 10) } */}

                                                { getLocation?.formattedAddress }
                                                 {/* Chandigarh */}

                                           </button>
           
                                   </h3> 
                                   </span>

                               <MobileJoinButton  />
                       </div>

                   </div>
             
               )}
       </div>
       <div className='flex md:flex w-full lg:hidden px-4 mb-2 mt-0' >
           <DropDown getLoc={handleLocation}/>
       </div>
   </div>

    )
}

