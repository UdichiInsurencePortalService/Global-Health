import React, { useState, useEffect, useRef } from "react";
import "./News.css";

const News = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [expandedItems, setExpandedItems] = useState({
    general: "general-1",
    billing: "billing-1",
    claims: "claims-1",
    Bike: "claims-1",
    Health: "claims-1",
    Travel: "claims-1"
  });
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const tabsRef = useRef(null);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    
    // Scroll to center the active tab on mobile
    if (window.innerWidth <= 768 && tabsRef.current) {
      const tabsContainer = tabsRef.current;
      const activeTabElement = tabsContainer.querySelector(`.tab-button.active`);
      
      if (activeTabElement) {
        const containerWidth = tabsContainer.offsetWidth;
        const tabWidth = activeTabElement.offsetWidth;
        const tabLeft = activeTabElement.offsetLeft;
        
        // Calculate scroll position to center the tab
        tabsContainer.scrollLeft = tabLeft - (containerWidth / 2) + (tabWidth / 2);
      }
    }
  };

  const toggleAccordion = (category, itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [category]: prev[category] === itemId ? null : itemId,
    }));
  };
  
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    // Get tab categories as an array
    const categories = Object.keys(faqData);
    const currentIndex = categories.indexOf(activeTab);
    
    if (isLeftSwipe && currentIndex < categories.length - 1) {
      // Swipe left, go to next tab
      handleTabClick(categories[currentIndex + 1]);
    }
    
    if (isRightSwipe && currentIndex > 0) {
      // Swipe right, go to previous tab
      handleTabClick(categories[currentIndex - 1]);
    }
    
    // Reset
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  // On mount, scroll to active tab
  useEffect(() => {
    if (tabsRef.current) {
      const tabsContainer = tabsRef.current;
      const activeTabElement = tabsContainer.querySelector(`.tab-button.active`);
      
      if (activeTabElement && window.innerWidth <= 768) {
        setTimeout(() => {
          const containerWidth = tabsContainer.offsetWidth;
          const tabWidth = activeTabElement.offsetWidth;
          const tabLeft = activeTabElement.offsetLeft;
          
          tabsContainer.scrollLeft = tabLeft - (containerWidth / 2) + (tabWidth / 2);
        }, 300);
      }
    }
  }, []);

  const faqData = {
    general: [
      {
        id: "general-1",
        question: "What is Car Insurance?",
        answer:
          "Car Insurance, also known as auto or motor insurance, is a type of vehicle insurance policy that protects you and your car from any risks and damages caused by accidents, thefts, or natural disasters..",
      },
      {
        id: "general-2",
        question: "Can a duplicate policy be obtained??",
        answer:
          "Yes, please approach the same office which has issued the policy, with a written request . A nominal fee is charged for issuing duplicate policy copy..",
      },
      {
        id: "general-3",
        question: "Where can I renew my policy?",
        answer:
          "On Our website, enter car's registration number, and click on 'View Prices'.And Take Your Insurance.",
      },
    ],
    billing: [
      {
        id: "billing-1",
        question: "What is life insurance?",
        answer:
            "Life insurance is a contract between you and an insurer that provides financial support to your beneficiaries after your passing."
      },
      {
        id: "billing-2",
        question: "Why do I need life insurance?",
        answer:
          "It ensures your loved ones are financially secure in case of unforeseen events"
      },
      {
        id: "billing-3",
        question: "How do my beneficiaries claim life insurance?",
        answer:
          "They must file a claim with the insurer, submit necessary documents, and wait for approval."
      },
    ],
    claims: [
      { 
        id: "claims-1",
        question: "How do I file a claim?",
        answer:
          "You can file a claim online through our customer portal, via our mobile app, or by calling our 24/7 claims hotline. We recommend reporting claims as soon as possible after an incident.",
      },
      {
        id: "claims-2",
        question: "What documents do I need to submit with my claim?",
        answer:
          "Required documents vary by claim type but typically include proof of loss, incident reports, photos of damage, medical reports for injury claims, and any relevant police or official reports.",
      },
      {
        id: "claims-3",
        question: "How long does it take to process a claim?",
        answer:
          "Most straightforward claims are processed within 5-7 business days. Complex claims may take longer, but you'll be assigned a dedicated claims adjuster who will keep you updated throughout the process.",
      },
    ],
    Bike: [
      {
        id: "claims-1",
        question: "Why do I need bike insurance?",
        answer:
        "It covers repair costs, legal liabilities, and medical expenses in case of an accident.",
      },
      {
        id: "claims-2",
        question: "What does bike insurance cover?",
        answer:
        "Policies typically cover accidental damage, theft, natural disasters, and third-party liabilities"
      },
      {
        id: "claims-3",
        question: "How is the bike insurance premium calculated?",
        answer:
        "It depends on factors like bike model, age, location, and chosen coverage"
      },
      {
        id: "claims-4",
        question: "Can I transfer bike insurance to a new owner?",
        answer:
        "Yes, bike insurance can be transferred when selling the bike"
      },
    ],
    Health: [
      {
        id: "claims-1",
        question: "What is the cancellation policy?",
        answer:
          "No cancellation Insurance just contact Our Team for more enquiry",
      },
      {
        id: "claims-2",
        question: "What is health insurance??",
        answer:
          "Health insurance helps cover medical expenses, including doctor visits, hospital stays, and medications.",
      },
      {
        id: "claims-3",
        question: "What does health insurance cover?",
        answer:
          "Coverage varies but often includes hospitalization, outpatient care, emergency services, and preventive care",
      },
    ],
    Travel: [
      { 
        id: "claims-1",
        question: "What does travel insurance cover?",
        answer:
        "Coverage includes trip cancellations, medical emergencies, lost or delayed baggage, and travel assistance."
      },
      {
        id: "claims-2",
        question: "Does travel insurance cover COVID-19?",
        answer:
          "No , But Many policies now include COVID-19 coverage for medical treatment and trip cancellations due to infection.",
      },
      {
        id: "claims-3",
        question: "What is the difference between single-trip and multi-trip insurance?",
        answer:
        "Single-trip insurance covers one journey, while multi-trip insurance provides coverage for multiple trips within a set period"
      },
      {
        id: "claims-4",
        question: "Can I buy travel insurance after booking my trip?",
        answer:
        "No, but it's best to purchase it early to cover unforeseen cancellations or delays."
      },
    ],
  };

  return (
    <div 
      className="faq-container p-0"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Added H1 Heading */}
      <h1 className="faq-title">Have Questions? We're Here to Help!</h1>

      <div className="faq-tabs" ref={tabsRef}>
        <button
          className={`tab-button ${activeTab === "general" ? "active" : ""}`}
          onClick={() => handleTabClick("general")}
        >
          Car Insurance
        </button>
        <button
          className={`tab-button ${activeTab === "billing" ? "active" : ""}`}
          onClick={() => handleTabClick("billing")}
        >
          Life Insurance
        </button>
        <button
          className={`tab-button ${activeTab === "claims" ? "active" : ""}`}
          onClick={() => handleTabClick("claims")}
        >
          Claims
        </button>
        <button
          className={`tab-button ${activeTab === "Bike" ? "active" : ""}`}
          onClick={() => handleTabClick("Bike")}
        >
          Bike Insurance
        </button>
        <button
          className={`tab-button ${activeTab === "Health" ? "active" : ""}`}
          onClick={() => handleTabClick("Health")}
        >
          Health Insurance
        </button>
        <button
          className={`tab-button ${activeTab === "Travel" ? "active" : ""}`}
          onClick={() => handleTabClick("Travel")}
        >
          Travel Insurance
        </button>
      </div>

      <div className="mobile-instructions">
        <span>← Swipe to explore more categories →</span>
      </div>

      <div className="tab-content">
        {Object.keys(faqData).map((category) => (
          <div
            key={category}
            className={`accordion-container ${
              activeTab === category ? "active" : ""
            }`}
          >
            {faqData[category].map((item) => (
              <div
                key={item.id}
                className={`accordion-item ${
                  expandedItems[category] === item.id ? "expanded" : ""
                }`}
              >
                <div
                  className="accordion-header"
                  onClick={() => toggleAccordion(category, item.id)}
                >
                  <h3>{item.question}</h3>
                  <span className="accordion-icon"></span>
                </div>
                <div className="accordion-content">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;