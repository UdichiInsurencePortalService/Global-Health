import { FaFacebookSquare, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import logo from '../../assets/logo.png'
import { AiFillCaretRight } from "react-icons/ai";
import './Footer.css'


const Footer = () => {
  return (
    <div className="container-fluid p-0">
      <footer className="text-white text-center text-lg-start p-4 footer-section">
        <div className="container py-4">
          <div className="row">
            {/* Logo Section */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="d-flex justify-content-center">
                <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-lg" style={{ width: "150px", height: "150px" }}>
                  <img
                    src={logo}
                    height="120"
                    alt="Global Health & Allied Insurances"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="text-center mt-3">Protect What Matters Most</p>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <a href="#!" className="text-white fs-4"><FaFacebookSquare /></a>
                <a href="#!" className="text-white fs-4"><FaInstagram /></a>
                <a href="#!" className="text-white fs-4"><FaYoutube /></a>
              </div>
            </div>
            
            {/* Animals Section */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="text-uppercase mb-4">Products</h5>
              <ul className="list-unstyled">
                {["Car Insurance ", "Life Insurance ", "Health Insurance ", "Auto Insurance ", "Home Insurance ", "Commercial Insurance ", "Property Insurance"].map((item) => (
                  <li key={item} className="mb-2">
                    <a href="#!" className="text-white d-flex align-items-center">
                      <AiFillCaretRight className="me-2" /> {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shelter Info Section */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="text-uppercase mb-4">UseFull Links</h5>
              <ul className="list-unstyled">
                {["FAQ", "Company-Imformation", "Privacy-Policy", "Terms And  Condition", "Contact"].map((item) => (
                  <li key={item} className="mb-2">
                    <a href="#!" className="text-white d-flex align-items-center">
                      <AiFillCaretRight className="me-2" /> {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="text-uppercase mb-4">Contact</h5>
              <ul className="list-unstyled">
                <li><p className="d-flex align-items-center"><FaMapMarkerAlt className="me-2" /> Warsaw, 57 Street, Poland</p></li>
                <li><p className="d-flex align-items-center"><FaPhone className="me-2" /> +01 234 567 89</p></li>
                <li><p className="d-flex align-items-center"><FaEnvelope className="me-2" />globalheath235@gmail.com</p></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center p-3" copyright-section >
          © 2025 Copyright:
          <a className="text-white ms-1" href="#">Global Health& Allied Insurance.com</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
