import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import useConversation from "../zustandStore/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";
import { useAuthContext } from "../context/authContext";
const useListenMessage = () => {
  // we will listen the messages
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const {
    messages,
    setMessages,
    incrementUnreadMessages,
    selectedConversation,
  } = useConversation();

  useEffect(() => {
    // set messges from socket to setMessages
    socket?.on("newMessage", (newMsg) => {
      //newMsg.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      // Check if the message is for the selected conversation
      const isForCurrentConversation =
        (newMsg.senderId === authUser._id &&
          newMsg.receiverId === selectedConversation?._id) ||
        (newMsg.receiverId === authUser._id &&
          newMsg.senderId === selectedConversation?._id);

      if (isForCurrentConversation) {
        // Add the new message to the current messages state
        newMsg.shouldShake = true;
        setMessages([...messages, newMsg]);
      } else {
        // Increment unread messages count if the message is not for the selected conversation
        incrementUnreadMessages(
          newMsg.receiverId === authUser._id
            ? newMsg.senderId
            : newMsg.receiverId
        );
      }
    });

    // if this componnet is unmount , so we don't want to listen it any more
    // other wise we listen the sound multiple times of listeners
    return () => socket?.off("newMessage");
  }, [
    socket,
    setMessages,
    messages,
    incrementUnreadMessages,
    selectedConversation,
    authUser,
  ]);
};

export default useListenMessage;
