import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import './Admin.css'; // Optional custom styles
import { handleError } from '../errortoast';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

   if (username === 'admin' && password === 'admin') {
  localStorage.setItem("isAdminAuthenticated", "true"); // ✅ save login flag
  navigate('/dashboard', { state: { user: username } });
}

  };

  return (
    <div className="admin-bg d-flex align-items-center justify-content-center min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={5}>
            <Card className="shadow-lg border-0 animate__animated animate__fadeInDown">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4 fw-bold text-primary">Admin Login</h2>
                <p className="text-center text-muted mb-4">Access your dashboard</p>


                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                      type="text"
                      value={username}
                      placeholder="Enter username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      style={{width:'400px'}}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 fw-semibold py-2"
                  >
                    Sign In
                  </Button>
                </Form>

                <div className="mt-4 text-center text-muted">
                  Demo login: <strong>admin / admin</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
