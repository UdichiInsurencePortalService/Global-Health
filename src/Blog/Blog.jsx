import React from "react";
import { Container, Row, Col, Card, Badge, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Blog.css";
import images1 from "../assets/blogimages/Blogimage1.png";
import images2 from "../assets/blogimages/Carinsurance.png";
import images3 from "../assets/blogimages/Commercialinsurance.png";
import images4 from "../assets/blogimages/Homeinsurance.png";
import images5 from "../assets/blogimages/Lifeinsurance.png";
import images6 from "../assets/blogimages/property.png";
import images7 from "../assets/blogimages/auto.png";
import images8 from "../assets/blogimages/th.png";



const Blog = () => {
  // Cards data for all 4 cars on the left
  const carCards = [
    // 🚗 Car Insurance
    {
      id: 1,
      title: "Best Car Insurance Plans for 2025",
      description:
        "Discover the top-rated car insurance policies that provide full coverage and affordable premiums.",
      image: images2,
      alt: "Car Insurance",
    },

    // ❤️ Life Insurance
    {
      id: 2,
      title: "Why You Need Life Insurance in 2025?",
      description:
        "Life insurance secures your family's future. Learn how to choose the best plan for your needs.",
      image: images5,
      alt: "Life Insurance",
    },

    // 🏥 Health Insurance
    {
      id: 3,
      title: "Top Health Insurance Plans That Cover Pre-Existing Conditions",
      description:
        "Find the best health insurance options that offer coverage for pre-existing diseases and hospital bills.",
      image: images1,
      alt: "Health Insurance",
    },

    // 🚗 Auto Insurance
    {
      id: 4,
      title: "Auto Insurance vs. Car Insurance: What's the Difference?",
      description:
        "Understand the key differences between auto insurance and car insurance before buying a policy.",
      image: images7,
      alt: "Auto Insurance",
    },

    // 🏠 Home Insurance
    {
      id: 5,
      title: "How to Choose the Best Home Insurance Policy?",
      description:
        "Protect your home from natural disasters, theft, and damages with the right insurance plan.",
      image: images4,
      alt: "Home Insurance",
    },

    // 🏢 Business Insurance
    {
      id: 6,
      title: "Why Every Business Needs Commercial Insurance?",
      description:
        "Learn how commercial insurance protects your business from legal claims, property damage, and financial loss.",
      image: images3,
      alt: "Business Insurance",
    },

    // ⚖️ Liability Insurance
    {
      id: 7,
      title: "Understanding Liability Insurance: Who Needs It?",
      description:
        "Liability insurance protects you from lawsuits and unexpected legal expenses. Find out who should get it.",
      image: images8,
      alt: "Liability Insurance",
    },

    // 🏢 Property Insurance
    {
      id: 8,
      title: "Property Insurance: How to Safeguard Your Assets?",
      description:
        "Get coverage for damages caused by fire, theft, and natural disasters with the best property insurance plans.",
      image: images6,
      alt: "Property Insurance",
    },
  ];

  // Latest posts data
  const latestPosts = [
    {
      id: 1,
      title: "Prevent 75% of visitors from google analytics",
      author: "RACHEL ROTH",
      date: "09 FEB 2023",
      image: "/api/placeholder/80/60",
    },
    {
      id: 2,
      title: "Prevent 75% of visitors from google analytics",
      author: "RACHEL ROTH",
      date: "09 FEB 2023",
      image: "/api/placeholder/80/60",
    },
    {
      id: 3,
      title: "Prevent 75% of visitors from google analytics",
      author: "RACHEL ROTH",
      date: "09 FEB 2023",
      image: "/api/placeholder/80/60",
    },
  ];

  // Tags data
  const tags = [
    { id: 1, name: "Design" },
    { id: 2, name: "Development" },
    { id: 3, name: "Travel" },
    { id: 4, name: "Sell" },
    { id: 5, name: "Marketing" },
    { id: 6, name: "Research" },
    { id: 7, name: "Management" },
  ];

  return (
    <div className="car-dealership-site pt-4">
      <Container>
        <div className="row heading">
          <div className="col-md-12">
            <h1 className="text-center">Everything You Need to Know About Insurance</h1>
          </div>
        </div>
        <Row className="left-section">
          {/* Left Side - 4 Car Cards */}
          <Col lg={8}>
            <Row>
              {carCards.map((car, index) => (
                <Col md={6} className="mb-4" key={car.id}>
                  <Card className="h-100 border-0 custom-hover shadow-sm ">
                    <div className="position-relative">
                      {/* {car.badge && (
                        <Badge 
                          bg="danger" 
                          className="position-absolute top-0 start-0 m-3 py-2 px-3"
                        >
                          <div className="fw-bold">{car.badge.day}</div>
                          <div>{car.badge.month}</div>
                        </Badge>
                      )} */}
                      <Card.Img
                        variant="top"
                        src={car.image}
                        alt={car.alt}
                        // className="img-fluid"
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{car.title}</Card.Title>
                      <Card.Text>{car.description}</Card.Text>
                      {/* <a href="#readmore" className="text-primary">Read More</a> */}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          {/* Right Side - Sidebar */}
          <Col lg={4} className="sticky-sidebar">
            {/* Dealer Profile */}
<Card className="mb-4 border-0 shadow-sm custom-hover">
  <Card.Header className="bg-white border-bottom text-center">
    <h5 className="mb-0 fw-bold text-primary">Meet Your Dealer</h5>
  </Card.Header>
  <Card.Body className="text-center pt-4">
    <Image
      src="/api/placeholder/80/80"
      roundedCircle
      className="mb-3"
      alt="Dealer Profile"
    />
    <h5 className="fw-semibold">Hello, I'm <span className="text-danger">Govind Mishra</span></h5>
    <p className="small text-muted mt-3">
      I specialize in designing and developing **modern websites, web services, and online stores** for businesses of all sizes.
    </p>
  </Card.Body>
</Card>


            {/* Trending Section */}
            {/* <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0 text-danger">Trending Now</h5>
              </Card.Header>
              <Card.Body className="p-0"></Card.Body>
            </Card> */}

            {/* Latest Post */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0 text-danger">Latest Post</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <ul className="list-group list-group-flush">
                  {latestPosts.map((post) => (
                    <li
                      key={post.id}
                      className="list-group-item px-3 py-3 d-flex align-items-center"
                    >
                      <div className="me-3">
                        <img
                          src={post.image}
                          alt={`Latest car ${post.id}`}
                          className="img-fluid"
                        />
                      </div>
                      <div>
                        <h6 className="mb-1">{post.title}</h6>
                        <small className="text-muted">
                          {post.author} • {post.date}
                        </small>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>

            {/* Tags */}
            {/* <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0 text-danger">Latest Tags</h5>
              </Card.Header>
              <Card.Body>
                {tags.map((tag) => (
                  <Badge key={tag.id} bg="primary" className="me-2 mb-2 p-2">
                    {tag.name}
                  </Badge>
                ))}
              </Card.Body>
            </Card> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Blog;
