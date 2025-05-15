import React from "react";
import "./Abouts.css";
import about from "../assets/aboutusimges/about.png";
import mission from "../assets/aboutusimges/ourmision.png";
import vision from "../assets/aboutusimges/ourvision.png";

const Abouts = () => {
  return (
    <div className="about-section">
      <div className="container">
        <div className="row">
          {/* About Us Section */}
          <div className="col-md-6 card card-hover shadow-lg shadow-sm p-4 text-center d-flex flex-column align-items-center">
            <h1>About Us</h1>
            <p>
              Global Health and Allied Non-Life Insurance Services is a global
              leader in providing affordable and comprehensive health and
              non-life insurance solutions. With offices strategically located
              in Muscat, Mauritius, Toronto, Texas, London, Paris, and Mumbai,
              we are dedicated to offering the most competitive premiums in the
              market, ensuring that individuals, families, and businesses across
              the world have access to the protection they need without breaking
              the bank.
            </p>
            <p>
              We specialize in delivering high-quality insurance coverage in
              health, travel, home, auto, and business sectors, all at the
              lowest possible premiums globally. Our goal is to make insurance
              accessible and affordable, ensuring peace of mind to people from
              all walks of life, no matter where they are located.
            </p>
          </div>
          <div className="col-md-6">
            <img src={about} alt="About Us Image" className="img-fluid" />
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="vision-mission-section mt-5">
          <div className="row">
            {/* Vision Card */}
            <div className="col-md-6">
              <div className="vision-card card shadow-lg text-center p-4 card-hover shadow-sm d-flex flex-column h-100">
                <h1>Our Vision</h1>
                <img src={vision} alt="Our Vision Image" className="img-fluid" />
                <p>
                  To become the world’s most trusted and affordable provider of
                  health and non-life insurance, offering the most competitive
                  premiums worldwide while ensuring optimal coverage for all
                  clients.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="col-md-6">
              <div className="mission-card card shadow-lg text-center p-4 card-hover shadow-sm d-flex flex-column h-100">
                <h1>Our Mission</h1>
                <img src={mission} alt="Our Mission Image" className="img-fluid" />
                <p>
                  Global Health and Allied Non-Life Insurance Services offers a
                  diverse range of affordable products, including:
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Abouts;
