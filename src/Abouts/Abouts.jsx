import React from "react";
import "./Abouts.css";
import about from "../assets/aboutusimges/about1.png";
import mission from "../assets/aboutusimges/ourmision1.png";
import vision from "../assets/aboutusimges/ourvision1.png";

const Abouts = () => {
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

  return (
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
              acrose the world’s
              we are dedicated to offering the most competitive premiums in the
              market.
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
              make insurance easy to access for people and businesses, no matter
              their size or location, helping them secure a better future.
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
          Global Health and Allied Non-Life Insurance Services offers a diverse
          range of affordable products, including:
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
                Providing budget-friendly health and property insurance services
                to individuals and businesses across North America.
              </p>
            </div>

            <div className="location">
              <h3>Texas, USA</h3>
              <p>
                Offering some of the cheapest premiums for car, health, home,
                and liability insurance plans, catering to both individuals and
                commercial clients in the U.S.
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
                Delivering comprehensive and budget-friendly insurance solutions
                in France and across Europe, with services tailored to
                individual and corporate clients.
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
                  Our global presence allows us to provide the most competitive
                  premiums in the industry, ensuring you get the best value for
                  your money without compromising on the quality of your
                  insurance coverage.
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
                  access support and financial assistance when you need it most.
                  Our dedicated team is here to guide you through every step of
                  the process.
                </p>
              </div>
              <div className="reason">
                <h3>5. Global Accessibility</h3>
                <p>
                  With offices in key international locations, we provide global
                  coverage that ensures you can access reliable and affordable
                  insurance services no matter where you are.
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
  );
};

export default Abouts;
