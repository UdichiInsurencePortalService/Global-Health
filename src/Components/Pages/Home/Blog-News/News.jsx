import React, { useState, useMemo } from "react";
import "./News.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import assets
import life from "../../../../assets/Home/lifes.jpg";
import car from "../../../../assets/Home/1245.jpg";
import health from "../../../../assets/Home/health.jpg";
import crash from "../../../../assets/Home/crash-test.jpg";
import blog from "../../../../assets/Home/blog 2.jpg";
import blog1 from "../../../../assets/Home/blog1.jpg";

const CarCategories = () => {
  const [activeTab, setActiveTab] = useState("News");

  const categories = useMemo(
    () => ({
      News: [
        {
          name: "On March 18, 2025, Canara HSBC Life Insurance Company Limited announced a strategic partnership with GIC Housing Finance Limited...",
          img: life,
        },
        {
          name: "In April 2019, the Punjab government amended the Motor Vehicles Rules to mandate that vehicles involved in accidents...",
          img: car,
        },
        {
          name: "As of February 2025, investigations revealed fraudulent health insurance claims totaling ₹562.4 crore nationwide...",
          img: health,
        },
      ],
      Blog: [
        {
          name: "A tragic car crash on the busy streets of Punjab left multiple vehicles mangled...",
          img: crash,
        },
        {
          name: "Life is unpredictable, but the right life insurance policy ensures financial security...",
          img: blog,
        },
        {
          name: "In today's fast-paced world, health insurance is no longer a luxury but a necessity...",
          img: blog1,
        },
      ],
    }),
    []
  );

  return (
    <section className="news-section">
      <div className="container text-center">
        <h2 className="news-heading mb-4">News and Blog</h2>

        {/* Tabs */}
        <ul className="nav nav-tabs justify-content-center">
          {Object.keys(categories).map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        {/* Tab Content */}
        <div className="tab-content mt-4">
          <div className="row justify-content-center">
            {categories[activeTab].map((item, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                <div className="card shadow-sm">
                  <a className="car-content d-block text-center" href="#">
                    <img className="img-fluid card-img-top" src={item.img} alt={item.name} />
                    <div className="card-body">
                      <span className="d-block mb-2 pt-2">{item.name}</span>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View More Button */}
        <Button as={Link} to="#" className="buttons-news mt-3">
          View More
        </Button>
      </div>
    </section>
  );
};

export default CarCategories;
