import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { requestPasswordReset, resetPasswordResetStatus } from '../authSlice'; // Adjust the import path as necessary
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

const PasswordResetRequest: React.FC = () => {
    const [email, setEmail] = useState('');
    const dispatch = useAppDispatch();
    const { passwordResetStatus, error } = useAppSelector(state => state.auth); // Adjust RootState to your actual root state type

    // Reset password reset status and any messages when component mounts/unmounts
    React.useEffect(() => {
      return () => {
        dispatch(resetPasswordResetStatus());
      };
    }, [dispatch]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(requestPasswordReset(email));
    };

    return (
        <Container className="min-vh-100 d-flex align-items-center justify-content-center">
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                    <div className="border rounded shadow-sm p-4">
                        <h2 className="text-center mb-4">Password Reset Request</h2>
                        {passwordResetStatus === 'success' && <Alert variant="success">
                            If an account with the provided email exists, you will receive a password reset email shortly.
                        </Alert>}
                        {passwordResetStatus === 'failure' && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Form.Text className="text-muted">
                                    Enter the email address associated with your account.
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3 w-100" disabled={passwordResetStatus === 'loading'}>
                                {passwordResetStatus === 'loading' ? 'Sending...' : 'Submit'}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default PasswordResetRequest;