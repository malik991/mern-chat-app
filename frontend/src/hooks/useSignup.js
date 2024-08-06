import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signupHook = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const isSuccess = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!isSuccess) return;
    setLoading(true);
    try {
      //const res = await fetch("http://localhost:8000/api/auth/signup", {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // localStorage
      localStorage.setItem("chat-user", JSON.stringify(data));
      // update conext lib
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signupHook };
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("please fill all fields!");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("password and confirm-password are not same");
    return false;
  }
  if (password.length < 6) {
    toast.error("password must be atleast six charcters");
    return false;
  }

  return true;
}
