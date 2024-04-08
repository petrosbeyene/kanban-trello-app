import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { verifyEmail } from '../authSlice'; // Adjust the path as necessary
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

const EmailVerification: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const verificationStatus = useAppSelector(state => state.auth.emailVerificationStatus);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        if (token) {
            dispatch(verifyEmail(token));
        }
    }, [location, dispatch]);

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row>
                <Col xs={12} className="text-center">
                    {verificationStatus === 'loading' && <div>Verifying your email...</div>}
                    {verificationStatus === 'success' && (
                        <>
                            <Alert variant="success">Email verified successfully!</Alert>
                            <Button variant="primary" onClick={() => navigate('/login')}>Go to Login</Button>
                        </>
                    )}
                    {verificationStatus === 'failure' && (
                        <Alert variant="danger">Failed to verify email. Please try again or contact support.</Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default EmailVerification;