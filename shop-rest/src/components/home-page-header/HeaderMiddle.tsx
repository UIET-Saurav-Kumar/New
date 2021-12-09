
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

const cities1 = [ 
    
{id:1,
    name:'Chandigarh'}, 
        
    {id:2, name:'Panchkula'},
    {id:3, name:'Mohali'},
    {id:4, name:'Ludhiana'},
    {id:5, name:'Delhi'},
    {id:6, name:'Gurgaon'},    
    {id:7, name:'Noida'},
  
]
const cities2 = [{id:8, name:'Ahemdabad'},
{id:9, name:'Hyderabad'},
{id:10, name:'Bangalore'},
{id:11, name:'Mumbai'},
{id:12, name:'Chennai'},    {id:13, name:'Kolkata'},    {id:14, name:'Pune'},]

export default function HeaderMiddle({children,
    open = false,
    variant = "right",
    useBlurBackdrop,
    onClose,}) {
    

    const truncate = (txt:any, n:number) => {
      return  txt.length > 10 ? txt.substring(0, n) : txt

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

        <div id='amazon-shops' 
             className='flex flex-col  shadow-md md:bg-white lg:bg-white'> 


       <div className='relative z-30 px-4 flex justify-evenly max-w-full pt-8 pb-6 '>
              

               {/* searchbar  */}
               <div className='  hidden lg:flex justify-around lg:justify-between p-0 lg:py-4 w-full px-4'>

                    <div className = ' hidden lg:block px-0 mx-0 p-0 m-0' >

                       <div style={{zIndex: 0}} className=''><Logo className=" mx-0 px-0 " /> </div>       
                                          
                    </div>
                  
                  {/* Search Bar */}
                   <div className=' flex focus-ring-2 justify-center
                                     lg:w-3/4 2xl:mx-auto lg:mx-auto 
                                    2xl:flex-1'>

                       <input onClick = {handleLocation} 
                              defaultValue = {getLocation?.formattedAddress}  
                              className ='hidden  lg:inline-flex  text-gray-500 lg:w-32 lg+:w-38 2xl:w-52 md:w-32 placeholder:text-gray-500  
                                          lg:w-42 rounded-lg  border-l rounded-l-lg rounded-r-none h-12 outline-none 
                                          border border-e-0  focus:border-accent pr-4 border-gray-300 pl-2 ' 
                              placeholder = 'Enter location' id='location_id' />
                       
                           <div className='hidden  lg:flex lg:w-3/5'>
                                <DropDown  getLoc={handleLocation} />
                           </div>

                    </div>

                           { isAuthorize ? 
                               <div className='hidden lg:inline-flex lg:ml-8 lg+:ml-0  xl:inline-flex'>
                                 <AuthorizedMenu/>
                               </div>
                            : 
                               <div className=' hidden lg:inline-flex xl:inline-flex lg:ml-4 lg+:ml-0'>
                                 <JoinButton/>
                               </div> 
                           }  

               </div>

               {/* Location screen */}
               <div className={` ${location ? 'fixed inset-0 bg-gray-900 bg-opacity-60 scroll-y-none w-full h-full' : ' '} `}></div>
               
                    <div style={{zIndex: 1000}}  className={`absolute  flex flex-col  w-full z-1000 inset-0 shadow-lg transform ml-0 duration-200 ease-in 
                                    ${location ? '  translate-y-0  ' : '-translate-y-full ' }  transform border-5 bg-gray-100 h-screen lg:h-100 xl:h-110 2xl:h-110 overflow-y-hidden overflow-hidden `}>
                                      
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
                                           <img src='/drop-down.jpg' className=' hidden lg:block md:relative object-fill md:object-contain'/>
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
                                       w-full lg:w-full    items-center  pt-36  sm:pt-20 md:pt-4 lg:pt-0 space-y-6 ml-0 mx-3 sm:mx-16 md:ml-16 lg:ml-6 xl:ml-8 2xl:ml-10 lg:mt-80'> 
                                          
                                <div  style = {{zIndex: 1000}}  
                                      className='w-full'> 
                                    <GooglePlacesAutocomplete onChange = {changeLocation} 
                                                              address  = {getLocation?.formattedAddress} /> 
                                </div>
        
                                <div style={{zIndex: 1000}}  className='w-full'> 
                                     <GetCurrentLocation onChange = {changeLocation} />  
                                </div>
                                

                            </div>
                            
                        {/* <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opaname-80 w-full h-full" /> */}
                           <div id='cities' style={{zIndex:0}} className='  absolute flex w-full flex-col bottom-44 md:bottom-36 lg:bottom-16 2xl:bottom-8 space-y-4 md:space-y-6'>
                               
                               <div style={{zIndex:0}} className='  w-full mt-2 lg:mt-4 grid grid-cols-4 sm:grid-cols-4 sm:gap-1 gap-2  md:gap-3 justify-evenly text-xs sm:text-sm md:text-lg px-0 sm:px-6 
                                        lg:text-sm lg:flex text-gray-700 text-md items-center '>
                                       {cities1.map((city, )=>{
                                        return   <button key={city.id} className='border bg-white hover:border-magenta p-2 md:p-1 px-3 md:px-4 lg:px-8 rounded-full'>{city.name}</button>
                                       })}
                                    {/* <button className='border-magenta w-20 h-20 p-3 rounded-lg'>{name}</button> */}
                                       
                                </div>
                                
                                <div style={{zIndex:0}} className='  w-full mt-4 grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-1 md:gap-3  justify-between text-xs sm:text-sm md:text-lg px-0 sm:px-6 
                                            lg:text-sm lg:flex text-gray-700 text-md items-center'>
                                                {cities2.map((city)=>{
                                            return   <button key={city.id} className='border bg-white hover:border-magenta p-2 px-3 md:px-4 lg:px-8 md:p-1 rounded-full'>{city.name}</button>
                                            })}
                                </div>
                           </div>

                </div> 


               {isAuthorize ? (

                   <div className='flex justify-between w-full items-center lg:hidden xl:hidden 2xl:hidden'>

                          {/* <div className = ' hidden lg:block px-0 mx-0 p-0 m-0' > */}

                        <Logo className=" mx-0 px-0 " />       
                                          
                          {/* </div> */}

                       <div className='flex items-center  '>
                            <span>  
                                <h3 onClick={handleLocation}  
                                    className='flex  text-gray-600 items-center text-xs sm:text-sm md:text-md lg:hidden  
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
                       
                       ) : (
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
       <div className='flex md:flex w-full lg:hidden px-4 mb-2 mt-0' >
           <DropDown getLoc={handleLocation}/>
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
