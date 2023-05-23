import DefaultLayout from "@components/layout/default-layout";
import Avatar from "@components/ui/avatar";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { fetchAllLikes, useAllLikesQuery } from "@data/user-likes/use-all-likes.query";
import { useLikesQuery } from "@data/user-likes/use-user-likes.query";
import { useUserFindQuery } from "@data/user/use-user-find.query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import url from "@utils/api/server_url";
import { GetStaticProps } from "next";
import React, { useEffect, useRef, useState } from "react";
import { dehydrate, QueryClient, useMutation } from "react-query";
import { io } from "socket.io-client";
import ChatScreen from "./chat-screen";
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { ArrowLeftIcon } from "@heroicons/react/outline";
import router, { Router, useRouter } from "next/router";
import { Tab } from '@headlessui/react';
import { getImagesByUserId } from "@data/images-upload/get-uploaded-images.query";
import { ArrowPrev } from "@components/icons/arrow-prev copy";


export const getStaticProps: GetStaticProps = async () => {

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    ["allLikes"],
    fetchAllLikes,
    {
      staleTime: 10 * 1000,
    }
  );
  return {
    props: {
       dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 120,
  };
};


const UserMessageList = () => {
  const { data: currentUserData } = useCustomerQuery();
  const { data: likesData } = useAllLikesQuery();
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedLike, setSelectedLike] = useState(null);
  const [showChatScreen, setShowChatScreen] = useState(false);
  const [recieverName, setRecieverName] = useState('');
  const [newChatId, setChatId] = useState('');
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [dataFromChild, setDataFromChild] = useState(null);
  const { query } = useRouter();
  const [lastMessage, setLastMessage] = useState(null);

  const [activeUsers, setActiveUsers] = useState(true);
  const [pendingUsers, setPendingUsers ] = useState(false);


  const lastKnownData = useRef({ currentUserData: null, likesData: null });



  const updateMessageStatus = async (data: any) => {
    const { data: response } = await http.put(`${url}/${API_ENDPOINTS.MESSAGE_STATUS}`, { params: data });
    return response;
  };

 
  const { mutate: updateMessageStatusMutate } = useMutation(updateMessageStatus);

  const { data: images, isLoading, isError, refetch } = getImagesByUserId(currentUserData?.me?.id);

  const handleAccept = (id:any) => {
     const newChatId = uuidv4();
    setChatId(newChatId);

    // setShowAcceptModal(false);
    const data = {
       id: id,
    };
  
    updateMessageStatusMutate(data);
    setShowChatScreen(true);
  };

  const fetchMessages = async (receiver_id) => {
    const response = await fetch(
      `${url}/${API_ENDPOINTS.GET_MESSAGES}?sender_id=${currentUserData?.me?.id}&receiver_id=${receiver_id}`
    );
    const responseText = await response.json();
    return responseText?.messages;
  };

  useEffect(() => {
    if (
      currentUserData &&
      likesData &&
      (lastKnownData.current.currentUserData !== currentUserData ||
        lastKnownData.current.likesData !== likesData)
    ) {
      const fetchAndSetLastMessages = async () => {
        const lastMessages = await Promise.all(
          likesData
            ?.sort((a: any, b: any) => new Date(a.updated_at) - new Date(b.updated_at))
            .filter((l: any) => l.user_id == currentUserData?.me?.id || l.liked_by == currentUserData?.me?.id)
            .map(async (like: any) => {
              const receiver_id =
                currentUserData?.me?.id == like.user_id ? like.liked_by : like.user_id;
              const lastMessage = await fetchMessages(receiver_id);
              return { chat_id: like.chat_id, lastMessage: lastMessage };
            })
        );
        setLastMessage(lastMessages);
      };

      fetchAndSetLastMessages();
      lastKnownData.current = { currentUserData, likesData };
  }
  }, [currentUserData, likesData]);

  

  // useEffect(()=>{
  //   const fetchMessages = async (sender_id, receiver_id) => {
         
  //     const response = await fetch(
  //       `${url}/${API_ENDPOINTS.GET_MESSAGES}?sender_id=${currentUserData?.me?.id}&receiver_id=${receiver_id}`
  //     );
      
  //     const responseText = await response.json();
  //     console.log('response', responseText);
    
  //     //  const data = JSON.parse(responseText);
  //     setMessages(responseText?.messages);
  //   };
  // },[])

  const handlePopState = () => {
    setShowChatScreen(false);
  };

  
    useEffect(() => {
      // Add the event listener when the component mounts
      window.addEventListener("popstate", handlePopState);
  
      // Remove the event listener when the component unmounts
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }, []);

    const isMobileView = () => {
      return window.innerWidth <= 768;
    };
  
    

  const handleLikeClick = (like) => {
    setSelectedLike(like);
    setShowChatScreen(true);
   setRecieverName(like.user_name);
  };
  
 
   const handleDataFromChild = (data:any) => {
    setDataFromChild(data);
  };

  console.log('hadleDataFromChild', dataFromChild);
  console.log('likes data message', lastMessage)

  function handleActiveUsers(){
    setActiveUsers(true);
    setPendingUsers(false);
  }

  function handlePendingUsers(){
    setActiveUsers(false);
    setPendingUsers(true);
  }

  return (

    <div className=" flex flex-col relative w-screen lg:w-full h-screen ">
      
      {/* <div className={` ${showChatScreen ? 'hidden lg:block' : ''} z-40 lg:flex hidden lg:sticky  top-0 p-5 items-center bg-gray-50 space-x-3 w-full border-gray-600 border-b `}>
        <ArrowLeftIcon
          onClick={() => router.push('/home')}
          className="h-5 w-5 text-black bg-gray-100"
        />
        <p className="text-lg font-semibold text-gray-600 ml-4">{query.rname}</p>
      </div> */}

         <div className=" absolute z-50  h-20   border bg-gray-100">
          </div>


      {  
       likesData?.filter((l:any)=>l.user_id == currentUserData?.me?.id || l.liked_by == currentUserData?.me?.id)?.length == 0 ? 
         <p className=" w-full flex h-screen   justify-center items-center text-gray-400 font-bold text-2xl">
             No messages
         </p> 
        :
        <div className=" flex flex-col lg:flex-row lg:items-start lg:w-full h-full overflow-hidden ">
           <div className="flex flex-col lg:w-1/3  h-full overflow-auto">
            <div className="flex items-center space-x-2 h-20 border w-full px-3">
              <ArrowPrev onClick={()=>router.push('/home')} className="h-12 w-20 cursor-pointer  text-gray-800 font-bold"/>
               <button onClick={handleActiveUsers} className={` ${activeUsers ? 'text-white bg-green-600 font-bold  transition-all duration-300' : 'text-gray-700 font-semibold bg-white'} w-full border rounded  p-2`}>Active</button>
               <button onClick={handlePendingUsers} className={` ${pendingUsers ? 'text-white bg-green-600 font-bold  transition-all duration-300' : 'text-gray-700 font-semibold bg-white'} w-full border rounded  p-2`}>Pending</button>
            </div>
          <div className=' lg:w-full  h-full overflow-auto'>
            {
              // !showChatScreen && 
              // (
                likesData
                ?.sort((a: any, b: any) => new Date(a.updated_at) - new Date(b.updated_at))
                .filter((l:any)=>l.user_id == currentUserData?.me?.id || l.liked_by == currentUserData?.me?.id).map((like: any) => (
                like.status !== 'pending' 
                ?
                  <div
                    key={like.id}
                    className={` ${activeUsers ? 'flex' : 'hidden'}   bg-gray-50 shadow-00 p-4 border-r cursor-pointer hovver:bg-gray-200 active:bg-gray-200 transition-all duration-500   items-center space-x-4`}
                    onClick={() => handleLikeClick(like)}>
                    
                    <img
                      className="h-12 w-12 rounded-full"
                      src={`https://source.unsplash.com/featured/?girls/${like.user_name}`}
                    /> 
                    <div className="flex-grow">
                      <p className="text-gray-800 text-sm font-medium">
                        {currentUserData?.me?.id == like.user_id ?  like.liked_by_name : like.user_name}
                      </p>
                      {like.user_id == currentUserData?.me?.id && like.status == 'pending' && (
                        <p className="text-gray-400 text-xs">  {like.liked_by_name} likes your profile</p>
                      )}
                      <p className="text-gray-500 text-sm">
                        {
                          Array.isArray(lastMessage) &&
                          lastMessage
                            .find(lm => lm.chat_id === like.chat_id)
                            ?.lastMessage?.slice(-1)[0]?.content || 'Request ' + like.status
                        }
                      </p>
                      {(like.user_id !== currentUserData?.me?.id &&  like.status == 'pending') ? (
                        <p className="text-yellow-600 text-xs">Request {like.status}</p>
                      ):null }
                      {like.user_id !== currentUserData?.me?.id && (like.status == 'pending') && (
                        <p className="text-yellow-600 font-bold text-xs">Requested</p>
                      )}
                    </div>
                    {
                     like.status == 'pending' &&
                      like.user_id == currentUserData?.me?.id && (
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                          onClick={() => {
                            setSelectedLike(like);
                            handleAccept(like.id)
                          }}
                          >
                          Accept
                        </button>
                      )
                    }
                  </div>
                : 
                  <div
                    key={like.id}
                    className={` ${pendingUsers ? 'flex transition-all duration-200' : 'hidden'} flex bg-gray-50  shadow-00 p-5  border-r border-b cursor-pointer hovver:bg-gray-200  items-center space-x-4`}
                    >
                    <img
                      className="h-12 w-12 rounded-full"
                      src={`https://source.unsplash.com/featured/?girls/${like.user_name}`}
                    /> 
                    <div className="flex-grow">
                      <p className="text-gray-800 text-sm font-medium">
                        {currentUserData?.me?.id == like.user_id ?  like.liked_by_name : like.user_name}
                      </p>
                      {like.user_id == currentUserData?.me?.id && like.status == 'pending' && (
                        <p className="text-gray-400 text-xs">  {like.liked_by_name} likes your profile</p>
                      )}
                      { like.status == 'accepted' && (
                        <p className="text-green-600 text-xs">Request {like.status}</p>
                      )}
                      {(like.user_id !== currentUserData?.me?.id &&  like.status == 'pending') ? (
                        <p className="text-yellow-600 text-xs">Request {like.status}</p>
                      ):null }
                    </div>

                    {like.status == 'pending' &&
                      like.user_id == currentUserData?.me?.id && (
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                          onClick={() => {
                            setSelectedLike(like);
                            handleAccept(like.id)
                          }}
                          >
                          Accept
                        </button>
                      )}
                  </div>
               ))
              // )
            }
          </div>
          </div>

          <div className="  w-full  z-50 ">
            {showChatScreen && (
              <ChatScreen
                setLastMessage={setLastMessage}
                name={selectedLike?.user_name}
                rname={
                  currentUserData?.me?.id == selectedLike?.user_id
                    ? selectedLike?.liked_by_name
                    : selectedLike?.user_name
                }
                ri={
                  currentUserData?.me?.id == selectedLike?.user_id
                    ? selectedLike?.liked_by
                    : selectedLike?.user_id
                }
                si={currentUserData?.me?.id}
                id={selectedLike?.chat_id}
                setShowChatScreen={setShowChatScreen}
              />
            )}
          </div>
        </div>
      }  
      
     {showAcceptModal && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded p-4">
          <p className="text-gray-700 font-medium mb-2">
            Do you accept this message?
          </p>

          <div className="flex justify-end">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2"
              onClick={() => setShowAcceptModal(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleAccept}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}



// MessageList.Layout = DefaultLayout;

export default UserMessageList;
