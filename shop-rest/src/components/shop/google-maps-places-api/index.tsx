import React, { useState, useEffect } from 'react'
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from '@utils/api/http'
import url from "@utils/api/server_url";
import { useMutation, useQueryClient } from 'react-query';
import { useModalAction } from '@components/ui/modal/modal.context';


export default function PlacesApi(props:any) {

  const queryClient = useQueryClient();

  const {shopName, handleApiPhotos, show, showImages, handlePhotos, handleImage, handleTotalRating, data, handleReviews, handleOpen, handleRating} = props;

  const [place_Id, setPlace_Id] = useState([]);

  const [business_name,setBusinessName] = useState('')

  const [review, set_Reviews] = useState([]);

  const [place_Photos, setPlace_Photos] = useState([]);

  const [total_rating, setTotal_Rating] = useState('');

  const [is_open , set_Is_Open] = useState('');

  const [rating, setRating] = useState('');


//   const { openModal } = useModalAction();

  useEffect(() => {
    // const photos = PlacesApi(shopName);
    handlePhotos && handlePhotos(place_Photos);
    handleRating && handleRating(rating);
    handleOpen && handleOpen(is_open);
    handleReviews && handleReviews(review);
    handleTotalRating && handleTotalRating(total_rating);
  }, [place_Photos,shopName]);

  

  const shop_name =  shopName;

  useEffect(() => {
    
    const searchString = {
      query: shop_name?.split(' ').join('-'), 
      city: data?.settings?.location?.formattedAddress.replace(',','').split(' ').join('-'),
    };
    
    const params = {
      query: searchString?.query,
      city: searchString?.city,
      lat: data?.settings?.location?.lat,
      lng: data?.settings?.location?.lng,
    }

     mutateSearch(params)

}, [shopName])


useEffect(() => {

    const params = {
      place_id: place_Id,
    }

     mutatePlace(params)
  },[place_Id])


  useEffect(() => {
    setPlace_Photos([]);  
  }, [shopName])


  console.log('place id',place_Id,rating,is_open)

  const getSearchDetails = async (data: any) => {
    console.log('search data details',data)
    const { data: response } = await http.get(
      `${url}/${API_ENDPOINTS.GOOGLE_MAPS_TEXT_SEARCH}`,{params: data}
    )
  
    return response
  }


  const getplaceDetails = async (data: any) => {
    console.log('search data details',data)
    const { data: response } = await http.get(
      `${url}/${API_ENDPOINTS.GOOGLE_MAPS_PLACE_DETAILS}`,{params: data}
    )
     return response
  }


  const getplacePhoto = async (data: any) => {
    console.log('search data',data)
    const { data: response } = await http.get(
      `${url}/${API_ENDPOINTS.GOOGLE_MAPS_PLACE_PHOTOS}`,{params: data}
    )
   
    return response
  }

  const { mutate: mutatePlace} = useMutation(getplaceDetails, {
    onSuccess: (data) => {
       set_Reviews(data?.result?.reviews);
      for (let j = 0; j < data?.result?.photos.length; j++) {
        const photo = data?.result?.photos[j]?.photo_reference;
        console.log('reference',photo)
        const param = {
          photo_reference : photo
        }
        mutatePhoto(param)
        
      }
       console.log('review place id', data,review)
    },

    onError: (data) => {
      console.log(data?.message)
    },

    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.GOOGLE_MAPS_PLACE_DETAILS)
    },
  })

  console.log('review',review);

  const { mutate: mutateSearch } = useMutation(getSearchDetails, {
    onSuccess: (data) => {
      setPlace_Id(data?.place_id);
      setRating(data?.rating);
      set_Is_Open(data?.opening_hours?.open_now);
      setTotal_Rating(data?.user_ratings_total);
      console.log('operator plans', data)
    },     
    onError: (data) => {
      console.log(data?.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.GOOGLE_MAPS_TEXT_SEARCH)
    },
  })

  const { mutate: mutatePhoto } =  useMutation(showImages &&  getplacePhoto, {
    onSuccess: (response) => {
      setPlace_Photos(prevState => [...prevState, response])
      
    },
    onError: (data) => {
      console.log(data?.message)
    },

    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.GOOGLE_MAPS_PLACE_PHOTOS)
    },
 
});

function openModal(){
    handleImage(place_Photos)
  }

  console.log('placePhotos',review)


  function ratingStars(rating) {
    let stars = "";
    if (rating >= 4.5) {
        stars ='⭐️⭐️⭐️⭐️⭐️';
    } else {
        for (let i = 0; i < Math.floor(rating); i++) {
            stars +='⭐️';
        }
        if (rating % 1 !== 0) {
            stars +='⭐';
        }
    }
    return stars;
}

  return (

        <div className={` ${showImages ? 'flex flex-col mt-2' : 'hidden'}  `}> 
        <p className={` ${show ? 'block' : 'hidden'}`}>{rating && (rating + ' '+ratingStars(rating))}</p>
            <div className='flex  gap-3 w-full px-2 overflow-x-scroll'>
                {showImages && place_Photos?.map((binaryImage, index) => {
                    return <img 
                            onClick={openModal} 
                            key={index} 
                            src={binaryImage?.url+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                            className="h-60 rounded w-60 object-cover"/>
                        })}
            </div>
        </div>

  )
}
