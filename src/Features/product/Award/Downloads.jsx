import React from 'react';
import { Download } from 'lucide-react';
import pdf1 from '../../../../src/pdf/Fill Nomination Form.pdf'
import pdf2 from '../../../../src/pdf/Medical Equipment Manufacturing.pdf'
import pdf3 from '../../../../src/pdf/hospitals nomination form.pdf'
import pdf4 from '../../../../src/pdf/Medical award.pdf'


const Downloads = () => {
  // PDF data with actual file paths - update these paths to your actual PDF locations
  const pdfCards = [
    {
      id: 1,
      name: "Fill Nomination Form For Individuals for Global Medical Icon Award",
      fileName: "Fill Nomination Form For Individuals for Global Medical Icon Award.pdf",
      filePath: pdf1
    },
    {
      id: 2,
      name: "Medical Equipment",
      fileName: "Medical Equipment.pdf",
      filePath: pdf2
    },
    {
      id: 3,
      name: "Hospital nomination",
      fileName: "Hospital nomination.pdf",
      filePath: pdf3
    },
    {
      id: 4,
      name: "Medical Award",
      fileName: "Medical Award.pdf",
      filePath: pdf4
    }
  ];

  // Function to download actual PDF files
  const downloadPDF = async (filePath, fileName) => {
    try {
      // Fetch the PDF file
      const response = await fetch(filePath);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Get the blob from response
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please check if the file exists.');
    }
  };

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 className="display-4 fw-bold text-primary mb-3">PDF Downloads</h2>
            <p className="lead text-muted">Download your favorite development guides</p>
          </div>
        </div>
        
        <div className="row g-4">
          {pdfCards.map((card) => (
            <div key={card.id} className="col-lg-6 col-md-6 col-sm-12">
              <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="card-body d-flex flex-column p-4">
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          backgroundColor: '#e3f2fd' 
                        }}
                      >
                        <i className="fas fa-file-pdf text-danger" style={{ fontSize: '24px' }}></i>
                      </div>
                      <h5 className="card-title mb-0 fw-bold text-dark">{card.name}</h5>
                    </div>
                    <p className="card-text text-muted mb-0">{card.description}</p>
                  </div>
                  
                  <div className="mt-auto">
                    <button
                      className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2 rounded-2 fw-semibold"
                      onClick={() => downloadPDF(card.filePath, card.fileName)}
                      style={{ 
                        transition: 'all 0.3s ease',
                        backgroundColor: '#0d6efd',
                        border: 'none'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#0b5ed7';
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#0d6efd';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <Download size={18} />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="row mt-5">
          <div className="col-12 text-center">
            <p className="text-muted">
              <small>Click the download button to get your PDF files.</small>
            </p>
          </div>
        </div>
      </div>
      
      {/* Bootstrap CSS CDN */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      {/* Font Awesome for PDF icon */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        rel="stylesheet" 
      />
      
      <style jsx>{`
        .card {
          transition: all 0.3s ease !important;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
        
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem;
          }
          
          .card-body {
            padding: 1.5rem !important;
          }
        }
        
        @media (max-width: 576px) {
          .container {
            padding-left: 15px;
            padding-right: 15px;
          }
          
          .display-4 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Downloads;