


import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react'; // Icons (optional)

const NeedHelp = ({ heading, paragraph, contact, head }) => {
  const icons = [<Phone />, <Mail />, <MapPin />]; // You can adjust this

  return (
    <div className="need-section bg-light text-center">
      <h2 className="mb-3 fw-bold">{heading}</h2>
      <p className="text-muted mb-5">{paragraph}</p>

      <div className="container">
        <div className="row justify-content-center">
          {head.map((item, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>
              <div className="card shadow-lg border-0 h-100">
                <div className="card-body text-center">
                  <div className="mb-3 text-primary fs-3">
                    {icons[index] || <Phone />}
                  </div>
                  <h5 className="card-title mb-2 text-center d-flex justify-content-center">{item}</h5>
                  <p className="card-text text-muted">
                    {contact[index] ? contact[index][Object.keys(contact[index])[0]] : 'Not available'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeedHelp;
