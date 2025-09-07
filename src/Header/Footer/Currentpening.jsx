import React, { useState } from 'react';

const Currentpening = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobData = {
    insurance: {
      title: "Health & Automobile Insurance Services",
      color: "primary",
      icon: "🏥",
      jobs: [
        {
          title: "Business Development Manager – Insurance",
          type: "Core Role (Salaried)",
          salary: "₹35,000–₹60,000/month (₹5–8 LPA)",
          description: "Lead partnerships with insurers, onboard clients, manage corporate & retail accounts, drive revenue.",
          badge: "Senior Level"
        },
        {
          title: "Operations & Claims Executive",
          type: "Core Role (Salaried)",
          salary: "₹20,000–₹30,000/month (₹3–4 LPA)",
          description: "Handle policy issuance, renewals, claims documentation, and customer grievance management.",
          badge: "Mid Level"
        },
        {
          title: "Customer Relationship Officer",
          type: "Core Role (Salaried)",
          salary: "₹18,000–₹25,000/month (₹2.5–3.5 LPA)",
          description: "Handle client onboarding, explain policies, cross-sell health & auto insurance.",
          badge: "Entry Level"
        },
        {
          title: "Insurance Agents / Freelance Advisors",
          type: "Freelance / Commission",
          salary: "10–20% of premium commission",
          description: "Source clients for health & auto policies, educate them on benefits, close sales.",
          badge: "Commission Based"
        }
      ]
    },
    healthcare: {
      title: "Global Health & Allied Services (Healthcare Awards)",
      color: "success",
      icon: "🏆",
      jobs: [
        {
          title: "Program Manager – Healthcare Awards",
          type: "Core Role (Salaried)",
          salary: "₹40,000–₹70,000/month (₹6–10 LPA)",
          description: "Design award categories, coordinate jury panels, manage sponsor relationships, oversee event execution.",
          badge: "Senior Level"
        },
        {
          title: "Event & Sponsorship Manager",
          type: "Core Role (Salaried)",
          salary: "₹35,000–₹50,000/month (₹5–7 LPA) + incentives",
          description: "Drive sponsorship sales, manage healthcare partners, coordinate with hospitals/medical councils.",
          badge: "Mid Level"
        },
        {
          title: "Communications & PR Officer",
          type: "Core Role (Salaried)",
          salary: "₹25,000–₹40,000/month",
          description: "Manage media outreach, press releases, award branding, social media campaigns.",
          badge: "Mid Level"
        },
        {
          title: "Medical Experts / Jury Members",
          type: "Freelance Role",
          salary: "₹5,000–₹15,000 per award cycle",
          description: "Evaluate nominations, score applicants, join award jury panel.",
          badge: "Expert Level"
        },
        {
          title: "Freelance Designers & Event Anchors",
          type: "Freelance Role",
          salary: "₹10,000–₹30,000/project",
          description: "Design materials and anchor events based on project scope.",
          badge: "Creative"
        }
      ]
    },
    recruitment: {
      title: "Online Recruitment & Practice Examination Portal",
      color: "info",
      icon: "💻",
      jobs: [
        {
          title: "Product Manager – Recruitment Portal",
          type: "Core Role (Salaried)",
          salary: "₹50,000–₹80,000/month (₹7–12 LPA)",
          description: "Define product roadmap, integrate assessment library, coordinate tech & marketing teams.",
          badge: "Senior Level"
        },
        {
          title: "Software Developers (Full-Stack/Backend/Frontend)",
          type: "Core Role (Salaried)",
          salary: "₹40,000–₹70,000/month",
          description: "Build web portal, integrate payment gateways, ensure data security.",
          badge: "Technical"
        },
        {
          title: "Content & Assessment Manager",
          type: "Core Role (Salaried)",
          salary: "₹30,000–₹45,000/month",
          description: "Develop question banks, practice tests, coordinate with subject experts.",
          badge: "Content"
        },
        {
          title: "Recruitment Operations Executive",
          type: "Core Role (Salaried)",
          salary: "₹25,000–₹35,000/month",
          description: "Manage employer accounts, candidate database, coordinate interviews.",
          badge: "Operations"
        },
        {
          title: "Subject Matter Experts (SMEs)",
          type: "Freelance Role",
          salary: "₹500–₹1,500 per test OR ₹1–₹5 per MCQ",
          description: "Create questions, case studies, video content for exams.",
          badge: "Expert"
        },
        {
          title: "Freelance Recruiters",
          type: "Freelance Role",
          salary: "5–10% of candidate's CTC",
          description: "Source candidates for client roles.",
          badge: "Commission"
        }
      ]
    }
  };

  const handleApplyClick = (job, division) => {
    setSelectedJob({ ...job, division: division.title });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const getBadgeClass = (badge) => {
    switch (badge) {
      case 'Senior Level': return 'badge bg-danger';
      case 'Mid Level': return 'badge bg-warning text-dark';
      case 'Entry Level': return 'badge bg-success';
      case 'Commission Based': return 'badge bg-info';
      case 'Expert Level': return 'badge bg-dark';
      case 'Technical': return 'badge bg-primary';
      case 'Creative': return 'badge bg-secondary';
      default: return 'badge bg-light text-dark';
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .job-card {
          transition: all 0.3s ease;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          height: 100%;
        }
        
        .job-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .apply-btn {
          transition: all 0.3s ease;
          border-radius: 8px;
        }
        
        .apply-btn:hover {
          transform: translateY(-2px);
        }
        
        .modal-backdrop {
          background-color: rgba(0,0,0,0.5);
        }
        
        .pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .email-box {
          background: linear-gradient(45deg, #f8f9fa, #e9ecef);
          border: 2px solid #007bff;
          border-radius: 10px;
        }
      `}</style>
      
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-3">
              🌟 Current Job Openings
            </h1>
            <p className="lead text-muted">
              Join our dynamic team at Global Health & Allied Services
            </p>
            <hr className="w-50 mx-auto" style={{ height: '3px', backgroundColor: '#007bff' }} />
          </div>

          {/* Job Divisions */}
          {Object.entries(jobData).map(([key, division]) => (
            <div key={key} className="mb-5">
              <div className="text-center mb-4">
                <h2 className={`text-${division.color} mb-3`}>
                  <span className="me-2" style={{ fontSize: '1.5em' }}>{division.icon}</span>
                  {division.title}
                </h2>
              </div>
              
              <div className="row">
                {division.jobs.map((job, index) => (
                  <div key={index} className="col-lg-6 col-md-6 col-sm-12 mb-4">
                    <div className="card job-card">
                      <div className={`card-header bg-${division.color} text-white`}>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="mb-0 fw-bold">{job.title}</h5>
                          <span className={getBadgeClass(job.badge)}>
                            {job.badge}
                          </span>
                        </div>
                      </div>
                      
                      <div className="card-body d-flex flex-column">
                        <span className="badge bg-outline-secondary mb-3 align-self-start" 
                              style={{ color: '#6c757d', border: '1px solid #dee2e6' }}>
                          {job.type}
                        </span>
                        
                        <p className="text-muted mb-3 flex-grow-1">
                          {job.description}
                        </p>
                        
                        <div className="mb-3">
                          <strong className={`text-${division.color}`}>
                            💰 {job.salary}
                          </strong>
                        </div>
                        
                        <button
                          className={`btn btn-${division.color} btn-lg w-100 fw-bold apply-btn`}
                          onClick={() => handleApplyClick(job, division)}
                        >
                          Apply Now 📧
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="text-center mt-5 pt-4 border-top">
            <p className="text-muted">
              <strong>Global Health & Allied Services</strong> - Building careers, transforming healthcare
            </p>
            <p className="text-muted small">
              For any queries, contact us at: <strong>info@globalhealthandalliedservices.com</strong>
            </p>
          </div>
        </div>

        {/* Application Modal */}
        {showModal && (
          <>
            <div className="modal-backdrop show" onClick={handleCloseModal}></div>
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header bg-primary text-white">
                    <h5 className="modal-title">
                      <span className="me-2">📧</span>
                      Apply for Position
                    </h5>
                    <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                  </div>
                  
                  <div className="modal-body p-4">
                    {selectedJob && (
                      <>
                        <div className="text-center mb-4">
                          <h4 className="text-primary mb-2">{selectedJob.title}</h4>
                          <p className="text-muted">{selectedJob.division}</p>
                        </div>
                        
                        <div className="bg-light p-4 rounded mb-4">
                          <h5 className="text-success mb-3">
                            <span className="me-2">✉️</span>
                            How to Apply
                          </h5>
                          <p className="mb-3">
                            <strong>Share your resume and experience on:</strong>
                          </p>
                          <div className="email-box p-4 text-center pulse">
                            <span className="h4 text-primary mb-2 d-block">📧</span>
                            <strong className="text-dark h5">info@globalhealthandalliedservices.com</strong>
                          </div>
                        </div>
                        
                        <div className="bg-info bg-opacity-10 p-3 rounded">
                          <p className="mb-0 text-center">
                            <span className="me-2">💡</span>
                            <strong>Tip:</strong> Please mention the job title "{selectedJob.title}" in your email subject line.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                      Close
                    </button>
                    <button 
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        window.open(`mailto:info@globalhealthandalliedservices.com?subject=Application for ${selectedJob?.title}`, '_blank');
                        handleCloseModal();
                      }}
                    >
                      <span className="me-2">📧</span>
                      Send Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Currentpening;