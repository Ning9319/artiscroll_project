import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import AI from "./components/pages/AI";
import CVPR from "./components/pages/CVPR";
import CL from "./components/pages/CL";
import ML from "./components/pages/ML";
import Library from "./components/pages/Library";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
//import Button from "./components/Button";

function App() {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setIsAuth(true);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/cs.AI" element={<AI />} />
        <Route path="/cs.CV" element={<CVPR />} />
        <Route path="/cs.CL" element={<CL />} />
        <Route path="/cs.LG" element={<ML />} />
      </Routes>
    </div>
  );
}

export default App;
