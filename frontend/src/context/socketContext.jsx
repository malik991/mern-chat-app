import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import io from "socket.io-client";

const SocketContext = createContext();

// create hook to consume the context
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvide = ({ children }) => {
  const [socket, setSocket] = useState(null); // it will be our socket connection
  const [onlineUser, setOnlineUser] = useState([]);
  const { authUser } = useAuthContext();
  //https://mern-chat-app-b14c.onrender.com
  useEffect(() => {
    if (authUser) {
      const socketConn = io("https://mern-chat-app-b14c.onrender.com", {
        query: {
          userId: authUser._id, // send userId as argument to server for hande shake
        },
      });

      setSocket(socketConn);
      // set online users from "getOnlineUsers" event
      // socket.on is used to listen to the events, which can be used to both sides on client and server
      socketConn.on("getOnlineUsers", (users) => {
        setOnlineUser(users);
      });

      // for performance call the cleanup funciton, when connection is close and component is unmount
      return () => socketConn.close();
    } else {
      // if auth user is not
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]); // when new login detect this will run

  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};
