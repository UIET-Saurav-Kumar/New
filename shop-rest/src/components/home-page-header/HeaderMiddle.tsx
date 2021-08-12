
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

export default function HeaderMiddle() {

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

    <div id='amazon-shops' className='flex flex-col shadow-md md:bg-white lg:bg-white'> 
        <div className='relative z-30 px-4 flex  justify-evenly max-w-full pt-8 pb-6'>
                {/* SideNav */}
                <div className={` absolute w-1/2 md:w-1/3 inset-0 shadow-lg transform duration-200 ease-in 
                                    ${click ? 'translate-x-0' : '-translate-x-full' } transform  z-400 min-h-screen lg:w-1/4 bg-white  `} style={{zIndex:"10000"}}>

                    <XIcon onClick={closeNav} className=' absolute z-30 h-8 w-8 right-0 '/>

                    <div  className='border border-gray absolute top-0 w-full h-22'>
                        <Link href='/home'>
                            <Logo className="mx-auto lg:mx-0" />
                        </Link>
                    </div>

                    <ul className='flex flex-col justify-evenly  text-left mt-16 '>
                        { siteSettings.homePageSidenav.map(( navitem ,id)=> (
                            <li key={id}>
                                <Link href={navitem.href}>
                                    <a className=' flex items-center  px-4 mt-4 py-2 hover:bg-gray-200 rounded-md'> {navitem.label} </a>
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>

                <div className='px-0  flex  ' >
                    <MenuIcon onClick={openNav}  className=' md:h-8 h-8 -mt-2 lg:mt-2 md:mr-4 sm:h-8  ml-0 items-center 
                                                        md:items-center  lg:h-10 lg-w-9 lg:items-center  text-gray-800' /> 
                    <Logo className="mx-auto lg:mx-0" />                                
                </div>

                {/* searchbar  */}
                <div className='flex   px-4'>
                    {/* bars icon */}
                    <div className=' flex md:flex-1 sm:flex-1 focus-ring-2 focus:ring-green-600 lg:flex-1 w-full mx-0   2xl:flex-1'>

                        <input onClick={handleLocation} defaultValue={getLocation?.formattedAddress} style={{width:"330px",height: "48px"}} className ='hidden lg:inline-flex  2xl:w-48 md:w-32  lg:w-60 rounded-lg rounded-r-none outline-none  border border-e-0 border-transparent focus:border-accent  border-gray-300 pl-2 ' placeholder = 'Enter location' style={{borderColor: "hsl(0, 0%, 80%)",height:"48px"}} id="location_id"/>
                        {/* <DeskTopAutoComplete onChange={changeLocation}  /> */}
                        <div className='hidden xmd:inline-flex lg:flex xl:flex h-12 2xl:flex-1 focus:bg-accent-hover' style={{width:"450px"}}>
                            <DropDown getLoc={handleLocation} />
                        </div>

                    </div>
                </div>

                {/* Location screen */}
                <div className={` fixed flex flex-col  w-full z-1000 inset-0 shadow-lg transform ml-0 duration-200 ease-in 
                                    ${location ? 'translate-y-0' : '-translate-y-full' } transform border-5  overflow-y-hidden overflow-hidden bg-white `} style={{zIndex:"100000",height:"500px",position:"fixed"}}>
                    <div className='flex items-center justify-between mx-auto mt-20 '>

                        <Logo className="mx-auto lg:mx-0" />
                        <XIcon onClick = {closeLocation} className={`${(hasLocation)?"":"hidden"} absolute z-40 h-6 w-6 top-2 right-2 2xl:top-20 text-gray-400 2xl:h-8 2xl:w-8 2xl:right-20 `}/>
                        <h2 className=' font-md text-md sm:text-lg md:text-lg lg:text-lg 2xl:text-2xl '> Get best deals in your city </h2>

                    </div>
                    <GooglePlacesAutocomplete onChange={changeLocation} address={getLocation?.formattedAddress}/>
     
                    <GetCurrentLocation onChange={changeLocation} />
                </div>

                {isAuthorize ? (
                    <AuthorizedMenu className='' />
                    
                    ) : (
                    <>
                        <div className='hidden sm:hidden md:hidden xms:hidden pl-2 lg:pr-8 lg:flex lg:h-10 lg:w-10 '>
                            <JoinButton />
                        </div>

                        <span>    
                            <h3 onClick={handleLocation}  className='flex text-black items-center text-xs lg:hidden  md:text-black mr-0 md:mr-0 md:text-md'>
                                <CaretDown/> Location
                            </h3> 
                        </span>
                    </>
                )}
            </div>
        <div className='flex md:flex  lg:hidden px-4 mb-2 mt-0' >
            <DropDown getLoc={handleLocation}/>
        </div>
    </div>

    )
}

