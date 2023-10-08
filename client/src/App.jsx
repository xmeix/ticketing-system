import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RegisterPage from "./pages/admin/RegisterPage";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home";

function App() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  // ___________REFRESH_IN_ALL_TABS:LOGIN/REGISTER_CASES_________________________________________

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleStorageChange = async (event) => {
    if (event.key === "isLoggedIn") {
      handleRefresh();
    }
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ____________________________________________________________________

  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="*" element={isLoggedIn ? <Home /> : <LoginPage />} />
        {user?.role === "ADM" && (
          <Route path="/register" element={<RegisterPage />} />
        )}
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
