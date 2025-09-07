import React, { useState } from 'react';

const Currentpening = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobData = {
    insurance: {
      title: "Health & Automobile Insurance Services",
      icon: "🛡️",
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
      case 'Senior Level': return 'badge-senior';
      case 'Mid Level': return 'badge-mid';
      case 'Entry Level': return 'badge-entry';
      case 'Commission Based': return 'badge-commission';
      case 'Expert Level': return 'badge-expert';
      case 'Technical': return 'badge-technical';
      case 'Creative': return 'badge-creative';
      case 'Content': return 'badge-content';
      case 'Operations': return 'badge-operations';
      default: return 'badge-default';
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .main-wrapper {
          background: linear-gradient(135deg, #f8faff 0%, #f1f5ff 100%);
          padding: 2rem 0;
        }
        
        /* Header Styles */
        .header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .main-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        
        .main-subtitle {
          font-size: clamp(1rem, 3vw, 1.25rem);
          color: #64748b;
          margin-bottom: 1.5rem;
          font-weight: 400;
        }
        
        .divider {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #1e40af, #3b82f6);
          border: none;
          border-radius: 2px;
          margin: 0 auto;
        }
        
        /* Section Styles */
        .section {
          margin-bottom: 4rem;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        
        .section-title {
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        
        .section-icon {
          font-size: clamp(1.5rem, 4vw, 2rem);
        }
        
        /* Grid Layout */
        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        @media (max-width: 768px) {
          .jobs-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
        
        /* Job Card Styles */
        .job-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .job-card-header {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          padding: 1.5rem;
        }
        
        .job-card-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        
        .job-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.025em;
        }
        
        .badge-senior { background: rgba(239, 68, 68, 0.1); color: #dc2626; border: 1px solid rgba(239, 68, 68, 0.2); }
        .badge-mid { background: rgba(245, 158, 11, 0.1); color: #d97706; border: 1px solid rgba(245, 158, 11, 0.2); }
        .badge-entry { background: rgba(34, 197, 94, 0.1); color: #16a34a; border: 1px solid rgba(34, 197, 94, 0.2); }
        .badge-commission { background: rgba(59, 130, 246, 0.1); color: #2563eb; border: 1px solid rgba(59, 130, 246, 0.2); }
        .badge-expert { background: rgba(107, 114, 128, 0.1); color: #374151; border: 1px solid rgba(107, 114, 128, 0.2); }
        .badge-technical { background: rgba(139, 92, 246, 0.1); color: #7c3aed; border: 1px solid rgba(139, 92, 246, 0.2); }
        .badge-creative { background: rgba(236, 72, 153, 0.1); color: #db2777; border: 1px solid rgba(236, 72, 153, 0.2); }
        .badge-content { background: rgba(6, 182, 212, 0.1); color: #0891b2; border: 1px solid rgba(6, 182, 212, 0.2); }
        .badge-operations { background: rgba(168, 85, 247, 0.1); color: #9333ea; border: 1px solid rgba(168, 85, 247, 0.2); }
        .badge-default { background: rgba(107, 114, 128, 0.1); color: #374151; border: 1px solid rgba(107, 114, 128, 0.2); }
        
        .job-card-body {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .job-type {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          background: #f1f5f9;
          color: #64748b;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 1rem;
          align-self: flex-start;
        }
        
        .job-description {
          color: #64748b;
          font-size: 0.9375rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          flex: 1;
        }
        
        .job-salary {
          font-size: 1rem;
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .apply-btn {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          border: none;
          padding: 0.875rem 1.5rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .apply-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }
        
        /* Footer Styles */
        .footer {
          text-align: center;
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid #e2e8f0;
        }
        
        .footer-title {
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 0.5rem;
        }
        
        .footer-text {
          color: #64748b;
          font-size: 10px;
        }
        
        .footer-email {
          color: #1e40af;
          font-weight: 600;
        }
        
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }
        
        .modal-content {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .modal-header {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: between;
          border-radius: 20px 20px 0 0;
        }
        
        .modal-title {
          font-size: 1.25rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
        }
        
        .close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        .modal-body {
          padding: 2rem 1.5rem;
        }
        
        @media (max-width: 768px) {
          .modal-body {
            padding: 1.5rem 1rem;
          }
        }
        
        .selected-job-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        
        .selected-job-division {
          color: #64748b;
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .how-to-apply {
          background: linear-gradient(135deg, #f8faff 0%, #f1f5ff 100%);
          margin-bottom: 1.5rem;
          border: 1px solid #e2e8f0;
        }
        
        .how-to-apply-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #16a34a;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .email-box {
          background: white;
          border: 2px dashed #3b82f6;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }
        
        .email-box:hover {
          border-color: #1e40af;
          transform: scale(1.02);
        }
        
        .email-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          display: block;
        }
        
        .email-address {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e40af;
          word-break: break-all;
        }
        
        @media (max-width: 768px) {
          .email-address {
            font-size: 10px;
          }
        }
        
        .tip-box {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
        }
        
        .tip-text {
          color: #1e40af;
          font-weight: 500;
          margin: 0;
        }
        
        .modal-footer {
          padding: 1.5rem;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }
        
        @media (max-width: 768px) {
          .modal-footer {
            flex-direction: column;
          }
        }
        
        .btn-secondary {
          background: #f1f5f9;
          color: #64748b;
          border: 1px solid #e2e8f0;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .btn-secondary:hover {
          background: #e2e8f0;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
      `}</style>
      
      <div className="main-wrapper">
        <div className="container">
          {/* Header */}
          <div className="header">
            <h1 className="main-title">
              🌟 Current Job Openings
            </h1>
            <p className="main-subtitle">
              Join our dynamic team at Global Health & Allied Services
            </p>
            <hr className="divider" />
          </div>

          {/* Job Divisions */}
          {Object.entries(jobData).map(([key, division]) => (
            <div key={key} className="section">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="section-icon">{division.icon}</span>
                  {division.title}
                </h2>
              </div>
              
              <div className="jobs-grid">
                {division.jobs.map((job, index) => (
                  <div key={index} className="job-card">
                    <div className="job-card-header">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                        <h3 className="job-card-title">{job.title}</h3>
                        <span className={`job-badge ${getBadgeClass(job.badge)}`}>
                          {job.badge}
                        </span>
                      </div>
                    </div>
                    
                    <div className="job-card-body">
                      <span className="job-type">
                        {job.type}
                      </span>
                      
                      <p className="job-description">
                        {job.description}
                      </p>
                      
                      <div className="job-salary">
                        <span>💰</span>
                        {job.salary}
                      </div>
                      
                      <button
                        className="apply-btn"
                        onClick={() => handleApplyClick(job, division)}
                      >
                        <span>📧</span>
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="footer">
            <p className="footer-title">
              Global Health & Allied Services
            </p>
            <p className="footer-text">
              Building careers, transforming healthcare
            </p>
            <p className="footer-text">
              For any queries, contact us at: <span className="footer-email">info@globalhealthandalliedservices.com</span>
            </p>
          </div>
        </div>

        {/* Application Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h5 className="modal-title">
                  <span>📧</span>
                  Apply for Position
                </h5>
                <button className="close-btn" onClick={handleCloseModal}>
                  ✕
                </button>
              </div>
              
              <div className="modal-body">
                {selectedJob && (
                  <>
                    <h4 className="selected-job-title">{selectedJob.title}</h4>
                    <p className="selected-job-division">{selectedJob.division}</p>
                    
                    <div className="how-to-apply">
                      <h5 className="how-to-apply-title">
                        <span>✉️</span>
                        How to Apply
                      </h5>
                      <p style={{ marginBottom: '1rem', fontWeight: '500' }}>
                        Share your resume and experience on:
                      </p>
                      <div className="email-box">
                        <span className="email-icon">📧</span>
                        <div className="email-address">info@globalhealthandalliedservices.com</div>
                      </div>
                    </div>
                    
                    <div className="tip-box">
                      <p className="tip-text">
                        <span style={{ marginRight: '0.5rem' }}>💡</span>
                        <strong>Tip:</strong> Please mention the job title "{selectedJob.title}" in your email subject line.
                      </p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="modal-footer">
                <button className="btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    window.open(`mailto:info@globalhealthandalliedservices.com?subject=Application for ${selectedJob?.title}`, '_blank');
                    handleCloseModal();
                  }}
                >
                  <span>📧</span>
                  Send Email
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Currentpening;