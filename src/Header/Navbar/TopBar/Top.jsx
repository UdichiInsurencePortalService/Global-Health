import React from "react";
import "../../Navbar/Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Top = () => {
  return (
    <div className="topbar-wrapper">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          {/* Left Links */}
          <div className="col-md-6 col-12 mb-2 mb-md-0">
            <ul className="top-links" style={{ display: "flex", gap: "15px", listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <Link to="/aboutus" style={{ color: "white", textDecoration: "none" }}>About Us</Link>
              </li>
              <li>
                <Link to="/Blog" style={{ color: "white", textDecoration: "none" }}>Blogs</Link>
              </li>
              <li>
                <Link to="/faq" style={{ color: "white", textDecoration: "none" }}>FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Right Contact */}
          <div className="col-md-6 col-12 text-md-end d-flex justify-content-md-end align-items-center">
            <ul className="top-contact" style={{ display: "flex", gap: "15px", listStyle: "none", padding: 0, margin: 0, color: "white" }}>
              <li style={{ color: "white" }}>
                <FontAwesomeIcon icon={faPhone} /> 9205401500
              </li>
              <li style={{ color: "white" }}>
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                <a href="mailto:globalhealth235@gmail.com" style={{ color: "white", textDecoration: "none" }}>
                  globalhealth235@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
