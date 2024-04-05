import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';

const EmailVerification: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failure'>('loading');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        if (token) {
            verifyEmail(token);
        }
    }, [location]);

    const verifyEmail = async (token: string) => {
        try {
            const url = `http://localhost:8000/api/v1/dj-rest-auth/registration/account-confirm-email/${token}/`;
            const response = await axios.get(url);
    
            if (response.status === 200) {
                setVerificationStatus('success');
            } else {
                setVerificationStatus('failure');
            }
        } catch (error) {
            console.error('There was an error verifying the email:', error);
            setVerificationStatus('failure');
        }
    };

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
