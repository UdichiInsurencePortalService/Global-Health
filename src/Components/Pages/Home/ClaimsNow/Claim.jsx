import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Claims.css";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="call-action overlay">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8 col-md-10 col-12">
            <div className="content">
              <h2>Looking For a Life Insurance?</h2>
              <p>
              Secure your future with confidence—get the protection you deserve today.
              </p>
              <div className="button mt-3">
                <Link as={Link} to={'#'} className="btn">Claim Now </Link>
                {/* <a href="#" className="btn second">Learn More<i className="fa fa-long-arrow-right"></i></a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;