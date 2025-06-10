import React, { useState, useEffect, useRef } from "react";
import "./News.css";
// import icon1 from "../../../../assets/reuseimage/whatsapp.png";
// import icon2 from "../../../../assets/reuseimage/circle.png";


const News = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [expandedItems, setExpandedItems] = useState({
    general: "general-1",
    billing: "billing-1",
    claims: "claims-1",
    Bike: "claims-1",
    Health: "claims-1",
    Travel: "claims-1",
    Auto:"claim-1",
    Home:"claim-1"
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
      {
    id: "general-4",
    question: "What is a premium in insurance?",
    answer:
      "A premium is the amount you pay to the insurance company to keep your policy active. It can be paid monthly, quarterly, or annually depending on the plan.",
  },
  {
    id: "general-5",
    question: "What is a policy number?",
    answer:
      "A policy number is a unique identifier assigned to your insurance policy. It is used for all references and communications related to your coverage.",
  },
  {
    id: "general-6",
    question: "How can I download my insurance policy document?",
    answer:
      "You can log in to our website or mobile app using your registered credentials to download the soft copy of your policy document anytime.",
  },
  {
    id: "general-7",
    question: "What is the grace period in insurance?",
    answer:
      "The grace period is the additional time (usually 15 to 30 days) given after the premium due date to make payment without policy lapse.",
  },
  {
    id: "general-8",
    question: "Can I make changes to my policy after purchase?",
    answer:
      "Yes, you can request endorsements to update details like address, nominee, or contact info. Some changes may require supporting documents.",
  },
  {
    id: "general-9",
    question: "What is a No Claim Bonus (NCB)?",
    answer:
      "NCB is a discount offered on your premium for every claim-free year. It can accumulate over time and be transferred between insurers.",
  },
  {
    id: "general-10",
    question: "Is online insurance purchase safe?",
    answer:
      "Yes, buying insurance online through our official portal is safe, secure, and convenient. Always ensure you use verified websites.",
  },
  {
    id: "general-11",
    question: "How do I contact customer support?",
    answer:
      "You can reach our support team via phone, email, live chat, or by visiting the nearest branch. Our contact details are available on the website.",
  },
  {
    id: "general-12",
    question: "What should I do if I forget my login password?",
    answer:
      "Click on ‘Forgot Password’ on the login page and follow the steps to reset it using your registered email or phone number.",
  },
  {
    id: "general-13",
    question: "Can I cancel my insurance policy?",
    answer:
      "Yes, most policies can be canceled by submitting a written request. A cancellation fee may apply, and the refund will depend on the policy terms."
  }
    ],
    Auto: [
  {
    id: "claim-1",
    question: "What is Auto Insurance?",
    answer:
      "Car Insurance, also known as auto or motor insurance, is a type of vehicle insurance policy that protects you and your car from any risks and damages caused by accidents, thefts, or natural disasters.",
  },
  {
    id: "claim-2",
    question: "Can a duplicate policy be obtained?",
    answer:
      "Yes, please approach the same office which has issued the policy, with a written request. A nominal fee is charged for issuing duplicate policy copy.",
  },
  {
    id: "claim-3",
    question: "Where can I renew my policy?",
    answer:
      "On Our website, enter car's registration number, and click on 'View Prices'. And Take Your Insurance.",
  },
  {
    id: "claim-4",
    question: "What types of auto insurance coverage are available?",
    answer:
      "Auto insurance typically includes liability coverage, collision coverage, comprehensive coverage, personal injury protection (PIP), and uninsured/underinsured motorist coverage. Each type protects against different risks and damages.",
  },
  {
    id: "claim-5",
    question: "How is my auto insurance premium calculated?",
    answer:
      "Premiums are calculated based on factors like your age, driving history, vehicle type, location, coverage limits, deductible amount, and credit score. Safe drivers with good records typically pay lower premiums.",
  },
  {
    id: "claim-6", 
    question: "What should I do immediately after an accident?",
    answer:
      "Ensure everyone's safety, call emergency services if needed, exchange information with other drivers, take photos of the scene and damages, notify your insurance company as soon as possible, and file a police report if required.",
  },
  {
    id: "claim-7",
    question: "Does auto insurance cover rental cars?",
    answer:
      "Coverage varies by policy. Some policies extend your regular coverage to rental cars, while others may require additional rental car coverage. Check with your insurer or consider purchasing coverage from the rental company.",
  },
  {
    id: "claim-8",
    question: "How long does it take to process an auto insurance claim?",
    answer:
      "Simple claims can be processed within a few days, while complex claims involving investigations may take several weeks. Your insurer will provide updates throughout the process and inform you of any delays.",
  },
  {
    id: "claim-9",
    question: "Can I add a new driver to my existing policy?",
    answer:
      "Yes, you can add drivers to your policy by contacting your insurance company. Additional drivers may affect your premium based on their age, driving record, and other factors. All household members who drive should be listed.",
  },
  {
    id: "claim-10",
    question: "What is a deductible and how does it work?",
    answer:
      "A deductible is the amount you pay out-of-pocket before your insurance coverage kicks in. Higher deductibles typically result in lower premiums, while lower deductibles mean higher premiums but less out-of-pocket expense during claims.",
  },
  {
    id: "claim-11",
    question: "Is auto insurance mandatory?",
    answer:
      "In most states and countries, minimum liability insurance is legally required to drive. The required coverage amounts vary by location. Driving without insurance can result in fines, license suspension, and legal penalties.",
  },
  {
    id: "claim-12",
    question: "How can I lower my auto insurance premium?",
    answer:
      "You can reduce premiums by maintaining a clean driving record, bundling policies, taking defensive driving courses, installing safety devices, choosing higher deductibles, and comparing quotes from multiple insurers annually.",
  },
  {
    id: "claim-13",
    question: "What happens if I let my auto insurance policy lapse?",
    answer:
      "A lapsed policy can result in legal penalties, higher future premiums, loss of continuous coverage discounts, and financial responsibility for any accidents. Contact your insurer immediately to reinstate coverage and avoid gaps.",
  },
],
    Home: [
  {
    id: "claim-1",
    question: "What is Home Insurance?",
    answer:
      "Home Insurance is a type of property insurance that covers losses and damages to your house and assets in the home. It also provides liability coverage against accidents in the home or on the property.",
  },
  {
    id: "claim-2",
    question: "Can a duplicate policy be obtained?",
    answer:
      "Yes, please approach the same office which has issued the policy, with a written request. A nominal fee is charged for issuing duplicate policy copy.",
  },
  {
    id: "claim-3",
    question: "Where can I renew my policy?",
    answer:
      "On our website, enter your policy number or property details, and click on 'Renew Policy'. You can also visit our nearest branch office for renewal.",
  },
  {
    id: "claim-4",
    question: "What does Home Insurance typically cover?",
    answer:
      "Home Insurance typically covers the structure of your home, personal belongings, additional living expenses if you're displaced, and personal liability. It protects against perils like fire, theft, vandalism, and certain natural disasters.",
  },
  {
    id: "claim-5",
    question: "Are natural disasters covered under Home Insurance?",
    answer:
      "Coverage for natural disasters varies by policy. While fire, lightning, and windstorms are typically covered, floods and earthquakes usually require separate policies or endorsements. Check your policy details for specific coverage.",
  },
  {
    id: "claim-6",
    question: "How is the premium for Home Insurance calculated?",
    answer:
      "Premium is calculated based on factors like property value, location, construction type, security features, claim history, and coverage amount. Properties in high-risk areas or with valuable contents may have higher premiums.",
  },
  {
    id: "claim-7",
    question: "What is the claim process for Home Insurance?",
    answer:
      "To file a claim, immediately notify your insurer, document the damage with photos, file a police report if necessary, provide all required documents, and cooperate with the insurance adjuster during inspection.",
  },
  {
    id: "claim-8",
    question: "Is personal property covered when I'm away from home?",
    answer:
      "Yes, most Home Insurance policies provide coverage for personal belongings even when you're away from home, typically up to a percentage of your personal property coverage limit. This includes items stolen from your car or hotel room.",
  },
  {
    id: "claim-9",
    question: "What is replacement cost vs. actual cash value?",
    answer:
      "Replacement cost covers the cost to replace damaged items with new ones of similar quality. Actual cash value pays the replacement cost minus depreciation. Replacement cost coverage typically costs more but provides better protection.",
  },
  {
    id: "claim-10",
    question: "Do I need Home Insurance if I rent my property?",
    answer:
      "If you're a tenant, you need Renter's Insurance to cover your personal belongings and liability. If you're a landlord renting out your property, you need Landlord Insurance which covers the building structure and rental-related risks.",
  },
  {
    id: "claim-11",
    question: "What factors can help reduce my Home Insurance premium?",
    answer:
      "You can reduce premiums by installing security systems, smoke detectors, maintaining good credit, bundling with other policies, increasing deductibles, and keeping your property well-maintained. Some insurers offer discounts for loyalty and claim-free years.",
  },
  {
    id: "claim-12",
    question: "How often should I review and update my Home Insurance policy?",
    answer:
      "Review your policy annually or when you make significant changes to your home, such as renovations, purchasing expensive items, or changes in occupancy. Regular reviews ensure adequate coverage and help you take advantage of potential savings.",
  },
  {
    id: "claim-13",
    question: "What is not covered under a standard Home Insurance policy?",
    answer:
      "Standard policies typically exclude floods, earthquakes, wear and tear, pest infestations, intentional damage, business activities, and certain high-value items like jewelry or art beyond specified limits. Separate coverage may be needed for these exclusions.",
  },
],
    // billing: [
    //   {
    //     id: "billing-1",
    //     question: "What is life insurance?",
    //     answer:
    //         "Life insurance is a contract between you and an insurer that provides financial support to your beneficiaries after your passing."
    //   },
    //   {
    //     id: "billing-2",
    //     question: "Why do I need life insurance?",
    //     answer:
    //       "It ensures your loved ones are financially secure in case of unforeseen events"
    //   },
    //   {
    //     id: "billing-3",
    //     question: "How do my beneficiaries claim life insurance?",
    //     answer:
    //       "They must file a claim with the insurer, submit necessary documents, and wait for approval."
    //   },
    // ],
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
      {
    id: "claims-4",
    question: "Can I track the status of my claim?",
    answer:
      "Yes, you can track your claim status anytime through our online portal or mobile app. You will also receive email or SMS updates at key stages of the process.",
  },
  {
    id: "claims-5",
    question: "Is there a time limit to file a claim?",
    answer:
      "Yes, most policies require that claims be filed within a specific time frame after the incident occurs. Please refer to your policy documents for the exact timeframe or contact our support team for assistance.",
  },
  {
    id: "claims-6",
    question: "What if I disagree with the claim decision?",
    answer:
      "If you disagree with the claim outcome, you can file an appeal. Contact your claims adjuster or our support team to start the review process.",
  },
  {
    id: "claims-7",
    question: "Do I need to get repair estimates before filing a claim?",
    answer:
      "In most cases, it's helpful to provide at least one repair estimate with your claim. Your adjuster may request additional estimates depending on the type and extent of damage.",
  },
  {
    id: "claims-8",
    question: "Will filing a claim increase my premium?",
    answer:
      "Filing a claim may impact your premium depending on the type and frequency of claims. Contact your insurance agent or review your policy for specific details.",
  },
  {
    id: "claims-9",
    question: "Can someone else file a claim on my behalf?",
    answer:
      "Yes, a legal representative or someone with your written authorization can file a claim on your behalf. Proper documentation will be required.",
  },
  {
    id: "claims-10",
    question: "What happens after I file a claim?",
    answer:
      "Once a claim is filed, a claims adjuster will review the information, possibly contact you for more details, and begin assessing damages. You'll be kept informed at each step.",
  },
  {
    id: "claims-11",
    question: "Can I cancel a claim after it's filed?",
    answer:
      "Yes, you can cancel a claim if processing hasn’t begun or if no payout has been issued. Contact your adjuster or our claims department as soon as possible.",
  },
  {
    id: "claims-12",
    question: "What should I do if I suspect insurance fraud?",
    answer:
      "If you suspect fraudulent activity, please report it immediately to our fraud prevention team via our hotline or online reporting form. Your information will be kept confidential.",
  },
  {
    id: "claims-13",
    question: "Are there different claim procedures for natural disasters?",
    answer:
      "Yes, in the event of a natural disaster, expedited procedures and dedicated support lines may be available. Check our website or contact customer service for specific guidance during such events.",
  }
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
      {
    id: "claims-5",
    question: "Is bike insurance mandatory?",
    answer:
      "Yes, third-party bike insurance is mandatory by law in many countries to cover liabilities towards others in case of an accident.",
  },
  {
    id: "claims-6",
    question: "What is not covered under bike insurance?",
    answer:
      "Exclusions typically include normal wear and tear, riding under the influence, driving without a license, and mechanical or electrical breakdowns.",
  },
  {
    id: "claims-7",
    question: "Can I customize my bike insurance coverage?",
    answer:
      "Yes, you can add optional covers such as zero depreciation, roadside assistance, or engine protection to enhance your policy.",
  },
  {
    id: "claims-8",
    question: "How can I renew my bike insurance policy?",
    answer:
      "You can renew it online through the insurer’s website or app, or by contacting their customer service before the policy expiration date.",
  },
  {
    id: "claims-9",
    question: "What is a No Claim Bonus (NCB)?",
    answer:
      "NCB is a discount on your premium for every claim-free year. It can be transferred when you switch insurers or change bikes.",
  },
  {
    id: "claims-10",
    question: "What documents are required to buy bike insurance?",
    answer:
      "You'll typically need your bike's registration certificate (RC), previous policy details (if renewing), and a valid driving license.",
  },
  {
    id: "claims-11",
    question: "What should I do after a bike accident?",
    answer:
      "Ensure safety first, inform the police if necessary, document the incident, and report the claim to your insurer as soon as possible.",
  },
  {
    id: "claims-12",
    question: "Can I switch insurers mid-policy?",
    answer:
      "Yes, you can switch insurers at renewal time. Some insurers allow mid-term switches, but you may lose benefits like NCB if not transferred correctly.",
  },
  {
    id: "claims-13",
    question: "Does bike insurance cover pillion passengers?",
    answer:
      "Some policies include personal accident cover for pillion passengers, but this may vary. Check your policy details or add the cover if needed.",
  },
  {
    id: "claims-14",
    question: "How do I claim bike theft under insurance?",
    answer:
      "Report the theft to the police and get an FIR, then inform your insurer and submit the required documents like FIR copy, RC, and claim form."
  }
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
        {
    id: "claims-4",
    question: "Is there a waiting period before I can use my health insurance?",
    answer:
      "Yes, most health insurance policies have a waiting period for certain conditions, usually ranging from 30 days to 2 years depending on the illness.",
  },
  {
    id: "claims-5",
    question: "Can I add family members to my health insurance?",
    answer:
      "Yes, many plans offer family floater options that allow you to cover your spouse, children, and sometimes parents under a single policy.",
  },
  {
    id: "claims-6",
    question: "What is a pre-existing condition in health insurance?",
    answer:
      "A pre-existing condition is any medical condition you had before the start of the policy. Coverage for these may be subject to a waiting period.",
  },
  {
    id: "claims-7",
    question: "How do I file a health insurance claim?",
    answer:
      "You can file a claim either through cashless hospitalization at a network hospital or by reimbursement by submitting bills and documents to your insurer.",
  },
  {
    id: "claims-8",
    question: "What is a cashless hospital network?",
    answer:
      "A cashless hospital network includes hospitals that have tie-ups with the insurer, allowing you to get treatment without paying upfront, subject to policy terms.",
  },
  {
    id: "claims-9",
    question: "Are regular health check-ups covered?",
    answer:
      "Some health plans offer annual or biennial health check-ups as part of preventive care benefits. Check your policy for details.",
  },
  {
    id: "claims-10",
    question: "What is a deductible in health insurance?",
    answer:
      "A deductible is the amount you pay out-of-pocket before your insurance coverage kicks in. Higher deductibles usually mean lower premiums.",
  },
  {
    id: "claims-11",
    question: "Can I increase my health insurance coverage later?",
    answer:
      "Yes, most insurers allow policy upgrades or add-ons at the time of renewal, subject to underwriting and waiting periods.",
  },
  {
    id: "claims-12",
    question: "Does health insurance cover mental health services?",
    answer:
      "Many modern policies now include coverage for mental health consultations and treatments, but coverage specifics vary by plan.",
  },
  {
    id: "claims-13",
    question: "Will I lose my benefits if I change jobs?",
    answer:
      "Employer-provided group health insurance ends when you leave the job, but you can buy individual coverage or port your policy if eligible."
  }
    ],
    // Travel: [
    //   { 
    //     id: "claims-1",
    //     question: "What does travel insurance cover?",
    //     answer:
    //     "Coverage includes trip cancellations, medical emergencies, lost or delayed baggage, and travel assistance."
    //   },
    //   {
    //     id: "claims-2",
    //     question: "Does travel insurance cover COVID-19?",
    //     answer:
    //       "No , But Many policies now include COVID-19 coverage for medical treatment and trip cancellations due to infection.",
    //   },
    //   {
    //     id: "claims-3",
    //     question: "What is the difference between single-trip and multi-trip insurance?",
    //     answer:
    //     "Single-trip insurance covers one journey, while multi-trip insurance provides coverage for multiple trips within a set period"
    //   },
    //   {
    //     id: "claims-4",
    //     question: "Can I buy travel insurance after booking my trip?",
    //     answer:
    //     "No, but it's best to purchase it early to cover unforeseen cancellations or delays."
    //   },
    // ],
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
        {/* <button
          className={`tab-button ${activeTab === "billing" ? "active" : ""}`}
          onClick={() => handleTabClick("billing")}
        >
          Life Insurance
        </button> */}
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
          className={`tab-button ${activeTab === "Auto" ? "active" : ""}`}
          onClick={() => handleTabClick("Auto")}
        >
          Auto Insurance
        </button>
        <button
          className={`tab-button ${activeTab === "Home" ? "active" : ""}`}
          onClick={() => handleTabClick("Home")}
        >
          Home Insurance
        </button>


        <button
          className={`tab-button ${activeTab === "Health" ? "active" : ""}`}
          onClick={() => handleTabClick("Health")}
        >
          Health Insurance
        </button>
        {/* <button
          className={`tab-button ${activeTab === "Travel" ? "active" : ""}`}
          onClick={() => handleTabClick("Travel")}
        >
          Travel Insurance
        </button> */}
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