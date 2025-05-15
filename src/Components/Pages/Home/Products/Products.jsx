import React from "react";
import "./Product.css";
import img1 from "../../../../assets/reuseimage/money.png";
import img2 from "../../../../assets/reuseimage/guide.png";
import img3 from "../../../../assets/reuseimage/agreement.png";
import img4 from "../../../../assets/reuseimage/claim (1).png";
import img5 from "../../../../assets/reuseimage/24-hours-support.png";

const Products = () => {
  const features = [
    {
      img: img1,
      title: "Affordable Plans",
      description:
        "One of the best prices in the market, guaranteed by Global Health and Allied Insurance.",
    },
    {
      img: img2,
      title: "Honest Guidance",
      description: "Unbiased advice that always puts our customers first.",
    },
    {
      img: img3,
      title: "Trusted & Regulated",
      description: "100% reliable and fully regulated by IRDAI.",
    },
    {
      img: img4,
      title: "Easy Claim Process",
      description: "Claims support made stress-free and simple.",
    },

  ];

  return (
    <div className="PBAdvantage-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-6 text-center">
            <h1 className="pb-advantage-heading ">Global Health Advantage</h1>
            
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          {features.map((feature, idx) => (
            <div key={idx} className="col-md-6 col-lg-3 mb-4 d-flex">
              <div className="card h-100 shadow-sm p-3 text-center w-100">
                <img
                  src={feature.img}
                  className="card-img-top pb-2"
                  alt="feature"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    margin: "0 auto",
                  }}
                />
                <h5 className="card-title mt-2 text-center d-flex justify-content-center">{feature.title}</h5>
                <p className="card-texts">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

// import React from 'react';
// import './Product.css';
// import { Link } from 'react-router-dom';

// const Products = () => {
//   return (
//     <div className='about-section py-5'>
//       <div className='container'>
//         <div className='row mb-4'>
//           <div className='col-12 text-center'>
//             <h1 className='section-title'>About Global Health And Allied Insurance</h1>
//           </div>
//         </div>

//         <div className='row justify-content-center'>
//           <div className='col-md-10'>
//             <div className=' p-4 text-center about-card'>
//               <p className='about-text mb-4'>
//                 Global Health and Allied Non-Life Insurance Services is a global leader in providing
//                 affordable and comprehensive health and non-life insurance solutions. With offices strategically
//                 located in Muscat, Mauritius, Toronto, Texas, London, Paris, and Mumbai, we offer the most competitive
//                 premiums to ensure individuals, families, and businesses receive the protection they need. We specialize
//                 in high-quality insurance coverage across health, travel, home, auto, and business sectors — making
//                 insurance accessible and affordable worldwide.
//               </p>
//               <Link to ='/aboutus'>
//               <button  className='btn btn-primary readmore-btn'>Read More</button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;
