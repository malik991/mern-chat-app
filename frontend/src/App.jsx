import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authContext";
import Footer from "./components/footer/Footer";
function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex flex-col items-center justify-center gap-y-5">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
