import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeletons from "../skeletons/MessageSkeletons";
import Message from "./Message";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  // to set the scroll bar at the last msg position
  const lastMessageRef = useRef();
  useEffect(() => {
    // settime out needed bcause scroll take time to behave
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className=" px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {/* render skeltong 3 times */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeletons key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
