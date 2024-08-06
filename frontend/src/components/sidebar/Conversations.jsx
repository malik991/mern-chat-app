import React from "react";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emoji";

const Conversations = () => {
  const { loading, getAllUsers } = useGetAllUsers();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {getAllUsers?.map((user, endex) => (
        <Conversation
          key={user._id}
          allUsers={user}
          emoji={getRandomEmoji()}
          lastIdx={endex === getAllUsers.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
