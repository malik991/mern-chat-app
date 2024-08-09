import { useSocketContext } from "../../context/socketContext";
import useConversation from "../../zustandStore/useConversation";

const Conversation = ({ allUsers, emoji, lastIdx }) => {
  const { selectedConversation, setSelectedConversation, unreadMessages } =
    useConversation();
  const isSelect = selectedConversation?._id === allUsers._id;

  const { onlineUser } = useSocketContext();

  const isOnline = onlineUser.includes(allUsers._id);
  const unreadCount = unreadMessages[allUsers._id] || 0;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
      ${isSelect ? "bg-cyan-500" : ""}`}
        onClick={() => setSelectedConversation(allUsers)}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img src={allUsers.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{allUsers.fullName}</p>
            <div className="flex items-center gap-x-1">
              <span className="text-xl">{emoji}</span>
              {isOnline && unreadCount > 0 && (
                <div className="badge badge-secondary">+{unreadCount}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
