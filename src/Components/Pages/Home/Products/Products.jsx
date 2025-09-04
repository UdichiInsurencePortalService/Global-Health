import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Product.css";
import img1 from "../../../../assets/reuseimage/money.png";
import img2 from "../../../../assets/reuseimage/guide.png";
import img3 from "../../../../assets/reuseimage/agreement.png";
import img4 from "../../../../assets/reuseimage/claim (1).png";
import img5 from "../../../../assets/reuseimage/24-hours-support.png";

const Products = () => {
  const features = [
    {
      img: img1,
      title: "Affordable Plans",
      description:
        "One of the best prices in the market, guaranteed by Global Health and Allied Insurance.",
    },
    {
      img: img2,
      title: "Honest Guidance",
      description: "Unbiased advice that always puts our customers first.",
    },
    {
      img: img3,
      title: "Trusted & Regulated",
      description: "100% reliable and fully regulated by IRDAI.",
    },
    {
      img: img4,
      title: "Easy Claim Process",
      description: "Claims support made stress-free and simple.",
    },
  ];

  const carouselStyles = `
    .products-swiper {
      width: 100%;
      padding: 20px 0;
    }
    
    .products-swiper-slide {
      background-position: center;
      background-size: cover;
      width: 320px;
      height: auto;
    }
    
    .products-swiper .swiper-slide {
      transition: transform 0.3s ease;
    }
    
    .products-swiper .swiper-slide-active {
      transform: scale(1.05);
    }
    
    .products-swiper .swiper-3d .swiper-slide-shadow-left,
    .products-swiper .swiper-3d .swiper-slide-shadow-right {
      background: none;
    }
    
    .feature-card {
      background: linear-gradient(145deg, #ffffff, #f8f9fa);
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .feature-card img {
      width: 80px;
      height: 80px;
      object-fit: contain;
      margin-bottom: 1.5rem;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
    }
    
    .feature-card h5 {
      font-size: 1.4rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 1rem;
      line-height: 1.3;
    }
    
    .feature-card p {
      font-size: 0.95rem;
      color: #6c757d;
      line-height: 1.5;
      margin: 0;
    }
    
    .carousel-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      position: relative;
    }
    
    .advantage-badge {
      position: absolute;
      top: 1.5rem;
      left: 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 14px;
      font-size: 0.9rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      z-index: 10;
    }
    
    .sparkle-icon {
      width: 16px;
      height: 16px;
      fill: #ffd700;
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 2rem;
      padding-top: 3rem;
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      opacity: 0.9;
    }
    
    .section-subtitle {
      font-size: 1.1rem;
      color: #6c757d;
      margin: 0;
    }
    
    .swiper-pagination-bullet {
      background: #667eea;
      opacity: 0.5;
    }
    
    .swiper-pagination-bullet-active {
      background: #667eea;
      opacity: 1;
    }
    
    .swiper-button-next,
    .swiper-button-prev {
      display: none;
    }
    
    @media (max-width: 768px) {
      .carousel-container {
        margin: 1rem;
        padding: 1rem;
      }
      
      .section-title {
        font-size: 2rem;
      }
      
      .feature-card {
        height: 280px;
        padding: 1.5rem;
      }
      
      .products-swiper-slide {
        width: 280px;
      }
    }
  `;

  return (
    <div className="PBAdvantage-section">
      <style>{carouselStyles}</style>
      
      <div className="carousel-container">
        
        
        <div className="section-header">
          <h1 className="section-title">Global Health Advantage</h1>
        </div>

        <Swiper
          className="products-swiper"
          spaceBetween={30}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {features.map((feature, idx) => (
            <SwiperSlide key={idx} className="products-swiper-slide">
              <div className="feature-card">
                <img src={feature.img} alt={feature.title} />
                <h5>{feature.title}</h5>
                <p>{feature.description}</p>
              </div>
            </SwiperSlide>
          ))}
          
          {/* Duplicate slides for better loop effect */}
          {features.map((feature, idx) => (
            <SwiperSlide key={`duplicate-${idx}`} className="products-swiper-slide">
              <div className="feature-card">
                <img src={feature.img} alt={feature.title} />
                <h5>{feature.title}</h5>
                <p>{feature.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Products;