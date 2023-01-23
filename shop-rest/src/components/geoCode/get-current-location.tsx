import getAddress from "@components/geoCode/geo-code"
import { MapPin } from '@components/icons/map-pin';
import { useLocation } from "@contexts/location/location.context";
import { getLocation } from "@contexts/location/location.utils";
import { useEffect, useState } from "react";


export default function GetCurrentLocation({
  onChange
}:{
  onChange: any;
}){
  const {addLocation} =useLocation()

  var options = {
      enableHighAccuracy: false,
      timeout: 1000,
      maximumAge: 0
  };

  const [btn, setBtn] = useState('Detect');

  function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function getLoc() {
    alert('detecting')
      setBtn('Detecting...')
      if (navigator.geolocation) {
        alert('inside navigator')
          navigator.geolocation.getCurrentPosition(showPosition, error, options);
          alert('after navigator')
      } else { 
          setBtn('Detect')
          alert('error');
      }
  }

  async function showPosition(position:any) {

    alert('show position started');

      var address = await getAddress({
          lat:position?.coords?.latitude,
          lng:position?.coords?.longitude
      })

      alert('show position address')
      
      const location: any = {
          lat: position.coords?.latitude,
          lng: position?.coords?.longitude,
          formattedAddress: address,
        };

        alert('show position location')

       addLocation(location)
       setBtn('Detect')
       onChange(getLoc);
  }

  const url = typeof window !== 'undefined' && window?.location?.href

  return (
      <> 
        { url && url?.includes('/register' || '/invite') ?
            <button onClick = {getLoc} className=' flex float-left sm:mx-0 items-center text-sm sm:text-sm md:text-md text-white relative bg-blue-600 transition duration-500 ease-in-out rounded p-2 mb-3 whitespace-nowrap shadow-md font-md '> 
                Get current location     
            </button>
            :
            <button onClick = {getLoc} className='rounded font-semibold bg-blue-700 p-2 px-3 text-white mb-3 flex float-left mx-4 sm:mx-0 items-center text-sm sm:text-sm md:text-md'>
              {btn} 
            </button>
        }
      </>
  )
}
