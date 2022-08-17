
import { useEffect, useState } from 'react';
import JoinButton from "@components/layout/navbar/join-button";
import { useUI } from "@contexts/ui.context";
import AuthorizedMenu from '@components/layout/navbar/authorized-menu';
import { CaretDown } from '@components/icons/caret-down';
import DropDown from "@components/ui/dropDown"
import GooglePlacesAutocomplete from "@components/form/google-places-autocomplete";
import { useRouter } from "next/router";
import Logo from "@components/ui/logo";
import GetCurrentLocation from "@components/geoCode/get-current-location"
import { useLocation } from "@contexts/location/location.context";
import MobileJoinButton from '@components/layout/navbar/mobile-join-button';
import CityButton from '@components/geoCode/city-buttton';
import { SearchIcon } from '@components/icons/search-icon';
import { useModalAction } from "@components/ui/modal/modal.context";
import Link from 'next/link';


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


export default function HeaderMiddle() {


    const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

    const [JoinBtn, setJoinButton] = useState(true);


    useEffect(() => {
        isAuthorize && setJoinButton(false)
    }, [isAuthorize])

    

    const truncate = (txt:any, n:number) => {
      return  txt.length > 10 ? txt.substring(0, n) : txt
    }

    const {getLocation} =useLocation();

    console.log('getlocation',getLocation)
    
     
    
    const router = useRouter();

    const [click, setClick ] = useState(false);
    const [hasLocation, setHasLoction] = useState(false);

    const handleLocation = () => {
        setLocation(!location);
    }

    const { openModal } = useModalAction();

    function handleSearchModal() {
        return openModal("SEARCH_BAR_MODAL");
    }

    const [location, setLocation] = useState(false);
   
    const closeNav = () => {
        setClick(!click)
    }

    const [address, setAddress] = useState('');

    //outside click close location
    // useEffect(() => {
    //     const handleClick = (e:any) => {
    //         if (click && e.target.className !== "location-button") {
    //             setLocation(false);
    //         }
    //     }
    //     document.addEventListener("click", handleClick);
    //     return () => {
    //         document.removeEventListener("click", handleClick);
    //     };
    // }, [click]);

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
        //  
        }else{
            setAddress(getLocation?.formattedAddress);
            setHasLoction(true);
        }
    },[])

    function changeLocation(data:any){
       
        var location=JSON.stringify(data);
        console.log(data?.formattedAddress);
        document.getElementById("location_id").value=data?.formattedAddress;
        setLocation(data?.formattedAddress);
        setAddress(data?.formattedAddress);

        if(location){
            setHasLoction(true);
            closeLocation(); 
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

    console.log('Login', isAuthorize);
    console.log('getlocation',getLocation);

    
    return (

        <div id='amazon-shops' 
             className='flex flex-col  lg:shadow-md md:bg-white lg:bg-white'> 


       <div className='relative z-30 px-4 flex justify-evenly max-w-full pt-4 pb-4 lg:pt-0 lg:pb-0  '>
              

               {/* searchbar  */}
               <div className='  hidden lg:flex lg:items-start justify-around lg:justify-between p-0 lg:py-4 w-full px-4'>

                    <div className = ' hidden lg:block ' >

                       <div style={{zIndex: 0}} className=''><Logo className="  " /> </div>       
                                          
                    </div>
                  
                  {/* Search Bar */}
                <div className='flex flex-col  w-full space-y-2'>
                   <div className=' flex focus-ring-2 justify-center
                                    lg:w-3/4 2xl:mx-auto lg:mx-auto 
                                    2xl:flex-1'>

                       <input onClick = {handleLocation} 
                              defaultValue = {address === 'undefined' ? getLocation.formattedAddress : address}  
                              className ='hidden  lg:inline-flex shadow-md text-gray-500 lg:w-32 lg+:w-38 2xl:w-52 md:w-32 placeholder:text-gray-500  
                                          lg:w-42 rounded-lg text-sm rounded-l-lg rounded-r-none h-12 outline-none active:border-gray-400
                                          border-2 border-e-0  focus:border-accent pr-4  border-gray-400 pl-2 ' 
                              placeholder = 'Enter location' id='location_id' />
                       
                        <div className='hidden  lg:flex lg:w-3/5'>
                            <DropDown  getLoc = {handleLocation} />
                        </div>

                    </div>

                    <div className=' z-10 flex items-center mx-auto space-x-10  text-gray-500 ' style={{zIndex:0}}>
                        <span className=' text-blue-600'>बायलोकल</span>
                        <span className='  text-red-600'>Buylowcal</span>
                        <span className='text-yellow-600'>ਬਾਏਲੋਕਲ </span>
                        <span className='text-green-600'> বাইলোকাল </span>
                    
                    </div>
                </div>

                               <div className='hidden  sm:block  items-center mr-24'>
                                <Link href='https://admin.buylowcal.com/register'><button className='whitespace-nowrap bg-gradient-to-r from-magenta  to-magenta hover:bg-green-800 hover:shadow-xl font-bold text-white p-3 px-3 rounded-md'>
                                        Business Access
                                    </button></Link>
                               </div>
                               <div className='hidden lg:inline-flex lg:ml-8 lg+:ml-0  xl:inline-flex'>
                                  { !JoinBtn &&  <AuthorizedMenu/>  }
                                  { JoinBtn &&  <JoinButton/>  }
                               </div>
                           
                          
                           {/* { !isAuthorize && 
                               <div className='hidden lg:inline-flex lg:ml-8 lg+:ml-0  xl:inline-flex'>
                                 
                               </div>
                           
                           }   */}

               </div>

               {/* Location screen */}
               <div className={` ${location ? 'fixed inset-0 bg-gray-900 bg-opacity-60 scroll-y-none w-full h-full' : ' '} `}></div>
               
                    <div style={{zIndex: 1000}}  className={`absolute  flex flex-col  w-full z-1000 inset-0 shadow-lg transform ml-0 duration-200 ease-in 
                                    ${location ? ' translate-y-0 ' : '-translate-y-full' }  transform border-5 bg-gray-100 h-screen lg:h-110 xl:h-200 2xl:h-200 overflow-y-hidden overflow-hidden `}>
                                      
                                       <div className='  border-red-400 flex w-full'>
                                           <div className='flex flex-col'>
                                               <h4 className='block lg:hidden text-2xl md:text-3xl lg:text-4xl mx-4 sm:mx-16 md:mx-16 mt-8 text-magenta font-heading font-semibold'>
                                                   Wow..now you earn for buying from the same nearest local shops
                                               </h4>
                                               <div className=''>
                                                   <p className=' lg:hidden flex mx-4  sm:mx-16 md:mx-16 mt-4 font-semibold items-center text-xs xs+:text-sm sm:text-sm text-gray-700'>
                                                       | Groceries | Cosmetics | Veggies & Fruits | Salon & Spa | Takeaways | Restaurants | Electronics | Pharmacy |</p>
                                                   <p className=' lg:hidden hidden md:flex mx-4 sm:mx-16 md:mx-16 mt-0 font-semibold items-center text-xs xs+:text-sm sm:text-sm text-gray-700'>
                                                       | Cosmetics | Lifestyle & Home | Gym & Health | Electronics | Poultry & Farm | Services |</p>
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
                                       w-full lg:w-full    items-center  pt-40 sm:pt-20 md:pt-20 lg:pt-0 space-y-6 ml-0 mx-3 sm:mx-16 md:ml-16 lg:ml-6 xl:ml-8 2xl:ml-10 lg:mt-80'> 
                                          
                                <div  style = {{zIndex: 1000}}  
                                      className='w-full'> 
                                    <GooglePlacesAutocomplete onChange = {changeLocation} 
                                                              address  = {address} /> 
                                </div>
        
                                <div style={{zIndex: 1000}}  className='w-full '> 
                                     <GetCurrentLocation onChange = {changeLocation} />  
                                     {/* <span className='text-gray-600 font-semibold ml-10'>
                                        <span className=' mr-10 text-xl font-semibold text-magenta'>
                                            Or
                                        </span>
                                          Select Your City 
                                     </span> */}
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


               {!JoinBtn && (

                   <div className='flex justify-between w-full items-center lg:hidden xl:hidden 2xl:hidden'>

                          {/* <div className = ' hidden lg:block px-0 mx-0 p-0 m-0' > */}

                        <Logo className=" mx-0 px-0 " />       
                                          
                          {/* </div> */}

                       <div className='flex items-center  '>
                            <span>  
                                <h3 onClick={handleLocation}  
                                    className='flex text-gray-600 items-center text-xs sm:text-sm md:text-md lg:hidden  
                                                                md:text-gray-600 mr-0 md:mr-0 md:text-md'>

                                    <CaretDown className='text-gray-500 mr-2 w-3 h-3 md:w-5 md:h-5'/> 

                                            <button className='border text-gray-500 w-auto sm:w-96  rounded-xl border-gray-400 p-1 px-2'>

                                                { truncate(` ${getLocation?.formattedAddress} `, 21) }

                                                {/* { getLocation?.formattedAddress } */}
                                                {/* Chandigarh */}

                                            </button>
                                </h3> 
                            </span>
                               
                       </div>

                       <AuthorizedMenu  />

                   </div>
                       
                       ) } {
                            JoinBtn && (
                           <div className='flex justify-between  w-full  items-center  lg:hidden xl:hidden 2xl:hidden'>

                                {/* <div className='block px-0 ml-10 sm:-ml-6  '>  */}
                                    <Logo className='mx-0  px-0'/>
                                 {/* </div> */}

                                <div className='flex items-center '>

                                        <span className='flex f'>  
                                            <h3 onClick={handleLocation}  
                                                className='flex  text-gray-600 items-center text-xs sm:text-sm md:text-md lg:hidden  
                                                            md:text-gray-600 mr-0 md:mr-0 md:text-md'>
                    
                                                <CaretDown className='text-gray-500 mr-2 w-5 h-5'/> 

                                                    <button className='border text-gray-500  rounded-xl border-gray-400 p-1 px-2'>

                                                        { truncate(` ${getLocation?.formattedAddress} `, 21) }

                                                    </button>
                                            </h3> 
                                        </span>

                                </div>

                       <MobileJoinButton  />

                   </div>
             
               )}
       </div>
       <div className='w-full flex flex-col lg:hidden -mb-3  '>
       <div className='flex md:flex w-full lg:hidden px-4 mb-2 mt-0' >
           <DropDown getLoc={handleLocation}/>
           {/* <SearchIcon onClick={handleSearchModal} className='text-gray-500 h-10 w-10 cursor-pointer'/> */}
       </div>
     {
        router.pathname.includes('/home') ?
       <div className='z-10 bg-white flex items-center mx-auto space-x-4 text-12px w-full justify-evenly text-gray-500 '>
                        <span className=' text-blue-600'>बायलोकल</span>
                        <span className='  text-red-600'>Buylowcal</span>
                        <span className='text-yellow-600'>ਬਾਏਲੋਕਲ </span>
                        <span className='text-green-600'> বাইলোকাল </span>
                    
        </div>  : null}
       </div>
   </div>

    )
}



/*
Logs

--- LOGGED IN

1) SAVE LOCATION
2) SAVE ITEMS
3) SAVE CART PRODUCT, SHOP,
4) SAVE ORDER

- 
- ip address, user, location, timeStamp,                                ---type:location
- ip address, user, location, search_item, timeStamp,                   ---type:search_item
- ip address, user, location, product, shop, timeStamp,                 ---type:product
- ip address, user, location, product, shop, order, timeStamp,          ---type:order

--- NOT LOGED OUT

1) SAVE LOCATION

- ip address, location, timeStamp,
- ip address, location, search_item, timeStamp,

*/
