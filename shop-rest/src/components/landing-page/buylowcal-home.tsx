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


      
                 < CountUpAnimation />
               
            

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
