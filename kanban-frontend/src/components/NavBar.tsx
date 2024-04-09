import React from 'react';
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { performLogout } from '../features/auth/authSlice';

import '../pages/LandingPage.css'

const NavigationBar: React.FC = () => {
  // Access Redux store state
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userEmail = useAppSelector((state) => state.profile.user?.email); 

  const handleLogout = () => {
    dispatch(performLogout());
  };

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
            {isLoggedIn ? (
              <NavDropdown
                  title={<span className="nav-dropdown-title-custom"> {userEmail || 'User'} </span>}
                  id="basic-nav-dropdown"
                  className="overlay"
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/boards">Boards</NavDropdown.Item>
                <NavDropdown.Item href="/reset-password">Reset Password</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/login" 
                  style={{ color: 'white', margin: '3px' }}
                >
                  Login
                </Nav.Link>
                <Button variant="primary" as={Link as any} className='m-1' to="/signup">SignUp</Button>
                <Button variant="primary" as={Link as any} className='m-1' to="/reset-password">Reset Password</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
