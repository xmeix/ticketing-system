import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import LoginPage from "./pages/loginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import { useSelector } from "react-redux";
import RegisterPage from "./pages/admin/RegisterPage";

function App() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="*" element={isLoggedIn ? <Home /> : <LoginPage />} />
        {user?.role === "ADM" && (
          <Route path="/register" element={<RegisterPage />} />
        )}
      </Routes>
    </>
  );
}

export default App;
