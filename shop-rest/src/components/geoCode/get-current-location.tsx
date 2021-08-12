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
            <div onClick = {getLoc} className=' flex items-center justify-center relative bg-gray-400 mt-10 px-2 p-1 2xl:px-8 2xl:p-2 mx-auto rounded-lg text-white' > 
                <h5 className='font-light text-sm 2xl:text-lg'> Get current location </h5>
                <MapPin className=' h-4 w-4 2xl:h-5 2xl:w-5  bg-gray-400'/> 
            </div>
        </>
    )
    // <button onClick={handleCurrentLocation} className = {` ${ active ? 'block' : 'hidden'}  absolute flex items-center shadow-2xl font-semibold placeholder:text-gray-50 rounded w-60 top-22 ml-1 bg-gray-50 text-accent  py-4`}>
    // <img src='/gps.png' className=' mr-5 ml-2  text-green-400  w-6 h-6'/> Get Current Location </button>

}
