
import { useState } from "react";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import ProductFeedLoaderTwo from "@components/ui/loaders/product-feed-loader-two";
import Spinner from "@components/ui/loaders/spinner/spinner";
import Image from "next/image";
import Logo from "@components/ui/logo";
import Navbar from "@components/layout/navbar/navbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Footer from "@components/footer/Footer";
import GooglePlacesAutocomplete from "@components/form/google-current-location";
import DeliveryPlacesAutocomplete from "@components/form/delivery-places-autocomplete";


// import { XIcon } from "@heroicons/react/outline";

// import { Map, GoogleApiWrapper } from 'google-maps-react';


export default function delivery() {

    const [delivery, setDelivery ] = useState(false);

    const handleDelivery = () => {
        setDelivery(!delivery);
    } 

    const closeDelivery = () => {
        setDelivery(!delivery);
    }

    const [pickup, setPickup] = useState('');
    const [drop, seDrop] = useState('');
    

    // var myLatLng = { lat: 38.3460, lng: -0.4907 };
    // var mapOptions = {
    //                     center: myLatLng,
    //                     zoom: 7,
    //                     mapTypeId: google.maps.MapTypeId.ROADMAP

    //                  };
    

    return (
        <>
          <Navbar label='Book Delivery'/>

        <div className='hidden  lg:flex lg:flex-col  w-full '>

          


            <div className=' flex  lg:flex w-full mt-4 '>
                     
                     {/* location inputs */}
                    <div className='flex flex-col h-11/12 w-500 border-t-0 border shadow-2xl'>

                            <div className=' flex justify-between mx-4 items-center  h-24'>

                                <img  src='/transparent-delivery-man.png' 
                                      className ='rounded-full border h-14 mt-3  w-14 object-contain'/>

                                    <div className='flex justify-between  text-xs '>

                                        <h3 className='font-semibold'>Rider</h3>
                                        <h3 className='font-light flex ml-8 text-gray-600'>CH 01 3499</h3>

                                    </div>
                                    
                            </div>

                        <div className=' flex flex-col  space-y-4 justify-around mx-auto mt-8  w-full rounded-md '>

                            <form className='flex items-center mx-auto  flex-col ' >

                                    
                                        <GooglePlacesAutocomplete
                                        />
                                  
                                        <input onChange={(e)=>setDrop(e.target.value)} type='text' className=' mx-2  p-2 rounded-lg text-xs outline-none border' 
                                            placeholder='Enter Drop Location' />
                                    {/* </div> */}

                                    <button onClick={handleDelivery} className='px-4 bg-green-500 hover:bg-green-400 mx-auto rounded-lg text-sm py-1 text-white font-semibold'>
                                        Pickup Delivery
                                    </button>

                            </form>

                        </div>
                 </div>

                
                     {/* Map */}
                        <div className="google-map-code w-full">

                            <iframe  src="https://www.google.com/maps/embed/v1/view?key=AIzaSyDd58SS-eX8RDXYdhOu-HO1AhqVtjowXqQ&center=30.701871399999998,76.801418&zoom=18&maptype=roadmap"  
                                 className='w-full h-screen'   width="full" height="full" frameborder="0" style={{border:0}} allowfullscreen aria-hidden="false" tabindex="0"></iframe>
                        </div>
                    {/* Map end */}


            </div>



            <div className=' shadow-3xl justify-evenly bg-gray-200 flex flex-col md:flex sm:flex lg:flex  lg:justify-evenly space-x-4  text-sm mt-10'>

                <div className=' w-auto h-32  p-4 border-r'>
                    <h3 className='text-sm text-gray-400'>Order from</h3>
                    <h3 className='txt-md font-semibold text-gray-500'> Food Hub </h3>
                    <h4 className='text-xs '> Sector 22, Chandigarh</h4>
                </div>

                <div className=' flex border-r border-none w-auto p-5 space-x-3 border-0 '>

                    <h3 className='text-sm w-52 font-light text-gray-600'>Hyderabadi Lazeez Bhuna Murgh [Spicy Chicken Biryani, Boneless - Serves 2]
                        ₹585   </h3>

                        <div className=' flex flex-col items-center'>
                            <h3 className='text-center '> Quantity <span className='text-sm  font-semi-bold'> 1 </span> </h3>
                        </div>

                </div>

                <div className=' flex text-sm flex-col p-4 border'>

                  <div className='flex w-auto space-x-6'>
                    <h3>Sub Total:</h3>
                    <h4> 585.00</h4>
                  </div>

                  <div className='flex  w-42  space-x-6'>
                    <h3 className='font-light  text-sm border-b pb-2 text-gray-400 '> Taxes and Restraunts charges </h3>
                    <h4> 69.00 </h4> 
                  </div>
                   
                     <span className='text-gray-900 '> 69.00</span> 

                </div>

            </div>
            

        </div>

        <div className='flex flex-col lg:hidden w-full'>

            <div className="google-map-code w-full">
                   <iframe  src="https://www.google.com/maps/embed/v1/view?key=AIzaSyDd58SS-eX8RDXYdhOu-HO1AhqVtjowXqQ&center=30.701871399999998,76.801418&zoom=18&maptype=roadmap"  
                  className='w-full'   width="1300" height="300" frameborder="0" style={{border:0}} allowfullscreen aria-hidden="false" tabindex="0"></iframe>
             </div>

              <div className='flex flex-col h-11/12 w-500 border-t-0 border w-auto shadow-2xl'>

                            <div className=' flex justify-between mx-4 items-center  h-24'>

                                <img  src='/transparent-delivery-man.png' 
                                      className='rounded-full border h-14 mt-3  w-14 object-contain '/>

                                    <div className='flex justify-between  text-xs '>

                                        <h3 className='font-semibold'>Rider</h3>
                                        <h3 className='font-light flex ml-8 text-gray-600'>CH 01 3499</h3>

                                    </div>
                                    

                            </div>

                        <div className=' flex flex-col  space-y-4 justify-around mx-auto mt-8  w-full rounded-md '>

                            <form className='flex items-center mx-auto  flex-col ' >

                                    
                                            <DeliveryPlacesAutocomplete
                                            />
                                  
                                        <input onChange={(e)=>setDrop(e.target.value)} type='text' className=' mx-2  p-2 rounded-lg text-xs outline-none border' 
                                            placeholder='Enter Drop Location' />
                                    {/* </div> */}

                                    <button onClick={handleDelivery} className='px-4 bg-green-500 hover:bg-green-400 mx-auto rounded-lg text-sm py-1 text-white font-semibold'>
                                        Pickup Delivery
                                    </button>

                            </form>

                        </div>
                 </div>

        </div>

        <Footer/>

     </>

       
    )
}



export const getStaticProps = async ({ locale }, any) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  };