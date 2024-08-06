import useLogout from "../../hooks/useLogout";
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  const { loading, logoutHook } = useLogout();

  async function handleLogout() {
    await logoutHook();
  }

  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={handleLogout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
