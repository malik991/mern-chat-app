import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const loginHook = async ({ username, password }) => {
    const isSuccess = handleInputError({ username, password });
    if (!isSuccess) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, loginHook };
};

export default useLogin;

function handleInputError({ username, password }) {
  if (!username || !password) {
    toast.error("all fields are mendatory");
    return false;
  }
  if (password.length < 6) {
    toast.error("password must be 6 charcters");
    return false;
  }
  return true;
}
