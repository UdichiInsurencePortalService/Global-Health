import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const CurrentOpenings = () => {
  const [showModal, setShowModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobForDescription, setSelectedJobForDescription] = useState(null);

  const vacancyData = [
    {
      slNo: 1,
      postName: "Product Manager – Recruitment Portal",
      department: "Technology",
      vacancies: 237,
      salary: "Rs 65000.00",
    },
    {
      slNo: 2,
      postName: "Business Development Manager – Insurance",
      department: "Insurance",
      vacancies: 79,
      salary: "Rs 47500.00",
    },
    {
      slNo: 3,
      postName: "Program Manager – Healthcare Awards",
      department: "Healthcare",
      vacancies: 325,
      salary: "Rs 55000.00",
    },
    {
      slNo: 4,
      postName: "Software Developers (Full-Stack)",
      department: "Technology",
      vacancies: 3,
      salary: "Rs 55000.00",
    },
    {
      slNo: 5,
      postName: "Event & Sponsorship Manager",
      department: "Healthcare",
      vacancies: 73,
      salary: "Rs 42500.00",
    },
    {
      slNo: 6,
      postName: "Operations & Claims Executive",
      department: "Insurance",
      vacancies: 760,
      salary: "Rs 25000.00",
    },
    {
      slNo: 7,
      postName: "Customer Relationship Officer",
      department: "Insurance",
      vacancies: 15,
      salary: "Rs 21500.00",
    },
    {
      slNo: 8,
      postName: "Insurance Agents / Freelance Advisors",
      department: "Insurance",
      vacancies: 1550,
      salary: "15% commission",
    },
    {
      slNo: 9,
      postName: "Medical Experts / Jury Members",
      department: "Medical Award",
      vacancies: 127,
      salary: "Rs 10000 per cycle",
    }
  ];

  const jobDescriptions = {
    "Product Manager – Insurance": {
      location: "PAN INDIA",
      department: "Insurance Division",
      reportsTo: "Head of Insurance Operations",
      overview: "The Product Manager – Insurance will be responsible for conceptualising, developing, and managing innovative insurance products tailored to customer needs. This role involves market research, competitor analysis, regulatory compliance, and collaboration with cross-functional teams to ensure successful product lifecycle management.",
      responsibilities: [
        "Conduct market analysis to identify product gaps and opportunities",
        "Design and launch insurance products (life, health, general, or customised plans)",
        "Ensure products comply with IRDAI and other regulatory requirements",
        "Collaborate with underwriting, claims, actuarial, and tech teams for product implementation",
        "Develop product positioning, pricing strategies, and customer value propositions",
        "Monitor performance metrics and refine products for profitability and customer satisfaction",
        "Support digital transformation in insurance product delivery"
      ],
      qualifications: [
        "Graduate/MBA/PGDM in Insurance, Finance, or related field",
        "Experience in insurance product development desirable",
        "Strong understanding of IRDAI guidelines",
        "Analytical and problem-solving ability",
        "Excellent communication and stakeholder management skills"
      ]
    },
    "Business Development Manager – Insurance": {
      location: "PAN INDIA",
      department: "Sales & Business Development – Insurance",
      reportsTo: "Director – Insurance Vertical",
      overview: "The Business Development Manager (BDM) will drive business growth through strategic partnerships, client acquisition, and channel development in the insurance sector.",
      responsibilities: [
        "Develop and implement business growth strategies for insurance products",
        "Acquire new clients through B2B, B2C, and digital channels",
        "Build partnerships with brokers, agents, corporates, and digital platforms",
        "Achieve revenue targets and expand market share",
        "Conduct presentations, proposals, and negotiations with potential clients",
        "Work closely with marketing for lead generation campaigns",
        "Track competitor activities and provide market intelligence"
      ],
      qualifications: [
        "Graduate/Postgraduate in Business, Insurance, or related discipline",
        "Strong networking and client relationship skills",
        "Proven track record of achieving sales targets",
        "Knowledge of digital sales channels will be an advantage"
      ]
    },
    "Event & Sponsorship Manager": {
      location: "PAN INDIA",
      department: "Events & Partnerships",
      reportsTo: "CEO/Head – Marketing & Outreach",
      overview: "The Event & Sponsorship Manager will lead the planning, execution, and monetisation of organisational events including conferences, award shows, and promotional activities. The role will focus on sponsorship acquisition, stakeholder engagement, and ensuring high-quality event delivery.",
      responsibilities: [
        "Plan, coordinate, and manage events (insurance expos, healthcare awards, recruitment fairs)",
        "Design sponsorship packages and secure corporate sponsors/partners",
        "Manage budgets, vendor contracts, and event logistics",
        "Build and maintain relationships with sponsors, partners, and media",
        "Collaborate with marketing for promotions, PR, and digital campaigns",
        "Ensure smooth on-ground execution and post-event evaluation"
      ],
      qualifications: [
        "Graduate/Postgraduate in Event Management, Marketing, or related field",
        "Desirable experience in event planning & sponsorship sales",
        "Strong negotiation and client relationship skills",
        "Ability to manage multiple large-scale events",
        "Creativity with strong project management skills"
      ]
    },
    "Program Manager – Healthcare Awards": {
      location: "PAN INDIA",
      department: "Medical/Healthcare Awards Vertical",
      reportsTo: "Director – Awards & Recognition",
      overview: "The Program Manager will oversee the complete lifecycle of the organisation's Medical & Health Awards, from program design and nomination management to jury coordination, event execution, and stakeholder engagement.",
      responsibilities: [
        "Develop the framework, categories, and criteria for healthcare awards",
        "Manage nomination, shortlisting, and jury evaluation processes",
        "Coordinate with medical associations, hospitals, and healthcare professionals",
        "Ensure transparency and credibility in the award process",
        "Manage timelines, budgets, and program resources",
        "Collaborate with Event & Sponsorship Manager for award ceremony execution",
        "Build long-term partnerships with healthcare institutions and stakeholders"
      ],
      qualifications: [
        "Postgraduate in Healthcare Management, Public Health, or related field",
        "Experience in healthcare program management or awards/events preferred",
        "Strong knowledge of India's healthcare ecosystem",
        "Excellent organisational, communication, and leadership skills",
        "Experience in stakeholder engagement and program execution"
      ]
    },
    "Operations & Claims Executive": {
      location: "PAN INDIA",
      department: "Insurance Operations",
      reportsTo: "Operations Manager",
      overview: "The Operations & Claims Executive will manage policy servicing, claims processing, and backend support to ensure smooth and efficient insurance operations while maintaining compliance with regulatory standards.",
      responsibilities: [
        "Handle end-to-end claims processing (verification, documentation, coordination with insurers)",
        "Ensure accuracy in policy issuance, endorsements, renewals, and cancellations",
        "Maintain claim records and generate periodic reports",
        "Liaise with clients, hospitals, surveyors, and third-party administrators (TPAs)",
        "Monitor compliance with IRDAI regulations and internal SOPs",
        "Provide operational support for insurance product delivery and customer queries"
      ],
      qualifications: [
        "Graduate in Commerce, Finance, or Insurance-related field",
        "0–4 years' experience in insurance operations or claims",
        "Strong knowledge of claims settlement processes",
        "Attention to detail, problem-solving, and documentation skills",
        "Familiarity with insurance software/TPA portals will be an advantage"
      ]
    },
    "Customer Relationship Officer": {
      location: "PAN INDIA",
      department: "Customer Service / CRM",
      reportsTo: "Head – Customer Relations",
      overview: "The CRO will act as the primary contact point for customers, ensuring high levels of satisfaction, timely resolution of queries, and long-term relationship building across the organisation's insurance, recruitment, and healthcare award verticals.",
      responsibilities: [
        "Handle customer inquiries, complaints, and service requests effectively",
        "Maintain regular communication with clients and policyholders",
        "Support policy renewals, claim follow-ups, and product/service information",
        "Conduct periodic feedback surveys to improve service delivery",
        "Coordinate with operations, sales, and technical teams to resolve issues",
        "Build loyalty and trust through personalised customer care"
      ],
      qualifications: [
        "Graduate in any discipline; MBA preferred",
        "0–3 years' experience in customer service, preferably in insurance/healthcare",
        "Strong communication, empathy, and interpersonal skills",
        "Ability to multitask and manage client expectations",
        "Proficiency in CRM tools and MS Office"
      ]
    },
    "Insurance Agents / Freelance Advisors": {
      location: "Multiple Locations / Field-based",
      department: "Sales – Insurance",
      reportsTo: "Business Development Manager",
      overview: "The Insurance Agent will promote and sell insurance products, generate leads, and provide guidance to clients on suitable plans. This role is target-driven and critical to expanding the organisation's reach in the insurance sector.",
      responsibilities: [
        "Identify prospective clients and generate leads",
        "Explain policy features, benefits, and exclusions clearly to customers",
        "Assist clients in selecting suitable insurance products",
        "Support in policy application, documentation, and renewals",
        "Achieve assigned sales targets and contribute to business growth",
        "Maintain compliance with IRDAI regulations and ethical selling practices"
      ],
      qualifications: [
        "Minimum 12th pass (IRDAI license mandatory or willingness to obtain)",
        "Prior experience in insurance sales/agency preferred",
        "Strong sales aptitude and customer service orientation",
        "Excellent communication and persuasion skills",
        "Ability to work independently and meet deadlines"
      ]
    },
    "Medical Experts / Jury Members": {
      location: "PAN INDIA",
      department: "Healthcare Awards Division",
      reportsTo: "Program Director – Healthcare Awards",
      overview: "Medical Experts and Jury Members will evaluate nominations, validate clinical excellence, and provide unbiased assessments to recognise outstanding contributions in the healthcare sector.",
      responsibilities: [
        "Review and assess award nominations across various categories",
        "Contribute to the design of evaluation parameters and scoring rubrics",
        "Provide medical/clinical insights to maintain credibility and transparency",
        "Participate in jury meetings, deliberations, and final decision-making",
        "Uphold fairness, confidentiality, and integrity in the award process",
        "Represent the awards in conferences, panel discussions, and ceremonies"
      ],
      qualifications: [
        "MBBS/MD/PhD in Medicine, Public Health, or related field",
        "10+ years' professional experience in healthcare practice, research, or administration",
        "Recognised expertise and credibility in the medical community",
        "Strong ethical standards and impartial judgment",
        "Prior experience in jury panels, medical boards, or associations (preferred)"
      ]
    }
  };

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
          title: "Medical Experts / Jury Members",
          type: "Freelance Role",
          salary: "₹5,000–₹15,000 per award cycle",
          description: "Evaluate nominations, score applicants, join award jury panel.",
          badge: "Expert Level"
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
        }
      ]
    }
  };

  const getBadgeVariant = (type) => {
    switch (type) {
      case 'Senior Level': return 'danger';
      case 'Technical': return 'info';
      case 'Mid Level': return 'warning';
      case 'Entry Level': return 'success';
      case 'Expert': return 'primary';
      case 'Commission': return 'secondary';
      default: return 'light';
    }
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Senior Level': return 'danger';
      case 'Mid Level': return 'warning';
      case 'Entry Level': return 'success';
      case 'Commission Based': return 'info';
      case 'Expert Level': return 'primary';
      case 'Technical': return 'secondary';
      default: return 'light';
    }
  };

  const handleShowJobDescription = (jobTitle) => {
    const description = jobDescriptions[jobTitle];
    if (description) {
      setSelectedJobForDescription({ title: jobTitle, ...description });
      setShowJobModal(true);
    }
  };

  const handleApplyClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <Container fluid className="py-4">
        {/* Vacancy Table */}
        <Row className="mb-4">
          <Col xs={12}>
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0 fw-bold">
                  <i className="bi bi-briefcase me-2"></i>
                  Vacancy Details - Multi-Domain Recruitment
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table bordered hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="text-center" style={{ width: '8%' }}>SL. No.</th>
                        <th style={{ width: '35%' }}>Name of the post</th>
                        <th className="text-center" style={{ width: '15%' }}>Department</th>
                        <th className="text-center" style={{ width: '12%' }}>Vacancies</th>
                        <th className="text-center" style={{ width: '15%' }}>Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vacancyData.map((vacancy) => (
                        <tr key={vacancy.slNo}>
                          <td className="text-center fw-bold">{vacancy.slNo}</td>
                          <td>
                            <div className="fw-semibold">{vacancy.postName}</div>
                            {jobDescriptions[vacancy.postName] && (
                              <Button
                                variant="link"
                                size="sm"
                                className="p-0 text-decoration-none"
                                onClick={() => handleShowJobDescription(vacancy.postName)}
                              >
                                <small>View Job Description →</small>
                              </Button>
                            )}
                          </td>
                          <td className="text-center">
                            <Badge bg="light" text="dark" className="px-2 py-1">
                              {vacancy.department}
                            </Badge>
                          </td>
                          <td className="text-center fw-bold text-primary fs-5">
                            {vacancy.vacancies}
                          </td>
                          <td className="text-center fw-semibold">{vacancy.salary}</td>
                         
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                
                {/* Summary Section */}
                <div className="p-3 bg-light border-top">
                  <Row>
                    <Col md={6} className="mb-2 mb-md-0">
                      <h6 className="mb-2 text-muted">
                        <i className="bi bi-graph-up me-1"></i>
                        Summary
                      </h6>
                      <p className="mb-1 small">
                        <strong>Total Positions:</strong> {vacancyData.length}
                      </p>
                      <p className="mb-0 small">
                        <strong>Total Vacancies:</strong> {vacancyData.reduce((sum, item) => sum + item.vacancies, 0)}
                      </p>
                    </Col>
                    <Col md={6}>
                      <h6 className="mb-2 text-muted">
                        <i className="bi bi-building me-1"></i>
                        Departments
                      </h6>
                      <div className="d-flex flex-wrap gap-1">
                        {[...new Set(vacancyData.map(item => item.department))].map(dept => (
                          <Badge key={dept} bg="outline-secondary" text="dark" className="border">
                            {dept}
                          </Badge>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Job Cards Section */}
        <Row className="mb-4">
          <Col xs={12}>
            <div className="text-center mb-4">
              <h1 className="display-4 fw-bold text-primary mb-3">
                <i className="bi bi-star-fill me-2"></i>
                Current Job Openings
              </h1>
              <p className="lead text-muted">
                Join our dynamic team at Global Health & Allied Services
              </p>
              <hr className="w-25 mx-auto border-primary border-3" />
            </div>

            {Object.entries(jobData).map(([key, division]) => (
              <Card key={key} className="mb-4 shadow-sm">
                <Card.Header className="bg-gradient" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' }}>
                  <h3 className="text-white mb-0 d-flex align-items-center">
                    <span className="me-2" style={{ fontSize: '1.5rem' }}>{division.icon}</span>
                    {division.title}
                  </h3>
                </Card.Header>
                <Card.Body>
                  <Row>
                    {division.jobs.map((job, index) => (
                      <Col key={index} lg={6} xl={4} className="mb-4">
                        <Card className="h-100 border-0 shadow-sm">
                          <Card.Header className="bg-light border-bottom">
                            <div className="d-flex justify-content-between align-items-start">
                              <h6 className="fw-bold mb-0 flex-grow-1">{job.title}</h6>
                              <Badge bg={getBadgeColor(job.badge)} className="ms-2">
                                {job.badge}
                              </Badge>
                            </div>
                          </Card.Header>
                          <Card.Body className="d-flex flex-column">
                            <Badge bg="secondary" className="align-self-start mb-2 px-2 py-1">
                              {job.type}
                            </Badge>
                            <p className="text-muted small flex-grow-1 mb-3">
                              {job.description}
                            </p>
                            <div className="mt-auto">
                              <div className="d-flex align-items-center mb-2">
                                <i className="bi bi-currency-rupee text-primary me-1"></i>
                                <span className="fw-semibold text-primary">{job.salary}</span>
                              </div>
                              {jobDescriptions[job.title] && (
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  className="w-100"
                                  onClick={() => handleShowJobDescription(job.title)}
                                >
                                  <i className="bi bi-eye me-1"></i>
                                  View Details
                                </Button>
                              )}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            ))}

            {/* Single Apply Now Section */}
           <Card className="bg-primary text-white text-center shadow-lg border-0 rounded-4 my-5">
      <Card.Body className="py-5 px-4">
        <h2 className="mb-3 fw-bold">
          <i className="bi bi-rocket-takeoff me-2"></i>
          Ready to Join Our Team?
        </h2>
        <p className="lead mb-4">
          Take the next step in your career with <br />
          <strong>Global Health & Allied Services</strong>
        </p>
        <Link
          to="/currentform"
          onClick={handleApplyClick}
          className="text-decoration-none"
        >
          <Button
            variant="light"
            size="lg"
            className="px-5 py-3 fw-bold text-primary rounded-pill shadow-sm"
          >
            <i className="bi bi-envelope-fill me-2"></i>
            Apply Now
          </Button>
        </Link>
      </Card.Body>
    </Card>

            {/* Footer */}
            <div className="text-center mt-5 pt-4 border-top">
              <h5 className="text-primary fw-bold mb-2">
                Global Health & Allied Services
              </h5>
              <p className="text-muted mb-1">Building careers, transforming healthcare</p>
              <p className="small text-muted">
                For any queries, contact us at:{' '}
                <a href="mailto:info@globalhealthandalliedservices.com" className="text-primary fw-semibold">
                  info@globalhealthandalliedservices.com
                </a>
              </p>
            </div>
          </Col>
        </Row>

        {/* Job Description Modal */}
       {/* Job Description Modal */}
        <Modal show={showJobModal} onHide={() => setShowJobModal(false)} size="lg" scrollable centered>
          <Modal.Header closeButton className="bg-gradient text-white border-0" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' }}>
            <Modal.Title className="d-flex align-items-center">
              <i className="bi bi-file-earmark-text me-2"></i>
              Job Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            {selectedJobForDescription && (
              <div>
                {/* Job Title Card */}
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Body className="bg-light">
                    <h3 className="text-primary fw-bold mb-0">{selectedJobForDescription.title}</h3>
                  </Card.Body>
                </Card>

                {/* Role Overview Card */}
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                        <i className="bi bi-file-text fs-4 text-primary"></i>
                      </div>
                      <h5 className="text-primary fw-bold mb-0">Role Overview</h5>
                    </div>
                    <p className="text-muted mb-0 lh-lg">{selectedJobForDescription.overview}</p>
                  </Card.Body>
                </Card>

                {/* Key Responsibilities Card */}
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                        <i className="bi bi-list-check fs-4 text-success"></i>
                      </div>
                      <h5 className="text-success fw-bold mb-0">Key Responsibilities</h5>
                    </div>
                    <div className="ps-2">
                      {selectedJobForDescription.responsibilities.map((resp, index) => (
                        <div key={index} className="mb-3 d-flex align-items-start">
                          <div className="me-3 mt-1">
                            <i className="bi bi-check-circle-fill text-success"></i>
                          </div>
                          <p className="mb-0 text-muted">{resp}</p>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="border-0 bg-light">
            <Button variant="secondary" onClick={() => setShowJobModal(false)} className="px-4">
              <i className="bi bi-x-circle me-2"></i>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Application Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>
              <i className="bi bi-envelope-fill me-2"></i>
              Apply for Position
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center py-4">
            <div className="mb-4">
              <i className="bi bi-envelope-check display-1 text-primary mb-3"></i>
              <h4 className="text-primary mb-3">How to Apply</h4>
              <p className="lead mb-4">Share your resume and experience with us:</p>
              
              <Card className="border-2 border-primary border-dashed">
                <Card.Body className="py-4">
                  <i className="bi bi-envelope-at display-6 text-primary mb-2"></i>
                  <h5 className="text-primary fw-bold">
                    info@globalhealthandalliedservices.com
                  </h5>
                </Card.Body>
              </Card>
            </div>
            
            <Alert className="alert-info">
              <i className="bi bi-lightbulb me-2"></i>
              <strong>Tip:</strong> Please mention the specific job title you're interested in within your email subject line.
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button 
              variant="primary"
              onClick={() => {
                window.open('mailto:info@globalhealthandalliedservices.com?subject=Job Application - Global Health & Allied Services', '_blank');
                setShowModal(false);
              }}
            >
              <i className="bi bi-envelope-fill me-1"></i>
              Send Email
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default CurrentOpenings;