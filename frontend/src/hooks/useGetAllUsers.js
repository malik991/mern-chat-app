import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [getAllUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const conversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setAllUsers(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    conversations();
  }, []);

  return { loading, getAllUsers };
};

export default useGetAllUsers;
