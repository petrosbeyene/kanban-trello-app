import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks'; 
import { performLogout } from '../../auth/authSlice';

const ProjectsNavigationBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector((state) => state.auth.user?.email);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(performLogout());
  };

  return (
    <Navbar expand="lg" variant="light" bg="white" style={{ borderBottom: '1px solid #ddd' }}> {/* Added borderBottom for subtle separation */}
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/" 
          style={{ fontWeight: 'bold', fontSize: '1.5em', color: 'black' }}
        >
          KanbanApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <NavDropdown title={userEmail || 'User'} id="basic-nav-dropdown" style={{ color: 'black' }}>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/login" 
                  style={{ color: 'black', margin: '3px' }}
                >
                  Login
                </Nav.Link>
                <Button variant="outline-primary" as={Link as any} to="/signup" style={{ marginLeft: '10px' }}>SignUp</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ProjectsNavigationBar;