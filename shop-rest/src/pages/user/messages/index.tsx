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
import React, { useEffect, useState } from "react";
import { dehydrate, QueryClient, useMutation } from "react-query";
import { io } from "socket.io-client";
import ChatScreen from "./[chatId]";
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { ArrowLeftIcon } from "@heroicons/react/outline";
import router, { Router, useRouter } from "next/router";

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


const UsersList = () => {
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
  const updateMessageStatus = async (data: any) => {
    const { data: response } = await http.put(`${url}/${API_ENDPOINTS.MESSAGE_STATUS}`, { params: data });
    return response;
  };

  const { mutate: updateMessageStatusMutate } = useMutation(updateMessageStatus);


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

  useEffect(()=>{
    const fetchMessages = async (sender_id, receiver_id) => {
         
      const response = await fetch(
        `${url}/${API_ENDPOINTS.GET_MESSAGES}?sender_id=${currentUserData?.me?.id}&receiver_id=${receiver_id}`
      );
      
      const responseText = await response.json();
      console.log('response', responseText);
    
      //  const data = JSON.parse(responseText);
      setMessages(responseText?.messages);
    };
  },[])

 
  // useEffect(() => {
  //   if (!socket) {
  //     // create a socket connection to the WebSocket server
  //     const newSocket = io('http://localhost:6001');
  
  //     // save the socket instance in state
  //     setSocket(newSocket);
  
  //     // subscribe to the chatMessage event
  //     newSocket.on('chatMessage', (message) => {
  //       // update the messages state with the new message
  //       setMessages((messages: any) => [...messages, message]);
  //     });
  
  //     // cleanup function to disconnect the socket connection
  //     return () => {
  //       newSocket.disconnect();
  //     };
  //   }
  // }, [socket]);
  

  const handleLikeClick = (like) => {
    setSelectedLike(like);
    setShowChatScreen(false);
   setRecieverName(like.user_name);
  };
  
 
   const handleDataFromChild = (data:any) => {
    setDataFromChild(data);
  };

  console.log('hadleDataFromChild', dataFromChild);
  console.log('likes data', likesData)

  return (

    <div className="relative w-full max-h-screen">

        <div className="z-40 flex fixed p-5 items-center bg-gray-50 space-x-3 w-full border-gray-600 border-b ">
          <ArrowLeftIcon onClick={() => router.push('/home')} className='h-5 w-5 text-black bg-gray-100' />
          {/* <img
            src={`https://source.unsplash.com/featured/?girls/${query.name}`}
            className="rounded-full h-12 w-12"
          /> */}
          <p className="text-lg font-semibold text-gray-600 ml-4">{query.rname}</p>
        </div>

      {
       showChatScreen ? (
        <ChatScreen
         // recieverId={}
         chatId={newChatId}
         reciever={recieverName}
         currentUser={currentUserData.me}
         selectedLike={selectedLike}
         socket={socket}
         messages={messages}
         setMessages={setMessages}
         setShowChatScreen={setShowChatScreen}
        />
      ) : (

        likesData?.filter((l:any)=>l.user_id == currentUserData?.me?.id || l.liked_by == currentUserData?.me?.id)?.length == 0 ? 
        <p className=" w-full flex h-screen  justify-center items-center text-gray-400 font-bold text-2xl">
             No messages
        </p> :
        
        likesData?.filter((l:any)=>l.user_id == currentUserData?.me?.id || l.liked_by == currentUserData?.me?.id).map((like: any) => (
          like.status !== 'pending' ?
          <Link key={like.id} href={`/user/messages/${like.chat_id}?name=${like.user_name}&rname=${currentUserData?.me?.id == like.user_id ? like.liked_by_name : like.user_name}&ri=${currentUserData?.me?.id == like.user_id ? like.liked_by : like.user_id}&si=${currentUserData?.me?.id}&id=${like.chat_id}`}>
           <div
            key={like.id}
            className="flex bg-gray-50 shadow-300 p-4 active:bg-gray-200 transition-all duration-500 pt-20 items-center space-x-4"
            onClick={() => handleLikeClick(like)}
           >
            <img
              className="h-12 w-12 rounded-full"
              src={`https://source.unsplash.com/featured/?girls/${like.user_name}`}
            /> 
            <div className="flex-grow">
              <p className="text-gray-800 text-lg font-medium">
                {currentUserData?.me?.id == like.user_id ?  like.liked_by_name : like.user_name}
              </p>
              {like.user_id == currentUserData?.me?.id && like.status == 'pending' && (
                <p className="text-gray-400 text-sm">  {like.liked_by_name} likes your profile</p>
              )}
              { like.status == 'accepted' && (
                <p className="text-green-600 text-sm">Request {like.status}</p>
              )}
              {(like.user_id !== currentUserData?.me?.id &&  like.status == 'pending') ? (
                <p className="text-yellow-600 text-sm">Request {like.status}</p>
              ):null }
              {like.user_id !== currentUserData?.me?.id && (like.status == 'pending') && (
                <p className="text-yellow-600 font-bold text-sm">Requested</p>
              )}
            </div>
            {like.status == 'pending' &&
              like.user_id == currentUserData?.me?.id && (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => {
                    setSelectedLike(like);
                    handleAccept(like.id)
                    // setShowAcceptModal(true);
                  }}
                  >
                  Accept
                </button>
              )}
            </div>
          </Link>
          :
          <div
            key={like.id}
            className="flex bg-gray-50  shadow-300 p-5 items-center space-x-4"
            onClick={() => handleLikeClick(like)}
           >
            <img
              className="h-12 w-12 rounded-full"
              src={`https://source.unsplash.com/featured/?girls/${like.user_name}`}
            /> 
            <div className="flex-grow">
              <p className="text-gray-800 text-lg font-medium">
                {currentUserData?.me?.id == like.user_id ?  like.liked_by_name : like.user_name}
              </p>
              {like.user_id == currentUserData?.me?.id && like.status == 'pending' && (
                <p className="text-gray-400 text-sm">  {like.liked_by_name} likes your profile</p>
              )}
              { like.status == 'accepted' && (
                <p className="text-green-600 text-sm">Request {like.status}</p>
              )}
              {(like.user_id !== currentUserData?.me?.id &&  like.status == 'pending') ? (
                <p className="text-yellow-600 text-sm">Request {like.status}</p>
              ):null }
              {/* {like.user_id !== currentUserData?.me?.id && (like.status == 'pending') && (
                <p className="text-yellow-600 font-bold text-sm">Requested</p>
              )} */}
            </div>
            {like.status == 'pending' &&
              like.user_id == currentUserData?.me?.id && (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => {
                    setSelectedLike(like);
                    handleAccept(like.id)
                    // setShowAcceptModal(true);
                  }}
                  >
                  Accept
                </button>
              )}
            </div>
        ))
      )}
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
};




// MessageList.Layout = DefaultLayout;

export default UsersList;
