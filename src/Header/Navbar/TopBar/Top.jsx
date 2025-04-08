import React from "react";
import "../../Navbar/Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Top = () => {
  return (
    <div className="topbar-wrapper">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Links */}
          <div className="col-md-6 col-12 mb-2 mb-md-0">
            <ul className="top-links">
              <li><Link to="/aboutus">About Us</Link></li>
              <li><Link to="/">Blogs</Link></li>
              <li><Link to="/">FAQ</Link></li>
            </ul>
          </div>

          {/* Right Contact */}
          <div className="col-md-6 col-12 text-md-end" style={{display:'flex',justifyContent:'end',alignItems:"center"}}>
            <ul className="top-contact">
              <li>
                <FontAwesomeIcon icon={faPhone} /> 9205401500
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
                <Link to="mailto:globalhealth235@gmail.com">
                  globalhealth235@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
