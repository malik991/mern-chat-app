import useConversation from "../../zustandStore/useConversation";

const Conversation = ({ allUsers, emoji, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelect = selectedConversation?._id === allUsers._id;
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
      ${isSelect ? "bg-cyan-500" : ""}`}
        onClick={() => setSelectedConversation(allUsers)}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={allUsers.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{allUsers.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
