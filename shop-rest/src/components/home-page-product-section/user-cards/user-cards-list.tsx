import React, { useContext, useEffect, useRef, useState } from 'react'
import { XIcon, CheckIcon } from '@heroicons/react/solid'
import { useUsersQuery } from '@data/user/use-users.query';
import { useDefault } from 'react-use';
import Layout from '@components/layout/layout';
import url from '@utils/api/server_url';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useMutation } from 'react-query';
import http from '@utils/api/http';
import { useCustomerQuery } from '@data/customer/use-customer.query';
import { HeartOutlineIcon } from '@components/icons/heart-outline';
import { HeartFillIcon } from '@components/icons/heart-fill';
import ChatWindow from 'src/pages/user/messages';
import { useLikesQuery } from '@data/user-likes/use-user-likes.query';
import { AppContext } from '@contexts/user-likes.context';
import { v4 as uuidv4 } from 'uuid';
 import { LikedCard } from '@contexts/user-likes.context';
import { useAllLikesQuery } from '@data/user-likes/use-all-likes.query';
import { useUI } from '@contexts/ui.context';
import { useCallback } from 'react';
import { useModalAction } from '@components/ui/modal/modal.context';
import { getImagesByUserId } from '@data/images-upload/get-uploaded-images.query';
import { useLocation } from '@contexts/location/location.context';
import { getDistance } from 'geolib';
import CompassLoader from '@components/ui/loader/compass-loader';
import Spinner from '@components/ui/loaders/spinner/spinner';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import ProductFeedLoader from '@components/ui/loaders/product-feed-loader';
import { filter } from 'lodash';


export const data = [
    {
      id: 1,
      name: 'John Doe',
      imageUrl: 'https://source.unsplash.com/featured/?indian-college-girl',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum orci sit amet faucibus lacinia.',
    },
    {
      id: 2,
      name: 'Jane Doe',
      imageUrl: 'https://source.unsplash.com/featured/?indian-modern-woman',
      description: 'Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      id: 3,
      name: 'Bob Smith',
      imageUrl: 'https://source.unsplash.com/featured/?indian-person',
      description: 'Nullam euismod, erat nec tristique semper, nulla tellus commodo tellus, sit amet congue urna tellus ut nisi.',
    },
    {
      id: 4,
      name: 'Alice Johnson',
      imageUrl: 'https://source.unsplash.com/featured/?indian-young-girl',
      description: 'Mauris ut dolor quis quam varius auctor. In non velit non metus aliquam facilisis vitae ut nisi.',
    },
    {
      id: 5,
      name: 'Tom Davis',
      imageUrl: 'https://source.unsplash.com/featured/?indian-man',
      description: 'Phasellus auctor, tellus eu bibendum ornare, nibh nulla malesuada dolor, ut luctus enim justo vel lorem.',
    },
  ];
  //


  const UsersCards = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [user, setUsers] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showGender, setShowGender] = useState("male");
    const [filteredUsers, setFilteredUsers] = useState([]); 
    const [isLiked, setIsLiked] = useState(false);

    const { isAuthorize } = useUI();

    const { likedCards, addLikedCard, removeLikedCard } = useContext(AppContext);
  
    const { data: currentUserData } = useCustomerQuery();

    const { data: likesData } = useAllLikesQuery();

    const {getLocation} =useLocation();

    const [loader, setLoader] = useState(false);
  

    const handleLike = useCallback(async (card: LikedCard) => {     
       if (likedCards.some((likedCard) => likedCard.user_id === card.user_id && likedCard.liked_by === card.liked_by)) {
         removeLikedCard(card);
         setFilteredUsers((prev) => prev.filter((user) => user.id !== card.user_id ));
      } else {
         addLikedCard(card);
       
        setFilteredUsers((prev) => prev.filter((user) => user.id !== card.user_id));
      }
    }, [likedCards, removeLikedCard, addLikedCard]);

  
    const idRef = useRef(currentUserData?.me?.id);
  
    const myId = idRef.current;

    useEffect(()=>{
       !filteredUsers?.length && setLoader(true)
    },[])

   
    useEffect(() => {
      idRef.current = currentUserData?.me?.id;
    }, [currentUserData?.me?.id]);
  
    const { data: users, isLoading: loading, error } = useUsersQuery({
      skip: !isAuthorize, // Add this line to skip the query when isAuthorize is false
      limit: 2000,
      page,
      text: searchTerm,
    });
    
    
    useEffect(() => {
      if ( isAuthorize && users && currentUserData && likesData) {
        const filtered = users?.users?.data?.filter((user) => {
          if (user.id === currentUserData?.me?.id) return false;

          if (!user.gender) return false;
          if (currentUserData?.me?.gender === "male" && user.gender === "male") return false;
          if (currentUserData?.me?.gender === "female" && user.gender === "female") return false;
    
          // Updated condition for checking if user is liked or likes the current user
          if (
            likesData?.some(
              (like) =>
                (like.user_id === user.id && like.liked_by === currentUserData?.me?.id) ||
                (like.user_id === currentUserData?.me?.id && like.liked_by === user.id)
            )
          )
            return false;
    
          // Filter based on current_location and home_location
          if (user?.current_location && getLocation?.formattedAddress) {
            const locationFilter = (location) => {
              // if (typeof location === "string") {
              //   const locationWords = location.split(" ");
              //   const formattedAddressWords = getLocation?.formattedAddress?.split(" ");
              //
              //   const locationMatch = locationWords.some((word) =>
              //     formattedAddressWords.includes(word)
              //   );
              //   if (!locationMatch) return false;
              // } else
              if (
                location?.lat &&
                location?.lng &&
                getLocation?.lat &&
                getLocation?.lng
              ) {
                const distance = getDistance(
                  { latitude: location.lat, longitude: location.lng },
                  { latitude: getLocation.lat, longitude: getLocation.lng }
                );
    
                const maxDistance = 5000; // You can change this value to set the maximum distance for filtering users (in meters)
    
                if (distance > maxDistance) return false;
              }
              // else if (location?.formattedAddress) {
              //   const locationWords = location.formattedAddress.split(" ");
              //   const formattedAddressWords = getLocation?.formattedAddress?.split(" ");
              //
              //   const locationMatch = locationWords.some((word) =>
              //     formattedAddressWords.includes(word)
              //   );
              //   if (!locationMatch) return false;
              // }
              return true;
            };
    
            const currentLocationMatch = locationFilter(user.current_location);
            const homeLocationMatch = user.profile?.home_location
              ? locationFilter(user.profile.home_location)
              : false;
    
            if (!currentLocationMatch && !homeLocationMatch) return false;
          }
          return true;
        });

     
        const distanceInMeters = (a, b) => {
          return getDistance(
            { latitude: a.lat, longitude: a.lng },
            { latitude: b.lat, longitude: b.lng }
          );
        };
    
        const sortedFilteredUsers = filtered.sort((a, b) => {
          if (a.is_online && !b.is_online) return -1;
          if (!a.is_online && b.is_online) return 1;
          
          if (!getLocation?.lat || !getLocation?.lng) return 0;
    
          const aLocation = a.current_location || a.profile?.home_location;
          const bLocation = b.current_location || b.profile?.home_location;
    
          if (!aLocation && !bLocation) return 0;
          if (!aLocation && bLocation) return 1;
          if (aLocation && !bLocation) return -1;
    
          if (aLocation?.lat && aLocation?.lng && bLocation?.lat && bLocation?.lng) {
            const aDistance = distanceInMeters(aLocation, getLocation);
            const bDistance = distanceInMeters(bLocation, getLocation);
    
            return aDistance - bDistance;
          }
          return 0;
        });

        const filteredUsersWithDistance = sortedFilteredUsers.map((user) => {
          const userLocation = user.current_location || user.profile?.home_location;
          let distance = null;
    
          if (getLocation?.lat && getLocation?.lng && userLocation?.lat && userLocation?.lng) {
            distance = distanceInMeters(userLocation, getLocation);
          }
    
          return { ...user, distance };
        });
    
    
        setFilteredUsers([...filteredUsersWithDistance]);
      }

      let maleUsers = users?.users?.data?.filter(user => user.gender === 'male');
      let femaleUsers = users?.users?.data?.filter(user => user.gender === 'female');

     // let mixedUsers = [...maleUsers, ...femaleUsers].slice(0, 12);

      !isAuthorize && setFilteredUsers(maleUsers?.concat(femaleUsers)) 
    }, [users, currentUserData, likesData, getLocation]);
    

    console.log('likes', getLocation,  filteredUsers);
    
    
    const useRecordLikeDislike = () => { 
      const recordLikeDislike = async (data:any) => {
        // console.log('mutate',data);
        const {data:response} = await http.post(`${url}/${API_ENDPOINTS.LIKES}`, {params:data});
         return response;
      };
    
      const { mutate } = useMutation(recordLikeDislike);
    
      return { mutate };
    };

     
      
    return (
      <div className="relative h-full w-full z-40">
        {/* {isAuthorize && ( */}
          <p className="text-center font-semibold text-lg p-2 lg:text-2xl">
            Community Members Near You
          </p>
        {/* )} */}
        <div className="transition-all duration-500 grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-6">
          {filteredUsers && filteredUsers?.length > 0 ? (
            filteredUsers?.slice(0, 20).map((user: any) => {
              const card: LikedCard = { user_id: user.id, liked_by: myId };
              if (
                !likedCards.some(
                  (likedCard) =>
                    likedCard.user_id === card.user_id && likedCard.liked_by === card.liked_by
                )
              ) {
                return (
                  <Card
                    key={user.id}
                    myId={myId}
                    user={user}
                    setIsChatOpen={setIsChatOpen}
                    setSelectedUser={setSelectedUser}
                    useRecordLikeDislike={useRecordLikeDislike}
                    handleLike={handleLike}
                    card={card}
                  />
                );
              }
              return null;
            })
          ) : (
            isAuthorize && 
              <div className="flex justify-center items-center mx-auto text-center h-full w-full">
                <ProductFeedLoader limit={10} uniqueKey={user?.id}  />
              </div>
          )}
        </div>
      </div>
    );
    }

  const Card = ({ user, myId, handleLike, useRecordLikeDislike, setIsChatOpen, setSelectedUser }: any) => {
    
    const { mutate: recordLikeDislike } = useRecordLikeDislike();
    const [isLiked, setIsLiked] = useState(false);
    const { data: currentUserData } = useCustomerQuery();

    const { data: images, isLoading, isError, refetch } = getImagesByUserId(user?.id);

    const { openModal } = useModalAction();

    const {isAuthorize} = useUI();

    console.log('userprofile',user)

    function openDetails(user:any) {
      isAuthorize ?  openModal('CARD_DETAILS',{
        user: user
      }) : openModal('OTP_REGISTER');
    }

    console.log('images',images);
  
    const handleHeartClick = () => {

      !isAuthorize && openModal('OTP_REGISTER');
        
      isAuthorize && setIsLiked((prevIsLiked) => !prevIsLiked);
  
      if ( isAuthorize && !isLiked) {

        const newChatId = uuidv4();

        const params = {
          chat_id: newChatId,
          user_id: user.id,
          user_name: user.name,
          liked_by: myId,
          liked_by_name: currentUserData?.me?.name,
          status: 'pending',
        };
  
        recordLikeDislike(params);
        setIsChatOpen(true);
        setSelectedUser(user);
  
        const card = {
          user_id: user.id,
          liked_by: myId,
        };
  
        setTimeout(() => {
          handleLike(card);
        }, 300);

      }

    };
    

    return (

      <div
        key={user?.id}
        className="p-2 lg:p-6 bg-white rounded-2xl shadow-lg flex mt-4 flex-col transform transition-all duration-600 mx-auto"
        style={{
          opacity: 1,
          transform: `scale(1)`,
          transition: "all 0.5s ease-in-out", // Add this line
         }}
        >
      
        { 
          images?.length ?
               
          <img onClick={()=>openDetails(user)}
            src={images[0]?.image_data[0].original}
            alt={user?.name}
            className="w-60 h-60 object-cover rounded-lg"
          /> 
          : 
           <img onClick={()=>openDetails(user)}
             src={`https://source.unsplash.com/featured/?${user.gender}/${user.name}`}
             alt={user?.name}
             className="w-60 h-60 object-cover rounded-lg"
           />
        }

        <div className="flex flex-col items-start justify-between mt-2">
          <h2 className="text-sm lg:text-lg font-medium">{user?.name}</h2>
          <h2 className="text-xs text-gray-500 lg:text-sm font-light">
          {
            user?.current_location == null
              ? ''
              : typeof user.current_location === 'string' ? user.current_location : user?.current_location?.formattedAddress
              
          }

          </h2>
          {user?.isOnline && 
            <div className='flex items-center space-x-1'>
              <span className='h-2 w-2  bg-green-500 rounded-full'></span>
              <span className='text-green-600'>Online</span>
            </div>
          }
        </div>    
 
        <div className="flex items-center justify-between mt-2">
          <button className="flex items-center justify-center w-12 h-12 p-2 rounded-full text-white">
            {isLiked ? (
              <HeartFillIcon className="w-6 h-6 text-red-600" />
            ) : (
              <HeartOutlineIcon onClick={ handleHeartClick} 
                                className="w-6 h-6 text-red-600" />
            )}
          </button>
        </div>
        
      </div>

    );
  };
    

UsersCards.Layout = Layout;


export default UsersCards;
