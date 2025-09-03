import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { CheckCircle, Smartphone, FileText, UserCheck, Award } from "lucide-react";
import "./Claimprocess.css";

// Mock NeedHelp component for demonstration
const NeedHelp = ({ heading, paragraph, head, contact }) => (
  <section className="need-help-section">
    <Container>
      <Row className="justify-content-center">
        <Col lg={8} className="text-center">
          <h2 className="need-help-title">{heading}</h2>
          <p className="need-help-desc">{paragraph}</p>
          <Row className="contact-cards">
            {contact.map((item, index) => (
              <Col md={4} key={index} className="mb-3">
                <Card className="contact-card h-100 border-0 shadow-sm">
                  <Card.Body className="text-center">
                    <h5 className="contact-type">{head[index]}</h5>
                    <p className="contact-info">
                      {item.cont || item.conta || item.conatac}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

const Claimprocess = () => {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  const stepdata = [
    {
      head: "Step 1",
      desc: "Download the Global Health App using the QR code above or by clicking on the File Motor Claim button. Login and you'll be directed to the File Motor Claim page. Click on the policy card to start claim filing.",
      icon: <Smartphone className="step-icon" />,
      color: "primary"
    },
    {
      head: "Step 2", 
      desc: "Fill all the details related to the accident and damages.",
      icon: <FileText className="step-icon" />,
      color: "success"
    },
    {
      head: "Step 3",
      desc: "Update your personal details and click on the Register Claim button. That's it, your claim is successfully filed and you will receive the next steps on your email & whatsapp.",
      icon: <UserCheck className="step-icon" />,
      color: "warning"
    },
    {
      head: "Step 4",
      desc: "That's It! Your claim has been registered, it's that simple with the Global Health App.",
      icon: <Award className="step-icon" />,
      color: "info"
    },
  ];

  useEffect(() => {
    // Animate hero section on mount
    setTimeout(() => setIsHeroVisible(true), 300);

    // Animate steps with staggered timing
    stepdata.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSteps(prev => [...prev, index]);
      }, 800 + (index * 200));
    });
  }, []);

  return (
    <>
      <style jsx>{`
        .claimprocess-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }

        .claimprocess-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
          animation: float 20s infinite linear;
        }

        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-100px) translateX(-50px); }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          transform: ${isHeroVisible ? 'translateY(0)' : 'translateY(50px)'};
          opacity: ${isHeroVisible ? '1' : '0'};
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .main-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          background: linear-gradient(45deg, #fff, #f0f8ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .sub-title {
          font-size: 1.3rem;
          margin-bottom: 3rem;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .steps-section {
          background: #f8f9fa;
          padding: 100px 0;
          position: relative;
        }

        .steps-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .steps-main-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .step-card {
          margin-bottom: 2rem;
          transform: ${visibleSteps.length > 0 ? 'translateY(0)' : 'translateY(100px)'};
          opacity: ${visibleSteps.length > 0 ? '1' : '0'};
        }

        .step-card:nth-child(1) {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }
        .step-card:nth-child(2) {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;
        }
        .step-card:nth-child(3) {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s;
        }
        .step-card:nth-child(4) {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s;
        }

        .custom-card {
          border: none;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: white;
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        .custom-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          transition: left 0.6s;
        }

        .custom-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .custom-card:hover::before {
          left: 100%;
        }

        .step-number {
          position: absolute;
          top: -15px;
          right: -15px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .step-icon-container {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .step-icon {
          width: 60px;
          height: 60px;
          padding: 15px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          transition: all 0.3s ease;
        }

        .custom-card:hover .step-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .step-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 1rem;
          text-align: center;
        }

        .step-description {
          color: #6c757d;
          line-height: 1.6;
          text-align: center;
          font-size: 1rem;
        }

        .progress-bar-container {
          display: none;
        }

        @media (min-width: 992px) {
          .progress-bar-container {
            display: block;
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 4px;
            background: #e9ecef;
            z-index: 1;
          }

          .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            width: 0%;
            transition: width 2s ease-in-out 1s;
          }

          .progress-bar.animate {
            width: 100%;
          }
        }

        .need-help-section {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          padding: 80px 0;
          color: white;
        }

        .need-help-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .need-help-desc {
          font-size: 1.1rem;
          margin-bottom: 3rem;
          opacity: 0.9;
        }

        .contact-card {
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.2);
        }

        .contact-type {
          font-weight: 600;
          color: #3498db;
          margin-bottom: 1rem;
        }

        .contact-info {
          margin: 0;
          font-size: 0.95rem;
        }

        .cta-button {
          background: linear-gradient(135deg, #3498db, #2980b9);
          border: none;
          padding: 15px 30px;
          border-radius: 50px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
          background: linear-gradient(135deg, #2980b9, #3498db);
        }

        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .main-title {
            font-size: 2.5rem;
          }
          
          .claimprocess-section {
            padding: 60px 0;
          }
          
          .steps-section {
            padding: 60px 0;
          }
          
          .need-help-section {
            padding: 60px 0;
          }
          
          .step-card {
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 576px) {
          .main-title {
            font-size: 2rem;
          }
          
          .sub-title {
            font-size: 1.1rem;
          }
          
          .steps-main-title {
            font-size: 2rem;
          }
        }

        /* Animation keyframes */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>

      {/* Hero Section */}
      <section className="claimprocess-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="hero-content">
                <h1 className="main-title">
                  File Global Motor Claims Online in Simple Steps
                </h1>
                <p className="sub-title">
                  Follow the steps given below to file your motor claims instantly with our streamlined digital process.
                </p>
                <Button className="cta-button animate-pulse">
                  Start Your Claim Now
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="steps-header fade-in-up">
                <h2 className="steps-main-title">How It Works</h2>
                <p className="text-muted">Complete your claim in just 4 simple steps</p>
              </div>
            </Col>
          </Row>
          
          <div className="position-relative">
            <div className="progress-bar-container">
              <div className={`progress-bar ${visibleSteps.length > 0 ? 'animate' : ''}`}></div>
            </div>
            
            <Row className="justify-content-center">
              {stepdata.map((item, index) => (
                <Col 
                  lg={3} 
                  md={6} 
                  sm={12} 
                  key={index}
                  className="step-card"
                  style={{
                    transform: visibleSteps.includes(index) ? 'translateY(0)' : 'translateY(100px)',
                    opacity: visibleSteps.includes(index) ? '1' : '0',
                    transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`
                  }}
                >
                  <Card className="custom-card">
                    <div 
                      className={`step-number bg-${item.color}`}
                    >
                      {index + 1}
                    </div>
                    <Card.Body className="p-4">
                      <div className="step-icon-container">
                        <div className="step-icon">
                          {item.icon}
                        </div>
                      </div>
                      <h5 className="step-title">{item.head}</h5>
                      <p className="step-description">{item.desc}</p>
                      <div className="text-center mt-3">
                        <CheckCircle 
                          className={`text-${item.color}`} 
                          size={24}
                          style={{
                            opacity: visibleSteps.includes(index) ? '1' : '0',
                            transition: `opacity 0.5s ease ${index * 0.2 + 1}s`
                          }}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <Row className="mt-5">
            <Col className="text-center">
              <div className="fade-in-up" style={{ animationDelay: '2s' }}>
                <h3 className="mb-3">Ready to get started?</h3>
                <Button size="lg" className="cta-button">
                  File Your Claim Now
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Need Help Section */}
      <NeedHelp
        heading="Need Help?"
        paragraph="Have queries related to Global Health motor insurance policy? You can refer to our Policy Wordings for detailed information or reach out to our support team via WhatsApp self-support, email or phone using the information below:"
        head={["WhatsApp", "Email", "Contact"]}
        contact={[
          {
            cont: "Connect with our self-serve chat bot support - 9818152403",
          },
          {
            conta: "Write to us at globalhealth@235@gmail.com",
          },
          {
            conatac: "Call us on 9818152403",
          },
        ]}
      />
    </>
  );
};

export default Claimprocess;