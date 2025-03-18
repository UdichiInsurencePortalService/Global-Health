import React, { useState } from "react";
import './Login.css';
import { faFacebook, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
 
  return (
    <div className="d-flex justify-content-center align-items-center pt-3" style={{ background: '#f4f4fa' }}>
      <div className="card p-5 text-center shadow-lg" style={{ backgroundColor: 'white' }}>
        <ul className="nav nav-tabs justify-content-center mb-4" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
              id="home-tab"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected={activeTab === "login"}
              style={{
                background: activeTab === "login" ? 'blue' : 'white',
                color: activeTab === "login" ? 'white' : 'blue',
                fontStyle: 'italic',
                fontWeight: '500'
              }}
            >
              Login
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => setActiveTab("signup")}
              id="profile-tab"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected={activeTab === "signup"}
              style={{
                background: activeTab === "signup" ? 'blue' : 'white',
                color: activeTab === "signup" ? 'white' : 'blue',
                fontStyle: 'italic',
                fontWeight: '500'
              }}
            >
              Signup
            </button>
          </li>
        </ul>

        <div className="tab-content mt-3" id="myTabContent">
          {activeTab === "login" && (
            <div className="form">
              <h2>LOGIN</h2>
              <p>Please enter your login and password!</p>
              <input type="text" className="form-control my-2" placeholder="Username" />
              <input type="password" className="form-control my-2" placeholder="Password" />
              <a href="#" className="text-decoration-none" style={{ color: '#00BFFF' }}>Forgot password?</a>
              <button className="btn btn-primary my-3" style={{ width: '100%', borderRadius: '25px' }}>Login</button>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button className="btn btn-dark border-0 rounded-circle"><FontAwesomeIcon icon={faFacebook} /></button>
                <button className="btn btn-dark border-0 rounded-circle"><FontAwesomeIcon icon={faTwitter} /></button>
                <button className="btn btn-dark border-0 rounded-circle"><FontAwesomeIcon icon={faGoogle} /></button>
              </div>
            </div>
          )}
          {activeTab === "signup" && (
            <div className="form">
              <h2>SIGNUP</h2>
              <p>Create your account by filling the form below!</p>
              <input type="text" className="form-control my-2" placeholder="Username" />
              <input type="email" className="form-control my-2" placeholder="Email" />
              <input type="password" className="form-control my-2" placeholder="Password" />
              <button className="btn btn-primary my-3" style={{ width: '100%', borderRadius: '25px' }}>Signup</button>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button className="btn btn-dark border-0 rounded-circle"><FontAwesomeIcon icon={faFacebook} /></button>
                <button className="btn btn-dark border-0 rounded-circle"><FontAwesomeIcon icon={faTwitter} /></button>
                <button className="btn btn-dark border-0 rounded-circle"><FontAwesomeIcon icon={faGoogle} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;