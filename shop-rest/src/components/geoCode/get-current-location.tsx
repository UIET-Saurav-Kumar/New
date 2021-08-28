import getAddress from "@components/geoCode/geo-code"
import { MapPin } from '@components/icons/map-pin';
import { useLocation } from "@contexts/location/location.context";

export default function GetCurrentLocation({
    onChange
  }:{
    onChange: any;
  }){
    const {addLocation} =useLocation()

    function getLoc() {
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
            
            <button onClick = {getLoc} className=' flex items-start justify-center text-xs sm:text-sm relative bg-white border mt-10 px-1 p-1 sm:px-1 2xl:px-8 2xl:p-2 mx-auto rounded-lg text-accent shadow-lg font-semibold' > 
            <img src='/gps.png' className=' mr-2 ml-2  text-green-400   w-3 h-3 sm:w-6 sm:h-6'/>     Get current location
               
            </button>
        </>
    )
    // <button onClick={handleCurrentLocation} className = {` ${ active ? 'block' : 'hidden'}  absolute flex items-center shadow-2xl font-semibold placeholder:text-gray-50 rounded w-60 top-22 ml-1 bg-gray-50 text-accent  py-4`}>
    // <img src='/gps.png' className=' mr-5 ml-2  text-green-400  w-6 h-6'/> Get Current Location </button>

}