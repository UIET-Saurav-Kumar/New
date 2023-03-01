import React, { useState, useEffect } from 'react'
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from '@utils/api/http'
import url from "@utils/api/server_url";
import { useMutation, useQueryClient } from 'react-query';
import { useModalAction } from '@components/ui/modal/modal.context';
import { MapPin } from '@components/icons/map-pin';


export default function PlacePhotos(props:any) {

  const queryClient = useQueryClient();

  const {shopName, handleApiPhotos, show, showImages,handleBusinessName,handleLogoImg, showLogoImg, handlePhotos, handleImage, handleTotalRating, data, handleReviews, handleOpen, handleRating} = props;

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
    handleLogoImg && handleLogoImg(business_logo);
    handleRating && handleRating(rating);
    handlePhotos && handlePhotos(place_Photos);
    handleRating && handleRating(rating);
    handleOpen && handleOpen(is_open);
    handleReviews && handleReviews(review);
    handleTotalRating && handleTotalRating(total_rating);
  }, [place_Photos,shopName]);

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

    const param = {
      photo_reference : logo_id
    }
    mutateLogoImage(param)

  },[logo_id])

  console.log('logo id',logo_id)

  useEffect(() => {
    setPlace_Photos([]);  
  }, [shopName ])

  useEffect(() => {
    setBusinessLogo('');  
    // setBusinessName('');
    // setLogo_Id(''); 
  }, [shopName])

  // console.log('search data',place_Id,rating,is_open, business_logo)


  const getSearchDetails = async (data: any) => {
    // console.log('search data details',data)
    const { data: response } = await http.get(
      `${url}/${API_ENDPOINTS.GOOGLE_MAPS_TEXT_SEARCH}`,{params: data}
    )
  
    return response
  }


  const getplaceDetails = async (data: any) => {
    // console.log('search data details',data)
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
      for (let j = 0; j < 5; j++) {
        const photo = data?.result?.photos[j]?.photo_reference;
        // console.log('reference',photo)
        const param = {
          photo_reference : photo
        }
        mutatePhoto(param)
        
      }
      //  console.log('review place id', data,review)
    },

    onError: (data) => {
      // console.log(data?.message)
    },

    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.GOOGLE_MAPS_PLACE_DETAILS)
    },
  })

  // console.log('review',review);

  const { mutate: mutateSearch } = useMutation(getSearchDetails, {
    onSuccess: (data) => {
      setPlace_Id(data?.place_id);
      setBusinessName(data?.name);
      setAddress(data?.formatted_address);
      setLogo_Id(data?.photos[0]?.photo_reference);
      setRating(data?.rating);
      set_Is_Open(data?.opening_hours?.open_now);
      setTotal_Rating(data?.user_ratings_total);
      // console.log('operator plans', data);
      
    },     
    onError: (data) => {
      // console.log(data?.message);
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
      // console.log(data?.message)
    },

    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.GOOGLE_MAPS_PLACE_PHOTOS)
    },
 
});

const { mutate: mutateLogoImage } =  useMutation(showLogoImg &&  getplacePhoto, {
  onSuccess: (response) => {
    setBusinessLogo(response)
    
  },
  onError: (data) => {
    // console.log(data?.message)
  },

  onSettled: () => {
    queryClient.invalidateQueries(API_ENDPOINTS.GOOGLE_MAPS_PLACE_PHOTOS)
  },

});

function openImageModal(){
    handleImage(place_Photos)
  }

  // console.log('placePhotos',review)


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
          <p className={` ${show ? 'block' : 'hidden'}`}>{rating && (rating + ' '+ratingStars(rating))}</p>
            <div className='flex  gap-3 w-full px-2 overflow-x-scroll'>
                {showImages && place_Photos?.map((binaryImage, index) => {
                    return <img 
                            onClick={openImageModal} 
                            key={index} 
                            src={binaryImage?.url+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                            className="h-60 rounded w-60 object-cover"/>
                        })}
            </div>
                  { showLogoImg && 

                          <div className='flex shadow-300 mx-auto lg:mx-5 rounded space-y-4 flex-col border w-72    text-center   p-4   '>

                            <div className="flex justify-between w-full items-center "> 
                              <div className="flex flex-col space-y-4"> 
                                <img 
                                src={business_logo?.url+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                                className="h-60 rounded w-60 object-cover " 
                                /> 
                                <div className='flex items-start text-left     mt-4'>
                                  <h4 className='font-semibold     h-full   text-gray-900 text-sm   sm:text-sm lg:text-sm xl:text-md w-full '> 
                                    {business_name} 
                                  </h4>
                                  <p className={` ${is_open ? 'text-green-700 text-sm font-semibold' : 'text-sm text-red-500 text-semibold'}`}>
                                    {is_open  ? 'open' : 'closed'}
                                  </p>
                                </div>
                                
                                <p onClick={()=>openGoogleReview()} 
                                   className="flex items-start  text-left">
                                  <span className="text-gray-500 mr-2 font-semibold">
                                    {rating}
                                  </span>
                                  {ratingStars(rating)}
                                </p>
                              </div>
                              {/* <h4 className='text-green-600 text-xs font-semibold'> Open </h4> */}
                            </div>
             
                          <div className=' flex items-start'> 
                          <MapPin className="w-3.5 h-3.5 me-1 text-green-600  flex-shrink-0" />
                               <span className="flex flex-col">
                                 <h5 className='text-xs h-full text-left lg:h-16 text-gray-700 flex'>
                                  
                                  {address}  
                                  
                                </h5>
                                 
                                </span>
                          </div> 
                    </div>
                           
                        }
        </div>

  )
}
