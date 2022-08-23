import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import { LocationInput } from "@ts-types/generated";
import React, { useState ,useEffect } from "react";
import { useTranslation } from "next-i18next";
import Loader from "@components/ui/loader/loader";
import { useLocation } from "@contexts/location/location.context";

import useOnClickOutside from "@utils/use-click-outside";
import Input from "@components/ui/input";


const libraries: Libraries = ["places"];
// data,
// data: LocationInput;
export default function DeliveryGooglePlaces({address,
  onChange
}: {
  onChange: any;
  address :any
}) {
  const { t } = useTranslation();
  const [loc,setLocation]=useState(address);
  const {addLocation,getLocation} =useLocation()

  useEffect(()=>{
    setLocation(getLocation?.formattedAddress)
  });

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google_map_autocomplete",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries,
  });

  const [autocomplete, setAutocomplete] = React.useState<any>(null);

  const onLoad = React.useCallback(function callback(autocompleteInstance) {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setAutocomplete(null);
  }, []);

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      // console.log("Returned place contains no geometry");
      return;
    }

    setLocation(place.formatted_address);
    const location: any = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      formattedAddress: place.formatted_address,
    };

    for (const component of place.address_components) {
      // @ts-ignore remove once typings fixed
      const componentType = component.types[0];

      switch (componentType) {
        case "postal_code": {
          location["zip"] = component.long_name;
          break;
        }

        case "postal_code_suffix": {
          location["zip"] = `${location?.zip}-${component.long_name}`;
          break;
        }

        case "locality":
          location["city"] = component.long_name;
          break;

        case "administrative_area_level_1": {
          location["state"] = component.short_name;
          break;
        }

        case "country":
          location["country"] = component.long_name;
          break;
      }
    }

    if (onChange) {
      addLocation(location);
      onChange(location);
    }
  };

  if (loadError) {
    return <div>{t("common:text-map-cant-load")}</div>;
  }

  return isLoaded ? (
   
    
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        onUnmount={onUnmount}
        fields={["address_components", "geometry.location", "formatted_address"]}
        types={["address"]}
        className="flex"
      >
        <div className='grid grid-cols-1'>
        <Input
          type = "text"
          // placeholder={t("common:placeholder-search-location")}
          placeholder='Pickup location'
          defaultValue={loc}
          
          className =" mx-2  p-2 rounded-lg text-xs outline-none "
        />

        <Input
          type = "text"
          // placeholder={t("common:placeholder-search-location")}
          placeholder='Drop location'
          defaultValue={loc}
          
          className ="mx-2  p-2 rounded-lg text-xs outline-none "
        />

        <button></button>
         </div>


      </Autocomplete >
     

  ) : (

    <div className="flex">
      <Loader simple={true} className="w-6 h-6" />
    </div>
  );
}
