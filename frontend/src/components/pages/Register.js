import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

function Register() {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const reponse = await axios.post("http://localhost:3001/auth/register", {
        userName,
        email,
        password,
      });
      if (reponse.status === 201) {
        setMessage("User registered successfully. Redirecting...");
        //Redirect
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Error registering user:", err);
      setMessage("Error registering user. Please try again.");
    }
  };
  return (
    <div className="wrapper">
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        {message && <p className="message">{message}</p>}
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
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

        <button type="submit">Register</button>

        <div className="login-link">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
