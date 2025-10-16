import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import acci from "../../../../src/award/03.jpg";
import third from "../../../assets/third.png";
import add6 from "../../../assets/add6.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Download from '../Award/Downloads.jsx'

import {
  ShieldCheck,
  GraduationCap,
  BookOpenCheck,
  HeartPulse,
  FileText,
  Users,
  Stethoscope,
  Library,
  Award,
  UserRound,
  HeartHandshake,
  MapPin,
  Medal,
  UserCheck,
  Microscope,
  CheckCircle,
} from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Award.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function Awards() {
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    dob: '',
    nationality: '',
    country_pride: '',
    medical_specialty: '',
    current_designation_institution: '',
    medical_registration_number: '',
    issuing_authority: '',
    years_of_practice: '',
    languages_spoken: '',
    key_achievements: '',
    signature: '',
    email: '',
    phone_number: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [registrationId, setRegistrationId] = useState(null);
    const API_BASE_URL = 'https://globalhealthandalliedservices.com/api'; // Replace with your backend URL


  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'fullname', 'gender', 'dob', 'nationality', 'medical_specialty',
      'current_designation_institution', 'medical_registration_number',
      'issuing_authority', 'years_of_practice', 'email', 'phone_number'
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in the ${field.replace(/_/g, ' ')} field`);
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Years of practice validation
    if (isNaN(formData.years_of_practice) || formData.years_of_practice < 0) {
      setError('Please enter a valid number for years of practice');
      return false;
    }

    return true;
  };

  const initiateRazorpayPayment = async () => {
    try {
      // Create order on backend
      const orderResponse = await fetch(`${API_BASE_URL}/payment/createorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 5000, // ₹10
          userDetails: formData
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      // Razorpay payment options
      const options = {
        key: 'rzp_live_4GMG4265FQmj65', // Add this to your .env file
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Global Health & Allied Insurance',
        description: 'Medical Award Registration Fee',
        order_id: orderData.orderId,
        handler: async function (response) {
          // Payment successful, verify and submit form
          await verifyPaymentAndSubmit(response);
        },
        prefill: {
          name: formData.fullname,
          email: formData.email,
          contact: formData.phone_number
        },
        theme: {
          color: '#007bff'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            setError('Payment cancelled. Please try again.');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      setLoading(false);
      setError(err.message || 'Payment initialization failed');
      console.error('Payment error:', err);
    }
  };

  const verifyPaymentAndSubmit = async (paymentResponse) => {
    try {
      // Verify payment on backend
      const verifyResponse = await fetch(`${API_BASE_URL}/api/payment/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpayOrderId: paymentResponse.razorpay_order_id,
          razorpayPaymentId: paymentResponse.razorpay_payment_id,
          razorpaySignature: paymentResponse.razorpay_signature,
          donorDetails: formData
        }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyData.success) {
        // Payment verified, now submit form data
        await submitFormData(paymentResponse.razorpay_payment_id);
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (err) {
      setLoading(false);
      setError('Payment verification failed. Please contact support.');
      console.error('Verification error:', err);
    }
  };

  const submitFormData = async (paymentId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_MEDICAL_API}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          payment_id: paymentId,
          payment_status: 'completed',
          payment_amount: 5000
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setRegistrationId(result.data.id);
        setSuccess(result.message);
        setShowModal(true);
        
        // Reset form
        setFormData({
          fullname: '',
          gender: '',
          dob: '',
          nationality: '',
          country_pride: '',
          medical_specialty: '',
          current_designation_institution: '',
          medical_registration_number: '',
          issuing_authority: '',
          years_of_practice: '',
          languages_spoken: '',
          key_achievements: '',
          signature: '',
          email: '',
          phone_number: ''
        });
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Initiate Razorpay payment
    await initiateRazorpayPayment();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSuccess('');
  };

  const data = [
    {
      category: "Health Insurance",
      plans: [
        "Individual Health Plans",
        "Family Health Plans",
        "Corporate Health Plans",
        "International Health Insurance for expatriates",
        "Low-Cost Preventative Care Plans",
        "Affordable Maternity and Childcare Coverage",
      ],
    },
    {
      category: "Travel Insurance",
      plans: [
        "Economical Travel Medical Insurance",
        "Trip Cancellation Insurance",
        "Emergency Medical Evacuation Insurance",
      ],
    },
    {
      category: "Accident and Disability Insurance",
      plans: [
        "Personal Accident Coverage",
        "Income Protection Plans",
        "Affordable Disability Insurance",
      ],
    },
    {
      category: "Home and Property Insurance",
      plans: [
        "Homeowners and Renters Insurance",
        "Affordable Commercial Property Insurance",
        "Natural Disaster Protection",
      ],
    },
    {
      category: "Automobile Insurance",
      plans: [
        "Budget Car Insurance Plans",
        "Commercial Vehicle Coverage",
        "Third-Party Liability Insurance",
      ],
    },
    {
      category: "Liability and Legal Protection",
      plans: [
        "General Liability Insurance",
        "Professional Liability Insurance",
        "Cybersecurity and Data Protection Insurance",
      ],
    },
    {
      category: "Specialty Insurance",
      plans: [
        "Pet Insurance",
        "Business Interruption Insurance",
        "Environmental and Marine Insurance",
      ],
    },
  ];

  const awardCategories = [
    {
      title: "India's Best Doctor in",
      items: [
        "General Medicine (Internal Medicine)",
        "General Surgery",
        "Pediatrics",
        "Obstetrics & Gynecology (OB-GYN)",
        "Orthopedics",
        "Cardiology",
        "Neurology",
        "Neurosurgery",
        "Pulmonology / Respiratory Medicine",
        "Dermatology",
        "Psychiatry",
        "Ophthalmology (Eye care)",
        "ENT (Ear, Nose, Throat)",
        "Gastroenterology",
        "Urology",
        "Nephrology",
        "Oncology",
        "Endocrinology",
        "Hematology",
        "Rheumatology",
      ],
    },
    {
      title: "India's Best Surgical Specialties",
      items: [
        "Cardiothoracic Surgery",
        "Plastic & Reconstructive Surgery",
        "Vascular Surgery",
        "Pediatric Surgery",
        "Laparoscopic Surgery",
        "Robotic Surgery Units",
        "Trauma & Emergency Surgery",
        "Bariatric Surgery",
        "Colorectal Surgery",
        "Transplant Surgery",
      ],
    },
    {
      title: "India's Best Diagnostics & Support Departments",
      items: [
        "Radiology",
        "Pathology",
        "Microbiology",
        "Biochemistry",
        "Nuclear Medicine",
        "Genetics & Molecular Biology",
      ],
    },
    {
      title: "India's Best Therapy & Rehabilitation",
      items: [
        "Physiotherapy & Rehabilitation",
        "Speech Therapy",
        "Occupational Therapy",
        "Pain Management",
        "Palliative Care",
      ],
    },
    {
      title: "India's Best Critical Care & Emergency",
      items: ["Emergency Medicine", "ICU", "NICU", "PICU", "Cardiac ICU (CCU)"],
    },
    {
      title: "India's Best Preventive & Community Health",
      items: [
        "Preventive & Social Medicine",
        "Public Health",
        "Vaccination Centers",
        "School & Occupational Health Units",
      ],
    },
    {
      title: "India's Best Hospital Administration & Support",
      items: [
        "Pharmacy",
        "Nursing Services",
        "Health Information Management",
        "Biomedical Engineering",
        "Infection Control",
        "Quality & Accreditation",
        "Blood Bank",
        "Telemedicine / Digital Health",
      ],
    },
  ];

  const eligibilityCriteria = [
    {
      icon: <ShieldCheck size={32} className="text-primary mb-3" />,
      title: "Indian Nationals",
      description: "Only Indian citizens are eligible for the award.",
    },
    {
      icon: <Stethoscope size={32} className="text-success mb-3" />,
      title: "Contributions to Medicine",
      description:
        "Recognizes excellence in medical practice, research, and specialty development.",
    },
    {
      icon: <HeartHandshake size={32} className="text-danger mb-3" />,
      title: "Outstanding Service",
      description:
        "Acknowledges contributions to socio-medical relief and medical institutions.",
    },
  ];

  const experienceCriteria = [
    {
      icon: <BookOpenCheck size={28} className="text-primary me-3" />,
      title: "Minimum Years of Experience",
      description:
        "Many awards require a minimum number of years of practice in a specific field.",
    },
    {
      icon: <GraduationCap size={28} className="text-success me-3" />,
      title: "Degrees and Diplomas",
      description:
        "Higher-level qualifications like MD, DNB, FRCGP, and other advanced degrees or diplomas can add to an applicant's merit.",
    },
    {
      icon: <HeartPulse size={28} className="text-danger me-3" />,
      title: "Specialization & Subspecialization",
      description:
        "Awards may be specifically for those with a particular specialization, such as cardiology or cardiac surgery.",
    },
  ];

  const contributions = [
    {
      icon: <FileText className="text-primary me-2" size={20} />,
      title: "Scientific Publications",
      description:
        "Recognizes those who've published research in indexed journals or authored textbook chapters.",
    },
    {
      icon: <GraduationCap className="text-success me-2" size={20} />,
      title: "Academic Contributions",
      description:
        "Includes lecturing, teaching, and participation in Continuing Medical Education (CME) programs.",
    },
    {
      icon: <Users className="text-danger me-2" size={20} />,
      title: "Social Work and Community Involvement",
      description:
        "Contributions to social work and community-benefiting health projects are considered.",
    },
    {
      icon: <Stethoscope className="text-info me-2" size={20} />,
      title: "Patient Care",
      description:
        "Awards may recognize exceptional care, especially in rural or underserved areas.",
    },
    {
      icon: <Library className="text-warning me-2" size={20} />,
      title: "Leadership and Administration",
      description:
        "Involvement in leading medical institutions or associations can be a major factor.",
    },
    {
      icon: <Award className="text-secondary me-2" size={20} />,
      title: "Awards and Recognition",
      description:
        "Prior recognition at the national, state, or international level enhances eligibility.",
    },
  ];

  const otherFactors = [
    {
      icon: <ShieldCheck className="text-primary me-2" size={20} />,
      title: "Ethical Stature",
      description:
        "Reputation for ethical and moral medical conduct may be taken into account.",
    },
    {
      icon: <UserRound className="text-success me-2" size={20} />,
      title: "Membership in Professional Organizations",
      description:
        "Being part of associations like IMA or other specialty bodies adds merit.",
    },
    {
      icon: <HeartHandshake className="text-danger me-2" size={20} />,
      title: "Active Social Work and Projects",
      description:
        "Recognizes doctors actively engaged in community and health-related projects.",
    },
    {
      icon: <MapPin className="text-warning me-2" size={20} />,
      title: "Service in Rural and Tribal Areas",
      description:
        "Special appreciation for those working in underserved or remote areas.",
    },
  ];

  const awards = [
    {
      icon: <Medal className="text-warning me-2" size={20} />,
      title: "IMA National Award",
      description:
        "For IMA members with 20+ years of continuous service and contributions in fields like cardiology, cardiac surgery, and allied disciplines.",
    },
    {
      icon: <BookOpenCheck className="text-primary me-2" size={20} />,
      title: "CIOMS Award",
      description:
        "Granted to medical students of IFMSA member organizations with peer-reviewed scientific publications.",
    },
    {
      icon: <UserCheck className="text-success me-2" size={20} />,
      title: "ASH HONORS Award",
      description:
        "Awarded to enrolled medical students or residents conducting hematology research under mentorship.",
    },
    {
      icon: <Microscope className="text-danger me-2" size={20} />,
      title: "NAMS Awards",
      description:
        "Recognize exceptional contributions in medical science and research, with emphasis on publications and healthcare development.",
    },
    {
      icon: <HeartPulse className="text-info me-2" size={20} />,
      title: "PMSMA Awards",
      description:
        "Given to individuals or groups contributing significantly to the Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA) initiative to reduce maternal mortality.",
    },
  ];

  const benefitsList = [
    "A hard copy of the certificate with the respective Award Title and a Memento will be given where the awardee's name and research paper (in case of REA, YRA, and YAA) details will be mentioned.",
    "InSc Professional Membership which is worth Rs.2000/- will be given. Membership Id card and Certificate will be given to all the participants. For more details and benefits visit  insc.in/membership",
    "Registered participant's details along with photos will be published in the InSc Yearbook which will be circulated among more than 15,000 subscribers and a soft copy of the yearbook will be given.",
    "He/She will be considered as a reviewer for our InSc International Journal and a certificate will be issued for the same. For more details on InSc Journal log on to  insc.in/iij",
    "His/Her details will be displayed on our awards department page  insc.in/awards",
    "He/She may be invited as a session chair/resource person for InSc events in his/her area of expertise.",
  ];

  return (
    <>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={acci}
            alt="Award 1"
            style={{
              position: "relative",
              width: "100%",
              maxHeight: "550px",
              objectFit: "contain",
              borderRadius: "0px"
            }}
          />
        </SwiperSlide>
      </Swiper>

      <div className="text">
        <h1>Healthcare Excellence Awards</h1>
        <p>
          We are happy to inform you that GHAIS Awards Nomination Submission is
          open for the year 2025 for India. Nominations are invited by the
          Doctors, Academicians, Researchers, Hospitals, Pathological Service
          and Professionals from Medical Industries for the following titles:
        </p>
      </div>

      <div className="container mt-4">
        <div className="row">
          {awardCategories.map((section, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="award-card">
                <h5 className="award-title">{section.title}</h5>
                <ul className="award-list">
                  {section.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Download />
      </div>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Eligibility Criteria</h2>
          <div className="row">
            {eligibilityCriteria.map((item, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 shadow-sm border-0 text-center p-4">
                  <div className="d-flex justify-content-center">
                    {item.icon}
                  </div>
                  <h5 className="fw-semibold mt-3">{item.title}</h5>
                  <p className="text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">
            Experience & Qualification
          </h2>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {experienceCriteria.map((item, index) => (
                <div key={index} className="d-flex align-items-start mb-4">
                  {item.icon}
                  <div>
                    <h5 className="fw-semibold mb-1">{item.title}</h5>
                    <p className="text-muted text-start">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">
            Contributions & Achievements
          </h2>
          <div className="row">
            {contributions.map((item, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div className="d-flex align-items-start">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h6 className="fw-semibold mb-1">{item.title}</h6>
                    <p className="text-muted text-start">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Other Factors</h2>
          <div className="row">
            {otherFactors.map((item, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div className="d-flex align-items-start">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h6 className="fw-semibold mb-1">{item.title}</h6>
                    <p className="text-muted text-start">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Specific Award Examples</h2>
          <div className="row">
            {awards.map((award, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div className="d-flex align-items-start">
                  <div className="mt-1">{award.icon}</div>
                  <div>
                    <h6 className="fw-semibold mb-1">{award.title}</h6>
                    <p className="text-muted text-start">{award.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Benefits of Awards</h2>
          <p className="text-center mb-4">
            Benefits of InSc Research Excellence Award / Young Achiever Award /
            Young Researcher / InSc Best Teacher Award / InSc Academic
            Excellence Award / InSc Principal of the Year Award:
          </p>
          <ul className="list-group list-group-flush">
            {benefitsList.map((benefit, index) => (
              <li
                className="list-group-item d-flex align-items-start"
                key={index}
              >
                <CheckCircle className="me-2 mt-1 text-success" size={18} />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">
            GLOBAL BEST DOCTORS AWARD NOMINATION FORM
          </h2>
          <p style={{ display: "flex", gap: "5px" }}>
            <strong>Organized by: </strong> [Global Health & Allied Insurance]
          </p>
          <p style={{ display: "flex", gap: "5px" }}>
            <strong>Award Title: </strong> Global Health & Medical Excellence
            Awards 2025
          </p>
          <p style={{ display: "flex", gap: "5px" }}>
            <strong>Purpose: </strong> Honoring the world's most outstanding
            doctors across medical specialties and countries.
          </p>

          <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px 0' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '10px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  padding: '20px', 
                  textAlign: 'center' 
                }}>
                  <h3 style={{ margin: 0 }}>Global Medical Icon Award</h3>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>Registration Fee: ₹5000</p>
                </div>

                <div style={{ padding: '30px' }}>
                  {error && (
                    <div style={{ 
                      backgroundColor: '#f8d7da', 
                      color: '#721c24', 
                      padding: '12px 16px', 
                      border: '1px solid #f5c6cb', 
                      borderRadius: '4px', 
                      marginBottom: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span>{error}</span>
                      <button 
                        onClick={() => setError('')}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: '#721c24', 
                          fontSize: '18px',
                          cursor: 'pointer'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                      <div style={{ flex: '1', minWidth: '250px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                          Full Name <span style={{ color: '#dc3545' }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="fullname"
                          value={formData.fullname}
                          onChange={handleInputChange}
                          placeholder="Dr. John Smith"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '16px'
                          }}
                          required
                        />
                      </div>
                      <div style={{ flex: '1', minWidth: '250px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                          Gender <span style={{ color: '#dc3545' }}>*</span>
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '16px'
                          }}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                      <div style={{ flex: '1', minWidth: '250px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                          Date of Birth <span style={{ color: '#dc3545' }}>*</span>
                        </label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '16px'
                          }}
                          required
                        />
                      </div>
                      <div style={{ flex: '1', minWidth: '250px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                          Nationality <span style={{ color: '#dc3545' }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          placeholder="e.g., American, Indian, British"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '16px'
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Country of Pride
                      </label>
                      <input
                        type="text"
                        name="country_pride"
                        value={formData.country_pride}
                        onChange={handleInputChange}
                        placeholder="Country you're proud to represent"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          fontSize: '16px'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                      <div style={{ flex: '1', minWidth: '250px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                          Medical Specialty <span style={{ color: '#dc3545' }}>*</span>
                        </label>
                        <select
                          name="medical_specialty"
                          value={formData.medical_specialty}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '16px'
                          }}
                          required
                        >
                          <option value="">Select Specialty</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Neurology">Neurology</option>
                          <option value="Orthopedics">Orthopedics</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="Internal Medicine">Internal Medicine</option>
                          <option value="Surgery">Surgery</option>
                          <option value="Dermatology">Dermatology</option>
                          <option value="Psychiatry">Psychiatry</option>
                          <option value="Radiology">Radiology</option>
                          <option value="Anesthesiology">Anesthesiology</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div style={{ flex: '1', minWidth: '250px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                          Years of Practice <span style={{ color: '#dc3545' }}>*</span>
                        </label>
                        <input
                          type="number"
                          name="years_of_practice"
                          value={formData.years_of_practice}
                          onChange={handleInputChange}
                          placeholder="e.g., 5"
                          min="0"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '16px'
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Current Designation & Institution <span style={{ color: '#dc3545' }}>*</span>
                      </label>
                      <textarea
                        rows={2}
                        name="current_designation_institution"
                        value={formData.current_designation_institution}
                        onChange={handleInputChange}
                        placeholder="e.g., Senior Cardiologist at City General Hospital"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          fontSize: '16px',
                          resize: 'vertical'
                        }}
                        required
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                      <div style={{ flex: '1', minWidth: '250px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                          Medical Registration Number <span style={{ color: '#dc3545' }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="medical_registration_number"
                          value={formData.medical_registration_number}
                          onChange={handleInputChange}
                          placeholder="e.g., MD12345"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '16px'
                          }}
                          required
                        />
                      </div>
                      <div style={{ flex: '1', minWidth: '250px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                          Issuing Authority <span style={{ color: '#dc3545' }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="issuing_authority"
                          value={formData.issuing_authority}
                          onChange={handleInputChange}
                          placeholder="e.g., Medical Board of California"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '16px'
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Languages Spoken
                      </label>
                      <input
                        type="text"
                        name="languages_spoken"
                        value={formData.languages_spoken}
                        onChange={handleInputChange}
                        placeholder="e.g., English, Spanish, French"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          fontSize: '16px'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Key Achievements
                      </label>
                      <textarea
                        rows={3}
                        name="key_achievements"
                        value={formData.key_achievements}
                        onChange={handleInputChange}
                        placeholder="List your notable achievements, awards, publications, etc."
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          fontSize: '16px',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
                      <div style={{ flex: '1', minWidth: '250px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                          Email Address <span style={{ color: '#dc3545' }}>*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="doctor@example.com"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '16px'
                          }}
                          required
                        />
                      </div>
                      <div style={{ flex: '1', minWidth: '250px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                          Phone Number <span style={{ color: '#dc3545' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '16px'
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          backgroundColor: loading ? '#6c757d' : '#007bff',
                          color: 'white',
                          border: 'none',
                          padding: '12px 40px',
                          fontSize: '18px',
                          borderRadius: '6px',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'background-color 0.2s'
                        }}
                      >
                        {loading ? (
                          <>
                            <div style={{
                              width: '16px',
                              height: '16px',
                              border: '2px solid transparent',
                              borderTop: '2px solid white',
                              borderRadius: '50%',
                              animation: 'spin 1s linear infinite'
                            }}></div>
                            Processing Payment...
                          </>
                        ) : (
                          'Proceed to Payment (₹5000)'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {showModal && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1050
              }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  maxWidth: '500px',
                  width: '90%',
                  maxHeight: '90vh',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}>
                  <div style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <h4 style={{ margin: 0 }}>Registration Successful!</h4>
                    <button
                      onClick={handleCloseModal}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '24px',
                        cursor: 'pointer',
                        padding: '0',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                      onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      ×
                    </button>
                  </div>

                  <div style={{ padding: '30px', textAlign: 'center' }}>
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: '#28a745',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        fontSize: '40px',
                        color: 'white'
                      }}>
                        ✓
                      </div>
                    </div>
                    
                    <h5 style={{ marginBottom: '15px', color: '#333' }}>
                      Thank you for your registration!
                    </h5>
                    
                    <p style={{ marginBottom: '20px', color: '#666', lineHeight: '1.5' }}>
                      Your medical Award registration has been submitted successfully. 
                      A confirmation email with further instructions has been sent to your email address.
                    </p>

                    {registrationId && (
                      <div style={{ marginBottom: '20px' }}>
                        <span style={{
                          backgroundColor: '#17a2b8',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}>
                          Registration ID: {registrationId}
                        </span>
                      </div>
                    )}
                    
                    <div style={{
                      backgroundColor: '#fff3cd',
                      border: '1px solid #ffeaa7',
                      borderRadius: '4px',
                      padding: '15px',
                      marginBottom: '20px',
                      textAlign: 'left'
                    }}>
                      <strong style={{ color: '#856404' }}>Next Steps:</strong>
                      <ul style={{ 
                        marginBottom: 0, 
                        marginTop: '10px', 
                        color: '#856404',
                        paddingLeft: '20px'
                      }}>
                        <li>Check your email for confirmation details</li>
                        <li>Submit your medical Document (scanned copy)</li>
                        <li>Provide a recent professional photograph</li>
                      </ul>
                    </div>
                  </div>

                  <div style={{
                    padding: '15px 30px',
                    borderTop: '1px solid #dee2e6',
                    textAlign: 'right'
                  }}>
                    <button
                      onClick={handleCloseModal}
                      style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      </div>
    </>
  );
}