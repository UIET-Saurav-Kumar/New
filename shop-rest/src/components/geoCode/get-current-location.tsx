import getAddress from "@components/geoCode/geo-code"
import { MapPin } from '@components/icons/map-pin';
import { useLocation } from "@contexts/location/location.context";
import { useState } from "react";
export default function GetCurrentLocation({
    onChange
  }:{
    onChange: any;
  }){
    const {addLocation} =useLocation()

    const [spin, setSpin] = useState(false);

    function getLoc() {
        setSpin((setSpin) => !setSpin);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            alert("Geolocation is not supported by this browser.");
        }
    }

    async function showPosition(position:any) {
       
        var address=await getAddress({lat:position.coords.latitude,lng:position?.coords.longitude})
        console.log(address);

        const location: any = {
            lat: position.coords.latitude,
            lng: position?.coords.longitude,
            formattedAddress: address,
          };

        console.log(location);
        addLocation(location)

        onChange(location);
    }

    return (

        <>
            <button onClick = {getLoc} className=' flex float-left mx-4  sm:mx-0 items-center  text-sm sm:text-sm md:text-md 
                               text-white relative bg-magenta transition duration-500 ease-in-out  transform active:-translate-y-1 active:scale-95 
                                 px-6 p-2 sm:p-3 sm:px-4 md:px-4 2xl:px-8 2xl:p-3  rounded-full   shadow-md font-md '> 
            <span className='mr-1 md:mr-1.5 md:w-4'><img src='/gps-white.png' className={`${spin ? 'animate-pulse' : 'animate-none'}
                             mx-1 md:-mx-1  object-cover w-3 h-3 sm:w-4 sm:h-4`}/></span>
                Get current location     
            </button>
        </>
    )
    // <button onClick={handleCurrentLocation} className = {` ${ active ? 'block' : 'hidden'}  absolute flex items-center shadow-2xl font-semibold placeholder:text-gray-50 rounded w-60 top-22 ml-1 bg-gray-50 text-accent  py-4`}>
    // <img src='/gps.png' className=' mr-5 ml-2  text-green-400  w-6 h-6'/> Get Current Location </button>

}
