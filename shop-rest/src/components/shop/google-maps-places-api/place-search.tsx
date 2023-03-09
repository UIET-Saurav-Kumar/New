import React, { useState, useEffect } from 'react'
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from '@utils/api/http'
import url from "@utils/api/server_url";
import { useMutation, useQueryClient } from 'react-query';
import { useModalAction } from '@components/ui/modal/modal.context';
import { MapPin } from '@components/icons/map-pin';
import { ROUTES } from '@utils/routes';
import Link from 'next/link';
import Spinner from '@components/ui/loaders/spinner/spinner';
import { useLocation } from "@contexts/location/location.context";
import router from 'next/router';

export default function PlaceSearch(props:any) {

  const queryClient = useQueryClient();

  const {shopName, handleApiPhotos, show, searchText, showImages,handleBusinessName,handleLogoImg, showLogoImg, handlePhotos, handleImage, handleTotalRating, data, handleReviews, handleOpen, handleRating} = props;

  const [place_Id, setPlace_Id] = useState([]);
  
  const [searchResults, setSearchResults] = useState([]);
   

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
    // const photos = Google(shopName);
    handleBusinessName && handleBusinessName(business_name);
    handleLogoImg && handleLogoImg(business_logo);
    handleRating && handleRating(rating);
    // handlePhotos && handlePhotos(place_Photos);
    handleRating && handleRating(rating);
    handleOpen && handleOpen(is_open);
    handleReviews && handleReviews(review);
    handleTotalRating && handleTotalRating(total_rating);
  }, [shopName]);

  const {getLocation} =useLocation();


  console.log('search data ',getLocation)


  const shop_name = shopName;

  useEffect(() => {
    
    const searchString = {
      query: shop_name?.split(' ').join('-'), 
      city: data?.settings?.location?.formattedAddress.replace(',','').split(' ').join('-'),
    };
    
    const params = {
      query: searchString?.query,
      city: getLocation?.formattedAddress,
      lat: getLocation?.lat,
      lng: getLocation?.lng,
    }

     mutateSearch(params)

}, [searchText])

 
// useEffect(() => {

//     const params = {
//       place_id: place_Id,
//     }

//      mutatePlace(params)
//   },[place_Id])


  useEffect(() => {

    const param = {
      photo_reference : logo_id,
      place_id: place_Id
    }
    mutateLogoImage(param)

  },[logo_id])

  console.log('logo id',logo_id)


  useEffect(() => {
    setPlace_Photos([]);  
  }, [shopName])

  useEffect(() => {
    setBusinessLogo('');  
  }, [shopName,logo_id])


 

  const getSearchDetails = async (data: any) => {
     const { data: response } = await http.get(
      `${url}/${API_ENDPOINTS.GOOGLE_MAPS_TEXT_SEARCH_ALL}`,{params: data}
    )
  
    return response
  }


  const getplaceDetails = async (data: any) => {
     const { data: response } = await http.get(
      `${url}/${API_ENDPOINTS.GOOGLE_MAPS_PLACE_DETAILS}`,{params: data}
    )
     return response
  }


  const getplacePhoto = async (data: any) => {
    const { place_id, photo_reference } = data;
    const { data: response } = await http.get(
      `${url}/${API_ENDPOINTS.GOOGLE_MAPS_PLACE_PHOTOS}`,
      { params: { photo_reference } }
    );
    return { place_id, url: response };
  };
  

  

  const { mutate: mutatePlace } = useMutation(getplaceDetails, {
    onSuccess: (data) => {
      const reviews = data?.result?.reviews || [];
      const phone_number = data?.result?.formatted_phone_number;
      setSearchResults(prevResults => {
        return prevResults?.map(result => {
          if (result.place_id === data?.result?.place_id) {
            return {
              ...result,
              reviews,
              phone_number
            };
          }
          return result;
        });
      });
    },
    onError: (data) => {
      console.log(data?.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.GOOGLE_MAPS_PLACE_DETAILS)
    },
  });

  // console.log('review',review);

  function getShopImage(){
    const param = {
      photo_reference: logo_id,
    };
    mutateLogoImage(param);

    return <img src='' className=''/>
  }



  const { mutate: mutateSearch } = useMutation(getSearchDetails, {
    onSuccess: (data) => {
      setSearchResults(data?.slice(0, 8)?.map(result => {
        const {
          place_id,
          name,
          formatted_address,
          photos,
          rating,
          opening_hours,
          user_ratings_total,
        } = result;
  
        setPlace_Id(place_id);
        setBusinessName(name);
        setAddress(formatted_address);
        setLogo_Id(photos?.[0]?.photo_reference);
        setRating(rating);
        set_Is_Open(opening_hours?.open_now);
        setTotal_Rating(user_ratings_total);
  
        const logo_id = photos?.[0]?.photo_reference;
        logo_id && mutateLogoImage({ photo_reference: logo_id,place_id: place_Id });
  
        place_id && mutatePlace({ place_id });
  
        return {
          place_id,
          name,
          formatted_address,
          rating,
          reviews: [],
          photo_url: null,
          opening_hours,
          user_ratings_total
        };
      }));
    },
    onError: (data) => {
      console.log(data?.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.GOOGLE_MAPS_TEXT_SEARCH_ALL)
    },
  });

  function getShopReviews(){
    const params = {
         place_id: place_Id,
       };
       mutatePlace(params);
 }

  console.log('results',searchResults);
  console.log('results placeid',place_Id)



  const { mutate: mutateLogoImage } = useMutation(getplacePhoto, {
    onSuccess: (response) => {
      console?.log('searchresults response',response)
      setSearchResults(prevResults => {
        console.log('searchresults prevResults',prevResults)
        return prevResults.map(result => {
          if (result.place_id === response?.place_id) {
            return {
              ...result,
              photo_url: response?.url
            };
          }
          return result;
        });
      });
    },
    onError: (data) => {
      console.log(data?.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.GOOGLE_MAPS_PLACE_PHOTOS)
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

function openGoogleReview(data) {
  openModal('GOOGLE_REVIEWS'
  , {
    review: data
  }
  );
}

console.log('searchresults',searchResults)

function shopRoute(result) {
  console.log('img 22',result.photo_url?.url?.split('?')[1])
  router.push(`shops/global/${result?.name}?id=${result?.place_id}&open=${result?.opening_hours?.open_now}&photo=${result?.photo_url?.url?.split('?')[1]}&rating=${result?.rating}&total=${result?.user_ratings_total}&adr=${result?.formatted_address}&num=${result?.phone_number}`)
}

 
  return (
        <> 
        <p className='font-semibold w-full text-center p-2 text-gray-700 '>
          {searchText}
        </p>

       { !searchResults?.length ? <Spinner/> :
        <div className={` ${showImages || showLogoImg ? 'grid grid-cols-2 lg:grid-cols-5 gap-2 mt-2' : 'hidden'}  `}> 
          <p className={` ${show ? 'block' : 'hidden'}`}>{rating && (rating + ' '+ratingStars(rating))}</p>
            {/* <div className='flex  gap-3 w-full px-2 overflow-x-scroll'>
                { showImages && place_Photos?.slice(0,5).map((binaryImage, index) => {
                    return <img 
                            onClick={openImageModal} 
                            key={index} 
                            src={binaryImage?.url+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                            className="h-60 rounded w-60 object-cover"/>
                        })}
            </div> */}
            {
                showLogoImg && 

                searchResults?.length && searchResults?.map( (result,index) => {

                    // <Link href={`${ROUTES.SHOPS}/${business_name}`}> 
                   return  <div onClick={()=>shopRoute(result)} key={index} 
                                className='flex shadow-300 mx-auto lg:mx-5 rounded space-y-4 flex-col border  w-full  text-center  p-4   '>
                           
                          <div className="flex justify-between w-full items-center "> 
                            <div className="flex flex-col space-y-4 "> 
                            {console.log('imggg',result)}
                            <img 
                              src={result?.photo_url?.url+process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                              className="h-60 rounded w-60 object-cover " /> 
                               <div className='flex items-start text-left     mt-4'>
                                <h4 className='font-semibold     h-full   text-gray-900 text-sm   sm:text-sm lg:text-sm xl:text-md w-full '> 
                                 {result?.name} 
                                </h4>
                                <p className={` ${result?.opening_hours?.open_now ? 'text-green-700 text-sm font-semibold' : 'text-sm text-red-500 text-semibold'}`}>
                                  {result?.opening_hours?.open_now  ? 'open' : 'closed'}
                                </p>
                               </div>
                               
                                <p onClick={()=>openGoogleReview(result?.reviews)} className="flex items-start cursor-pointer text-left">
                                 <span className="text-gray-500 mr-2 font-semibold">
                                  {result?.rating}
                                 </span>
                                {ratingStars(result?.rating)}
                               </p>
                                
                            </div>
                            {/* <h4 className='text-green-600 text-xs font-semibold'> Open </h4> */}
                          </div>
             
                          <div className=' flex items-start'> 
                             <MapPin className="w-3.5 h-3.5 me-1 text-green-600  flex-shrink-0" />
                               <span className="flex flex-col">
                                 <h5 className='text-xs h-full text-left lg:h-16 text-gray-700 flex'>
                                  {result?.formatted_address}  
                                </h5>
                                </span>
                          </div> 
                    </div>
                    }
                    )
                    // </Link>
                           
                        }
        </div>
}
</>

  )
}
