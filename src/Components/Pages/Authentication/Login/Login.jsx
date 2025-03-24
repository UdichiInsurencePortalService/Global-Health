import React, { useState } from "react";
import "./Login.css";
import {
  faFacebook,
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../../errortoast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handlelogInChange = (e) => {
    const { name, value } = e.target;
    setlogin((prevState) => ({ ...prevState, [name]: value }));
  };

  //
  const handlelogIn = async (e) => {
    e.preventDefault();
    const { email, password } = login;

    if (!email || !password) {
      return handleError(" email, and password are required.");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      const { success, message, JWTToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", JWTToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (error) {
        const detail = error?.details[0].message;
        handleError(detail);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  // Sign Up Start here

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signup;

    if (!name || !email || !password) {
      return handleError("Name, email, and password are required.");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          // navigate('/');
        }, 1000);
      } else if (error) {
        const detail = error?.details[0].message;
        handleError(detail);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center pt-3"
      style={{ background: "#f4f4fa", minHeight: "100vh" }}
    >
      <div
        className="card p-5 text-center shadow-lg"
        style={{ backgroundColor: "white", maxWidth: "400px", width: "100%" }}
      >
        {/* Tabs */}
        <ul className="nav nav-tabs justify-content-center mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
              style={{
                background: activeTab === "login" ? "blue" : "white",
                color: activeTab === "login" ? "white" : "blue",
                fontStyle: "italic",
                fontWeight: "500",
              }}
            >
              Login
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => setActiveTab("signup")}
              style={{
                background: activeTab === "signup" ? "blue" : "white",
                color: activeTab === "signup" ? "white" : "blue",
                fontStyle: "italic",
                fontWeight: "500",
              }}
            >
              Signup
            </button>
          </li>
        </ul>

        {/* Form Sections */}
        <div className="tab-content mt-3">
          {activeTab === "login" ? (
            <div className="form">
              <h2>LOGIN</h2>
              <p>Please enter your login details.</p>
              <form action="" onSubmit={handlelogIn}>
                <input
                  name="email"
                  value={login.email}
                  onChange={handlelogInChange}
                  type="text"
                  className="form-control my-2"
                  placeholder="Email"
                />
                <input
                  name="password"
                  value={login.password}
                  onChange={handlelogInChange}
                  type="password"
                  className="form-control my-2"
                  placeholder="Password"
                />
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: "#00BFFF" }}
                >
                  Forgot password?
                </a>
                <button className="btn btn-primary my-3 w-100 rounded-pill">
                  Login
                </button>
              </form>

              <SocialButtons />
            </div>
          ) : (
            <div className="form">
              <h2>SIGNUP</h2>
              <p>Create your account below.</p>
              <form onSubmit={handleSignup}>
                <input
                  name="name"
                  value={signup.name}
                  type="text"
                  className="form-control my-2"
                  placeholder="Username"
                  onChange={handleChange}
                />
                <input
                  name="email"
                  value={signup.email}
                  type="email"
                  className="form-control my-2"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <input
                  name="password"
                  value={signup.password}
                  type="password"
                  className="form-control my-2"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="btn btn-primary my-3 w-100 rounded-pill"
                >
                  Signup
                </button>
              </form>
              <SocialButtons />
            </div>
          )}
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

// Social Login Buttons
const SocialButtons = () => (
  <div className="d-flex justify-content-center gap-3 mt-3">
    <button className="btn btn-dark border-0 rounded-circle">
      <FontAwesomeIcon icon={faFacebook} />
    </button>
    <button className="btn btn-dark border-0 rounded-circle">
      <FontAwesomeIcon icon={faTwitter} />
    </button>
    <button className="btn btn-dark border-0 rounded-circle">
      <FontAwesomeIcon icon={faGoogle} />
    </button>
  </div>
);

export default Login;
