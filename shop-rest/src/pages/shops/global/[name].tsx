import React, { useEffect, useState } from 'react'
import router, { useRouter } from 'next/router';
import DefaultLayout from '@components/layout/default-layout';
import ShopProfileCard from '@components/profile/profile-card';
import ShopDescription from '@components/shop/shop-description';
import { useMutation, useQueryClient } from 'react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import http from '@utils/api/http';
import PlacePhotos from '@components/shop/google-maps-places-api/place-photos';
import { useModalAction } from '@components/ui/modal/modal.context';
import url from "@utils/api/server_url";
import { useLocation } from '@contexts/location/location.context';
import ProductNotFoundInfo from '@components/product/product-not-found-info';


export default function GlobalShops({data}:any) {
 
  const {query} = useRouter();

  const queryClient = useQueryClient();

  const [review, set_Reviews] = useState([]);

  const [shop_lat, setLat] = useState('');
  const [shop_lng, setLng] = useState('');

  const { openModal } = useModalAction();

  const [place_Photos, setPlace_Photos] = useState([]);

  const place_id = query?.id;

  useEffect(() => {

    const param = {
       place_id: place_id
    }
    mutatePlace(param)

  },[place_id])

  useEffect(() => {
    setPlace_Photos([]);  
  }, [query?.name])

 
  console.log('data',query?.photo+'&key='+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  const photo_url =  'https://maps.googleapis.com/maps/api/place/photo?';
  console.log('data 2', url);

  const getplaceDetails = async (data: any) => {
    const { data: response } = await http.get(
     `${url}/${API_ENDPOINTS.GOOGLE_MAPS_PLACE_DETAILS}`,{params: data}
   )
    return response
 }

 const getplacePhoto = async (data: any) => {
  // console.log('search data',data)
  const { data: response } = await http.get(
    `${url}/${API_ENDPOINTS.GOOGLE_MAPS_PLACE_PHOTOS}`,{params: data}
  )
  // console.log('logo id',response)
  return response
}

const { mutate: mutatePlace} = useMutation(getplaceDetails, {
  onSuccess: (data) => {
     set_Reviews(data?.result?.reviews);
     setLat(data?.result?.geometry?.location?.lat);
     setLng(data?.result?.geometry?.location?.lng);
     data?.result?.photos?.slice(0,5).map((item:any) => {
      const photo = item?.photo_reference;
      const param = {
        photo_reference: photo,
      };
      mutatePhoto(param);
    });
    
    //  console.log('review place id', data,review)
  },

  onError: (data) => {
    // console.log(data?.message)
  },

  onSettled: () => {
    queryClient.invalidateQueries(API_ENDPOINTS.GOOGLE_MAPS_PLACE_DETAILS)
  },
})

const { mutate: mutatePhoto } =  useMutation(getplacePhoto, {
  onSuccess: (response) => {
    setPlace_Photos(prevState => [...prevState, response])
  },
  onError: (data) => {
    // console.log(data?.message)
  },

  onSettled: () => {
    queryClient.invalidateQueries(API_ENDPOINTS.GOOGLE_MAPS_PLACE_PHOTOS)
  },

});

  

  function handleImage(data){
    console.log('modal data',data)
    openModal('SHOP_IMAGE_POPOVER',{
      data:place_Photos
    })
  }

 
  function openImageModal(){
    handleImage(place_Photos)
  }

  const {getLocation} = useLocation();

  const lat = getLocation?.lat;
 
  const lng = getLocation?.lng;
 
  const map_url = `https://www.google.com/maps/dir/?api=1&destination=${shop_lat},${shop_lng}&travelmode=driving&dir_action=navigate&origin=${lat},${lng}`;
  
  console.log('api',map_url);


  return (
   
    <div className='w-full h-full'>

      <div className='hidden lg:h-auto border mx-2 lg:flex lg:flex-col shadow-200 items-center my-2'>
          <div className='flex items-center w-full h-72'>
            <div className='h-full w-1/3'>
              <ShopProfileCard  name={query?.name} reviews={review} photo={photo_url+query?.photo+'&photo_reference='+query.photoreference+'&key='+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} totalRating={query?.total} open={query?.open} rating={query?.rating} />
            </div>
            {/* <img className='h-full border w-1/4 p-3 rounded object-contain' src={query?.photo+'&photo_reference='+query?.photoreference+'&key='+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} /> */}
            <div className='w-full h-full border '>
              <img className='object-fit w-full  h-full' src={photo_url+query?.photo+'&photo_reference='+query.photoreference+'&key='+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}/>
            </div>
          </div>

          <div className='w-full flex border p-3'>
             <ShopDescription mapUrl={map_url} adr={query?.adr} num={query?.num} />
          </div>
      </div>

      {/* mobile */}
      <div className='lg:hidden h-full flex flex-col shadow-200 p-2 items-center my-2'>
        
          {/* <img className='h-full border w-1/4 p-3 rounded object-contain' src={query?.photo+'&photo_reference='+query?.photoreference+'&key='+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} /> */}
          <div className='h-auto flex flex-col'>  
              <div className='w-full h-full border '>
                  <img className='object-fit w-full  h-full' src={photo_url+query?.photo+'&photo_reference='+query.photoreference+'&key='+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}/>
              </div>
              <div className='h-full w-full'>
                <ShopProfileCard  name={query?.name} reviews={review}   photo={photo_url+query?.photo+'&photo_reference='+query.photoreference+'&key='+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} open={query?.open} rating={query?.rating} totalRating={query?.total} />
              </div>
          </div>

          <div className='w-full flex border p-3'>
             <ShopDescription mapUrl={map_url} adr={query?.adr} num={query?.num} />
          </div>

      </div>


    <div className='flex flex-col  h-full'>   
    <div className='flex  gap-3 w-full h-full px-2 overflow-x-scroll'>
                {place_Photos?.map((binaryImage, index) => {
                    return <img 
                            onClick={openImageModal} 
                            key={index} 
                            src={binaryImage?.url+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                            className="h-60 rounded w-60 object-cover"/>
                        })}
      </div>

      {/* <div className="h-scree ">
        <ProductNotFoundInfo   />
      </div> */}

      </div>

      
     

    </div>
  )
}

GlobalShops.Layout = DefaultLayout;


