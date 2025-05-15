import {
  FaFacebookSquare,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import { AiFillCaretRight } from "react-icons/ai";
import "./Footer.css";
// import { Link } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ Use Link from react-router-dom (not lucide-react!)


const Footer = () => {

  const Links1 = [
    {
      label: "Car Insurance",
      path: "/carinsurance",
    },
    {
      label: "Health Insurance",
      path: "/Healthinsurance",
    },
    {
      label: "Auto Insurance",
      path: "/Autoinsurance",
    },
    {
      label: "Home Insurance",
      path: "/Homeinsurance",
    },
    {
      label:"Bike Insurance",
      path: "/Bikeinsurance",
    }
  ]

  const Links = [
    {
      label: "FAQ",
      path: "/faq",
    },
    {
      label: "company-information",
      path: "/companyinfo",
    },
    {
      label: "terms-condition",
      path: "/termcondition",
    },
    {
      label: "Customer support",
      path: "/support",
    },
  ];

  return (
    <div className="container-fluid p-0">
      <footer className="text-white text-center text-lg-start p-4 footer-section">
        <div className="container py-4">
          <div className="row">
            {/* Logo Section */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="d-flex justify-content-center">
                <div
                  className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                  style={{ width: "150px", height: "150px" }}
                >
                  <img
                    width={134}
                    src={logo}
                    alt="Global Health & Allied Insurances"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="text-center mt-3">Protect What Matters Most</p>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <a href="#!" className="text-white fs-4">
                  <FaFacebookSquare />
                </a>
                <a href="#!" className="text-white fs-4">
                  <FaInstagram />
                </a>
                <a href="#!" className="text-white fs-4">
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* Products Section */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="text-uppercase mb-4">Products</h5>
              <ul className="list-unstyled">
                {Links1.map(({label, path}) =>(
                  <li >
                    <Link 
                    to={path}
                    className="text-white d-flex align-item-center">
                      <AiFillCaretRight className="me-2" /> {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful Links Section */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="text-uppercase mb-4">Useful Links</h5>
              <ul className="list-unstyled">
                {Links.map(({ label, path }) => (
                  <li key={label} className="mb-2">
                    <Link
                      to={path}
                      className="text-white d-flex align-item-center"
                    >
                      <AiFillCaretRight className="me-2" /> {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="text-uppercase mb-4">Contact</h5>
              <ul className="list-unstyled">
                <li>
                  <p className="d-flex align-items-center">
                    <FaMapMarkerAlt className="me-2" style={{width:"2rem", height:"3rem"}} /> Muscat Office: P.O. Box 556. Postal code No. 103. Muscat, Sultanate of Oman;
                  </p>
                </li>
               
                <li>
                  <p className="d-flex align-items-center">
                    <FaPhone className="me-2" /> +91 9818152403
                  </p>
                </li>
                <li>
                  <p className="d-flex align-items-center">
                    <FaEnvelope className="me-2" /> globalhealth235@gmail.com
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center p-3">
          © 2025 Copyright:
          <a className="text-white ms-1" href="#">
            {" "}
            Global Health & Allied Insurance.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
