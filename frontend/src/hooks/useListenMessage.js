import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import useConversation from "../zustandStore/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";
const useListenMessage = () => {
  // we will listen the messages
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    // set messges from socket to setMessages
    socket?.on("newMessage", (newMsg) => {
      newMsg.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMsg]);
    });

    // if this componnet is unmount , so we don't want to listen it any more
    // other wise we listen the sound multiple times of listeners
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessage;
