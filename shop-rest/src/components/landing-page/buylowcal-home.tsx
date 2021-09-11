import Footer from '@components/footer/Footer'
import JoinButton from '@components/layout/navbar/join-button'
import footer2 from '@components/shop-home-page/footer2'
import AuthorizedMenu from '@components/layout/navbar/authorized-menu';
import { useUI } from "@contexts/ui.context";
import Link from 'next/link';
import router, { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useLocation } from "@contexts/location/location.context";
import GetCurrentLocation from "@components/geoCode/get-current-location"
import DropDown from "@components/ui/dropDown"
import GooglePlacesAutocomplete from "@components/form/google-places-autocomplete";
import NumberFormat from 'react-number-format';
import Image from 'next/image';
import ReactVisibilitySensor from 'react-visibility-sensor';


import { useState } from 'react';


// import JoinButton from "@components/layout/navbar/join-button";


import React from 'react'
import CountUpAnimation from './countup-animation';

// import RegistrationForm from  '...../admin-rest/components/auth/registration-form';



export default function Buylowcal() {

    

    const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

    useEffect(() => {

        isAuthorize ? router.push('./home') : router.push('./buylowcal')
        
    }, [isAuthorize])

    const {getLocation} = useLocation()

    const [click, setClick ] = useState(false);
    const [hasLocation, setHasLoction] = useState(false);
    const [location, setLocation] = useState(false);


    

    
    const handleLocation = () => {
        setLocation(!location);
    }


    function changeLocation(data:any) {

        var location=JSON.stringify(data);
        console.log(data?.formattedAddress);
        // document.getElementById("location_id").value=data?.formattedAddress;
        setLocation(data?.formattedAddress);

        if(location || isAuthorize){
            router.push('./home')
            setHasLoction(true);
        }

        var { query ,pathname} = router;
        var pathname="/"+router.locale+'/home'
        
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

        handleLocation();

    }
    
    const [countUp, setCountUp] = useState(false);

    function onVisibilityChange(isVisible:boolean) {
       isVisible ? setCountUp(true) : setCountUp(false) 
    }

    


    return (

        <>

        <div className=' flex flex-col bg-gray-100 bg-opacity-50 mx-0 px-0' >

             <div className='  w-full flex shadow-xl justify-between items-center  h-20 bg-gray-100 text-white top-0 '>

                   <div className=' flex '>
                       <img src='/buylowcal-logo.webp' 
                            className='h-24 w-24'/>
                   </div> 

                    <div className=' mr-20 flex space-x-20 '>

                            {isAuthorize ? (
                    
                            <AuthorizedMenu />
            
                                ) : (
            
                              <JoinButton  />

                            )}                            

                    </div>  

                </div>


                
               <div className = 'flex flex-col relative h-96 items-center justify-center bg-black z-100' > 
                    
                    <img 
                        src='/banner6.jpeg'
                        className=' opacity-40 h-full w-full object-cover  bg-black ' 
                    /> 

                    <div className= 'flex flex-col  rounded p-6 shadow-5xl   w-full items-center 
                                 text-white absolute space-y-4 z-1   bg-transparent   opacity-90  ' >

                        <h1 className='font-bold text-2xl xs+:text-3xl md:text-4xl w-full lg:text-5xl flex    -mb-10 justify-center '> 
                                        Shop, Save and Earn from your Nearest Local Shops 
                        </h1>

                            <div className=' px-4  mt-10 text-black w-400 lg:w-700 ' >

                            {/* <div className=' flex text-black flex-col w-full lg:w-full h-full ' > */}

                                    <GooglePlacesAutocomplete  onChange = {changeLocation} 
                                        address = {getLocation?.formattedAddress} />

                                    <GetCurrentLocation onChange = {changeLocation} />

                            {/* </div> */}

                            </div>
                        
                    </div>
             </div>


                 {/* count up animation */}
                 < CountUpAnimation />
               
                
                {/* <div className=' grid grid-cols-1 sm:grid-cols-3  lg:grid-cols-3  w-full  items-center lg:w-10/12 space-y-20    mt-10  lg:justify-around mx-auto ' >

                   <div className='flex items-center w-full lg:w-11/12  flex-col' > 
                         <img src='https://cdn.doordash.com/media/consumer/home/landing/new/ScootScoot.svg' 
                         className='w-48  h-48'  />

                        <div className='flex flex-col px-10  items-center'>
                            <h1 className=' font-semibold text-xl lg:text-2xl'>  
                                Fast and reliable delivery service
                            </h1>

                            <h2 className='w-full'>
                                    We Provide safe and secure delivery to your doorsteps
                            </h2> 
                        </div>
                   </div>

                   <div className='flex items-center w-full lg:w-11/12 flex-col'> 
                         <img
                         src='https://png.pngitem.com/pimgs/s/362-3622071_small-business-helpdesk-online-shop-cartoon-hd-png.png'
                              className='w-48 h-48'  />
                              <div className='flex flex-col px-10 items-center'>
                                <h1 className='font-semibold text-xl lg:text-2xl'>
                                    Become a Partner
                                </h1>
                                <h2 className='w-full'>
                                    Register your shop on buylowcal and let your business grow to new heights.
                                </h2>
                            </div>
                            <Link href='https://admin.buylowcal.com/register'>
                                <button className=' font-bold text-green-700 mt-6'>
                                    Sign up your store
                                </button>
                            </Link>
                   </div>

                   <div className='flex items-center w-full lg:w-11/12 flex-col'> 

                         <img 
                           src='data:image/png;base64,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'
                           className=' w-48 h-48' 
                         />
                            <div className='flex flex-col px-10 items-center'>
                                <h1 className='font-semibold text-xl lg:text-2xl '> 
                                    Download the app 
                                </h1>

                                    <h2 className='w-full'>
                                        Download the app and avail exciting offers
                                    </h2>
                            </div>

                          
                         
                   </div>

                </div> */}

               

               {/* <div className='relative z-1000 bg-black'> <div className='grid grid-cols-5 hover:opacity-40 w-full h-full mt-10  mx-20'>
                   <div className='absolute z-5000 hidden hover:visible w-full h-full bg-black hover:opacity-40 text-xl text-white mx-auto text-center '>
                   Discover local, on-demand delivery or Pickup from restaurants, nearby grocery and convenience stores, and more. 
                   </div>
                      <img className='transform bg-black-400 hover:opacity-40 transition  duration-500 hover:scale-95 object-cover'  src='/banner1.jpeg '/>
                      <img className='span-cols-2 transform  transition hover:opacity-40 duration-500 hover:scale-95 object-cover ' src='/banner2.jpeg '/> 
                      <img className='transform  transition hover:opacity-40 duration-500 hover:scale-95 object-cover' src='/banner3.jpeg '/>
                      <img className='transform  transition hover:opacity-40 duration-500 hover:scale-95 object-cover' src='/banner4.jpeg '/>
                      <img className='transform  transition hover:opacity-40 duration-500 hover:scale-95 object-cover' src='/banner5.jpeg '/>
                      <img className='transform  transition hover:opacity-40 duration-500 hover:scale-95 object-cover' src='/banner6.jpeg '/>
                      <img className='transform  transition hover:opacity-40 duration-500 hover:scale-95 object-cover' src='/banner7.jpeg '/>
                      <img className='transform  transition hover:opacity-40  duration-500 hover:scale-95 object-cover' src='/banner8.jpeg '/>
                      <img className='transform  transition hover:opacity-40 duration-500 hover:scale-95 object-cover' src='/banner9.jpeg '/>
                      <img className='transform  transition hover:opacity-40 duration-500 hover:scale-95 object-cover' src='/banner10.jpeg '/>
                </div> </div> */}





                <div className=' flex  flex-col mt-20 w-10/12 space-y-20 justify-center items-center mx-auto '>


                      <div className=' flex w-full justify-around items-center md:shadow-lg py-0 md:py-10'>


                            <div className='space-y-8 flex flex-col w-1/3 '>
                                    <h1 className='font-bold text-lg lg:text-2xl'> Grocery at your doorstep.</h1> 
                                    <p className='text-sm md:text-md lg:text-lg'> Buy groceries from your nearest grocery stores.
                                    </p>
                                    {/* <button className='p-2 rounded-xl px-4 w-28 bg-green-800 text-white'>Explore </button> */}
                            </div>

                           <img 
                                src='/banner3.jpeg'
                                // src='https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=768,format=auto,quality=50/https://cdn.doordash.com/media/consumer/home/landing/new/all_in_one.jpg' 
                                className=' h-60 w-1/2 object-fill sm:object-contain lg:h-80 lg:object-fill' />
                        
                      </div>


                     <div className=' flex w-full justify-around items-center md:shadow-lg py-0 md:py-10'>

                           <img 
                                src='/banner8.jpeg'
                                // src='https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=768,format=auto,quality=50/https://cdn.doordash.com/media/consumer/home/landing/new/all_in_one.jpg' 
                                className=' h-60 w-1/2 object-fill sm:object-contain lg:h-80 lg:object-fill' />

                            <div className='space-y-8 flex flex-col w-1/3 '>
                                    <h1 className='font-bold  text-lg lg:text-2xl'> Fresh Fruits and Vegies.</h1> 
                                    <p className='text-sm md:text-md lg:text-lg'> Buy Fresh fruits and vegetables from near supermarkets and avail extra cashback
                                    </p>
                                    {/* <button className='p-2 rounded-xl px-4 w-28 bg-green-800 text-white'> Explore </button> */}
                            </div>
                           
                     </div>



                      <div className=' flex w-full justify-around items-center md:shadow-lg py-0 md:py-10'>

                          

                            <div className='space-y-8 flex flex-col w-1/3 '>
                                    <h1 className='font-bold text-lg lg:text-2xl'> Look good Feel Good </h1> 
                                    <p className='text-sm md:text-md lg:text-lg '> Every brand on your finger tips,
                                        <h2> . Shop now and Avail discounts and offers on best brands around you </h2> </p>
                                    {/* <button className='p-2 rounded-xl px-4 w-28 bg-green-800 text-white'>Explore</button> */}
                            </div>

                            <img 
                                src='/banner4.jpeg'
                                // src='https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=768,format=auto,quality=50/https://cdn.doordash.com/media/consumer/home/landing/new/all_in_one.jpg' 
                                className=' h-60 w-1/2 object-fill sm:object-contain lg:h-80 lg:object-fill' />

                        
                     </div>



                     <div className=' flex w-full justify-around items-center md:shadow-lg py-0 md:py-10'>

                          <img 
                                src='/banner1.jpeg'
                                // src='https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=768,format=auto,quality=50/https://cdn.doordash.com/media/consumer/home/landing/new/all_in_one.jpg' 
                                className=' h-60 w-1/2 object-fill sm:object-contain lg:h-80 lg:object-fill' />

                            <div className='space-y-8 flex flex-col w-1/3 '>
                                    <h1 className='font-bold text-lg lg:text-2xl'> Your favourite food at your doorstep.</h1> 
                                    <p className='md:text-md lg:text-lg'> Order your favourite food from best restraunts near you.
                                    </p>
                                    {/* <button className='p-2 rounded-xl px-4 w-28 bg-green-800 text-white'> Explore </button> */}
                            </div>

                        
                     </div>




                    <div className=' flex w-full justify-around items-center  md:shadow-lg py-0 md:py-10 '>

                        <div className=' space-y-8 flex flex-col w-1/3 '>
                            
                            <h1 className='font-bold text-lg lg:text-2xl'>It’s all here. 
                                All in one app.
                            </h1>

                            <p className='md:text-md lg:text-lg'> Discover local, on-demand delivery or Pickup from restaurants,
                                                    nearby grocery and convenience stores, and more.
                            </p>

                            {/* <button className = 'p-2 rounded-xl px-4 w-28 bg-green-800 text-white' > Explore  </button> */}

                        </div>

                           <img src = 'https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=768,format=auto,quality=50/https://cdn.doordash.com/media/consumer/home/landing/new/all_in_one.jpg' 
                             className = ' h-60  w-1/2  object-fill sm:object-contain lg:h-80 lg:object-fill ' />
                  

                        

                    </div>




                    <div className='  flex w-full justify-around items-center  md:shadow-lg py-0 md:py-10 '>
                        
                        <img 
                          src='/banner7.jpeg'
                          // src='https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=768,format=auto,quality=50/https://cdn.doordash.com/media/consumer/home/landing/new/all_in_one.jpg' 
                          className=' h-60 w-1/2 object-fill sm:object-contain lg:h-80 lg:object-fill' />

                        <div className = 'space-y-8 flex flex-col w-1/3' >

                                <h1 className='font-bold text-lg lg:text-2xl'>
                                     Luxurious resorts near you. 
                                </h1>

                                <p className='md:text-md lg:text-lg'> 
                                    Discover the luxurious resorts near you 
                                </p>

                                {/* <button className='p-2 rounded-xl px-4 w-28 bg-green-800 text-white'>
                                    Explore 
                                </button> */}

                        </div>
                        
                    </div>






                    <div className=' flex w-full justify-around items-center md:shadow-lg py-0 md:py-10'>

                        <div className='space-y-8 flex flex-col w-1/3 '>
                                <h1 className='font-bold text-lg lg:text-2xl'>It’s all here. 
                                    Salon n Spas.</h1> 
                                <p className='md:text-md lg:text-lg'> Discover local, salon and spas and
                                    and more.
                                </p>
                                {/* <button className='p-2 rounded-xl px-4 w-28 bg-green-800 text-white'>Explore </button> */}
                        </div>

                        <img 
                        src='/banner5.jpeg'
                        // src='https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=768,format=auto,quality=50/https://cdn.doordash.com/media/consumer/home/landing/new/all_in_one.jpg' 
                             className=' h-60 w-1/2 object-fill sm:object-contain lg:h-80 lg:object-fill' />
                        
                    </div>


                    <div className = ' flex w-full justify-around items-center md:shadow-lg py-0 md:py-10 ' >

                        <img 
                            src='/banner10.jpeg'
                            // src='https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=768,format=auto,quality=50/https://cdn.doordash.com/media/consumer/home/landing/new/all_in_one.jpg' 
                            className=' h-60 w-1/2 object-fill sm:object-contain lg:h-80 lg:object-fill' />

                            <div className='space-y-8 flex flex-col w-1/3 '>
                                    <h1 className='font-bold text-lg lg:text-2xl'> Premium gyms 
                                        
                                    </h1> 
                                    <p className='md:text-md lg:text-lg'> Discover Premium Health and fitness centers, gyms around you
                                    </p>
                                    {/* <button className='p-2 rounded-xl px-4 w-28 bg-green-800 text-white'> Explore </button> */}
                            </div>
                        
                    </div>




                </div>

                {/* Counter Data */}
               

                {/* <RegistrationForm/> */}

                <Footer />
            
          </div>
        </>
    )
}
