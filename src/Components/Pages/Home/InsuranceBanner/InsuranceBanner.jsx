import React, { useState, useEffect } from "react";
import { Award, Calendar, MapPin, Users, Star, Sparkles } from "lucide-react";

const InsuranceBanner = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleBannerClick = () => {
    // Replace this URL with your actual awards page URL
    const awardsPageUrl = "/Award";
    
    // Open in same tab
    window.location.href = awardsPageUrl;
    
    // Or open in new tab (uncomment the line below and comment the line above)
    // window.open(awardsPageUrl, '_blank');
  }

  return (
    <>
      <div 
      className="banner-container"
      onClick={handleBannerClick}
      style={{ cursor: 'pointer' }}
      
    >
    <div className="banner-container">
      {/* Animated Background Elements */}
      <div className="floating-elements">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`floating-element element-${i + 1}`}>
            <Sparkles size={16} />
          </div>
        ))}
      </div>

      {/* Main Banner Content */}
      <div className="banner-content">
        {/* Left Section */}
        <div className="left-section">
          <div className="badge">
            <Award size={16} />
            <span>Premium Medical Awards</span>
          </div>

          <h1 className="main-title">
            Looking for
            <span className="highlight-text">Medical Excellence?</span>
          </h1>

          <p className="subtitle">
            Join us for the most prestigious medical award ceremony of the year
          </p>

          <div className="info-grid">
            <div className="info-item">
              <MapPin className="info-icon" />
              <div>
                <span className="info-label">Venue</span>
                <span className="info-value">President Complex, New Delhi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="image-container">
            <div className="doctor-image-placeholder">
              <div className="doctor-icon">
                <Award size={60} />
              </div>
            </div>
          </div>

          <button
            className={`cta-button ${isHovered ? "hovered" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="button-text">
              Dr. Bidhan Chandra Awards Click here
            </span>
            <div className="button-glow"></div>
            <Star className="button-icon" />
          </button>
        </div>
      </div>

      {/* Bottom Association */}
      <div className="association-bar">
        <div className="organizer-info">
          <Users size={18} />
          <span>
            Global Health and Allied Insurance Service In Association with
            Udichi Group of Companies
          </span>
        </div>
        <div className="association-stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="star" />
          ))}
        </div>
      </div>

      <style jsx>{`
        .banner-container {
          position: relative;
          width: 100%;
          min-height: 500px;
          background: linear-gradient(223deg, #4d9fc5 0%, #0066cc 100%);
          // border-radius: 20px;
          overflow: hidden;
          box-shadow: rgb(245, 250, 255);
          margin: 0 auto;
          max-width: 1400px;
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-element {
          position: absolute;
          color: rgba(255, 255, 255, 0.2);
          animation: float 6s ease-in-out infinite;
        }

        .element-1 {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }
        .element-2 {
          top: 20%;
          right: 15%;
          animation-delay: 1s;
        }
        .element-3 {
          top: 60%;
          left: 5%;
          animation-delay: 2s;
        }
        .element-4 {
          top: 80%;
          right: 20%;
          animation-delay: 3s;
        }
        .element-5 {
          top: 40%;
          left: 20%;
          animation-delay: 4s;
        }
        .element-6 {
          top: 30%;
          right: 10%;
          animation-delay: 5s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }

        .banner-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 40px;
          align-items: center;
          min-height: 420px;
        }

        .left-section {
          z-index: 2;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 50px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .main-title {
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800;
          color: white;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .highlight-text {
          display: block;
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .highlight-text::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          border-radius: 2px;
        }

        .subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: clamp(14px, 2vw, 18px);
          margin-bottom: 30px;
          line-height: 1.5;
        }

        .info-grid {
          display: grid;
          gap: 20px;
          margin-bottom: 25px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 15px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 15px;
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .info-icon {
          color: #ffd700;
          background: rgba(255, 215, 0, 0.2);
          padding: 8px;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .info-label {
          display: block;
          color: rgba(255, 255, 255, 0.7);
          font-size: clamp(10px, 1.5vw, 12px);
          font-weight: 500;
        }

        .info-value {
          display: block;
          color: white;
          font-size: clamp(12px, 2vw, 16px);
          font-weight: 700;
        }

        .right-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          z-index: 2;
        }

        .image-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .doctor-image-placeholder {
          width: 150px;
          height: 150px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.2);
          animation: float-image 3s ease-in-out infinite;
        }

        .doctor-icon {
          color: #ffd700;
        }

        @keyframes float-image {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .cta-button {
          position: relative;
          background: linear-gradient(135deg, #ff6b6b, #ff8e53);
          color: white;
          border: none;
          padding: clamp(12px, 2vw, 18px) clamp(20px, 4vw, 35px);
          border-radius: 50px;
          font-size: clamp(12px, 2vw, 16px);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
          transition: all 0.3s ease;
          overflow: hidden;
          white-space: nowrap;
          text-align: center;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(255, 107, 107, 0.6);
        }

        .button-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.5s ease;
        }

        .cta-button.hovered .button-glow {
          left: 100%;
        }

        .button-icon {
          animation: star-rotate 2s linear infinite;
          flex-shrink: 0;
        }

        @keyframes star-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .association-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgb(245, 250, 255);
          backdrop-filter: blur(10px);
          padding: 15px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: black;
          font-size: clamp(10px, 1.5vw, 14px);
          font-weight: 600;
        }

        .organizer-info {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .association-stars {
          display: flex;
          gap: 5px;
          flex-shrink: 0;
        }

        .star {
          color: blue;
          fill: blue;
          stroke: blue; /* optional */
          animation: star-twinkle 2s ease-in-out infinite;
        }

        .star:nth-child(2) {
          animation-delay: 0.2s;
        }
        .star:nth-child(3) {
          animation-delay: 0.4s;
        }
        .star:nth-child(4) {
          animation-delay: 0.6s;
        }
        .star:nth-child(5) {
          animation-delay: 0.8s;
        }

        @keyframes star-twinkle {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        /* Responsive Design - Tablet */
        @media (max-width: 1024px) {
          .banner-container {
            margin: 0 20px;
            border-radius: 15px;
          }

          .banner-content {
            gap: 30px;
            padding: 30px;
          }

          .doctor-image-placeholder {
            width: 120px;
            height: 120px;
          }
        }

        /* Responsive Design - Mobile */
        @media (max-width: 768px) {
          .banner-container {
            margin: 0 10px;
            border-radius: 15px;
            min-height: auto;
          }

          .banner-content {
            grid-template-columns: 1fr;
            gap: 25px;
            padding: 25px 20px;
            text-align: center;
            min-height: auto;
          }

          .left-section {
            order: 1;
          }

          .right-section {
            order: 2;
            gap: 20px;
          }

          .main-title {
            font-size: clamp(22px, 6vw, 32px);
            margin-bottom: 12px;
          }

          .subtitle {
            font-size: clamp(12px, 3vw, 16px);
            margin-bottom: 20px;
          }

          .info-item {
            padding: 12px;
            gap: 12px;
          }

          .doctor-image-placeholder {
            width: 100px;
            height: 100px;
          }

          .doctor-icon svg {
            width: 40px;
            height: 40px;
          }

          .cta-button {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }

          .button-text {
            font-size: clamp(11px, 2.5vw, 14px);
          }

          .association-bar {
            position: relative;
            flex-direction: column;
            gap: 10px;
            text-align: center;
            padding: 15px 20px;
          }

          .organizer-info {
            justify-content: center;
            text-align: center;
          }

          .organizer-info span {
            font-size: clamp(9px, 2vw, 12px);
          }
        }

        /* Extra Small Mobile */
        @media (max-width: 480px) {
          .banner-container {
            margin: 0 5px;
            border-radius: 12px;
          }

          .banner-content {
            padding: 20px 15px;
            gap: 20px;
          }

          .badge {
            padding: 6px 12px;
            font-size: 12px;
            margin-bottom: 15px;
          }

          .badge svg {
            width: 14px;
            height: 14px;
          }

          .main-title {
            font-size: clamp(18px, 7vw, 28px);
            margin-bottom: 10px;
          }

          .subtitle {
            font-size: clamp(11px, 3.5vw, 14px);
            margin-bottom: 15px;
          }

          .info-item {
            padding: 10px;
            gap: 10px;
          }

          .info-icon {
            padding: 6px;
          }

          .info-icon svg {
            width: 16px;
            height: 16px;
          }

          .doctor-image-placeholder {
            width: 80px;
            height: 80px;
            border-radius: 15px;
          }

          .doctor-icon svg {
            width: 32px;
            height: 32px;
          }

          .cta-button {
            padding: 12px 20px;
            font-size: 11px;
            max-width: 260px;
          }

          .button-icon svg {
            width: 14px;
            height: 14px;
          }

          .association-bar {
            padding: 12px 15px;
          }

          .organizer-info svg {
            width: 14px;
            height: 14px;
          }

          .association-stars .star svg {
            width: 10px;
            height: 10px;
          }

          .floating-element svg {
            width: 12px;
            height: 12px;
          }
        }

        /* Ultra Small Screens */
        @media (max-width: 360px) {
          .banner-content {
            padding: 15px 10px;
          }

          .main-title {
            font-size: clamp(16px, 8vw, 24px);
          }

          .cta-button {
            padding: 10px 15px;
            font-size: 10px;
            max-width: 240px;
          }

          .button-text {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
    </div>
    </>

  );
};

export default InsuranceBanner;
