import React, { useEffect } from "react";
import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        // Save token and user info to local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setMessage("Login successful. Redirecting...");

        onLoginSuccess(response.data.user);
        // Redirect to home page
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      console.error("Error logging in user:", err);
      setMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        {message && <p className="message">{message}</p>}
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <MdEmail className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <RiLockPasswordFill className="icon" />
        </div>

        <button type="submit">Login</button>

        <div className="register-link">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
