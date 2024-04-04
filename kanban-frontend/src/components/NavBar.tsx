import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../pages/LandingPage.css'

const NavigationBar: React.FC = () => {
  return (
    <Navbar expand="lg" variant="light" bg="transparent">
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/" 
          style={{ fontWeight: 'bold', fontSize: '1.5em', color: 'white' }}
          className='overlay'
        >
          KanbanApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/login" 
              style={{ color: 'white', margin: '3px' }}
            >
              Login
            </Nav.Link>
            <Button variant="primary" as={Link as any} to="/signup">SignUp</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;