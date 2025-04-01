import React from 'react';
import '../../Navbar/Navbar.css';
import { Link } from 'react-router-dom';

const Top = () => {
  return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-5 col-12">
            <ul className="top-link" style={{ display: "flex", gap: "15px", listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <Link to="/Abouts" style={{ color: "white", textDecoration: "none" }}>About Us</Link>
              </li>
              <li>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Blogs</Link>
              </li>
              <li>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-6 col-md-7 col-12">
            <ul className="top-contact" style={{ display: "flex", gap: "15px", listStyle: "none", justifyContent: 'end', margin: 0, padding: 0 }}>
              <li style={{ color: "white" }}>
                <i className="fa fa-phone" style={{ marginRight: "5px" }}></i> 9205401500
              </li>
              <li style={{ color: "white" }}>
                <i className="fa fa-envelope" style={{ marginRight: "5px" }}></i>
                <Link to="mailto:globalhealth235@gmail.com" style={{ color: "white", textDecoration: "none" }}>globalhealth235@gmail.com</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
}

export default Top;
