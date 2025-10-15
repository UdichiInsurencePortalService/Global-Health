import React from 'react';

export default function SponsorshipPage() {
  const pricingTiers = [
    {
      name: 'Bronze',
      price: '$2,500',
      features: [
        'Logo on event website',
        'Social media mentions',
        'Brand recognition in promotional materials',
        'Certificate of sponsorship',
        '2 complimentary event passes'
      ],
      color: '#CD7F32'
    },
    {
      name: 'Silver',
      price: '$5,000',
      features: [
        'All Bronze benefits',
        'Logo on event banners',
        'Booth space at the event',
        'Speaking opportunity (5 minutes)',
        'Premium social media features',
        '5 complimentary event passes'
      ],
      color: '#C0C0C0',
      featured: true
    },
    {
      name: 'Premium',
      price: '$10,000',
      features: [
        'All Silver benefits',
        'Title sponsor recognition',
        'Prime booth location',
        'Keynote speaking slot (15 minutes)',
        'Logo on all event materials',
        'Press release feature',
        '10 complimentary event passes',
        'VIP networking session access'
      ],
      color: '#FFD700'
    }
  ];

  const styles = {
    container: {
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '40px 20px 60px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    maxWidth: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '50px'
    },
    heading: {
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '20px'
    },
    divider: {
      width: '80px',
      height: '4px',
      backgroundColor: '#007bff',
      margin: '0 auto 30px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '40px',
      marginBottom: '40px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    cardTitle: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      color: '#2c3e50',
      marginBottom: '20px'
    },
    cardText: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: '#555',
      marginBottom: '20px'
    },
    contactCard: {
      backgroundColor: '#007bff',
      color: 'white',
      borderRadius: '12px',
      padding: '40px',
      marginBottom: '50px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    contactRow: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '30px',
      marginTop: '30px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    contactLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '1.1rem',
      wordBreak: 'break-all'
    },
    pricingGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '30px',
      marginTop: '40px'
    },
    pricingCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '40px 30px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
      position: 'relative',
      border: '2px solid transparent'
    },
    pricingCardFeatured: {
      border: '2px solid #007bff',
      transform: 'scale(1.05)'
    },
    badge: {
      position: 'absolute',
      top: '-15px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#007bff',
      color: 'white',
      padding: '5px 20px',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: 'bold'
    },
    iconCircle: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      margin: '0 auto 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    tierName: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      marginBottom: '20px'
    },
    price: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '30px'
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      textAlign: 'left',
      marginBottom: '30px'
    },
    featureItem: {
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'flex-start',
      fontSize: '0.95rem'
    },
    button: {
      width: '100%',
      padding: '15px 30px',
      borderRadius: '25px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    buttonPrimary: {
      backgroundColor: '#007bff',
      color: 'white'
    },
    buttonOutline: {
      backgroundColor: 'transparent',
      color: '#007bff',
      border: '2px solid #007bff'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.heading}>Sponsorship Opportunity</h1>
          <div style={styles.divider}></div>
        </div>

        {/* About Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>About the Sponsorship</h2>
          <p style={styles.cardText}>
            Partner with Global Health and Allied Services to make a meaningful impact in the healthcare community. 
            Our sponsorship program offers unique opportunities to align your brand with excellence in healthcare, 
            connect with industry leaders, and demonstrate your commitment to advancing health services globally.
          </p>
          <p style={styles.cardText}>
            As a sponsor, you'll gain visibility among healthcare professionals, decision-makers, and organizations 
            dedicated to improving health outcomes. Your support will help us continue our mission while providing 
            your organization with valuable exposure and networking opportunities.
          </p>
        </div>

        {/* Contact Section */}
        <div style={styles.contactCard}>
          <h2 style={{ marginBottom: '15px', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Get in Touch for Sponsorship Enquiry
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
            Interested in becoming a sponsor? We'd love to hear from you!
          </p>
          <div style={styles.contactRow}>
            <div style={styles.contactItem}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
              </svg>
              <a href="mailto:info@globalhealthandalliedservices.com" style={styles.contactLink}>
                info@globalhealthandalliedservices.com
              </a>
            </div>
            <div style={styles.contactItem}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
              </svg>
              <a href="tel:0806940922" style={styles.contactLink}>
                0806940922
              </a>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div style={styles.header}>
          <h2 style={{ ...styles.heading, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
            Sponsorship Packages
          </h2>
          <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
            Choose the package that best fits your organization
          </p>
        </div>

        <div style={styles.pricingGrid}>
          {pricingTiers.map((tier, idx) => (
            <div 
              key={idx} 
              style={{
                ...styles.pricingCard,
                ...(tier.featured ? styles.pricingCardFeatured : {})
              }}
            >
              {tier.featured && <div style={styles.badge}>POPULAR</div>}
              
              <div style={{
                ...styles.iconCircle,
                backgroundColor: tier.color + '20',
                border: `3px solid ${tier.color}`
              }}>
                <svg width="40" height="40" fill={tier.color} viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                </svg>
              </div>

              <h3 style={{ ...styles.tierName, color: tier.color }}>
                {tier.name}
              </h3>

              <div style={styles.price}>{tier.price}</div>

              <ul style={styles.featureList}>
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} style={styles.featureItem}>
                    <svg width="20" height="20" fill="#28a745" style={{ marginRight: '10px', flexShrink: 0 }} viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                style={{
                  ...styles.button,
                  ...(tier.featured ? styles.buttonPrimary : styles.buttonOutline)
                }}
                onMouseEnter={(e) => {
                  if (tier.featured) {
                    e.target.style.backgroundColor = '#0056b3';
                  } else {
                    e.target.style.backgroundColor = '#007bff';
                    e.target.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (tier.featured) {
                    e.target.style.backgroundColor = '#007bff';
                  } else {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#007bff';
                  }
                }}
              >
                Select Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}