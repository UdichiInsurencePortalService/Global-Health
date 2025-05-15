
import React from 'react';
import "./Companyinfo.css";
import { Descriptions } from 'antd';
// import "./Footer.css";


const Companyinfo = () => {

  const content1 = [
    {
      title: "Muscat, Oman (Headquarters)",
      Descriptions: "Our main operational base in the Middle East, offering affordable health and non-life insurance solutions across the region and beyond."  ,   
    },
    {
      title: "Mauritius",
      Descriptions: "the African and Asian markets, we provide affordable, customized insurance plans for individuals and businesses at competitive rates.",
    },
    {
      title: "Toronto, Canada",
      Descriptions: "Providing budget-friendly health and property insurance services to individuals and businesses across North America."
    },
    {
      title: "Texas, USA:",
      Descriptions: "Offering some of the cheapest premiums for car, health, home, and liability insurance plans, catering to both individuals and commercial clients in the U.S."
    },
    {
      title: "London, United Kingdom:",
      Descriptions: "Offering affordable business, health, and property insurance services to clients across Europe and beyond, with a focus on low-cost options for businesses of all sizes."
    },
    {
      title: "Paris, France:",
      Descriptions: "Delivering comprehensive and budget-friendly insurance solutions in France and across Europe, with services tailored to individual and corporate clients."
    },
    {
      title: "Mumbai, India:",
      Descriptions: "Focused on offering the lowest-cost insurance options for individuals and businesses in the South Asian market, ensuring broad coverage with minimal premiums."
    }
  ]

  const contact2 =[

    {
      title: "Muscat Office:",
      Descriptions: "P.O. Box 556. Postal code No. 103. Muscat Sultanate of Oman ; Telephone, (968) 928 655 17 (968) 992 134 62 ;"
    },
    
    {
      title: "Mauritius Office:",
      Descriptions: "301, Cyber City, Ebene."
    },
    
    {
      title: "Toronto Office:",
      Descriptions: "PO Box 4643, Station A Toronto, Ontario M5W 5E3, 1-877-780-7247"
    },
    {
      title: "Texas Office:",
      Descriptions: "1010 E. Lookout Drive Richardson TX 75082 800-451-0267"
    },
    
    {
      title: "London Office:",
      Descriptions: "1st Floor, Dean House, 193 High St, Ponders End, Enfield EN3 4EA, United Kingdom"
    },
    
    {
      title: "Paris Office:",
      Descriptions: "31 Rue de Châteaudun, 75009 Paris, France"
    },
    
    {
      title: "Mumbai Office:",
      Descriptions: "43, Ashok Nagar Opp Dwarka Hotel Achole Road, Nallasopara, Mumbai -209"
    }
  ]



  return (
    <>
      

      <div className="Presence-section py-5">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-md-12">
              <h1 className="fw-bold">Global Presence:</h1>
              <p>
              Global Health and Allied Non-Life Insurance Services operates from strategic global
              locations to offer affordable insurance coverage tailored to regional needs:
              </p>
            </div>
          </div>
          <div className="row">
            {content1.map((content, inx) => (
              <div
                key={inx}
                className="col-lg-3 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch"
              >
                <div className="card shadow-lg p-4 text-center card-hover d-flex flex-column">
                  {/* <img
                    src={feature.img}
                    alt={content1.title}
                    className="img-fluid mb-3"
                  /> */}
                  <h5 className="fw-bold">{content.title}</h5>
                  <p className="flex-grow-1">{content.Descriptions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className='row'>
        <div className='col-lg-12 text-center'>
          <h1>Contact Us</h1>
        </div>
      </div> */}
<div className="presence-section py-5 bg-light">
  <div className="container">
    {/* Section Heading */}
    <div className="row justify-content-center text-center mb-5">
      <div className="col-md-8">
        <h1 className="fw-bold text-primary">Contact Us</h1>
        <p className="text-muted">
          We are here to assist you. Reach out to our offices for support or inquiries.
        </p>
      </div>
    </div>

    {/* Office Contact Cards */}
    <div className="row">
      {contact2.map((content2, inx) => (
        <div
          key={inx}
          className={`col-lg-6 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch ${
            inx === 6 ? 'mx-auto justify-content-center' : ''
          }`}
        >
          <div className="card shadow-sm w-100 border-0 p-4 text-center">
            <h5 className="fw-bold mb-3 text-dark">{content2.title}</h5>
            <p className="text-muted">{content2.Descriptions}</p>
          </div>
        </div>
      ))}
    </div>
    <p className=' para d-flex text-center'>
      Global Health and Allied Insurance Services is your trusted partner for the most affordable
      and comprehensive insurance solutions worldwide. No matter where you are located, we are
      here to ensure that you have the protection you need at the lowest possible premium. Reach</p>
  </div>
</div>

    </>
  );
};

export default Companyinfo;
