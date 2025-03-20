import React, { useState } from "react";
import "./News.css"; // Ensure the CSS file is properly linked
import life from "../../../../assets/Home/lifes.jpg";
import car from "../../../../assets/Home/1245.jpg";
import health from "../../../../assets/Home/health.jpg";
import crash from "../../../../assets/Home/crash-test.jpg";
import blog from "../../../../assets/Home/blog 2.jpg";
import blog1 from "../../../../assets/Home/blog1.jpg";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CarCategories = () => {
  const [activeTab, setActiveTab] = useState("News");

  const categories = {
    News: [
      {
        name: "On March 18, 2025, Canara HSBC Life Insurance Company Limited announced a strategic partnership with GIC Housing Finance Limited to provide enhanced financial security solutions to home loan customers.",
        img: life,
      },
      {
        name: "In April 2019, the Punjab government amended the Motor Vehicles Rules to mandate that vehicles involved in accidents resulting in death or injury would not be released without valid third-party insurance coverage.",
        img: car,
      },
      {
        name: "As of February 2025, investigations revealed fraudulent health insurance claims totaling ₹562.4 crore nationwide under the AB PM-JAY, with ₹74 crore originating from Punjab, Haryana, and Himachal Pradesh.",
        img: health,
      },
    ],
    Blog: [
      {
        name: "A tragic car crash on the busy streets of Punjab left multiple vehicles mangled, as authorities rushed to the scene to provide aid and investigate the cause of the collision.",
        img: crash,
      },
      {
        name: "Life is unpredictable, but the right life insurance policy ensures that your loved ones remain financially secure even in your absence, offering peace of mind and a legacy.",
        img: blog,
      },
      {
        name: "In today's fast-paced world, health insurance is no longer a luxury but a necessity. With rising medical costs and unexpected illnesses, having the right coverage ensures financial security.",
        img: blog1,
      },
    ],
  };

  return (
    <section className="news-section">
      <div className="container text-center">
        <div className="news-heading mb-4">
          <h2 className="text-center">News and Blog</h2>
        </div>
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
        <div className="tab-content mt-4">
          {Object.keys(categories).map((tab) => (
            <div key={tab} className={`tab-pane fade ${activeTab === tab ? "show active" : ""}`}>
              <div className="row justify-content-center">
                {categories[tab].map((item, index) => (
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
          ))}
        </div>
        <Link>
        <Button as={Link} to={'#'} className="buttons-news">View More</Button></Link>
      </div>
    </section>
  );
};

export default CarCategories;
