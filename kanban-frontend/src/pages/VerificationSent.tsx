import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

export const VerificationSent: React.FC = () => {
  return (
    <Container className="mt-5"> {/* Adds margin top for spacing */}
      <Row className="justify-content-md-center"> {/* Centers the content on medium devices and up */}
        <Col md={6}> {/* Limits the content width and centers it */}
          <Alert variant="success"> {/* Uses Alert component for styled message box */}
            <Alert.Heading>Verification Email Sent</Alert.Heading>
            <p>
              Please check your inbox to verify your email address. If you didn't receive the email, please check your spam folder.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}
