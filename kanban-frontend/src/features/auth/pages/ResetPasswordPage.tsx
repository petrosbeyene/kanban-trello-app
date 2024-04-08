import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { confirmPasswordReset } from '../authSlice'; // adjust the import path as necessary
import { Alert, Button, Form, Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

const ResetPasswordPage: React.FC = () => {
  const { uidb64, token } = useParams<{ uidb64: string; token: string }>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector(state => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (uidb64 && token) {
        dispatch(confirmPasswordReset(uidb64, token, newPassword, confirmPassword));
        navigate('/login');
    };
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <h2>Reset Your Password</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '400px' }}>
        <Form.Group controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>
        <Button type="submit" className="mt-3" disabled={loading}>Reset Password</Button>
      </Form>
    </Container>
  );
};

export default ResetPasswordPage;
