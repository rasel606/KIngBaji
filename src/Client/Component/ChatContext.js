// import React, { createContext, useContext, useEffect, useState } from 'react';



// import { use } from 'react';
// import { useAuth } from './AuthContext';
// import socketService from './socketService';
// import { getNewChatHistory, getNewChatList } from './Axios-API-Service/AxiosAPIService';


// const ChatContext = createContext();

// export const ChatProvider = ({ children }) => {
//   const { userDeatils,token } = useAuth();
//   const [contacts, setContacts] = useState([]);
//   const [activeChat, setActiveChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//   console.log("contacts",contacts);
//   console.log("setActiveChat",activeChat);
// console.log("ChatProvider",userDeatils?.userId,token);
//   useEffect(() => {
//     if (token) {
//       // Initialize socket connection
//       const socketInstance = socketService.connect(token);
//       setSocket(socketInstance);
//       console.log(socketInstance)
//       // Load initial contacts
//       loadContacts();

//       // Set up socket listeners
//       socketInstance.on('newMessage', handleNewMessage);

//       return () => {
//         socketInstance.off('newMessage', handleNewMessage);
//         socketService.disconnect();
//       };
//     }
//     console.log("ChatProvider socketInstance ------------------------1",socket);
//   }, [userDeatils?.userId,token]);

//   const loadContacts = async () => {
//     try {
//       const response = await getNewChatList(userDeatils?.userId);
//       console.log("setContacts",response.data);
//       setContacts(response.data);
//     } catch (error) {
//       console.error('Failed to load contacts', error);
//       console.log('Failed to load contacts', error);
//     }
//   };

//   const loadChatHistory = async (receiverId) => {
//     try {
//       // HTTP fallback
//       const response = await getNewChatHistory(userDeatils?.userId,userDeatils?.referredBy);
//       console.log("setMessages",response.data);
//       setMessages(response.data);
      
//       // Or via socket if available
//       if (socket) {
//         socket.emit('getChatHistory', receiverId, (response) => {
//           if (response.status === 'success') {
//             setMessages(response.messages);
//           }
//         });
//       }
//     } catch (error) {
//       console.error('Failed to load chat history', error);
//     }
//   };

//   const handleNewMessage = (message) => {
//     if (activeChat && 
//         (message.sender === activeChat.userId || message.receiver === activeChat.userId)) {
//       setMessages(prev => [...prev, message]);
//     }
//   };

//   const sendMessage = async (receiverId, content) => {
//     if (!socket) return;

//     return new Promise((resolve, reject) => {
//       socket.emit('sendMessage', { senderId: userDeatils?.userId, receiverId, content }, (response) => {
//         if (response.status === 'success') {
//           setMessages(prev => [...prev, response.message]);
//           resolve(response.message);
//         } else {
//           reject(new Error(response.message));
//         }
//       });
//     });
//   };

//   const selectChat = (contact) => {
//     console.log("selectChat",contact);
//     setActiveChat(contact);
//     loadChatHistory(contact.userId);
//   };
// console.log("activeChat",activeChat);
//   return (
//     <ChatContext.Provider
//       value={{
//         contacts,
//         activeChat,
//         messages,
//         isConnected,
//         selectChat,
//         sendMessage,
//         loadContacts,
//         setActiveChat
        
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChat = () => useContext(ChatContext);