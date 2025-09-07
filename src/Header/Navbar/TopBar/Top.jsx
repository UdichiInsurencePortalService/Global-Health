import React from "react";
import "../../Navbar/Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Top = () => {
  return (
    // Hide on mobile/tablet (< 992px), show on desktop/laptop (>= 992px)
    <div className="topbar-wrapper d-none d-lg-block">
      <div className="container-fluid px-3 px-lg-4">
        <div className="row align-items-center justify-content-between py-2">
          {/* Left Links */}
          <div className="col-lg-6">
            <ul className="top-links mb-0" style={{ 
              display: "flex", 
              gap: "20px", 
              listStyle: "none", 
              padding: 0, 
              margin: 0,
              flexWrap: "wrap" 
            }}>
              <li>
                <Link 
                  to="/aboutus" 
                  className="text-white text-decoration-none hover-link"
                  style={{ 
                    fontSize: "14px",
                    transition: "opacity 0.3s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                  onMouseLeave={(e) => e.target.style.opacity = "1"}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/Blog" 
                  className="text-white text-decoration-none hover-link"
                  style={{ 
                    fontSize: "14px",
                    transition: "opacity 0.3s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                  onMouseLeave={(e) => e.target.style.opacity = "1"}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-white text-decoration-none hover-link"
                  style={{ 
                    fontSize: "14px",
                    transition: "opacity 0.3s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                  onMouseLeave={(e) => e.target.style.opacity = "1"}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Contact */}
          <div className="col-lg-6">
            <ul className="top-contact mb-0" style={{ 
              display: "flex", 
              gap: "25px", 
              listStyle: "none", 
              padding: 0, 
              margin: 0,
              justifyContent: "flex-end",
              alignItems: "center",
              flexWrap: "wrap"
            }}>
              <li className="d-flex align-items-center" style={{ 
                color: "white",
                fontSize: "14px"
              }}>
                <FontAwesomeIcon 
                  icon={faPhone} 
                  className="me-2" 
                  style={{ fontSize: "12px" }}
                />
                <span>08069640455</span>
              </li>
              <li className="d-flex align-items-center" style={{ 
                color: "white",
                fontSize: "14px"
              }}>
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  className="me-2" 
                  style={{ fontSize: "12px" }}
                />
                <a 
                  href="mailto:info@globalhealthandalliedservices.com" 
                  className="text-white text-decoration-none"
                  style={{ 
                    transition: "opacity 0.3s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                  onMouseLeave={(e) => e.target.style.opacity = "1"}
                >
                  info@globalhealthandalliedservices.com
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