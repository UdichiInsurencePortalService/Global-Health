import React, { useState } from 'react';
import './Policy.css';

const Policy = () => {
  const [file, setFile] = useState(null);
  
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  
  return (
    <section className='policy-section py-5 px-3'>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center mb-5">
            <div className="policy-heading">
              <h1 className="fw-bold">Just Check Your Policy Updates Here!</h1>
            </div>
          </div>

          {/* Policy Check Section */}
          <div className="col-md-10 col-lg-8 mb-5">
            <div className="check-section p-4 bg-light rounded-3 shadow-sm">
              <div className="input-group flex-column flex-md-row gap-2 gap-md-0">
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  placeholder="Enter your Policy Number or Email" 
                />
                <button className="btn btn-primary btn-lg px-4">Submit</button>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="col-md-6 col-lg-5">
            <div className="upload-card card shadow-sm border-0">
              <div className="card-body p-4">
                <h2 className="card-title mb-4 fw-bold">Upload Your Policy</h2>
                
                <div className="upload-area text-center p-4 border-2 border-dashed rounded-3 bg-light position-relative">
                  <input 
                    type="file" 
                    accept="application/pdf" 
                    className="file-input position-absolute opacity-0 top-0 start-0 w-100 h-100" 
                    style={{ cursor: 'pointer' }}
                    onChange={handleFileChange}
                  />
                  
                  <div className="upload-icon mb-3">
                    <i className="bi bi-file-earmark-arrow-up fs-1"></i>
                  </div>
                  
                  <p className="mb-1">Drag & drop your file here</p>
                  <p className="text-muted small mb-2">or click to browse</p>
                  
                  {file && (
                    <div className="selected-file mt-3 p-2 bg-white rounded">
                      <p className="mb-0 text-truncate">{file.name}</p>
                    </div>
                  )}
                </div>
                
                <button className="btn btn-success w-100 mt-4">
                  Upload Document
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Policy;