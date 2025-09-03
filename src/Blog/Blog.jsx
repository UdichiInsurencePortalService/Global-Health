import React, { useState } from "react";

const Blog = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredSidebarItem, setHoveredSidebarItem] = useState(null);

  // Sample image URLs for demonstration
  const blogImages = {
    carInsurance: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop",
    lifeInsurance: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    healthInsurance: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
    autoInsurance: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop",
    homeInsurance: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop",
    businessInsurance: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
    liabilityInsurance: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
    propertyInsurance: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop"
  };

  const blogPosts = [
    {
      id: 1,
      title: "Best Car Insurance Plans for 2025",
      description: "Discover the top-rated car insurance policies that provide comprehensive coverage and affordable premiums for modern drivers.",
      image: blogImages.carInsurance,
      category: "Auto Insurance",
      readTime: "5 min read",
      author: "Insurance Expert",
      date: "Mar 15, 2025"
    },
    {
      id: 2,
      title: "Why You Need Life Insurance in 2025",
      description: "Life insurance secures your family's future. Learn how to choose the best plan that fits your lifestyle and budget.",
      image: blogImages.lifeInsurance,
      category: "Life Insurance",
      readTime: "7 min read",
      author: "Financial Advisor",
      date: "Mar 12, 2025"
    },
    {
      id: 3,
      title: "Health Insurance for Pre-Existing Conditions",
      description: "Find the best health insurance options that offer comprehensive coverage for pre-existing diseases and medical expenses.",
      image: blogImages.healthInsurance,
      category: "Health Insurance",
      readTime: "6 min read",
      author: "Health Expert",
      date: "Mar 10, 2025"
    },
    {
      id: 4,
      title: "Auto vs Car Insurance: Key Differences",
      description: "Understand the important distinctions between auto insurance and car insurance before making your policy decision.",
      image: blogImages.autoInsurance,
      category: "Auto Insurance",
      readTime: "4 min read",
      author: "Insurance Specialist",
      date: "Mar 8, 2025"
    },
    {
      id: 5,
      title: "Complete Guide to Home Insurance",
      description: "Protect your home from natural disasters, theft, and damages with comprehensive coverage that fits your needs.",
      image: blogImages.homeInsurance,
      category: "Home Insurance",
      readTime: "8 min read",
      author: "Property Expert",
      date: "Mar 5, 2025"
    },
    {
      id: 6,
      title: "Commercial Insurance for Small Business",
      description: "Learn how commercial insurance protects your business from legal claims, property damage, and unexpected financial losses.",
      image: blogImages.businessInsurance,
      category: "Business Insurance",
      readTime: "6 min read",
      author: "Business Consultant",
      date: "Mar 3, 2025"
    },
    {
      id: 7,
      title: "Liability Insurance: Complete Coverage Guide",
      description: "Liability insurance protects you from lawsuits and unexpected legal expenses. Discover who needs it and why.",
      image: blogImages.liabilityInsurance,
      category: "Liability Insurance",
      readTime: "5 min read",
      author: "Legal Expert",
      date: "Mar 1, 2025"
    },
    {
      id: 8,
      title: "Property Insurance: Asset Protection",
      description: "Get comprehensive coverage for damages caused by fire, theft, and natural disasters with the best property insurance plans.",
      image: blogImages.propertyInsurance,
      category: "Property Insurance",
      readTime: "7 min read",
      author: "Property Advisor",
      date: "Feb 28, 2025"
    }
  ];

  const latestPosts = [
    {
      id: 1,
      title: "2025 Insurance Trends to Watch",
      author: "Sarah Johnson",
      date: "Mar 18, 2025",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=60&fit=crop"
    },
    {
      id: 2,
      title: "Digital Insurance Claims Process",
      author: "Mike Chen",
      date: "Mar 16, 2025",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=60&fit=crop"
    },
    {
      id: 3,
      title: "Insurance Technology Innovations",
      author: "Lisa Wong",
      date: "Mar 14, 2025",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=80&h=60&fit=crop"
    }
  ];

  const categories = [
    { name: "Auto Insurance", count: 12 },
    { name: "Health Insurance", count: 8 },
    { name: "Life Insurance", count: 15 },
    { name: "Home Insurance", count: 10 },
    { name: "Business Insurance", count: 6 },
    { name: "Travel Insurance", count: 4 }
  ];

  const tags = [
    "Insurance Tips", "Coverage Guide", "Premium Savings", "Claims Process", 
    "Policy Comparison", "Risk Management", "Financial Planning"
  ];

  const styles = {
    container: {
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      paddingTop: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    mainContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 15px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    mainTitle: {
      fontSize: '3rem',
      fontWeight: '700',
      color: '#212529',
      marginBottom: '1rem',
      lineHeight: '1.2'
    },
    titleHighlight: {
      color: '#0d6efd'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#6c757d',
      marginBottom: '2rem',
      lineHeight: '1.6'
    },
    badgeContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
      flexWrap: 'wrap'
    },
    badge: {
      padding: '0.5rem 1rem',
      borderRadius: '50px',
      fontSize: '0.85rem',
      fontWeight: '500'
    },
    contentRow: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'flex-start'
    },
    mainContent: {
      flex: '2',
      minWidth: '0'
    },
    sidebar: {
      flex: '1',
      minWidth: '300px',
      position: 'sticky',
      top: '2rem'
    },
    blogGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      border: 'none',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      transition: 'transform 0.3s ease'
    },
    cardImageHover: {
      transform: 'scale(1.05)'
    },
    categoryBadge: {
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      backgroundColor: '#0d6efd',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: '500',
      zIndex: 2
    },
    cardBody: {
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      flex: '1'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#212529',
      marginBottom: '0.75rem',
      lineHeight: '1.4'
    },
    cardDescription: {
      color: '#6c757d',
      fontSize: '0.95rem',
      lineHeight: '1.6',
      marginBottom: '1rem',
      flex: '1'
    },
    cardMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.85rem',
      color: '#6c757d',
      marginBottom: '1rem'
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    readMoreBtn: {
      backgroundColor: 'transparent',
      border: '1px solid #0d6efd',
      color: '#0d6efd',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      fontSize: '0.85rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    readMoreBtnHover: {
      backgroundColor: '#0d6efd',
      color: 'white'
    },
    sidebarCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      border: 'none',
      marginBottom: '1.5rem'
    },
    sidebarCardHeader: {
      backgroundColor: 'white',
      borderBottom: '1px solid #dee2e6',
      padding: '1rem 1.5rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#212529'
    },
    sidebarCardBody: {
      padding: '1.5rem'
    },
    profileAvatar: {
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '50%',
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1rem'
    },
    categoryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 1.5rem',
      borderBottom: '1px solid #f8f9fa',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    categoryItemHover: {
      backgroundColor: '#f8f9fa'
    },
    latestPostItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      borderBottom: '1px solid #f8f9fa',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    latestPostImage: {
      width: '60px',
      height: '60px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginRight: '1rem'
    },
    tagContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    tag: {
      backgroundColor: '#f8f9fa',
      color: '#6c757d',
      padding: '0.5rem 1rem',
      borderRadius: '50px',
      fontSize: '0.85rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: 'none'
    },
    tagHover: {
      backgroundColor: '#0d6efd',
      color: 'white'
    },
    newsletterCard: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderRadius: '12px',
      padding: '3rem',
      textAlign: 'center',
      marginTop: '3rem'
    },
    emailInput: {
      padding: '0.75rem 1rem',
      border: 'none',
      borderRadius: '6px 0 0 6px',
      fontSize: '1rem',
      outline: 'none',
      flex: '1'
    },
    subscribeBtn: {
      backgroundColor: 'white',
      color: '#495057',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '0 6px 6px 0',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    inputGroup: {
      display: 'flex',
      maxWidth: '400px',
      margin: '0 auto'
    }
  };

  const responsiveStyles = `
    @media (max-width: 1024px) {
      .content-row {
        flex-direction: column;
      }
      .sidebar {
        position: static !important;
        margin-top: 2rem;
      }
    }
    
    @media (max-width: 768px) {
      .blog-grid {
        grid-template-columns: 1fr !important;
      }
      .main-title {
        font-size: 2.5rem !important;
      }
      .subtitle {
        font-size: 1.1rem !important;
      }
      .newsletter-card {
        padding: 2rem 1rem !important;
      }
      .input-group {
        flex-direction: column !important;
        gap: 0.5rem;
      }
      .email-input, .subscribe-btn {
        border-radius: 6px !important;
      }
    }
  `;

  return (
    <div style={styles.container}>
      <style>{responsiveStyles}</style>
      
      <div style={styles.mainContainer}>
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.mainTitle} className="main-title">
            Insurance <span style={styles.titleHighlight}>Knowledge Hub</span>
          </h1>
          <p style={styles.subtitle} className="subtitle">
            Your complete guide to understanding insurance policies, coverage options, and making informed decisions for your financial security.
          </p>
          <div style={styles.badgeContainer}>
            <span style={{...styles.badge, backgroundColor: '#0d6efd', color: 'white'}}>Expert Advice</span>
            <span style={{...styles.badge, backgroundColor: '#198754', color: 'white'}}>Updated 2025</span>
            <span style={{...styles.badge, backgroundColor: '#17a2b8', color: 'white'}}>Comprehensive Guides</span>
          </div>
        </div>

        <div style={styles.contentRow} className="content-row">
          {/* Main Content - Blog Posts */}
          <div style={styles.mainContent}>
            <div style={styles.blogGrid} className="blog-grid">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    ...styles.card,
                    ...(hoveredCard === post.id ? styles.cardHover : {})
                  }}
                  onMouseEnter={() => setHoveredCard(post.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <span style={styles.categoryBadge}>{post.category}</span>
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{
                        ...styles.cardImage,
                        ...(hoveredCard === post.id ? styles.cardImageHover : {})
                      }}
                    />
                  </div>
                  <div style={styles.cardBody}>
                    <div style={styles.cardMeta}>
                      <span>📖 {post.readTime}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 style={styles.cardTitle}>{post.title}</h3>
                    <p style={styles.cardDescription}>{post.description}</p>
                    <div style={styles.cardFooter}>
                      <small style={{ color: '#6c757d' }}>By {post.author}</small>
                      <button
                        style={{
                          ...styles.readMoreBtn,
                          ...(hoveredCard === post.id ? styles.readMoreBtnHover : {})
                        }}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={styles.sidebar} className="sidebar">
            {/* Author Profile */}
            <div style={styles.sidebarCard}>
              <div style={styles.sidebarCardBody}>
                <div style={styles.profileAvatar}>GM</div>
                <h5 style={{ fontWeight: '700', marginBottom: '0.5rem', textAlign: 'center' }}>
                  Govind <span style={{ color: '#dc3545' }}>Mishra</span>
                </h5>
                <p style={{ color: '#6c757d', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1rem' }}>
                  Insurance Expert & Financial Advisor
                </p>
                <p style={{ color: '#6c757d', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1.5rem' }}>
                  Specializing in comprehensive insurance solutions and helping clients make informed financial decisions for over 10 years.
                </p>
                <div style={{ textAlign: 'center' }}>
                  <button style={{
                    backgroundColor: '#0d6efd',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Contact Expert
                  </button>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div style={styles.sidebarCard}>
              <div style={styles.sidebarCardHeader}>
                📁 Categories
              </div>
              <div>
                {categories.map((category, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.categoryItem,
                      ...(hoveredSidebarItem === `category-${index}` ? styles.categoryItemHover : {})
                    }}
                    onMouseEnter={() => setHoveredSidebarItem(`category-${index}`)}
                    onMouseLeave={() => setHoveredSidebarItem(null)}
                  >
                    <span>{category.name}</span>
                    <span style={{
                      backgroundColor: '#f8f9fa',
                      color: '#495057',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '50px',
                      fontSize: '0.75rem'
                    }}>
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Posts */}
            <div style={styles.sidebarCard}>
              <div style={styles.sidebarCardHeader}>
                🕒 Recent Articles
              </div>
              <div>
                {latestPosts.map((post) => (
                  <div
                    key={post.id}
                    style={{
                      ...styles.latestPostItem,
                      ...(hoveredSidebarItem === `post-${post.id}` ? { backgroundColor: '#f8f9fa' } : {})
                    }}
                    onMouseEnter={() => setHoveredSidebarItem(`post-${post.id}`)}
                    onMouseLeave={() => setHoveredSidebarItem(null)}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      style={styles.latestPostImage}
                    />
                    <div style={{ flex: '1' }}>
                      <h6 style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: '600', 
                        marginBottom: '0.25rem',
                        color: '#212529'
                      }}>
                        {post.title}
                      </h6>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <small style={{ color: '#6c757d' }}>By {post.author}</small>
                        <small style={{ color: '#6c757d' }}>{post.date}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div style={styles.sidebarCard}>
              <div style={styles.sidebarCardHeader}>
                🏷️ Popular Tags
              </div>
              <div style={styles.sidebarCardBody}>
                <div style={styles.tagContainer}>
                  {tags.map((tag, index) => (
                    <button
                      key={index}
                      style={{
                        ...styles.tag,
                        ...(hoveredSidebarItem === `tag-${index}` ? styles.tagHover : {})
                      }}
                      onMouseEnter={() => setHoveredSidebarItem(`tag-${index}`)}
                      onMouseLeave={() => setHoveredSidebarItem(null)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div style={styles.newsletterCard} className="newsletter-card">
          <h3 style={{ fontWeight: '700', marginBottom: '1rem' }}>
            Stay Updated with Insurance Insights
          </h3>
          <p style={{ marginBottom: '2rem', opacity: '0.9' }}>
            Get the latest insurance tips, policy updates, and expert advice delivered to your inbox.
          </p>
          <div style={styles.inputGroup} className="input-group">
            <input
              type="email"
              placeholder="Enter your email address"
              style={styles.emailInput}
              className="email-input"
            />
            <button style={styles.subscribeBtn} className="subscribe-btn">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;