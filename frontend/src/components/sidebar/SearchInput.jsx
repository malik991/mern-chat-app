// STARTER CODE SNIPPET
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import useConversation from "../../zustandStore/useConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setsearch] = useState("");
  const { loading, getAllUsers } = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!search) {
      return;
    }
    if (search.length < 3) {
      toast.error("user name must be at least 3 characters long");
    }
    const conversationWithUser = getAllUsers.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationWithUser) {
      setSelectedConversation(conversationWithUser);
      setsearch("");
    } else {
      toast.error("no user found");
    }
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
