import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import LoginPage from "./pages/loginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(true);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={isLoggedIn ? <Home /> : <LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
