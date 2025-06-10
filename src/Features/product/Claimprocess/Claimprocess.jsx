import React from "react";
import "./Claimprocess.css";
import NeedHelp from "../../../Reuse/NeedHelp/NeedHelp";

const Claimprocess = () => {
  const stepdata = [
    {
      head: "Step 1",
      desc: "Download the Global Health App using the QR code above or by clicking on the File Motor Claim button. Login and you'll be directed to the File Motor Claim page. Click on the policy card to start claim filing.",
    },
    {
      head: "Step 2",
      desc: "Fill all the details related to the accident and damages.",
    },
    {
      head: "Step 3",
      desc: "Update your personal details and click on the Register Claim button. That's it, your claim is successfully filed and you will receive the next steps on your email & whatsapp.",
    },
    {
      head: "Step 4",
      desc: "That's It! Your claim has been registered, it's that simple with the Digit App.",
    },
  ];

  return (
    <>
      <div className="Claimprocess-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="hed1">
                File Global Motor Claims Online in Simple Steps
              </h1>
              <p>
                Follow the steps given below to file your motor claims
                instantly.
              </p>
            </div>
          </div>
          <div className="row steps-container">
            {stepdata.map((item, index) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12 step-card"
                key={index}
              >
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title1">{item.head}</h5>
                    <p className="card-text1">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <NeedHelp
        heading="Need Help?"
        paragraph="Have queries related to Digit motor insurance policy? You can refer to our Policy Wordings for detailed information or reach out to our support team via WhatsApp self-support, email or phone using the information below:"
        head={["WhatsApp", "Email", "Contact"]}
        contact={[
          {
            cont: "Connect with our self-serve chat bot support - 9818152403",
          },
          {
            conta: "Connect Write to us at globalhealth@235@gmail.com",
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