import { ArrowLeftIcon } from '@heroicons/react/outline';
import { ArrowCircleLeftIcon } from '@heroicons/react/solid';
import router, { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Echo from "laravel-echo";
import http from '@utils/api/http';
 import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useMutation, useQuery } from 'react-query';
import url from '@utils/api/server_url';
import { useCustomerQuery } from '@data/customer/use-customer.query';
import { isToday, isYesterday, isThisWeek, isSameDay, isThisYear, format } from 'date-fns';// import { format } from 'path';
import { getImagesByUserId } from '@data/images-upload/get-uploaded-images.query';
import { animated, useSpring } from 'react-spring';
import { ArrowPrev } from '@components/icons';


// create a sample messages array

// const messagesList = [
//     {
//       id: 1,
//       sender: 'user1',
//       user: {
//         name: 'vinender',
//         avatarUrl: 'https://source.unsplash.com/random/32x32/?person1',
//       },
//       text: 'Hello, how are you?',
//       timestamp: '2023-04-09T12:00:00Z',
//     },
//     {
//       id: 2,
//       sender: 'user2',
//       user: {
//         name: 'Jay',
//         avatarUrl: 'https://source.unsplash.com/random/32x32/?person2',
//       },
//       text: 'Hi! I am doing great, how about you?',
//       timestamp: '2023-04-09T12:02:00Z',
//     },
//     {
//       id: 3,
//       sender: 'user1',
//       user: {
//         name: 'vinender',
//         avatarUrl: 'https://source.unsplash.com/random/32x32/?person1',
//       },
//       text: 'I am doing well, thank you!',
//       timestamp: '2023-04-09T12:03:00Z',
//     },
//     {
//         id: 1,
//         sender: 'user1',
//         user: {
//           name: 'vinender',
//           avatarUrl: 'https://source.unsplash.com/random/32x32/?person1',
//         },
//         text: 'Hello, how are you?',
//         timestamp: '2023-04-09T12:00:00Z',
//       },
//       {
//         id: 2,
//         sender: 'user2',
//         user: {
//           name: 'Jay',
//           avatarUrl: 'https://source.unsplash.com/random/32x32/?person2',
//         },
//         text: 'Hi! I am doing great, how about you?',
//         timestamp: '2023-04-09T12:02:00Z',
//       },
//       {
//         id: 3,
//         sender: 'user1',
//         user: {
//           name: 'vinender',
//           avatarUrl: 'https://source.unsplash.com/random/32x32/?person1',
//         },
//         text: 'I am doing well, thank you!',
//         timestamp: '2023-04-09T12:03:00Z',
//       },
//       {
//         id: 1,
//         sender: 'user1',
//         user: {
//           name: 'vinender',
//           avatarUrl: 'https://source.unsplash.com/random/32x32/?person1',
//         },
//         text: 'Hello, how are you?',
//         timestamp: '2023-04-09T12:00:00Z',
//       },
//       {
//         id: 2,
//         sender: 'user2',
//         user: {
//           name: 'Jay',
//           avatarUrl: 'https://source.unsplash.com/random/32x32/?person2',
//         },
//         text: 'Hi! I am doing great, how about you?',
//         timestamp: '2023-04-09T12:02:00Z',
//       },
//       {
//         id: 3,
//         sender: 'user1',
//         user: {
//           name: 'vinender',
//           avatarUrl: 'https://source.unsplash.com/random/32x32/?person1',
//         },
//         text: 'I am doing well, thank you!',
//         timestamp: '2023-04-09T12:03:00Z',
//       },
//       {
//         id: 1,
//         sender: 'user1',
//         user: {
//           name: 'vinender',
//           avatarUrl: 'https://source.unsplash.com/random/32x32/?person1',
//         },
//         text: 'Hello, how are you?',
//         timestamp: '2023-04-09T12:00:00Z',
//       },
//       {
//         id: 2,
//         sender: 'user2',
//         user: {
//           name: 'Jay',
//           avatarUrl: 'https://source.unsplash.com/random/32x32/?person2',
//         },
//         text: 'Hi! I am doing great, how about you?',
//         timestamp: '2023-04-09T12:02:00Z',
//       },
//       {
//         id: 3,
//         sender: 'user1',
//         user: {
//           name: 'vinender',
//           avatarUrl: 'https://source.unsplash.com/random/32x32/?person1',
//         },
//         text: 'I am doing well, thank you!',
//         timestamp: '2023-04-09T12:03:00Z',
//       },
//   ];
const useMessages = (sender_id: any, receiver_id: any) => {
  return useQuery(
    ["messages", sender_id, receiver_id],
    async () => {
      const response = await fetch(
        `${url}/${API_ENDPOINTS.GET_MESSAGES}?sender_id=${sender_id}&receiver_id=${receiver_id}`
      );

      const responseText = await response.json();
      // console.log("response", responseText);
      return responseText?.messages;
    },
    { refetchInterval: 1000 } // Refetch messages every 1 second
  );
};
  
 

const ChatScreen = ({rname,name,ri,si,id,setLastMessage,setShowChatScreen}) => {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { query } = useRouter();
  const [chatId, setChatId] = useState("");
   const { data: currentUser } = useCustomerQuery();
   const { data: images, isLoading, isError, refetch } = getImagesByUserId(ri);


  useEffect(() => {

    async function setupPushNotifications() {
      const hasPermission = await Notification.requestPermission();
  
      if (hasPermission === "granted" && "serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/service-worker.js");
          console.log("Service Worker Registered", registration);
        } catch (error) {
          console.error("Service Worker Error", error);
        }
      }
    }
  
    setupPushNotifications();

  }, []);

  const openChatScreen = () => {
    setShowChatScreen(true);
    router.push(`${router.asPath}#chat`, undefined, { shallow: true });
  };

  // Close chat screen and remove '#chat' from the URL
  const closeChatScreen = () => {
    setShowChatScreen(false);
    router.push(router.asPath.split('#')[0], undefined, { shallow: true });
  };

  // Listen for changes in the URL
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (!url.includes('#chat')) {
        setShowChatScreen(false);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);


  useEffect(() => {
    const getChatId = async (sender_id: any, receiver_id: any) => {
      const response = await fetch(
        `${url}/${API_ENDPOINTS.GET_CHAT_ID}?sender_id=${sender_id}&receiver_id=${receiver_id}`
      );
      const data = await response.json();
      // console.log("query", data);
      return data.chat_id;
    };

     
    

    const fetchChatId = async () => {
      const chat_id = await getChatId(currentUser?.me?.id, ri);
      if (chat_id) {
        setChatId(chat_id);
      }
    };

    fetchChatId();
  }, [currentUser?.me?.id, ri]);
  

  const { data: messagesData } = useMessages(currentUser?.me?.id, ri);

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);
    

    const useSendMessage = () => {
      const sendMessage = async (messageData:any) => {
        const { data: response } = await http.post(`${url}/${API_ENDPOINTS.SEND_MESSAGE}`, { params: messageData });
        return response;
      };
    
      const { mutate } = useMutation(sendMessage);
    
      return { mutate };
    };

    const { mutate: sendMessage } = useSendMessage();

    const handleShowChatScreen = () => {
      setShowChatScreen(false)
    }

    const handleSendMessage = async (text: string) => {
      // ... (existing code for sending a message)
    
      // After successfully sending the message, call the setLastMessage function:
      if (setLastMessage) {
        setLastMessage(text);
      }
    };
    

     
    const handleMessageSubmit = async (e: any) => {
      e.preventDefault();
      if (message.trim()) {
        try {
          sendMessage({
            sender_id: currentUser?.me?.id,
            receiver_id: ri,
            chat_id: id, // Replace query.id with chatId
            content: message,
          });
          

          handleSendMessage(message);
          newMessageScrollToBottom();
    
          // if ("serviceWorker" in navigator) {
          //   const registration = await navigator.serviceWorker.ready;
          //   registration.showNotification("New Message", {
          //     body: message,
          //     icon: "/buylowcal-old.png", // Replace with the path to your notification icon
          //   });
          // }
    
          setMessage("");
           
        } catch (error) {
          // console.error("Error sending message", error);
        }
      }
    };
    
    
    // const sender = query.si
  
    const handleMessageChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
      setMessage(e.target.value);
       
    };

    const groupMessagesByDate = (messages: any[]) => {
      const groupedMessages = messages.reduce((groups: { [x: string]: any[]; }, message: { created_at: string | number | Date; }) => {
        const date = new Date(message.created_at).toLocaleDateString();
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(message);
        return groups;
      }, {});
    
      return groupedMessages;
    };

    const groupedMessages = groupMessagesByDate(messages);

    //scroll to bootom  when new message is added
    const messagesEndRef = useRef(null);

// Scroll without animation
    const initialScrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };

    // Scroll with animation
    const newMessageScrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
      // When the chat window is first opened, immediately scroll to the bottom
      initialScrollToBottom();
    }, []);

    useEffect(() => {
      // When a new message is added, smoothly scroll to the bottom
      newMessageScrollToBottom();
    }, [messages]);

 
    // add sound when message is sent or received only to new messages by checking if the length of messages array is incresed
    //store message length in local storage so that the state persists in re renders
    
    const getSavedMessageLength = () => {
      const savedMessageLength = localStorage.getItem("messageLength");
      return savedMessageLength ? parseInt(savedMessageLength) : 0;
    };
    
    const [messageLength, setMessageLength] = useState(getSavedMessageLength());

    return (

      <div className="relative z-50 w-full border h-screen overflow-auto ">

      <div className=" fixed top-0 z-40 flex  items-center bg-gray-50 space-x-3 w-screen border-b p-3">
                    <ArrowPrev onClick={handleShowChatScreen} 
                        className='h-8 w-8 lg:hidden cursor-pointer text-black text-bold ' />
                    <img
                      src={`https://source.unsplash.com/featured/?girls/${query.name}`}
                      className="rounded-full h-12 w-12"
                    />
                    <p className="text-lg font-semibold text-gray-900 tracking-wide ml-4">{rname}</p>
                  </div>
         
        <div className="flex-1 flex h-full bg-white flex-col p-6">
          
          <div className="relative top-0 flex-1 flex transition-all transform-gpu duration-500 h-60  flex-col scrollbar-hide overflow-auto">

            {
             messages?.map((message, index) => {
               const messageDate = new Date(message.created_at);

               let formattedDate = '';
           
               if (isToday(messageDate)) {
                formattedDate = 'Today';
              } else if (isYesterday(messageDate)) {
                formattedDate = 'Yesterday';
              } else if (isThisWeek(messageDate)) {
                formattedDate = format(messageDate, 'EEEE, d');
              } else if (isThisYear(messageDate)) {
                formattedDate = format(messageDate, 'MMMM d');
              } else {
                formattedDate = format(messageDate, 'MMMM d, yyyy');
              }
    
              return (
                
                <React.Fragment  key={index}> 

                   
                  
                  {index === 0 || !isSameDay(new Date(messages[index - 1].created_at), messageDate) ? (
                    <p className="sticky  mx-auto bg-gray-50 p-1 rounded-xl px-9 top-16 z-50 text-gray-600 font-semibold my-2">{formattedDate}</p>
                  ) : null}

                 

                  <div ref={messagesEndRef}
                    className={`flex flex-col mb-4 h-full  ${
                      message.sender_id == currentUser?.me?.id ? "ml-auto" : "mr-auto"
                    }`}
                    >
                    <div className="flex items-center mb-1">
                      
                      {/* <img
                        className="h-8 w-8 rounded-full mr-2"
                        src={`https://source.unsplash.com/featured/?girls/${message.sender_name}`}
                        alt="User"
                      /> */}

                      {/* <span
                        className={`${
                          message.sender_id == currentUser?.me?.id ? "text-gray-600" : "text-gray-800"
                        } font-semibold`}
                      >
                        {message.sender_id == currentUser?.me?.id ? message.sender_name : message.receiver_name}
                      </span> */}

                      <span className="text-gray-600 ml-2 text-xs">
                        {isFinite(messageDate.getTime())
                          ? messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : ''}
                      </span>

                    </div>
    
                    <div
                      className={`${ 
                        message.sender_id == currentUser?.me?.id ? "bg-blue-500 w-32 mb-10" : "bg-white max-w-full"
                      } rounded-lg p-3 shadow-md`}
                     >
                      <p
                        className={`${
                          message.sender_id == currentUser?.me?.id ? "text-white w-32" : "text-gray-800"
                        }`}
                      >
                        {message.content}
                      </p>

                    </div>

                  </div>
                </React.Fragment>
              );
            })}
          </div>

          
          <form className="fixed z-40 bottom-0 w-full bg-white  p-4 " onSubmit={handleMessageSubmit}>
            {/* <div className="  flex items-center w-full  bg-transparent  "> */}
              {/* <animated.button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out mr-2"
                onClick={handleSuggestPlace}
                style={useSpring({ opacity: 1, from: { opacity: 0 }})}
              >
                Suggest a Place
              </animated.button>

              <animated.button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out mr-2"
                onClick={handleShareOffer}
                style={useSpring({ opacity: 1, from: { opacity: 0 }})}
              >
                Share an Offer
              </animated.button> */}

              

              <input
                className="flex-1 bg-gray-100 rounded-full py-2 px-4 mx-4 focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none"
                type="text"
                name="message"
                placeholder="Type your message here..."
                value={message}
                onChange={handleMessageChange}
              />

              <button
                className="bg-blue-500  hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                type="submit"
              >
                Send
              </button>
            {/* </div> */}
          </form>
 
      </div>
    </div>
    );
};



export default ChatScreen;
