import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import './LandingPage.css';
import { useAppSelector } from '../app/hooks';

import TransparentNavbar from '../components/NavBar';

const Landing: React.FC = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    return (
        <div className='landing-background'>
            <TransparentNavbar />
            <Container fluid className="p-0 d-flex vh-100 justify-content-center align-items-center">
                <div className="text-center text-light overlay">
                    <h1>KanbanApp lets you work more effectively.</h1>
                    <h4 className="my-4">
                        Kanban's boards, lists, and cards enable you to organize and
                        prioritize your projects in a fun, flexible, and rewarding way.
                    </h4>
                    {isLoggedIn ? (
                        <Link to="/projects" className="btn-link">
                            <Button variant="primary">Go to projects</Button>
                        </Link>
                    ): (
                        <Link to="/signup" className="btn-link">
                            <Button variant="primary">Sign Up For Free</Button>
                        </Link>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Landing;
