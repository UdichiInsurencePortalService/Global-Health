import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  FileText, 
  Upload, 
  CheckCircle, 
  ArrowRight,
  Shield
} from "lucide-react";

const ClaimProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  const stepData = [
    {
      id: 1,
      head: "Visit Our Website",
      desc: "Navigate to our secure claims portal through our official website. Access the 'File Motor Claim' section with just one click.",
      icon: Globe,
      image: "🌐",
      color: "#4f46e5",
      bgColor: "#eef2ff"
    },
    {
      id: 2,
      head: "Fill Accident Details",
      desc: "Provide comprehensive information about the accident, including date, time, location, and damage description.",
      icon: FileText,
      image: "📋",
      color: "#7c3aed",
      bgColor: "#f3e8ff"
    },
    {
      id: 3,
      head: "Upload Documents",
      desc: "Upload required documents and verify your policy number. Our system will validate everything instantly.",
      icon: Upload,
      image: "📤",
      color: "#059669",
      bgColor: "#ecfdf5"
    },
    {
      id: 4,
      head: "Claim Registered",
      desc: "That's it! Your claim is successfully registered. Track your claim status in real-time through our portal.",
      icon: CheckCircle,
      image: "✅",
      color: "#dc2626",
      bgColor: "#fef2f2"
    }
  ];

  return (
    <div style={styles.claimProcessSection}>
      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.headerSection}>
          <motion.h1 
            style={styles.mainHeading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Motor Claims Online in Simple Steps
          </motion.h1>
          <motion.p 
            style={styles.subHeading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Follow these easy steps to file your motor claims instantly and track them in real-time
          </motion.p>
        </div>

        {/* Steps Container - Horizontal Layout */}
        <div style={styles.stepsWrapper}>
          <div style={styles.stepsContainer}>
            {stepData.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = activeStep === index;
              
              return (
                <React.Fragment key={item.id}>
                  <motion.div
                    style={styles.stepItem}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    <motion.div
                      style={{
                        ...styles.stepCard,
                        backgroundColor: item.bgColor,
                        borderColor: isActive ? item.color : '#e5e7eb'
                      }}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Step Number */}
                      <div 
                        style={{
                          ...styles.stepNumber,
                          backgroundColor: item.color
                        }}
                      >
                        {item.id}
                      </div>

                      {/* Icon Container */}
                      <div style={styles.iconContainer}>
                        <div
                          style={{
                            ...styles.iconWrapper,
                            backgroundColor: item.color + '15',
                            border: `2px solid ${item.color}25`
                          }}
                        >
                          <IconComponent size={32} color={item.color} />
                        </div>
                        <div style={styles.emojiIcon}>
                          {item.image}
                        </div>
                      </div>

                      {/* Content */}
                      <div style={styles.cardContent}>
                        <h3 style={{...styles.cardTitle, color: item.color}}>
                          {item.head}
                        </h3>
                        <p style={styles.cardText}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Arrow between steps */}
                  {index < stepData.length - 1 && (
                    <div style={styles.arrowContainer}>
                      <motion.div
                        style={styles.arrow}
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight size={24} color="#6b7280" />
                      </motion.div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Progress Indicator */}
        <div style={styles.progressSection}>
          <div style={styles.progressContainer}>
            <div style={styles.progressBar}>
              <motion.div 
                style={{
                  ...styles.progressFill,
                  width: `${((activeStep + 1) / 4) * 100}%`
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${((activeStep + 1) / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p style={styles.progressText}>
              Step {activeStep + 1} of 4
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          style={styles.ctaSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            style={styles.ctaButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Shield size={20} />
            Start Your Claim Process
          </motion.button>
          <p style={styles.ctaText}>
            Quick • Secure • Hassle-free
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const styles = {
  claimProcessSection: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    padding: '80px 0',
    fontFamily: "'Inter', 'Segoe UI', sans-serif"
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px'
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: '80px'
  },
  mainHeading: {
    fontSize: '3.2rem',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#1e293b',
    lineHeight: '1.2'
  },
  subHeading: {
    fontSize: '1.2rem',
    color: '#64748b',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  stepsWrapper: {
    marginBottom: '60px'
  },
  stepsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  stepItem: {
    flex: '1',
    minWidth: '280px',
    maxWidth: '320px'
  },
  stepCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px 24px',
    border: '2px solid #e5e7eb',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    height: '320px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  stepNumber: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: '14px'
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '24px'
  },
  iconWrapper: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emojiIcon: {
    fontSize: '2rem'
  },
  cardContent: {
    textAlign: 'center',
    flex: 1
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '16px',
    lineHeight: '1.3'
  },
  cardText: {
    fontSize: '0.95rem',
    lineHeight: '1.5',
    color: '#64748b',
    margin: 0
  },
  arrowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '40px'
  },
  arrow: {
    padding: '8px'
  },
  progressSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '60px'
  },
  progressContainer: {
    textAlign: 'center'
  },
  progressBar: {
    width: '300px',
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '12px'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
    borderRadius: '10px',
    transition: 'width 0.3s ease'
  },
  progressText: {
    fontSize: '0.9rem',
    color: '#64748b',
    margin: 0,
    fontWeight: '500'
  },
  ctaSection: {
    textAlign: 'center'
  },
  ctaButton: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)',
    transition: 'all 0.2s ease'
  },
  ctaText: {
    color: '#64748b',
    marginTop: '16px',
    fontSize: '1rem',
    margin: '16px 0 0 0'
  }
};

export default ClaimProcess;