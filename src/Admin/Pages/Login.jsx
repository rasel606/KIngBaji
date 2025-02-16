import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

import AdminAuthContext from "../Component/AdminAuthContext";



export default () => {

  const {isAuthenticated,  adminlogin, logout } = AdminAuthContext();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Username and Password are required!');
      return;
    }
    if (email.length < 4 || email.length > 15) {
      setError('Username must be 4-15 characters long.');
      return;
    }
    if (password.length < 6 || password.length > 20) {
      setError('Password must be 6-20 characters long.');
      return;
    }
    setError('');
    
    // Add your login logic here (API calls, etc.)
    const newLocal = await adminlogin(email, password);
    console.log(newLocal)
  
  }



  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card
            style={{
              width: "25rem",
              padding: "20px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <Form>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email"  value={email}
                      onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password}
                      onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
