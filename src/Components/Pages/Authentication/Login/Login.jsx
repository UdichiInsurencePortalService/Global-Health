import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../../errortoast";
import {jwtDecode} from "jwt-decode";
import "./Login.css";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [signup, setSignup] = useState({ name: "", email: "", password: "" });
  const [login, setLogin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the JWT token
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", decoded.username || "User");

        // Dispatch a storage event to update Navbar without refresh
        window.dispatchEvent(new Event("storage"));

        handleSuccess("Google Login Successful!");
        setTimeout(() => navigate("/"), 1000);
      } catch (error) {
        handleError("Invalid token.");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    activeTab === "signup"
      ? setSignup((prev) => ({ ...prev, [name]: value }))
      : setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = activeTab === "signup" ? "signup" : "login";
    const userData = activeTab === "signup" ? signup : login;

    if (Object.values(userData).some((val) => !val)) {
      handleError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const result = await response.json();

      if (result.success) {
        handleSuccess(result.message);
        if (endpoint === "signup") {
          setActiveTab("login");
        } else {
          localStorage.setItem("token", result.token);
          localStorage.setItem("loggedInUser", result.user?.name || "User");

          // Dispatch a storage event to update Navbar without refresh
          window.dispatchEvent(new Event("storage"));

          navigate("/");
        }
      } else {
        handleError(result.error || "Operation failed");
      }
    } catch (err) {
      handleError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center pt-3" style={{ background: "#f4f4fa", height: "100vh" }}>
      <div className="card p-5 text-center shadow-lg" style={{ backgroundColor: "white", maxWidth: "400px", width: "100%" }}>
        <ul className="nav nav-tabs justify-content-center mb-4">
          {["login", "signup"].map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
                style={{ background: activeTab === tab ? "blue" : "white", color: activeTab === tab ? "white" : "blue" }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="tab-content mt-3">
          {activeTab === "signup" && (
            <input name="name" value={signup.name} type="text" className="form-control my-2" placeholder="Username" onChange={handleChange} />
          )}
          <input name="email" value={activeTab === "signup" ? signup.email : login.email} type="email" className="form-control my-2" placeholder="Email" onChange={handleChange} />
          <input name="password" value={activeTab === "signup" ? signup.password : login.password} type="password" className="form-control my-2" placeholder="Password" onChange={handleChange} />
          <button type="submit" className="btn btn-primary my-3 w-100 rounded-pill" disabled={loading}>
            {loading ? "Processing..." : activeTab === "signup" ? "Signup" : "Login"}
          </button>
        </form>

        <div className="d-flex justify-content-center mt-3">
          <a href="http://localhost:8080/auth/google" className="btn btn-danger w-100">
            <FontAwesomeIcon icon={faGoogle} /> Sign In with Google
          </a>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
