import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Insurance from "./Insurance/Insurance";
import Choose from "./ChooseUs/Choose";
import Claim from "./ClaimsNow/Claim";
import News from "./Blog-News/News";
import Seprate from "./Seprate Insurance/Seprate";
import Newsletter from "./Newsletter/Newsletter";
import Benefit from '../Home/Benifit/Benifit';
import car from "../../../assets/Home/car.webp";
import Bike from "../../../assets/Home/Bike.webp";
import Life from "../../../assets/Home/Life.webp";
import Health from "../../../assets/Home/Health.webp";
import Travel from "../../../assets/Home/Travel.webp";
import { Link } from "react-router-dom";

const { Meta } = Card;

const Home = () => {
  const Data = [
    { src: car, text: "Car", p: "Safe driver discount",link:"/carinsurance" },
    { src: Bike, text: "Bike", p: "Insure in 1 minute" },
    { src: Life, text: "Life", p: "Flexible Coverage" },
    { src: Health, text: "Health", p: "100% bills covered" },
    { src: Travel, text: "Travel", p: "With Visa Include" },
  ];

  return (
    <>
      <section className="home-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center">
                Insure with Confidence, Live Without Worries.
              </h1>
              <p className="text-center pt-2">What would you like to insure?</p>
            </div>
          </div>
          <div className="row justify-content-center d-none d-md-flex">
            {Data.map((item, index) => (
              <div
                key={index}
                className="col-lg-2 col-md-2 col-sm-4 col-12 Home-insurance"
              >
              <Link to={item.link}>
                <Card hoverable cover={<img alt={item.text} src={item.src} />}>
                  <div className="d-flex align-items-center justify-content-between">
                    <Meta title={item.text} />
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="arrow-icon"
                    />
                  </div>
                </Card>
                </Link>
              </div>
            ))}
          </div>

          {/* Swiper for Tablets and Mobile */}
          <Swiper
            modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={1.5}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            pagination={{ clickable: true }}
            className="d-md-none mt-3"
          >
            {Data.map((item, index) => (
              <SwiperSlide key={index}>
                <Card hoverable cover={<img alt={item.text} src={item.src} />}>
                  <div className="d-flex align-items-center justify-content-between">
                    <Meta title={item.text} />
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="arrow-icon"
                    />
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Components */}
      <Seprate />
      <Benefit/>
      <Insurance />
      <Choose />
      <Claim />
      <News />
      <Newsletter />
    </>
  );
};

export default Home;
