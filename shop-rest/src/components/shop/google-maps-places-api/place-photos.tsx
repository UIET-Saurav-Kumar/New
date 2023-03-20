import React, { useState, useEffect } from 'react'
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from '@utils/api/http'
import url from "@utils/api/server_url";
import { useMutation, useQueryClient } from 'react-query';
import { useModalAction } from '@components/ui/modal/modal.context';
import { MapPin } from '@components/icons/map-pin';


export default function PlacePhotos(props:any) {

  const queryClient = useQueryClient();

  const {shopName, handleApiPhotos, showRating , showImages,handleBusinessName,handleLogoImg, showLogoImg, handlePhotos, handleImage, handleTotalRating, data, handleReviews, handleOpen, handleRating} = props;

  const [place_Id, setPlace_Id] = useState([]);

  const [logo_id, setLogo_Id] = useState('');

  const [business_name,setBusinessName] = useState('');

  const [address,setAddress] = useState('');

  const [review, set_Reviews] = useState([]);

  const [place_Photos, setPlace_Photos] = useState([]);

  const [business_logo,setBusinessLogo] = useState('');

  const [total_rating, setTotal_Rating] = useState('');

  const [is_open , set_Is_Open] = useState('');

  const [rating, setRating] = useState('');

  const { openModal } = useModalAction();

  useEffect(() => {
    // const photos = PlacesApi(shopName);
    handleBusinessName && handleBusinessName(business_name);
    handleRating && handleRating(rating);
    handleRating && handleRating(rating);
    handleOpen && handleOpen(is_open);
    handleReviews && handleReviews(review);
    handleTotalRating && handleTotalRating(total_rating);
    handlePhotos && handlePhotos(place_Photos);
  }, [shopName,place_Photos]);
    


  // useEffect(()=>{
  //   handlePhotos && handlePhotos(place_Photos);

  // },[place_Photos])

  // console.log('search data details logo',business_logo)

  const shop_name = shopName;

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

   

  // console.log('search data',place_Id,rating,is_open, business_logo)


  const getSearchDetails = async (data: any) => {
    // console.log('search data details',data)
    const { data: response } = await http.get(
      `${url}/${API_ENDPOINTS.BUYLOWCAL_TEXT_SEARCH}`,{params: data}
    )
  
    return response
  }


  const getplaceDetails = async (data: any) => {
    // console.log('search data details',data)
    const { data: response } = await http.get(
      `${url}/${API_ENDPOINTS.BUYLOWCAL_PLACE_DETAILS}`,{params: data}
    )
     return response 
  }


  const getplacePhoto = async (data: any) => {
    // console.log('search data',data)
    const { data: response } = await http.get(
      `${url}/${API_ENDPOINTS.BUYLOWCAL_PLACE_PHOTOS}`,{params: data}
    )
    // console.log('logo id',response)
    return response
  }

  

  const { mutate: mutatePlace} = useMutation(getplaceDetails, {
    onSuccess: (data) => {
       set_Reviews(data?.result?.reviews);
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
      queryClient.invalidateQueries(API_ENDPOINTS.BUYLOWCAL_PLACE_DETAILS)
    },
  })

  // console.log('review',review);

  const { mutate: mutateSearch } = useMutation(getSearchDetails, {
    onSuccess: (data) => {
      setPlace_Id(data?.place_id);
      setRating(data?.rating);
      set_Is_Open(data?.opening_hours?.open_now);
      setTotal_Rating(data?.user_ratings_total);
     },     
    onError: (data) => {
      // console.log(data?.message);
    },
    
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.BUYLOWCAL_TEXT_SEARCH)
    },
  })

  const { mutate: mutatePhoto } =  useMutation(  getplacePhoto, {
    onSuccess: (response) => {
      setPlace_Photos(prevState => [...prevState, response])
    },
    onError: (data) => {
      // console.log(data?.message)
    },

    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.BUYLOWCAL_PLACE_PHOTOS)
    },
 
});

function openImageModal(){
    handleImage(place_Photos)
  }

  function ratingStars(rating:any) {
    let stars = "";
    if (rating >= 4.5) {
        stars ='⭐️⭐️⭐️⭐️☆';
    } else {
        for (let i = 0; i < Math.floor(rating); i++) {
            stars +='⭐️';
        }
        if (rating % 1 !== 0) {
            stars +='☆';
        }
    }
    return stars;
  }

  function openGoogleReview() {
    openModal('GOOGLE_REVIEWS'
    , {
      review: review
    }
    );
  }

 
  return (

        <div className={` ${showImages || showLogoImg ? 'flex flex-col mt-2' : 'hidden'}  `}> 
            <p className={` ${showRating  ? 'block' : 'hidden'}`}>
              {rating && (rating + ' '+ratingStars(rating))}
            </p>
            <div className='flex  gap-3 w-full px-2 overflow-x-scroll'>
                {place_Photos?.map((binaryImage, index) => {
                    return <img 
                            onClick={openImageModal} 
                            key={index} 
                            src={binaryImage?.url+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                            className="h-60 rounded w-60 object-cover"/>
                        })}
            </div>
        </div>

  )
}
