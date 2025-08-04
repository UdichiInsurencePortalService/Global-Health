import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import acci from "../../../assets/AWARD IMAGES/BIDHAN.jpg";
import third from "../../../assets/third.png";
import add6 from "../../../assets/add6.png";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./Abouts.css";
// import about from "../../../assets/aboutusimges"
import about from "../../../assets/aboutusimges/about1.png";
import mission from "../../../assets/aboutusimges/ourmision1.png";
import vision from "../../../assets/aboutusimges/ourvision1.png";

import {
  ShieldCheck,
  // HeartHandshake,
  GraduationCap,
  BookOpenCheck,
  HeartPulse,
  FileText,
  Users,
  Stethoscope,
  Library,
  Award,
  // ShieldCheck,
  UserRound,
  HeartHandshake,
  MapPin,
  Medal,
  // BookOpenCheck,
  UserCheck,
  Microscope,
  CheckCircle,
  // HeartPulse
} from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Award.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function Awards() {
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
      title: "India’s Best Doctor in",
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
      title: "India’s Best Surgical Specialties",
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
      title: "India’s Best Diagnostics & Support Departments",
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
      title: "India’s Best Therapy & Rehabilitation",
      items: [
        "Physiotherapy & Rehabilitation",
        "Speech Therapy",
        "Occupational Therapy",
        "Pain Management",
        "Palliative Care",
      ],
    },
    {
      title: "India’s Best Critical Care & Emergency",
      items: ["Emergency Medicine", "ICU", "NICU", "PICU", "Cardiac ICU (CCU)"],
    },
    {
      title: "India’s Best Preventive & Community Health",
      items: [
        "Preventive & Social Medicine",
        "Public Health",
        "Vaccination Centers",
        "School & Occupational Health Units",
      ],
    },
    {
      title: "India’s Best Hospital Administration & Support",
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
        "Recognizes those who’ve published research in indexed journals or authored textbook chapters.",
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
            style={{ width: "100%", height: "auto", borderRadius: "0px" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={acci}
            alt="Award 1"
            style={{ width: "100%", height: "auto", borderRadius: "0px" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={acci}
            alt="Award 1"
            style={{ width: "100%", height: "auto", borderRadius: "0px" }}
          />
        </SwiperSlide>
      </Swiper>

      <div className="text">
        <h1>Healthcare Excellence Awards</h1>
        <p>
          {" "}
          We are happy to inform you that GHAIS Awards Nomination Submission is
          open for the year 2025 for India.    Nominations are invited by the
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


      <div className="about-section">
        <div className="container">
          {/* About Us Section */}
          <div className="row align-items-center my-5">
            <div className="col-md-6 p-4 text-center d-flex flex-column align-items-center">
              <h1>About Us</h1>
              <p className="para">
                Global Health and Allied Non-Life Insurance Services is a global
                leader in providing affordable and comprehensive health and
                non-life insurance solutions. With offices strategically located
                acrose the world’s we are dedicated to offering the most
                competitive premiums in the market.
              </p>
              <p className="para">
                We specialize in delivering high-quality insurance coverage in
                health, travel, home, auto, and business sectors, all at the
                lowest possible premiums globally.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img src={about} alt="About Us" className="img-fluid" />
            </div>
          </div>

          {/* Vision Section */}
          <div className="row align-items-center my-5">
            <div className="col-md-6 text-center">
              <img src={vision} alt="Our Vision" className="img-fluid" />
            </div>
            <div className="col-md-6 p-2 d-flex flex-column align-items-center text-center">
              <h1>Our Vision</h1>
              <p className="para">
                To become the world’s most trusted and affordable provider of
                health and non-life insurance, offering the most competitive
                premiums worldwide while ensuring optimal coverage for all
                clients.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="row align-items-center my-5">
            <div className="col-md-6 p-2 d-flex flex-column align-items-center text-center">
              <h1>Our Mission</h1>
              <p className="para">
                To provide cost-effective and comprehensive insurance solutions
                globally by offering the most affordable premiums without
                compromising on the quality of service and protection. We aim to
                make insurance easy to access for people and businesses, no
                matter their size or location, helping them secure a better
                future.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img src={mission} alt="Our Mission" className="img-fluid" />
            </div>
          </div>
        </div>
        <div className="container-2">
          <h1 className="title">Our Services</h1>
          <p className="description">
            Global Health and Allied Non-Life Insurance Services offers a
            diverse range of affordable products, including:
          </p>
          <div className="cards-wrapper">
            {data.map((item, index) => (
              <div key={index} className="card card21">
                <h2 className="card-title2">{item.category}</h2>
                <ul className="card-list">
                  {item.plans.map((plan, planIndex) => (
                    <li key={planIndex} className="card-item">
                      {plan}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="global-presence">
          <div className="container">
            <h2 className="section-title">Global Presence</h2>
            <p className="section-description">
              Global Health and Allied Non-Life Insurance Services operates from
              strategic global locations to offer affordable insurance coverage
              tailored to regional needs:
            </p>

            <div className="locations">
              <div className="location">
                <h3>Muscat, Oman (Headquarters)</h3>
                <p>
                  Our main operational base in the Middle East, offering
                  affordable health and non-life insurance solutions across the
                  region and beyond.
                </p>
              </div>

              <div className="location">
                <h3>Mauritius</h3>
                <p>
                  Serving the African and Asian markets, we provide affordable,
                  customized insurance plans for individuals and businesses at
                  competitive rates.
                </p>
              </div>

              <div className="location">
                <h3>Toronto, Canada</h3>
                <p>
                  Providing budget-friendly health and property insurance
                  services to individuals and businesses across North America.
                </p>
              </div>

              <div className="location">
                <h3>Texas, USA</h3>
                <p>
                  Offering some of the cheapest premiums for car, health, home,
                  and liability insurance plans, catering to both individuals
                  and commercial clients in the U.S.
                </p>
              </div>

              <div className="location">
                <h3>London, United Kingdom</h3>
                <p>
                  Offering affordable business, health, and property insurance
                  services to clients across Europe and beyond, with a focus on
                  low-cost options for businesses of all sizes.
                </p>
              </div>

              <div className="location">
                <h3>Paris, France</h3>
                <p>
                  Delivering comprehensive and budget-friendly insurance
                  solutions in France and across Europe, with services tailored
                  to individual and corporate clients.
                </p>
              </div>

              <div className="location">
                <h3>Mumbai, India</h3>
                <p>
                  Focused on offering the lowest-cost insurance options for
                  individuals and businesses in the South Asian market, ensuring
                  broad coverage with minimal premiums.
                </p>
              </div>
            </div>
          </div>

          <div className="why-choose-us">
            <div className="container">
              <h2 className="section-title">Why Choose Us</h2>
              <div className="reasons">
                <div className="reason">
                  <h3>1. Unmatched Affordability</h3>
                  <p>
                    Our global presence allows us to provide the most
                    competitive premiums in the industry, ensuring you get the
                    best value for your money without compromising on the
                    quality of your insurance coverage.
                  </p>
                </div>
                <div className="reason">
                  <h3>2. Comprehensive Coverage</h3>
                  <p>
                    Despite offering the lowest premiums, our plans are designed
                    to provide maximum coverage, ensuring that your health,
                    assets, and business are protected in case of any unforeseen
                    event.
                  </p>
                </div>
                <div className="reason">
                  <h3>3. Tailored Solutions</h3>
                  <p>
                    We understand that every client has different needs. Whether
                    you are an individual, a family, or a business, we offer
                    customized insurance solutions that fit your unique
                    requirements.
                  </p>
                </div>
                <div className="reason">
                  <h3>4. Fast and Easy Claims</h3>
                  <p>
                    Our efficient claims process ensures that you can quickly
                    access support and financial assistance when you need it
                    most. Our dedicated team is here to guide you through every
                    step of the process.
                  </p>
                </div>
                <div className="reason">
                  <h3>5. Global Accessibility</h3>
                  <p>
                    With offices in key international locations, we provide
                    global coverage that ensures you can access reliable and
                    affordable insurance services no matter where you are.
                  </p>
                </div>
                <div className="reason">
                  <h3>6. Customer-Centric Service</h3>
                  <p>
                    Our commitment to customer satisfaction means we are always
                    available to answer questions, provide support, and help you
                    understand your options, ensuring you have complete peace of
                    mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
            <strong>Purpose: </strong> Honoring the world’s most outstanding
            doctors across medical specialties and countries.
          </p>

          <form
            method="post"
            encType="multipart/form-data"
            className="needs-validation"
            noValidate
          >
            {/* Section A: Personal Details */}
            <fieldset className="border p-4 mb-4">
              <legend className="w-auto px-2">
                SECTION A: PERSONAL DETAILS
              </legend>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  id="fullName"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <br />
                {["Male", "Female", "Other", "Prefer not to say"].map(
                  (gender) => (
                    <div className="form-check form-check-inline" key={gender}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value={gender}
                        id={`gender-${gender}`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`gender-${gender}`}
                      >
                        {gender}
                      </label>
                    </div>
                  )
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  id="dob"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="nationality" className="form-label">
                  Nationality
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nationality"
                  id="nationality"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">
                  Country of Practice
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  id="country"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Official Photograph
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  id="photo"
                />
              </div>
            </fieldset>

            {/* Section B: Professional Information */}
            <fieldset className="border p-4 mb-4">
              <legend className="w-auto px-2">
                SECTION B: PROFESSIONAL INFORMATION
              </legend>
              <div className="mb-3">
                <label className="form-label">Medical Specialty</label>
                <input type="text" className="form-control" name="specialty" />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Current Designation & Institution
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="designation"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Medical Registration Number & Issuing Authority
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="registration"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Years of Medical Practice</label>
                <input
                  type="number"
                  className="form-control"
                  name="experience"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Academic Qualifications</label>
                <textarea
                  className="form-control"
                  name="qualifications"
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Languages Spoken</label>
                <input type="text" className="form-control" name="languages" />
              </div>
            </fieldset>

            {/* Section C: Contributions & Recognition */}
            <fieldset className="border p-4 mb-4">
              <legend className="w-auto px-2">
                SECTION C: CONTRIBUTIONS & RECOGNITION
              </legend>
              <div className="mb-3">
                <label className="form-label">
                  Key Achievements (up to 300 words)
                </label>
                <textarea
                  className="form-control"
                  name="achievements"
                  rows="4"
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Awards/Recognitions Received
                </label>
                <textarea className="form-control" name="awards"></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Notable Research / Publications
                </label>
                <textarea className="form-control" name="research"></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Community Health Contributions
                </label>
                <textarea className="form-control" name="community"></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Mentored Professionals?</label>
                <br />
                {["Yes", "No"].map((option) => (
                  <div className="form-check form-check-inline" key={option}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="mentored"
                      value={option}
                      id={`mentored-${option}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`mentored-${option}`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
                <div className="mt-2">
                  <textarea
                    className="form-control"
                    name="mentoringDetails"
                    placeholder="If yes, provide a brief description (max 100 words)"
                  ></textarea>
                </div>
              </div>
            </fieldset>

            {/* Section D: Verification & References */}
            <fieldset className="border p-4 mb-4">
              <legend className="w-auto px-2">
                SECTION D: VERIFICATION & REFERENCES
              </legend>
              <div className="mb-3">
                <label className="form-label">
                  Medical License Certificate (Upload)
                </label>
                <input type="file" className="form-control" name="license" />
              </div>
              <h5>Reference 1</h5>
              {[
                "ref1_name",
                "ref1_designation",
                "ref1_email",
                "ref1_phone",
              ].map((name, idx) => (
                <input
                  key={idx}
                  type={name.includes("email") ? "email" : "text"}
                  className="form-control mb-2"
                  name={name}
                  placeholder={name.replace("ref1_", "").replace("_", " ")}
                />
              ))}
              <h5>Reference 2</h5>
              {[
                "ref2_name",
                "ref2_designation",
                "ref2_email",
                "ref2_phone",
              ].map((name, idx) => (
                <input
                  key={idx}
                  type={name.includes("email") ? "email" : "text"}
                  className="form-control mb-2"
                  name={name}
                  placeholder={name.replace("ref2_", "").replace("_", " ")}
                />
              ))}
            </fieldset>

            {/* Section E: Award Category & Declaration */}
            <fieldset className="border p-4 mb-4">
              <legend className="w-auto px-2">
                SECTION E: AWARD CATEGORY & DECLARATION
              </legend>
              <div className="mb-3">
                <label className="form-label">Nominated Category</label>
                <br />
                {[
                  "Country’s Best Doctor in Specialty",
                  "Lifetime Achievement in Medicine",
                  "Excellence in Medical Innovation",
                  "Community Health Impact",
                  "Outstanding Research Contribution",
                  "Young Medical Achiever (Under 40)",
                ].map((cat) => (
                  <div className="form-check" key={cat}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category[]"
                      value={cat}
                      id={cat}
                    />
                    <label className="form-check-label" htmlFor={cat}>
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    required
                    id="declaration"
                  />
                  <label className="form-check-label" htmlFor="declaration">
                    I hereby declare that all the information provided is true.
                    I agree to submit verification documents if required.
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Signature</label>
                <input type="text" className="form-control" name="signature" />
              </div>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input type="date" className="form-control" name="date" />
              </div>
            </fieldset>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit Nomination
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </>
  );
}
