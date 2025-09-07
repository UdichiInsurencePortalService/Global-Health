import React, { useState, useEffect } from "react";
import { CheckCircle, Smartphone, FileText, UserCheck, Award, Phone, Mail, MessageSquare } from "lucide-react";

// NeedHelp component
const NeedHelp = ({ heading, paragraph, head, contact }) => (
  <section className="need-help-section">
    <div className="container">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{heading}</h2>
        <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">{paragraph}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {contact.map((item, index) => (
          <div key={index} className="contact-card group">
            <div className="contact-icon-wrapper">
              {index === 0 && <MessageSquare size={32} />}
              {index === 1 && <Mail size={32} />}
              {index === 2 && <Phone size={32} />}
            </div>
            <h5 className="contact-type">{head[index]}</h5>
            <p className="contact-info">
              {item.cont || item.conta || item.conatac}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Claimprocess = () => {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const stepdata = [
    {
      head: "Download App",
      desc: "Download the Global Health App using the QR code or click the File Motor Claim button. Login and navigate to the File Motor Claim page to start your journey.",
      icon: <Smartphone size={32} />,
      color: "from-blue-500 to-purple-600"
    },
    {
      head: "Fill Details", 
      desc: "Provide comprehensive information about the accident and damages. Our intuitive form guides you through each required field.",
      icon: <FileText size={32} />,
      color: "from-green-500 to-teal-600"
    },
    {
      head: "Submit Claim",
      desc: "Update your personal details and click Register Claim. You'll receive confirmation and next steps via email and WhatsApp instantly.",
      icon: <UserCheck size={32} />,
      color: "from-orange-500 to-red-600"
    },
    {
      head: "Complete!",
      desc: "Your claim is successfully registered! Track your claim status and receive updates through our seamless digital platform.",
      icon: <Award size={32} />,
      color: "from-purple-500 to-pink-600"
    },
  ];

  useEffect(() => {
    // Animate hero section
    const heroTimer = setTimeout(() => setIsHeroVisible(true), 300);

    // Animate steps with staggered timing
    stepdata.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSteps(prev => [...prev, index]);
      }, 800 + (index * 300));
    });

    // Auto-cycle active step
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % stepdata.length);
    }, 3000);

    return () => {
      clearTimeout(heroTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .hero-section {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
          animation: gradient-shift 10s ease-in-out infinite;
        }

        @keyframes gradient-shift {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .floating-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .floating-shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 20s infinite linear;
        }

        .floating-shape:nth-child(1) {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-shape:nth-child(2) {
          width: 60px;
          height: 60px;
          top: 60%;
          left: 80%;
          animation-delay: -5s;
        }

        .floating-shape:nth-child(3) {
          width: 100px;
          height: 100px;
          top: 40%;
          left: 70%;
          animation-delay: -10s;
        }

        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(20px) rotate(240deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          transform: ${isHeroVisible ? 'translateY(0)' : 'translateY(50px)'};
          opacity: ${isHeroVisible ? '1' : '0'};
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .main-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
          background: linear-gradient(45deg, #fff, #f0f8ff, #e6e6fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }

        .sub-title {
          font-size: clamp(1.1rem, 2.5vw, 1.3rem);
          margin-bottom: 3rem;
          opacity: 0.95;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .cta-button {
          background: linear-gradient(135deg, #ff6b6b, #ee5a24);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .cta-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 40px rgba(255, 107, 107, 0.6);
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .steps-section {
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 6rem 0;
          position: relative;
        }

        .steps-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .steps-main-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #2d3748, #4a5568);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .steps-subtitle {
          font-size: 1.2rem;
          color: #64748b;
          font-weight: 500;
        }

        .steps-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .step-card {
          background: white;
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          height: fit-content;
          border: 2px solid transparent;
        }

        .step-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, var(--step-color), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .step-card:hover::before {
          opacity: 1;
        }

        .step-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          border-color: rgba(102, 126, 234, 0.2);
        }

        .step-number {
          position: absolute;
          top: -12px;
          right: -12px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .step-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          margin: 0 auto 1.5rem;
          transition: all 0.3s ease;
        }

        .step-card:hover .step-icon-container {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .step-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 1rem;
          text-align: center;
        }

        .step-description {
          color: #64748b;
          line-height: 1.7;
          text-align: center;
          font-size: 1rem;
        }

        .step-check {
          display: flex;
          justify-content: center;
          margin-top: 1.5rem;
          opacity: 0;
          animation: checkAppear 0.5s ease forwards;
        }

        @keyframes checkAppear {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }

        .need-help-section {
          background: linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #4a5568 100%);
          padding: 6rem 0;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .need-help-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.05)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.05)"/></svg>') repeat;
          animation: drift 25s infinite linear;
        }

        @keyframes drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-100px, -100px); }
        }

        .contact-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .contact-card:hover::before {
          opacity: 1;
        }

        .contact-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .contact-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          margin: 0 auto 1.5rem;
          transition: all 0.3s ease;
        }

        .contact-card:hover .contact-icon-wrapper {
          transform: scale(1.1);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .contact-type {
          font-size: 1.3rem;
          font-weight: 600;
          color: #60a5fa;
          margin-bottom: 1rem;
        }

        .contact-info {
          font-size: 0.95rem;
          line-height: 1.6;
          opacity: 0.9;
        }

        .cta-section {
          text-align: center;
          margin-top: 4rem;
          opacity: 0;
          animation: fadeInUp 1s ease forwards 2s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cta-section h3 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #1a202c;
        }

        /* Step animations */
        ${stepdata.map((_, index) => `
          .step-card:nth-child(${index + 1}) {
            transform: ${visibleSteps.includes(index) ? 'translateY(0)' : 'translateY(100px)'};
            opacity: ${visibleSteps.includes(index) ? '1' : '0'};
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s;
          }
        `).join('')}

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-section {
            min-height: 80vh;
            padding: 2rem 0;
          }

          .steps-section {
            padding: 4rem 0;
          }

          .need-help-section {
            padding: 4rem 0;
          }

          .steps-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .step-card {
            padding: 1.5rem;
          }

          .contact-card {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 0.75rem;
          }

          .step-card {
            padding: 1.25rem;
          }

          .step-number {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .step-icon-container {
            width: 60px;
            height: 60px;
          }
        }

        /* Grid utilities */
        .grid {
          display: grid;
        }

        .grid-cols-1 {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }

        @media (min-width: 768px) {
          .md\\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        .gap-8 {
          gap: 2rem;
        }

        .text-center {
          text-align: center;
        }

        .mb-16 {
          margin-bottom: 4rem;
        }

        .mb-6 {
          margin-bottom: 1.5rem;
        }

        .text-4xl {
          font-size: 2.25rem;
          line-height: 2.5rem;
        }

        @media (min-width: 768px) {
          .md\\:text-5xl {
            font-size: 3rem;
            line-height: 1;
          }
        }

        .font-bold {
          font-weight: 700;
        }

        .text-white {
          color: white;
        }

        .text-xl {
          font-size: 1.25rem;
          line-height: 1.75rem;
        }

        .text-blue-100 {
          color: #dbeafe;
        }

        .max-w-4xl {
          max-width: 56rem;
        }

        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }

        .leading-relaxed {
          line-height: 1.625;
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="floating-shapes">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="main-title">
              File Global Motor Claims Online in Simple Steps
            </h1>
            <p className="sub-title">
              Follow our streamlined digital process to file your motor claims instantly. 
              Experience hassle-free claim processing with real-time updates and expert support.
            </p>
            <button className="cta-button">
              Start Your Claim Journey
            </button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <div className="container">
          <div className="steps-header">
            <h2 className="steps-main-title">How It Works</h2>
            <p className="steps-subtitle">Complete your claim in just 4 simple steps</p>
          </div>
          
          <div className="steps-container">
            {stepdata.map((item, index) => (
              <div 
                key={index}
                className="step-card"
                style={{
                  '--step-color': `var(--gradient-${index})`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="step-number">
                  {index + 1}
                </div>
                <div className="step-icon-container">
                  {item.icon}
                </div>
                <h3 className="step-title">{item.head}</h3>
                <p className="step-description">{item.desc}</p>
                {visibleSteps.includes(index) && (
                  <div className="step-check" style={{ animationDelay: `${index * 0.2 + 1}s` }}>
                    <CheckCircle color="#10b981" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="cta-section">
            <h3>Ready to get started?</h3>
            <button className="cta-button">
              File Your Claim Now
            </button>
          </div>
        </div>
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