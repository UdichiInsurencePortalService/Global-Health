import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SponsorshipPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = 'https://globalhealthandalliedservices.com/api';
  
  const ADVANCE_PERCENTAGE = 15;

  const pricingTiers = [
    {
      name: 'Silver',
      price: 215000,
      priceDisplay: '₹2,15,000',
      features: [
        'Logo on event website',
        'Social media mentions',
        'Brand recognition in promotional materials',
        'Certificate of sponsorship',
        '2 complimentary event passes'
      ],
      color: 'secondary',
      badgeColor: '#d63232ff'
    },
    {
      name: 'Gold',
      price: 430000,
      priceDisplay: '₹4,30,000',
      features: [
        'All Silver benefits',
        'Logo on event banners',
        'Booth space at the event',
        'Speaking opportunity (5 minutes)',
        'Premium social media features',
        '5 complimentary event passes'
      ],
      color: 'warning',
      badgeColor: '#FFD700',
      featured: true
    },
    {
      name: 'Platinum',
      price: 1000000,
      priceDisplay: '₹10,00,000',
      features: [
        'All Gold benefits',
        'Title sponsor recognition',
        'Prime booth location',
        'Keynote speaking slot (15 minutes)',
        'Logo on all event materials',
        'Press release feature',
        '10 complimentary event passes',
        'VIP networking session access'
      ],
      color: 'info',
      badgeColor: '#4b3a8dff'
    }
  ];

  const calculateAdvanceAmount = (totalPrice) => {
    return Math.round(totalPrice * (ADVANCE_PERCENTAGE / 100));
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openPaymentModal = (tier) => {
    setSelectedTier(tier);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedTier(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay SDK. Please check your internet connection.');
        setLoading(false);
        return;
      }

      const advanceAmount = calculateAdvanceAmount(selectedTier.price);
      const remainingAmount = selectedTier.price - advanceAmount;

      const orderResponse = await fetch(`${API_BASE_URL}/payment/createorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: advanceAmount,
          userDetails: {
            ...formData,
            totalAmount: selectedTier.price,
            advanceAmount: advanceAmount,
            remainingAmount: remainingAmount,
            advancePercentage: ADVANCE_PERCENTAGE
          }
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      const options = {
        key: 'rzp_live_4GMG4265FQmj65',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Global Health & Allied Services',
        description: `${selectedTier.name} - ${ADVANCE_PERCENTAGE}% Advance Payment`,
        order_id: orderData.orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          package: selectedTier.name,
          total_amount: selectedTier.price,
          advance_amount: advanceAmount,
          remaining_amount: remainingAmount
        },
        theme: {
          color: '#007bff',
        },
        handler: async function (response) {
          try {
            const verifyResponse = await fetch(`${API_BASE_URL}/api/payment/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                donorDetails: {
                  ...formData,
                  package: selectedTier.name,
                  totalAmount: selectedTier.price,
                  advanceAmount: advanceAmount,
                  remainingAmount: remainingAmount,
                  advancePercentage: ADVANCE_PERCENTAGE
                }
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              alert(`Advance Payment Successful!\n\nPackage: ${selectedTier.name}\nAdvance Paid: ₹${advanceAmount.toLocaleString('en-IN')}\nRemaining Balance: ₹${remainingAmount.toLocaleString('en-IN')}\n\nThank you! We will contact you shortly for the remaining payment.`);
              closePaymentModal();
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Verification error:', error);
            alert('Payment verification failed. Please contact support with your payment ID.');
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoading(false);

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '40px', paddingBottom: '60px' }}>
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-3">
            Sponsorship Opportunity
          </h1>
          <div style={{ width: '80px', height: '4px', backgroundColor: '#007bff', margin: '0 auto 30px' }}></div>
        </div>

        <Card className="shadow-sm mb-4">
          <Card.Body className="p-4">
            <h2 className="h3 text-dark mb-3">About the Sponsorship</h2>
            <p className="lead text-muted mb-3">
              Partner with Global Health and Allied Services to make a meaningful impact in the healthcare community. 
              Our sponsorship program offers unique opportunities to align your brand with excellence in healthcare, 
              connect with industry leaders, and demonstrate your commitment to advancing health services globally.
            </p>
            <p className="text-muted">
              As a sponsor, you'll gain visibility among healthcare professionals, decision-makers, and organizations 
              dedicated to improving health outcomes. Your support will help us continue our mission while providing 
              your organization with valuable exposure and networking opportunities.
            </p>
          </Card.Body>
        </Card>

        <Card className="bg-primary text-white shadow-sm mb-5">
          <Card.Body className="p-4 text-center">
            <h2 className="h3 mb-3">Get in Touch for Sponsorship Enquiry</h2>
            <p className="lead mb-4">Interested in becoming a sponsor? We'd love to hear from you!</p>
            <Row className="justify-content-center g-4">
              <Col md={6} lg={5}>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <i className="bi bi-envelope-fill"></i>
                  <a href="mailto:info@globalhealthandalliedservices.com" className="text-white text-decoration-none">
                    info@globalhealthandalliedservices.com
                  </a>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <i className="bi bi-telephone-fill"></i>
                  <a href="tel:0806940922" className="text-white text-decoration-none">
                    0806940922
                  </a>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold text-dark mb-2">Sponsorship Packages</h2>
          <p className="text-muted lead">Choose the package that best fits your organization</p>
        </div>

        <Row className="g-4 mb-4">
          {pricingTiers.map((tier, idx) => (
            <Col key={idx} lg={4} md={6}>
              <Card 
                className={`h-100 shadow-sm ${tier.featured ? 'border-primary border-2' : ''}`}
                style={{ transform: tier.featured ? 'scale(1.02)' : 'scale(1)', transition: 'all 0.3s' }}
              >
                {tier.featured && (
                  <div className="position-absolute top-0 start-50 translate-middle">
                    <Badge bg="primary" className="px-3 py-2">POPULAR</Badge>
                  </div>
                )}
                
                <Card.Body className="text-center p-4">
                  <div 
                    className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: tier.badgeColor + '30',
                      border: `3px solid ${tier.badgeColor}`
                    }}
                  >
                    <i className="bi bi-star-fill" style={{ fontSize: '2rem', color: tier.badgeColor }}></i>
                  </div>

                  <h3 className="h2 fw-bold mb-3" style={{ color: tier.badgeColor === '#FFD700' ? '#FFA500' : tier.badgeColor }}>
                    {tier.name}
                  </h3>

                  <div className="display-6 fw-bold text-dark mb-4">
                    {tier.priceDisplay}
                  </div>

                  <ul className="list-unstyled text-start mb-4">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="mb-3 d-flex align-items-start">
                        <i className="bi bi-check-circle-fill text-success me-2 mt-1" style={{ fontSize: '1.2rem' }}></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={tier.featured ? 'primary' : 'outline-primary'}
                    size="lg"
                    className="w-100 rounded-pill fw-bold"
                    onClick={() => openPaymentModal(tier)}
                  >
                    Select Package
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showPaymentModal} onHide={closePaymentModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedTier?.name} Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTier && (
            <>
              <Alert variant="info" className="mb-4">
                <Alert.Heading className="h6">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  Advance Payment (15% for Confirmation)
                </Alert.Heading>
                <hr />
                <Row>
                  <Col sm={6}>
                    <strong>Total Package Amount:</strong>
                    <div className="h5 text-dark mb-0">{selectedTier.priceDisplay}</div>
                  </Col>
                  <Col sm={6}>
                    <strong>Pay Now (15% Advance):</strong>
                    <div className="h5 text-primary mb-0">
                      ₹{calculateAdvanceAmount(selectedTier.price).toLocaleString('en-IN')}
                    </div>
                  </Col>
                </Row>
                <hr />
                <small className="text-muted">
                  <i className="bi bi-cash-stack me-1"></i>
                  Remaining amount of <strong>₹{(selectedTier.price - calculateAdvanceAmount(selectedTier.price)).toLocaleString('en-IN')}</strong> will be collected later.
                </small>
              </Alert>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Company/Organization</Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Message (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Any additional information..."
                  />
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closePaymentModal}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handlePayment}
            disabled={loading}
            className="px-4"
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : (
              <>
                <i className="bi bi-credit-card me-2"></i>
                Pay ₹{selectedTier && calculateAdvanceAmount(selectedTier.price).toLocaleString('en-IN')} Now
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}